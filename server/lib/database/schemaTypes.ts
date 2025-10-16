import mongoose from 'mongoose';
import Decimal from 'decimal.js';
import { customAlphabet } from 'nanoid';

export const alphabet =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const shortIdLength = 8; // for games, categories (any short data)
const idLength = 16; // for users
const longIdLength = 24; // for
const bigIdLength = 32; // for seeds, transactions, rounds, bets, wins (any huge data)

export const generateShortId = customAlphabet(alphabet, shortIdLength);
export const generateId = customAlphabet(alphabet, idLength);
export const generateLongId = customAlphabet(alphabet, longIdLength);
export const generateBigId = customAlphabet(alphabet, bigIdLength);

export const shortId = {
  type: String,
  unique: true,
  maxlength: shortIdLength,
  default: () => generateShortId(),
};

export const id = {
  type: String,
  unique: true,
  maxlength: idLength,
  default: () => generateId(),
};

export const longId = {
  type: String,
  unique: true,
  maxlength: longIdLength,
  default: () => generateLongId(),
};

export const bigId = {
  type: String,
  unique: true,
  maxlength: bigIdLength,
  default: () => generateBigId(),
};

// Определим тип для options
interface SchemaTypeOptions {
  type: any;
  maxLength?: number;
  trim?: boolean;
  get?: (value: mongoose.Types.Decimal128) => typeof Decimal | null;
  transform?: (value: mongoose.Types.Decimal128) => typeof Decimal | null;
  [key: string]: any; // Для других возможных свойств
}

export const stringType = function (options?: Partial<SchemaTypeOptions>) {
  const defaultOptions = { type: String, maxLength: 256, trim: true };
  return { ...defaultOptions, ...options } as SchemaTypeOptions;
};

export const decimalType = function (options?: Partial<SchemaTypeOptions>) {
  const defaultOptions = {
    type: mongoose.Schema.Types.Decimal128,
    get: (value: mongoose.Schema.Types.Decimal128) =>
      value ? new Decimal(value.toString()) : value,
    transform: (value: mongoose.Schema.Types.Decimal128) =>
      value ? value.toString() : value,
  };
  return { ...defaultOptions, ...options } as SchemaTypeOptions;
};
