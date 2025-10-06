export type CashinoutCurrencyCodes =
  | 'WUD'
  | 'KZT'
  | 'BTC'
  | 'LTC'
  | 'USDT'
  | 'EUR'
  | 'USD'
  | 'BNB'
  | 'ETH'
  | 'TRX'
  | 'INR';

export type CashinoutCurrencyIds = 0 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export interface CashinoutCurrency {
  id: CashinoutCurrencyIds;
  code: CashinoutCurrencyCodes;
}

export const CashinoutCurrencies: CashinoutCurrency[] = [
  {
    id: 0,
    code: 'WUD',
  },
  {
    id: 2,
    code: 'KZT',
  },
  {
    id: 3,
    code: 'BTC',
  },
  {
    id: 4,
    code: 'LTC',
  },
  {
    id: 5,
    code: 'USDT',
  },
  {
    id: 6,
    code: 'EUR',
  },
  {
    id: 7,
    code: 'USD',
  },
  {
    id: 8,
    code: 'BNB',
  },
  {
    id: 9,
    code: 'ETH',
  },
  {
    id: 10,
    code: 'TRX',
  },
  {
    id: 11,
    code: 'INR',
  },
];

export interface CashinoutCreateOneTimeInvoiceReq {
  amount: string;
  currency?: CashinoutCurrencyCodes;
  currencies?: CashinoutCurrencyIds[];
  durationSeconds?: number;
  callbackUrl?: string;
  redirectUrl?: string;
  externalText?: string;
  allowInternalPaymentSystem: boolean;
}

export type CashinoutCreateOneTimeInvoiceRes = string;
