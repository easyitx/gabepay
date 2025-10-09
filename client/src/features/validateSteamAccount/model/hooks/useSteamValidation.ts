"use client";
import { useCallback, useState } from "react";
import { SteamValidateAccountRes } from "../types";
import { ApiError } from "@/shared/api";
import { ValidateSteamAccountApi } from "../api";

export const useSteamValidation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [data, setData] = useState<SteamValidateAccountRes | null>(null);

  const validateSteamAccount = useCallback(
    async (account: string) => {
      if (account.trim() === "") return;
      setIsLoading(true);
      setError(null);

      try {
        const api = new ValidateSteamAccountApi();
        const result = await api.validateAccount(account);

        setData(result);
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err);
        }
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [data, error]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return {
    validateSteamAccount,
    isLoading,
    error,
    data,
    reset,
  };
};
