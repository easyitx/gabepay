export interface SteamCurrencyRateRes {}
export interface SteamConvertCurrencyRes {}
export interface SteamPaymentVerifyRes {
  status_code: SteamStatusCode;
}
export interface SteamPaymentExecuteRes {}
export interface SteamPaymentStatusRes {}

export enum SteamStatusCode {
  DUPLICATE_TRANSACTION = 'DUPLICATE_TRANSACTION',
  INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
  PAYMENT_VERIFICATION_FAILED = 'PAYMENT_VERIFICATION_FAILED',
  PAYMENT_CONFIRMATION_FAILED = 'PAYMENT_CONFIRMATION_FAILED',
  PAYMENT_SUCCESS = 'PAYMENT_SUCCESS',
  PAYMENT_IN_PROGRESS = 'PAYMENT_IN_PROGRESS',
  PURCHASE_NOT_FOUND = 'PURCHASE_NOT_FOUND',
  REQUEST_ACCEPTED = 'REQUEST_ACCEPTED',
  CALCULATION_ERROR = 'CALCULATION_ERROR',
  TOP_UP_ERROR = 'TOP_UP_ERROR',
}

export type SteamCurrency =
  | 'USD'
  | 'RUB'
  | 'EUR'
  | 'GBP'
  | 'JPY'
  | 'CNY'
  | 'AUD'
  | 'CAD'
  | 'CHF'
  | 'SEK'
  | 'NZD'
  | 'KZT'
  | 'UAH'
  | 'BYN'
  | 'AMD'
  | 'AZN'
  | 'GEL'
  | 'TJS'
  | 'UZS';

export class SteamVerifyPayReq {
  code: string;
  account: string;
  amount: number | string;
  currency: SteamCurrency;
}
