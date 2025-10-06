import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode, ERROR_MESSAGES } from './errorCodes';

export interface CustomExceptionOptions {
  code: ErrorCode;
  statusCode?: HttpStatus;
  details?: Record<string, any>;
  language?: 'en' | 'ru';
}

export class AppException extends HttpException {
  public readonly code: ErrorCode;
  public readonly details?: Record<string, any>;
  public readonly language: 'en' | 'ru';

  constructor(options: CustomExceptionOptions) {
    const {
      code,
      statusCode = HttpStatus.BAD_REQUEST,
      details,
      language = 'ru',
    } = options;

    const errorMessages = ERROR_MESSAGES[code];
    const errorMessage = errorMessages[language];

    super(
      {
        code,
        message: errorMessage,
        details,
        timestamp: new Date().toISOString(),
      },
      statusCode,
    );

    this.code = code;
    this.details = details;
    this.language = language;
  }

  // Статические методы для удобного создания исключений
  static validationError(
    details?: Record<string, any>,
    language: 'en' | 'ru' = 'en',
  ) {
    return new AppException({
      code: ErrorCode.VALIDATION_ERROR,
      statusCode: HttpStatus.BAD_REQUEST,
      details,
      language,
    });
  }

  static notFound(resource: string, language: 'en' | 'ru' = 'en') {
    return new AppException({
      code: ErrorCode.NOT_FOUND,
      statusCode: HttpStatus.NOT_FOUND,
      details: { resource },
      language,
    });
  }

  static unauthorized(language: 'en' | 'ru' = 'en') {
    return new AppException({
      code: ErrorCode.UNAUTHORIZED,
      statusCode: HttpStatus.UNAUTHORIZED,
      language,
    });
  }

  // Метод для получения сообщения на определенном языке
  getMessage(language: 'en' | 'ru'): string {
    return ERROR_MESSAGES[this.code][language];
  }

  // Метод для получения полного ответа на определенном языке
  getResponse(language: 'en' | 'ru' = 'en') {
    return {
      code: this.code,
      message: this.getMessage(language),
      details: this.details,
      timestamp: new Date().toISOString(),
    };
  }
}
