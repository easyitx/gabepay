import { Injectable } from '@nestjs/common';
import { SteamAcquiringApiService } from './steam-acquiring-api.service';
import { generateId } from '../../lib/database';
import { AcquiringCreatePayReq } from '../acquiring/acquiring.interface';
import { SteamCurrency, SteamStatusCode } from './steam-acquiring.interface';
import { AppException } from '../../lib/errors/appException';

@Injectable()
export class SteamAcquiringService {
  constructor(
    private readonly steamAcquiringApiService: SteamAcquiringApiService,
  ) {}

  async paymentVerify(data: AcquiringCreatePayReq) {
    const code = generateId();
    const response = await this.steamAcquiringApiService.paymentVerify(
      code,
      data.account,
      data.amount,
      data.currency as SteamCurrency,
    );

    if (response.status_code === SteamStatusCode.REQUEST_ACCEPTED) {
      return {
        ...data,
        code,
      };
    }

    const reason = this.steamAcquiringApiService.getErrorMessageByStatusCode(
      response.status_code,
    );

    throw AppException.b2bVerificationFailed(
      response.status_code,
      data.account,
      reason,
    );
  }
}
