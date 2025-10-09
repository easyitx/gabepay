import { Injectable } from '@nestjs/common';
import { BaseWebhookHandler } from './base-webhook-handler';
import { AcquiringProvider } from '../acquiring.interface';
import { CashinoutHandlerService } from '../cashinout/cashinout-handler.service';

/**
 * Фабрика для создания обработчиков вебхуков
 */
@Injectable()
export class WebhookHandlerFactory {
  constructor(
    private readonly cashinoutHandlerService: CashinoutHandlerService,
  ) {}

  /**
   * Создает обработчик вебхука для указанного провайдера
   */
  createHandler(provider: AcquiringProvider): BaseWebhookHandler {
    switch (provider) {
      case AcquiringProvider.cashinout:
        return this.cashinoutHandlerService;
      default:
        throw new Error(`Unsupported payment provider: ${provider}`);
    }
  }

  /**
   * Проверяет, поддерживается ли провайдер
   */
  isProviderSupported(provider: string): provider is AcquiringProvider {
    if (!provider) return false;
    return this.getSupportedProviders().includes(provider as AcquiringProvider);
  }

  /**
   * Получает список поддерживаемых провайдеров
   */
  private getSupportedProviders(): AcquiringProvider[] {
    return [AcquiringProvider.cashinout];
  }
}
