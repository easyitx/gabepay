import { Injectable } from '@nestjs/common';
import {
  SteamValidateAccountErrorRes,
  SteamValidateAccountReq,
  SteamValidateAccountRes,
} from './steam-validate.interface';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class SteamValidateService {
  async validateAccount(
    data: SteamValidateAccountReq,
  ): Promise<
    AxiosResponse<SteamValidateAccountRes | SteamValidateAccountErrorRes>
  > {
    const response = await axios.post<
      AxiosResponse<SteamValidateAccountRes | SteamValidateAccountErrorRes>
    >('https://playstock.playzyx.com/system/data/validate_steam_account.php', {
      account: data.account,
    });

    return response.data;
  }
}
