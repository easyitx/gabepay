import { IAcquiring } from "@/entities/acquiring/model/types";
import { unstable_cache } from "next/cache";
import { AcquiringHistoryApi } from "../api";

const REVALIDATE_SECONDS = 3;

export const getCachedAcquiringHistory = unstable_cache(
  async (): Promise<IAcquiring[]> => {
    const api = new AcquiringHistoryApi();
    return api.getAcquiringHistory();
  },
  ["acquiring-history"],
  { revalidate: REVALIDATE_SECONDS }
);
