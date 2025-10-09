"use client";

import { useState, useEffect, useCallback } from "react";
import { RatedSteamCurrency } from "@/entities/ratedSteamCurrency/model/type/ratedSteamCurrency";
import { AcquiringMethodsApi } from "../api";
import { ApiError } from "@/shared/api";

interface UseRatedSteamCurrenciesOptions {
  autoLoad?: boolean;
  onError?: (error: Error) => void;
  onSuccess?: (currencies: RatedSteamCurrency[]) => void;
}

interface UseRatedSteamCurrenciesReturn {
  currencies: RatedSteamCurrency[];
  loading: boolean;
  error: Error | null;
  loadCurrencies: () => void;
  refetch: () => Promise<void>;
  clearError: () => void;
}

export const useRatedSteamCurrencies = (
  options: UseRatedSteamCurrenciesOptions = {}
): UseRatedSteamCurrenciesReturn => {
  const { autoLoad = true, onError, onSuccess } = options;

  const [currencies, setCurrencies] = useState<RatedSteamCurrency[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

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
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [onSuccess]);

  const refetch = useCallback(async () => {
    try {
      await loadCurrencies();
    } catch (err) {}
  }, [loadCurrencies]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    if (autoLoad) {
      loadCurrencies();
    }
  }, [autoLoad]);

  return {
    currencies,
    loading,
    error,
    loadCurrencies,
    refetch,
    clearError,
  };
};
