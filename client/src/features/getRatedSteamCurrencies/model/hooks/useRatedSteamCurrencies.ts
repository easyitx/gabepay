"use client";

import { useState, useEffect, useCallback } from "react";
import { RatedSteamCurrency } from "@/entities/ratedSteamCurrency/model/type/ratedSteamCurrency";
import { AcquiringMethodsApi } from "../api";
import { ApiError } from "@/shared/api";
import { toast } from "sonner";

interface UseRatedSteamCurrenciesOptions {
  autoLoad?: boolean;
  onError?: (error: Error) => void;
  onSuccess?: (currencies: RatedSteamCurrency[]) => void;
}

interface UseRatedSteamCurrenciesReturn {
  currencies: RatedSteamCurrency[];
  loading: boolean;
  error: string | null;
  loadCurrencies: () => void;
  refetch: () => Promise<void>;
  clearError: () => void;
}

export const useRatedSteamCurrencies = (
  options: UseRatedSteamCurrenciesOptions = {}
): UseRatedSteamCurrenciesReturn => {
  const { autoLoad = true, onSuccess } = options;

  const [currencies, setCurrencies] = useState<RatedSteamCurrency[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCurrencies = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const api = new AcquiringMethodsApi();
      const data = await api.getRatedSteamCurrencies();
      setCurrencies(data);
      onSuccess?.(data);
      return data;
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
        toast.error("Ошибка при получении списка валют");
      } else {
        setError("Unknown error");
      }
    } finally {
      setLoading(false);
    }
  }, [onSuccess]);

  const refetch = useCallback(async () => {
    try {
      await loadCurrencies();
    } catch (err) {
      console.log(err);
    }
  }, [loadCurrencies]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    if (autoLoad) {
      loadCurrencies();
    }
  }, [autoLoad, loadCurrencies]);

  return {
    currencies,
    loading,
    error,
    loadCurrencies,
    refetch,
    clearError,
  };
};
