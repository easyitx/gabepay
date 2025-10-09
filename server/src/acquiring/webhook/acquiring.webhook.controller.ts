import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { WebhookProcessingResult } from './webhook.types';
import { WebhookService } from './webhook.service';
import { AcquiringProvider } from '../acquiring.interface';

@Controller()
export class AcquiringWebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post(':provider/webhook')
  @HttpCode(HttpStatus.OK)
  async processWebhook(
    @Param('provider') provider: AcquiringProvider,
    @Body() data: unknown,
  ): Promise<WebhookProcessingResult> {
    return this.webhookService.processWebhook(provider, data);
  }
}
