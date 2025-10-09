import { useState, useCallback } from "react";
import { CreateInvoiceApi } from "../api";
import {
  AcquiringCreatePayReq,
  AcquiringCreatePayRes,
} from "@/entities/acquiringMethod";

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
        const createInvoiceApi = new CreateInvoiceApi();
        const response = await createInvoiceApi.createInvoice(data);
        setResult(response);
        return response;
      } catch (err) {
        console.error(err);
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
