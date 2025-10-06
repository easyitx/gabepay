export interface SteamCurrencyRateRes {}
export interface SteamConvertCurrencyRes {}
export interface SteamPaymentVerifyRes {}
export interface SteamPaymentExecuteRes {}
export interface SteamPaymentStatusRes {}

export interface SteamVerifyPayRes {}

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
