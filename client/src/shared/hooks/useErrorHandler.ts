import { useCallback } from "react";
import { ApiError } from "@/shared/api/error";

interface UseErrorHandlerOptions {
  onError?: (error: ApiError) => void;
  onNetworkError?: () => void;
  onAuthError?: () => void;
  onRateLimit?: () => void;
  onServerError?: () => void;
  autoRetry?: boolean;
  retryDelay?: number;
  maxRetries?: number;
}

interface UseErrorHandlerReturn {
  handleError: (error: unknown) => ApiError;
  isApiError: (error: unknown) => error is ApiError;
  getErrorMessage: (error: ApiError) => string;
  getErrorTitle: (error: ApiError) => string;
}

export const useErrorHandler = (
  options: UseErrorHandlerOptions = {}
): UseErrorHandlerReturn => {
  const {
    onError,
    onNetworkError,
    onAuthError,
    onRateLimit,
    onServerError,
    autoRetry = false,
    retryDelay = 1000,
    maxRetries = 3,
  } = options;

  const isApiError = useCallback((error: unknown): error is ApiError => {
    return error instanceof ApiError;
  }, []);

  const getErrorMessage = useCallback((error: ApiError): string => {
    switch (error.code) {
      case "NETWORK_ERROR":
        return "Проблема с подключением к интернету. Проверьте соединение.";
      case "AUTH_ERROR":
        return "Ошибка авторизации. Необходимо войти в систему.";
      case "RATE_LIMIT":
        return "Превышен лимит запросов. Попробуйте позже.";
      case "SERVER_ERROR":
        return "Ошибка сервера. Сервис временно недоступен.";
      case "VALIDATION_ERROR":
        return "Ошибка валидации данных. Проверьте введенную информацию.";
      case "NOT_FOUND":
        return "Запрашиваемый ресурс не найден.";
      case "FORBIDDEN":
        return "Доступ запрещен. Недостаточно прав.";
      default:
        return error.message || "Произошла неизвестная ошибка.";
    }
  }, []);

  const getErrorTitle = useCallback((error: ApiError): string => {
    switch (error.code) {
      case "NETWORK_ERROR":
        return "🌐 Проблема с сетью";
      case "AUTH_ERROR":
        return "🔐 Ошибка авторизации";
      case "RATE_LIMIT":
        return "⏱️ Превышен лимит";
      case "SERVER_ERROR":
        return "🔥 Ошибка сервера";
      case "VALIDATION_ERROR":
        return "❌ Ошибка валидации";
      case "NOT_FOUND":
        return "🔍 Не найдено";
      case "FORBIDDEN":
        return "🚫 Доступ запрещен";
      default:
        return "❌ Ошибка";
    }
  }, []);

  const handleError = useCallback(
    (error: unknown): ApiError => {
      let apiError: ApiError;

      if (isApiError(error)) {
        apiError = error;
      } else {
        // Создаем ApiError для неизвестных ошибок
        apiError = new ApiError({
          message:
            error instanceof Error ? error.message : "Неизвестная ошибка",
          statusCode: 500,
          code: "UNKNOWN_ERROR",
        });
      }

      // Логирование ошибки
      console.error("API Error:", {
        code: apiError.code,
        message: apiError.message,
        statusCode: apiError.statusCode,
        timestamp: new Date().toISOString(),
      });

      // Вызов колбэков в зависимости от типа ошибки
      onError?.(apiError);

      switch (apiError.code) {
        case "NETWORK_ERROR":
          onNetworkError?.();
          break;
        case "AUTH_ERROR":
          onAuthError?.();
          break;
        case "RATE_LIMIT":
          onRateLimit?.();
          break;
        case "SERVER_ERROR":
          onServerError?.();
          break;
      }

      if (
        autoRetry &&
        apiError.code &&
        ["NETWORK_ERROR", "SERVER_ERROR"].includes(apiError.code)
      ) {
        setTimeout(() => {
          console.log("Auto retry triggered for:", apiError.code);
        }, retryDelay);
      }

      return apiError;
    },
    [
      isApiError,
      onError,
      onNetworkError,
      onAuthError,
      onRateLimit,
      onServerError,
      autoRetry,
      retryDelay,
    ]
  );

  return {
    handleError,
    isApiError,
    getErrorMessage,
    getErrorTitle,
  };
};
