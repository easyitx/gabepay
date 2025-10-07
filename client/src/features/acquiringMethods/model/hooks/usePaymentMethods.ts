import { useState, useEffect, useCallback } from "react";
import { ApiService } from "@/shared/api/api.service";
import { AcquiringMethod } from "@/shared/api/acquiring.interface";
import { ApiError } from "@/shared/api/error";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";

interface UsePaymentMethodsOptions {
  autoLoad?: boolean;
  onError?: (error: ApiError) => void;
  onSuccess?: (methods: AcquiringMethod[]) => void;
  autoRetry?: boolean;
  maxRetries?: number;
}

interface UsePaymentMethodsReturn {
  methods: AcquiringMethod[];
  loading: boolean;
  error: ApiError | null;
  errorMessage: string | null;
  errorTitle: string | null;
  loadMethods: () => Promise<AcquiringMethod[]>;
  refetch: () => Promise<void>;
  clearError: () => void;
  retryCount: number;
  isRetrying: boolean;
}

export const usePaymentMethods = (
  options: UsePaymentMethodsOptions = {}
): UsePaymentMethodsReturn => {
  const {
    autoLoad = true,
    onError,
    onSuccess,
    autoRetry = false,
    maxRetries = 3,
  } = options;

  const [methods, setMethods] = useState<AcquiringMethod[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);

  const { handleError, getErrorMessage, getErrorTitle } = useErrorHandler({
    onError,
    onNetworkError: () => {
      console.log("Network error detected");
      if (autoRetry && retryCount < maxRetries) {
        setTimeout(() => {
          setIsRetrying(true);
          setRetryCount((prev) => prev + 1);
          loadMethods();
        }, 1000 * retryCount);
      }
    },
    onAuthError: () => {
      console.log("Auth error detected");
    },
    onRateLimit: () => {
      console.log("Rate limit detected");
    },
    onServerError: () => {
      console.log("Server error detected");
      if (autoRetry && retryCount < maxRetries) {
        setTimeout(() => {
          setIsRetrying(true);
          setRetryCount((prev) => prev + 1);
          loadMethods();
        }, 2000);
      }
    },
  });

  const loadMethods = useCallback(async (): Promise<AcquiringMethod[]> => {
    setLoading(true);
    setError(null);

    try {
      const response = await ApiService.acquiringMethods.getMethods();
      setMethods(response);
      setRetryCount(0);
      setIsRetrying(false);
      onSuccess?.(response);
      return response;
    } catch (err) {
      const apiError = handleError(err);
      setError(apiError);
      throw apiError;
    } finally {
      setLoading(false);
    }
  }, [handleError, onSuccess]);

  const refetch = useCallback(async (): Promise<void> => {
    try {
      await loadMethods();
    } catch (err) {}
  }, [loadMethods]);

  const clearError = useCallback(() => {
    setError(null);
    setRetryCount(0);
    setIsRetrying(false);
  }, []);

  useEffect(() => {
    if (autoLoad) {
      loadMethods();
    }
  }, [autoLoad, loadMethods]);

  useEffect(() => {
    if (error && !isRetrying) {
      setRetryCount(0);
    }
  }, [error, isRetrying]);

  return {
    methods,
    loading,
    error,
    errorMessage: error ? getErrorMessage(error) : null,
    errorTitle: error ? getErrorTitle(error) : null,
    loadMethods,
    refetch,
    clearError,
    retryCount,
    isRetrying,
  };
};
