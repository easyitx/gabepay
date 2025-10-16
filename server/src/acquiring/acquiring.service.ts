import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import Decimal from 'decimal.js';
import { AcquiringMethods } from './acquiring-methods';
import {
  AcquiringCreatePayReq,
  AcquiringCreatePayRes,
  AcquiringMethod,
  AcquiringProvider,
} from './acquiring.interface';
import { Invoice, InvoiceDocument, InvoiceStatus } from './invoice.schema';
import { AppException } from '../../lib/errors/appException';
import { CashinoutService } from './cashinout/cashinout.service';
import { SteamAcquiringService } from '../steam-acquiring/steam-acquiring.service';
import { mongooseTransaction } from '../../lib/database';
import { WebhookProcessingResult } from './webhook/webhook.types';
import { PromoCodeService } from '../promo-code/promo-code.service';

@Injectable()
export class AcquiringService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(Invoice.name)
    private readonly invoiceModel: Model<InvoiceDocument>,
    private readonly cashinoutService: CashinoutService,
    private readonly steamAcquiringService: SteamAcquiringService,
    private readonly promoCodeService: PromoCodeService,
  ) {}

  async createNewInvoice(
    data: AcquiringCreatePayReq,
  ): Promise<AcquiringCreatePayRes> {
    if (data.currency !== 'RUB') {
      throw AppException.notFound('Currency not supported.');
    }

    const method = AcquiringMethods.find(
      (method) => method.code === data.methodCode,
    );

    if (!method) {
      throw AppException.notFound(data.methodCode);
    }

    const acquiringProvider = this.getAcquiringProviderService(method.provider);

    // Создаем платеж в системе
    const acquiringCommission = new Decimal(data.amount)
      .mul(method.relativeProviderCommission)
      .div(100);

    const serviceCommission = new Decimal(data.amount)
      .mul(method.relativeCommission)
      .div(100);

    // Рассчитываем общую комиссию
    const totalCommission = acquiringCommission.plus(serviceCommission);

    // Рассчитываем базовую сумму к оплате
    const baseAmount = method.isCommissionIncluded
      ? new Decimal(data.amount).plus(totalCommission)
      : new Decimal(data.amount);

    // Применяем промокод если он предоставлен
    let amount = baseAmount;
    let discountAmount = new Decimal(0);

    if (data.promoCode) {
      const promoValidation = await this.promoCodeService.validatePromoCode({
        code: data.promoCode,
      });
      if (promoValidation.isValid) {
        // Скидка применяется только к общей комиссии
        discountAmount = totalCommission.mul(promoValidation.discount).div(100);

        // Вычитаем скидку от комиссии из общей суммы
        amount = baseAmount.minus(discountAmount);
      }
    }

    // Проверяем количество активных платежей созданных за последние 23 часа
    const twentyThreeHoursAgo = new Date(Date.now() - 23 * 60 * 60 * 1000);

    const activeInvoices = await this.invoiceModel.countDocuments({
      email: data.email,
      amount: amount,
      currency: data.currency,
      provider: method.provider,
      status: InvoiceStatus.pending,
      createdAt: { $gte: twentyThreeHoursAgo }, // только счета созданные в последние 23 часа
    });

    // Если есть неоплаченный счет возвращаем его
    const numberValidActiveDepositOrders = 1;
    if (activeInvoices >= numberValidActiveDepositOrders) {
      const invoice = await this.invoiceModel
        .findOne({
          email: data.email,
          amount: amount,
          currency: data.currency,
          provider: method.provider,
          status: InvoiceStatus.pending,
          createdAt: { $gte: twentyThreeHoursAgo },
        })
        .sort({ createdAt: -1 }); // берем самый свежий

      if (invoice) {
        return {
          transactionId: invoice.invoiceId,
          paymentLink: invoice.paymentLink,
        };
      }
    }

    return await mongooseTransaction(this.connection, async (session) => {
      const payData: Partial<Invoice> = {
        provider: method.provider,
        email: data.email,
        currency: data.currency,
        amount: amount,
        status: InvoiceStatus.pending,
        acquiringCommission: new Decimal(acquiringCommission),
        serviceCommission: new Decimal(serviceCommission),
        account: data.account,
        promoCode: data.promoCode,
        discountAmount: new Decimal(discountAmount),
      };

      const createdInvoice = await this.invoiceModel.create([payData], {
        session,
      });

      const newInvoice = createdInvoice[0];

      const verifyData = await this.steamAcquiringService.paymentVerify(data);

      // Создаем платеж у провайдера
      const details = await acquiringProvider.createInvoice(newInvoice);

      newInvoice.code = verifyData.code;
      newInvoice.paymentLink = details.paymentLink;
      newInvoice.invoiceId = details.transactionId;
      await newInvoice.save({ session });

      return details;
    });
  }

  getPayMethods(): AcquiringMethod[] {
    return AcquiringMethods;
  }

  async processWebhookInvoice(data: WebhookProcessingResult) {
    return await mongooseTransaction(this.connection, async (session) => {
      const invoice = await this.invoiceModel.findOne(
        {
          invoiceId: data.invoiceId,
        },
        {},
        { session },
      );

      if (!invoice) {
        return AppException.notFound(`Invoice ${data.invoiceId} not found`);
      }

      if (data.success) {
        invoice.paidAmount = invoice.amount;

        // Отправляем деньги на стим
        const isSuccess =
          await this.steamAcquiringService.paymentExecute(invoice);
        if (isSuccess) {
          invoice.status = InvoiceStatus.completed;
        } else {
          invoice.status = InvoiceStatus.received;
        }

        await invoice.save({ session });
      }

      return true;
    });
  }

  async getPaymentsHistory() {
    return this.invoiceModel
      .find({ status: InvoiceStatus.completed })
      .limit(30)
      .select(['_id', 'email', 'currency', 'paidAmount', 'account'])
      .exec();
  }

  async getAllCurrencies() {
    return this.steamAcquiringService.getAllCurrencies();
  }

  private getAcquiringProviderService(provider: AcquiringProvider) {
    switch (provider) {
      case AcquiringProvider.cashinout:
        return this.cashinoutService;
      default:
        throw AppException.validationError({
          message: `Unsupported provider: ${provider}`,
          supportedProviders: Object.values(AcquiringProvider),
        });
    }
  }
}
