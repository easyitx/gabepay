import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  CashinoutCreateOneTimeInvoiceReq,
  CashinoutCreateOneTimeInvoiceRes,
} from './cashonout.interface';

@Injectable()
export class CashinoutApiService {
  private apiKey: string = process.env.CASHINOUT_API_KEY || '';
  private apiUrl: string = 'https://api.cashinout.io';
  private redirectUrl: string = process.env.PAY_SUCCESS_URL || '';
  private callbackUrl: string = process.env.CASHINOUT_WEBHOOK_URL || '';

  private client: AxiosInstance;

  onModuleInit() {
    this.createAxiosInstance();
  }

  async createOneTimeInvoice(
    body: CashinoutCreateOneTimeInvoiceReq,
  ): Promise<CashinoutCreateOneTimeInvoiceRes> {
    body.callbackUrl = this.callbackUrl;
    body.redirectUrl = this.redirectUrl;
    body.durationSeconds = 86400; // Сутки
    body.currencies = [0];

    const response: AxiosResponse<CashinoutCreateOneTimeInvoiceRes> =
      await this.client.post('/merchant/createOneTimeInvoice', body);

    return response.data;
  }

  private createAxiosInstance() {
    this.client = axios.create({
      baseURL: this.apiUrl,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
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
}
