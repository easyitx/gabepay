export enum ErrorCode {
  // Общие ошибки
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
}

export interface ErrorMessage {
  en: string;
  ru: string;
}

export const ERROR_MESSAGES: Record<ErrorCode, ErrorMessage> = {
  // Общие ошибки
  [ErrorCode.VALIDATION_ERROR]: {
    en: 'Validation error occurred',
    ru: 'Произошла ошибка валидации',
  },
  [ErrorCode.INTERNAL_SERVER_ERROR]: {
    en: 'Internal server error',
    ru: 'Внутренняя ошибка сервера',
  },
  [ErrorCode.NOT_FOUND]: {
    en: 'Resource not found',
    ru: 'Ресурс не найден',
  },
  [ErrorCode.UNAUTHORIZED]: {
    en: 'Unauthorized access',
    ru: 'Неавторизованный доступ',
  },
};
