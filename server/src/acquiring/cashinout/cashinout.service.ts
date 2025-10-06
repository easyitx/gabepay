import { Injectable } from '@nestjs/common';
import { CashinoutApiService } from './cashinout-api.service';
import { AcquiringCreatePayRes, AcquiringMethod } from '../acquiring.interface';
import { CashinoutCreateOneTimeInvoiceReq } from './cashonout.interface';
import { InvoiceDocument } from '../invoice.schema';

@Injectable()
export class CashinoutService {
  constructor(private readonly cashinoutApiService: CashinoutApiService) {}

  async createInvoice(
    invoice: InvoiceDocument,
    method: AcquiringMethod,
  ): Promise<AcquiringCreatePayRes> {
    const body: CashinoutCreateOneTimeInvoiceReq = {
      amount: '0', // сумма в валюте currency, USDT если currency не указана
      currency: 'WUD',
      allowInternalPaymentSystem: true,
    };

    const response = await this.cashinoutApiService.createOneTimeInvoice(body);

    return {
      paymentLink: `https://cashinout.io/pay/${response}?lang=ru`,
      transactionId: response,
    };
  }
}
