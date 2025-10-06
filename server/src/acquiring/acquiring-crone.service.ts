import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invoice, InvoiceDocument, InvoiceStatus } from './invoice.schema';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AcquiringCroneService {
  constructor(
    @InjectModel(Invoice.name)
    private readonly invoiceModel: Model<InvoiceDocument>,
  ) {}
  // Фоновая задача для массового обновления
  @Cron(CronExpression.EVERY_30_MINUTES)
  async updateExpiredInvoices() {
    await this.invoiceModel.updateMany(
      {
        status: InvoiceStatus.pending,
        createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      },
      {
        status: InvoiceStatus.expired,
      },
    );
  }
}
