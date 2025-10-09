import Decimal from 'decimal.js';
import { InvoiceStatus } from '../invoice.schema';

/**
 * Интерфейс для результата обработки вебхука
 */
export interface WebhookProcessingResult {
  success: boolean;
  invoiceId: string;
  message?: string;
  error?: string;
}

/**
 * Интерфейс для валидации вебхука
 */
export interface WebhookValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Интерфейс для обработки инвойса
 */
export interface InvoiceProcessingData {
  amount: Decimal;
  currency: string;
  invoiceId: string;
  status: InvoiceStatus;
}
