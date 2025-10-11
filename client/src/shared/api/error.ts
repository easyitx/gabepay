import type { AxiosError } from "axios";

export interface ErrorData {
  code: string;
  message: string;
  details: Record<string, unknown>;
}

export interface ApiErrorResponse {
  statusCode: string;
  timestamp: string;
  path: string;
  errorData: ErrorData;
}

export interface ErrorParams {
  error?: string;
  message: string;
  statusCode: number;
  code?: string; // Добавляем код ошибки
}

export class ApiError extends Error {
  statusCode: number;
  error?: string;
  code?: string; // Добавляем код ошибки в класс
  errorData?: string;
  constructor(params: ErrorParams) {
    super(params.message);

    this.error = params.error;
    this.message = params.message;
    this.statusCode = params.statusCode;
    this.code = params.code; // Сохраняем код ошибки
    this.name = "ApiError";
  }
}

export const errorHandler = function (
  error: AxiosError<ApiErrorResponse>
): ApiError {
  // Если есть response с кастомной ошибкой
  if (error.response?.data?.errorData) {
    const errorData = error.response.data.errorData;

    const params: ErrorParams = {
      message: errorData.message, // Используем сообщение из errorData
      statusCode: error.response.status || 500,
      code: errorData.code, // Сохраняем кастомный код ошибки
      error: errorData.code, // Можно использовать code как error тип
    };

    return new ApiError(params);
  }

  // Стандартная обработка для других ошибок
  const params: ErrorParams = {
    message: error.message || "Unknown error occurred",
    statusCode: error.response?.status || 500,
    code: "Unknown",
    error: error.code,
  };

  return new ApiError(params);
};
