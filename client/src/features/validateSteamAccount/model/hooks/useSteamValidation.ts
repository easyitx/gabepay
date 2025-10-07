import { useState, useCallback } from 'react';
import { ApiService } from '@/shared/api/api.service';
import { SteamValidateAccountRes } from '@/shared/api/steam-validate.interface';

interface UseSteamValidationReturn {
  validateAccount: (account: string) => Promise<SteamValidateAccountRes>;
  isValidating: boolean;
  result: SteamValidateAccountRes | null;
  error: string | null;
  reset: () => void;
}

export const useSteamValidation = (): UseSteamValidationReturn => {
  const [isValidating, setIsValidating] = useState(false);
  const [result, setResult] = useState<SteamValidateAccountRes | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateAccount = useCallback(async (account: string): Promise<SteamValidateAccountRes> => {
    setIsValidating(true);
    setError(null);
    
    try {
      const response = await ApiService.steamValidate.validateAccount(account);
      setResult(response);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка валидации аккаунта';
      setError(errorMessage);
      throw err;
    } finally {
      setIsValidating(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setIsValidating(false);
  }, []);

  return {
    validateAccount,
    isValidating,
    result,
    error,
    reset,
  };
};
