"use client";

import { useState, useCallback, useEffect } from "react";
import { PromoCodeActivateRes } from "@/entities/promoCode";

interface UsePromoCodeReturn {
  activePromoCode: PromoCodeActivateRes | null;
  setActivePromoCode: (promoCode: PromoCodeActivateRes | null) => void;
  clearPromoCode: () => void;
  hasActivePromoCode: boolean;
  promoDiscount: number;
}

const PROMO_CODE_STORAGE_KEY = "gabepay_active_promo_code";

export const usePromoCode = (): UsePromoCodeReturn => {
  const [activePromoCode, setActivePromoCodeState] = useState<PromoCodeActivateRes | null>(null);

  // Загружаем промокод из localStorage при инициализации
  useEffect(() => {
    try {
      const stored = localStorage.getItem(PROMO_CODE_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setActivePromoCodeState(parsed);
      }
    } catch (error) {
      console.error("Ошибка при загрузке промокода из localStorage:", error);
      localStorage.removeItem(PROMO_CODE_STORAGE_KEY);
    }
  }, []);

  const setActivePromoCode = useCallback((promoCode: PromoCodeActivateRes | null) => {
    setActivePromoCodeState(promoCode);
    
    if (promoCode) {
      try {
        localStorage.setItem(PROMO_CODE_STORAGE_KEY, JSON.stringify(promoCode));
      } catch (error) {
        console.error("Ошибка при сохранении промокода в localStorage:", error);
      }
    } else {
      localStorage.removeItem(PROMO_CODE_STORAGE_KEY);
    }
  }, []);

  const clearPromoCode = useCallback(() => {
    setActivePromoCode(null);
  }, [setActivePromoCode]);

  const hasActivePromoCode = Boolean(activePromoCode?.success);
  const promoDiscount = activePromoCode?.success ? activePromoCode.discount : 0;

  return {
    activePromoCode,
    setActivePromoCode,
    clearPromoCode,
    hasActivePromoCode,
    promoDiscount,
  };
};