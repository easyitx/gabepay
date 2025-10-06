import { Module } from '@nestjs/common';
import { CashinoutModule } from './cashinout/cashinout.module';
import { AcquiringController } from './acquiring.controller';
import { AcquiringService } from './acquiring.service';
import { DatabaseModule } from '../../lib/database';
import { Invoice, InvoiceSchema } from './invoice.schema';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: Invoice.name, schema: InvoiceSchema }]),
    CashinoutModule,
  ],
  controllers: [AcquiringController],
  providers: [AcquiringService],
})
export class AcquiringModule {}
