import { Module } from '@nestjs/common';
import { CashinoutModule } from './cashinout/cashinout.module';
import { AcquiringController } from './acquiring.controller';
import { AcquiringService } from './acquiring.service';
import { DatabaseModule } from '../../lib/database';
import { Invoice, InvoiceSchema } from './invoice.schema';
import { SteamAcquiringModule } from '../steam-acquiring/steam-acquiring.module';
import { AcquiringCroneService } from './acquiring-crone.service';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: Invoice.name, schema: InvoiceSchema }]),
    CashinoutModule,
    SteamAcquiringModule,
  ],
  controllers: [AcquiringController],
  providers: [AcquiringService, AcquiringCroneService],
})
export class AcquiringModule {}
