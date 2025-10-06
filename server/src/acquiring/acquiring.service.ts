import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
import { generateId, shortId } from '../../lib/database';

@Injectable()
export class AcquiringService {
  constructor(
    @InjectModel(Invoice.name)
    private readonly invoiceModel: Model<InvoiceDocument>,
    private readonly cashinoutService: CashinoutService,
    private readonly steamAcquiringService: SteamAcquiringService,
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

    // Проверяем количество активных платежей
    const activeInvoices = await this.invoiceModel.countDocuments({
      email: data.email,
      provider: method.provider,
      status: InvoiceStatus.pending,
    });

    // Если есть неоплаченный счет возвращаем его
    const numberValidActiveDepositOrders = 1;
    if (activeInvoices >= numberValidActiveDepositOrders) {
      const invoice = await this.invoiceModel.findOne({
        email: data.email,
        provider: method.provider,
        status: InvoiceStatus.pending,
      });

      if (invoice) {
        return {
          transactionId: invoice.invoiceId,
          paymentLink: invoice.paymentLink,
        };
      }
    }

    // Создаем платеж в системе
    const acquiringCommission = new Decimal(data.amount)
      .mul(method.relativeProviderCommission)
      .div(100);

    const serviceCommission = new Decimal(data.amount)
      .mul(method.relativeCommission)
      .div(100);

    const amount = method.isCommissionIncluded
      ? new Decimal(data.amount)
          .plus(acquiringCommission)
          .plus(serviceCommission)
      : new Decimal(data.amount);

    const payData: Partial<Invoice> = {
      provider: method.provider,
      email: data.email,
      currency: data.currency,
      amount: amount,
      status: InvoiceStatus.pending,
      acquiringCommission: new Decimal(acquiringCommission),
      serviceCommission: new Decimal(serviceCommission),
      account: data.account,
      metadata: {},
    };

    const newInvoice = await this.invoiceModel.create(payData);

    const verifyData = await this.steamAcquiringService.paymentVerify(data);
    payData.code = verifyData.code;

    // Создаем платеж у провайдера
    const details = await acquiringProvider.createInvoice(newInvoice);

    newInvoice.paymentLink = details.paymentLink;
    newInvoice.invoiceId = details.transactionId;
    await newInvoice.save();

    return details;
  }

  getPayMethods(): AcquiringMethod[] {
    return AcquiringMethods;
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
