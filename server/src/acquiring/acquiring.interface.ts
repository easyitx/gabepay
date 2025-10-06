import { IsString } from 'class-validator';

export enum AcquiringProvider {
  cashinout = 'cashinout',
}

export interface AcquiringMethod {
  code: string;
  provider: AcquiringProvider;
  relativeProviderCommission: number;
  relativeCommission: number;
  isCommissionIncluded: boolean;
  icon: string;
}

export class AcquiringCreatePayReq {
  @IsString()
  amount: string;
  @IsString()
  currency: string;
  @IsString()
  account: string;
  @IsString()
  methodCode: string;
  @IsString()
  email: string;
}

export interface AcquiringCreatePayRes {
  paymentLink: string;
  transactionId: string;
}
