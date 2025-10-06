import { IsString } from 'class-validator';

export class SteamValidateAccountReq {
  @IsString()
  account: string;
}

export interface SteamValidateAccountRes {
  valid: boolean;
  account: string;
  service: 'Steam';
}

export interface SteamValidateAccountErrorRes {
  valid: boolean;
  error: string;
  code: number;
}
