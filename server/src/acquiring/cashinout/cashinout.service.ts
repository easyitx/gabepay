import { Injectable } from '@nestjs/common';
import { CashinoutApiService } from './cashinout-api.service';
import { AcquiringCreatePayRes } from '../acquiring.interface';
import { CashinoutCreateOneTimeInvoiceReq } from './cashonout.interface';
import { InvoiceDocument } from '../invoice.schema';

@Injectable()
export class CashinoutService {
  constructor(private readonly cashinoutApiService: CashinoutApiService) {}

  async createInvoice(
    invoice: InvoiceDocument,
  ): Promise<AcquiringCreatePayRes> {
    const body: CashinoutCreateOneTimeInvoiceReq = {
      amount: invoice.amount.toString(), // сумма в валюте currency, USDT если currency не указана
      currency: 0,
      allowInternalPaymentSystem: true,
    };

    const response = await this.cashinoutApiService.createOneTimeInvoice(body);

    return {
      paymentLink: `https://cashinout.io/pay/${response.data}?lang=ru&refererId=194805`,
      transactionId: response.data,
    };
  }
}
