import { Module } from '@nestjs/common';
import { CashinoutModule } from './cashinout/cashinout.module';
import { AcquiringController } from './acquiring.controller';
import { AcquiringService } from './acquiring.service';
import { DatabaseModule } from '../../lib/database';
import { Invoice, InvoiceSchema } from './invoice.schema';
import { SteamAcquiringModule } from '../steam-acquiring/steam-acquiring.module';
import { AcquiringCroneService } from './acquiring-crone.service';
import { AcquiringWebhookController } from './webhook/acquiring.webhook.controller';
import { WebhookService } from './webhook/webhook.service';
import { WebhookHandlerFactory } from './webhook/webhook-handler-factory';
import { PromoCodeModule } from '../promo-code/promo-code.module';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: Invoice.name, schema: InvoiceSchema }]),
    CashinoutModule,
    SteamAcquiringModule,
    PromoCodeModule,
  ],
  controllers: [AcquiringController, AcquiringWebhookController],
  providers: [
    AcquiringService,
    AcquiringCroneService,
    WebhookService,
    WebhookHandlerFactory,
  ],
})
export class AcquiringModule {}
