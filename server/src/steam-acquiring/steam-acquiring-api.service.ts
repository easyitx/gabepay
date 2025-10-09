import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  SteamConvertCurrencyRes,
  SteamCurrency,
  SteamCurrencyRateRes,
  SteamPaymentExecuteRes,
  SteamPaymentStatusRes,
  SteamPaymentVerifyRes,
  SteamStatusCode,
} from './steam-acquiring.interface';

@Injectable()
export class SteamAcquiringApiService {
  private readonly apiKey: string = process.env.B2B_API_KEY || '';
  private readonly apiUrl: string = 'https://api.g-engine.net/v2.1';

  private client: AxiosInstance;

  onModuleInit() {
    this.createAxiosInstance();
  }

  /**
   * Получение всех курсов валют
   */
  async getAllCurrencies(): Promise<SteamCurrencyRateRes[]> {
    const response: AxiosResponse<{ data: SteamCurrencyRateRes[] }> =
      await this.client.get('/currencies');

    return response.data.data;
  }

  /**
   * Конвертация валют
   */
  async convertCurrency(
    fromCurrency: SteamCurrency,
    toCurrency: SteamCurrency,
    amount: number | string,
  ): Promise<SteamConvertCurrencyRes> {
    const response: AxiosResponse<SteamConvertCurrencyRes> =
      await this.client.get(
        `/currencies/${fromCurrency}:${toCurrency}/${amount}`,
      );

    return response.data;
  }

  /**
   * Верификация платежа
   */
  async paymentVerify(
    code: string,
    account: string,
    amount: number | string,
    currency: SteamCurrency,
  ): Promise<SteamPaymentVerifyRes> {
    const verifyData = {
      code: code,
      account: account.trim(),
      amount: amount,
      currency: currency,
    };

    const response: AxiosResponse<SteamPaymentVerifyRes> =
      await this.client.post(`/payments?service_id=8`, verifyData);

    return response.data;
  }

  /**
   * Выполнение платежа
   */
  async paymentExecute(code: string): Promise<SteamPaymentExecuteRes> {
    const response: AxiosResponse<SteamPaymentExecuteRes> =
      await this.client.post(`/payments/${code}/execute`);

    return response.data;
  }

  /**
   * Получение статуса платежа
   */
  async getPaymentStatus(code: string): Promise<SteamPaymentStatusRes> {
    const response: AxiosResponse<SteamPaymentStatusRes> =
      await this.client.get(`/payments/${code}`);

    return response.data;
  }

  private createAxiosInstance() {
    this.client = axios.create({
      baseURL: this.apiUrl,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey, // Добавлен API ключ в заголовки
      },
    });

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error(
          'External API Error:',
          error.response?.data || error.message,
        );
        return Promise.reject(error);
      },
    );
  }

  public getErrorMessageByStatusCode(statusCode: SteamStatusCode): string {
    switch (statusCode) {
      case SteamStatusCode.PAYMENT_VERIFICATION_FAILED:
        return 'Невозможно пополнить текущий аккаунт';
      // case 'REQUEST_REJECTED':
      //   return 'B2B отклонил запрос на пополнение.';
      // case 'REQUEST_FAILED':
      //   return 'B2B не смог обработать запрос на пополнение.';
      // case 'REQUEST_TIMEOUT':
      //   return 'B2B не ответил в течение таймаута.';
      // case 'REQUEST_INVALID':
      //   return 'B2B получил некорректный запрос на пополнение.';
      // case 'REQUEST_UNAUTHORIZED':
      //   return 'B2B не авторизован для обработки запроса на пополнение.';
      // case 'REQUEST_FORBIDDEN':
      //   return 'B2B запретил обработку запроса на пополнение.';
      // case 'REQUEST_NOT_FOUND':
      //   return 'B2B не смог найти аккаунт для пополнения.';
      // case 'REQUEST_CONFLICT':
      //   return 'B2B получил конфликтный запрос на пополнение.';
      // case 'REQUEST_TOO_MANY_REQUESTS':
      //   return 'B2B получил слишком много запросов на пополнение.';
      // case 'REQUEST_INTERNAL_SERVER_ERROR':
      //   return 'B2B получил внутреннюю ошибку сервера.';
      // case 'REQUEST_BAD_GATEWAY':
      //   return 'B2B получил плохой шлюз.';
      // case 'REQUEST_SERVICE_UNAVAILABLE':
      //   return 'B2B получил недоступный сервис.';
      // case 'REQUEST_GATEWAY_TIMEOUT':
      //   return 'B2B получил таймаут шлюза.';
      default:
        return 'Неизвестная ошибка B2B.';
    }
  }
}
