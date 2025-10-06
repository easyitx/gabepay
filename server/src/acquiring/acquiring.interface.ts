export enum AcquiringProvider {
  cashinout = 'cashinout',
}

export interface AcquiringMethod {
  code: string;
  provider: AcquiringProvider;
  relativeProviderCommission: number;
  relativeCommission: number;
  isCommissionIncluded: boolean;
}

export class AcquiringCreatePayReq {
  amount: string;
  currency: string;
  account: string;
  code: string;
  methodCode: string;
  email: string;
}

export interface AcquiringCreatePayRes {
  paymentLink: string;
  transactionId: string;
}
