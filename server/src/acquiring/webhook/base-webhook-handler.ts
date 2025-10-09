import {
  InvoiceProcessingData,
  WebhookProcessingResult,
  WebhookValidationResult,
} from './webhook.types';
import { InvoiceStatus } from '../invoice.schema';

/**
 * Абстрактный базовый класс для обработки вебхуков
 */
export abstract class BaseWebhookHandler {
  /**
   * Обрабатывает входящий вебхук
   */
  abstract processWebhook(data: unknown): WebhookProcessingResult;

  /**
   * Валидирует данные вебхука
   */
  abstract validateWebhook(data: any): WebhookValidationResult;

  /**
   * Извлекает данные для обработки депозита
   */
  abstract extractDepositData(data: any): InvoiceProcessingData;

  /**
   * Получает статус платежа из данных вебхука
   */
  abstract getPaymentStatus(data: any): InvoiceStatus;

  /**
   * Создает успешный результат обработки
   */
  protected createSuccessResult(
    invoiceId: string,
    message: string,
  ): WebhookProcessingResult {
    return {
      success: true,
      invoiceId,
      message: message || 'Webhook processed successfully',
    };
  }

  /**
   * Создает результат с ошибкой
   */
  protected createErrorResult(
    invoiceId: string,
    error: string,
  ): WebhookProcessingResult {
    return {
      success: false,
      invoiceId,
      error,
    };
  }
}
