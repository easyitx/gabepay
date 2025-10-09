import { Injectable } from '@nestjs/common';
import { CashinoutWebhookReq } from './cashonout.interface';
import {
  InvoiceProcessingData,
  WebhookProcessingResult,
  WebhookValidationResult,
} from '../webhook/webhook.types';
import { InvoiceStatus } from '../invoice.schema';
import Decimal from 'decimal.js';
import { BaseWebhookHandler } from '../webhook/base-webhook-handler';

@Injectable()
export class CashinoutHandlerService extends BaseWebhookHandler {
  processWebhook(data: CashinoutWebhookReq): WebhookProcessingResult {
    console.log('Processing webhook');
    console.log(data);

    return {
      success: true,
      invoiceId: data.invoiceId,
      message: '',
      error: '',
    };
  }

  /**
   * Валидирует вебхук
   */
  validateWebhook(data: CashinoutWebhookReq): WebhookValidationResult {
    try {
      // Проверяем обязательные поля
      if (!data.type || !data.invoiceId || !data.signature) {
        return {
          isValid: false,
          error: 'Missing required fields',
        };
      }

      // Проверяем подпись

      // Проверяем валюту

      return {
        isValid: true,
      };
    } catch (error) {
      return {
        isValid: false,
        error: `Validation error: ${error.message}`,
      };
    }
  }

  /**
   * Извлекает данные для обработки депозита
   */
  extractDepositData(data: any): InvoiceProcessingData {
    return {
      amount: new Decimal(data.amountUsdt),
      currency: 'USD',
      invoiceId: data.invoiceId,
      status: InvoiceStatus.pending,
    };
  }

  /**
   * Определяет статус платежа
   */
  getPaymentStatus(data: any): InvoiceStatus {
    return InvoiceStatus.pending;
  }
}
