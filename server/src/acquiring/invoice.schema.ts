import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Decimal } from 'decimal.js';
import mongoose, { HydratedDocument } from 'mongoose';
import { decimalType, id } from '../../lib/database';
import { AcquiringProvider } from './acquiring.interface';

export type InvoiceDocument = HydratedDocument<Invoice>;

export enum InvoiceStatus {
  pending = 'pending', // Ожидается оплата от клиента
  expired = 'expired', // Платеж просрочен
  received = 'received', // Инвойс получен на счет
  completed = 'completed', // Инвойс оплачен и выплачен на стим
}

@Schema({
  timestamps: true,
  collection: 'invoices',
})
export class Invoice {
  @Prop(id)
  _id: string;

  @Prop({
    enum: AcquiringProvider,
    required: true,
  })
  provider: AcquiringProvider;

  @Prop({
    required: false,
    default: '',
  })
  invoiceId: string;

  @Prop({
    required: true,
  })
  email: string; // Email пользователя

  @Prop({
    required: true,
    default: 'RUB',
  })
  currency: string; // Валюта платежа

  @Prop(
    decimalType({
      required: true,
      min: 0,
    }),
  )
  amount: Decimal; // Сумма при создании инвойса

  @Prop(
    decimalType({
      default: '0',
      min: 0,
    }),
  )
  paidAmount: Decimal; // Фактически оплаченная сумма

  @Prop(
    decimalType({
      default: '0',
      min: 0,
    }),
  )
  bonus: Decimal; // Бонусная сумма

  @Prop(
    decimalType({
      default: '0',
      min: 0,
    }),
  )
  acquiringCommission: Decimal; // Комиссия платежки

  @Prop(
    decimalType({
      default: '0',
      min: 0,
    }),
  )
  serviceCommission: Decimal; // Комиссия сервиса

  @Prop({
    type: String,
    enum: InvoiceStatus,
    default: InvoiceStatus.pending,
  })
  status: InvoiceStatus;

  @Prop({
    type: String,
    default: '',
  })
  paymentLink: string; // Ссылка для оплаты

  @Prop({
    type: String,
    default: '',
  })
  account: string; // Steam аккаунт для пополнения

  @Prop({
    type: String,
    default: '',
  })
  code: string; // ID транзакции в B2B

  @Prop({
    type: mongoose.Schema.Types.Mixed,
    default: {},
    _id: false,
  })
  metadata: {
    ip?: string;
    userAgent?: string;
    [key: string]: unknown;
  };
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
