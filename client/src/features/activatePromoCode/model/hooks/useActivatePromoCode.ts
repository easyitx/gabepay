"use client";

import { useState, useCallback } from "react";
import { ActivatePromoCodeApi } from "../api";
import { PromoCodeActivateRes } from "@/entities/promoCode";
import { toast } from "sonner";
import { ApiError } from "@/shared/api";

interface UseActivatePromoCodeReturn {
  activatePromoCode: (code: string) => Promise<PromoCodeActivateRes | null>;
  isActivating: boolean;
  result: PromoCodeActivateRes | null;
  error: string | null;
  reset: () => void;
}

export const useActivatePromoCode = (): UseActivatePromoCodeReturn => {
  const [isActivating, setIsActivating] = useState(false);
  const [result, setResult] = useState<PromoCodeActivateRes | null>(null);
  const [error, setError] = useState<string | null>(null);

  const activatePromoCode = useCallback(async (code: string): Promise<PromoCodeActivateRes | null> => {
    if (!code.trim()) {
      toast.error("Введите промокод");
      return null;
    }

    setIsActivating(true);
    setError(null);

    try {
      const api = new ActivatePromoCodeApi();
      const response = await api.activatePromoCode(code);
      setResult(response);

      if (response.success) {
        toast.success(response.message || `Промокод активирован! Скидка ${response.discount}%`);
      } else {
        toast.error(response.message || "Не удалось активировать промокод");
      }

      return response;
    } catch (err) {
      if (err instanceof ApiError) {
        const errorMessage = err.errorData || err.message || "Ошибка при активации промокода";
        setError(errorMessage);
        toast.error(errorMessage);
      } else {
        const errorMessage = "Неизвестная ошибка";
        setError(errorMessage);
        toast.error(errorMessage);
      }
      return null;
    } finally {
      setIsActivating(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setIsActivating(false);
  }, []);

  return {
    activatePromoCode,
    isActivating,
    result,
    error,
    reset,
  };
};