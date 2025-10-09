import { useState, useCallback } from "react";
import { ApiService } from "@/shared/api/api.service";
import {
  AcquiringCreatePayReq,
  AcquiringCreatePayRes,
} from "@/shared/api/acquiring.interface";

interface UseCreateInvoiceReturn {
  createInvoice: (
    data: AcquiringCreatePayReq
  ) => Promise<AcquiringCreatePayRes>;
  isCreating: boolean;
  result: AcquiringCreatePayRes | null;
  error: string | null;
  reset: () => void;
}

export const useCreateInvoice = (): UseCreateInvoiceReturn => {
  const [isCreating, setIsCreating] = useState(false);
  const [result, setResult] = useState<AcquiringCreatePayRes | null>(null);
  const [error, setError] = useState<string | null>(null);

  const createInvoice = useCallback(
    async (data: AcquiringCreatePayReq): Promise<AcquiringCreatePayRes> => {
      setIsCreating(true);
      setError(null);

      try {
        const response = await ApiService.createInvoice.createInvoice(data);
        setResult(response);
        return response;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Ошибка создания инвойса";
        setError(errorMessage);
        throw err;
      } finally {
        setIsCreating(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setIsCreating(false);
  }, []);

  return {
    createInvoice,
    isCreating,
    result,
    error,
    reset,
  };
};
