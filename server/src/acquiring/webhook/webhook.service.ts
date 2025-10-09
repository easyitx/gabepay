import { Injectable } from '@nestjs/common';
import { WebhookHandlerFactory } from './webhook-handler-factory';
import { WebhookProcessingResult } from './webhook.types';
import { AcquiringProvider } from '../acquiring.interface';
import { AcquiringService } from '../acquiring.service';

/**
 * Основной сервис для обработки вебхуков
 */
@Injectable()
export class WebhookService {
  constructor(
    private readonly webhookHandlerFactory: WebhookHandlerFactory,
    private readonly acquiringService: AcquiringService,
  ) {}

  /**
   * Обрабатывает вебхук от указанного провайдера
   */
  async processWebhook(
    provider: AcquiringProvider,
    data: unknown,
  ): Promise<WebhookProcessingResult> {
    try {
      if (!this.webhookHandlerFactory.isProviderSupported(provider)) {
        return {
          success: false,
          invoiceId: 'unknown',
          message: 'Error provider validation',
          error: `Unsupported provider: ${provider}`,
        };
      }

      const webhookHandler = this.webhookHandlerFactory.createHandler(provider);
      const result = webhookHandler.processWebhook(data);

      // Обрабатываем платеж в приложении
      await this.acquiringService.processWebhookInvoice(result);

      return result;
    } catch (error) {
      return {
        success: false,
        invoiceId: 'unknown',
        message: 'Error processing webhook',
        error: error.message || 'Processing failed',
      };
    }
  }
}
