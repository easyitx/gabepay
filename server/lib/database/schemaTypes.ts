import mongoose from 'mongoose';
import Decimal from 'decimal.js';

export const alphabet =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const shortIdLength = 8; // for games, categories (any short data)
const idLength = 16; // for users
const longIdLength = 24; // for
const bigIdLength = 32; // for seeds, transactions, rounds, bets, wins (any huge data)

// Use dynamic import for nanoid to handle ESM compatibility
let customAlphabet: any;
const initNanoid = async () => {
  if (!customAlphabet) {
    const { customAlphabet: ca } = await import('nanoid');
    customAlphabet = ca;
  }
  return customAlphabet;
};

export const generateShortId = async () => {
  const ca = await initNanoid();
  return ca(alphabet, shortIdLength)();
};

export const generateId = async () => {
  const ca = await initNanoid();
  return ca(alphabet, idLength)();
};

export const generateLongId = async () => {
  const ca = await initNanoid();
  return ca(alphabet, longIdLength)();
};

export const generateBigId = async () => {
  const ca = await initNanoid();
  return ca(alphabet, bigIdLength)();
};

export const shortId = {
  type: String,
  unique: true,
  maxlength: shortIdLength,
  default: async () => await generateShortId(),
};

export const id = {
  type: String,
  unique: true,
  maxlength: idLength,
  default: async () => await generateId(),
};

export const longId = {
  type: String,
  unique: true,
  maxlength: longIdLength,
  default: async () => await generateLongId(),
};

export const bigId = {
  type: String,
  unique: true,
  maxlength: bigIdLength,
  default: async () => await generateBigId(),
};

export const stringType = function (options?) {
  return { type: String, maxLength: 256, trim: true, ...options };
};

export const decimalType = function (options?) {
  return {
    type: mongoose.Schema.Types.Decimal128,
    get: (value: mongoose.Schema.Types.Decimal128) =>
      value ? new Decimal(value.toString()) : value,
    transform: (value: mongoose.Schema.Types.Decimal128) =>
      value ? new Decimal(value.toString()) : value,
    ...options,
  };
};
