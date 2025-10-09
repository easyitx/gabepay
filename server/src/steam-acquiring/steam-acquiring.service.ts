import { Injectable } from '@nestjs/common';
import { SteamAcquiringApiService } from './steam-acquiring-api.service';
import { generateId } from '../../lib/database';
import { AcquiringCreatePayReq } from '../acquiring/acquiring.interface';
import { SteamCurrency, SteamStatusCode } from './steam-acquiring.interface';
import { AppException } from '../../lib/errors/appException';
import { InvoiceDocument } from '../acquiring/invoice.schema';

@Injectable()
export class SteamAcquiringService {
  constructor(
    private readonly steamAcquiringApiService: SteamAcquiringApiService,
  ) {}

  async paymentExecute(invoice: InvoiceDocument) {
    const response = await this.steamAcquiringApiService.paymentExecute(
      invoice.code,
    );

    if (response.data.status_code === SteamStatusCode.PAYMENT_SUCCESS) {
      return true;
    }

    const reason = this.steamAcquiringApiService.getErrorMessageByStatusCode(
      response.data.status_code,
    );

    console.error(reason);
    return false;
  }

  async paymentVerify(data: AcquiringCreatePayReq) {
    const code = generateId();
    const response = await this.steamAcquiringApiService.paymentVerify(
      code,
      data.account,
      data.amount,
      data.currency as SteamCurrency,
    );

    if (response.data.status_code === SteamStatusCode.REQUEST_ACCEPTED) {
      return {
        ...data,
        code,
      };
    }

    const reason = this.steamAcquiringApiService.getErrorMessageByStatusCode(
      response.data.status_code,
    );

    throw AppException.b2bVerificationFailed(
      response.data.status_code,
      data.account,
      reason,
    );
  }

  async getAllCurrencies() {
    return await this.steamAcquiringApiService.getAllCurrencies();
  }
}
