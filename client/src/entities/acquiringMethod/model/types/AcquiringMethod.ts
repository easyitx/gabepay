export enum AcquiringProvider {
  cashinout = "cashinout",
}

export interface AcquiringMethod {
  code: string;
  provider: AcquiringProvider;
  relativeProviderCommission: number;
  relativeCommission: number;
  isCommissionIncluded: boolean;
  icon: string;
}

export interface AcquiringCreatePayReq {
  amount: string;
  currency: string | "RUB"; // Поддерживает только 'RUB'
  account: string;
  methodCode: string;
  email: string;
}

export interface AcquiringCreatePayRes {
  paymentLink: string;
  transactionId: string;
}
