"use client";

import { useEffect, useState } from "react";
import AcquiringHistoryList from "./AcquiringHistoryList";
import type { IAcquiring } from "@/entities/acquiring/model/types";
import { AcquiringHistoryApi } from "@/features/getAcquiringHistory/model/api";
import { ApiError } from "@/shared/api";

type Props = {
  initial: IAcquiring[];
  intervalMs?: number;
};

export default function AcquiringHistoryLive({
  initial,
  intervalMs = 10000,
}: Props) {
  const [history, setHistory] = useState<IAcquiring[]>(initial);

  useEffect(() => {
    let active = true;
    const api = new AcquiringHistoryApi();

    const load = async () => {
      try {
        const data = await api.getAcquiringHistory();
        if (active) setHistory(data);
      } catch (err) {
        if (err instanceof ApiError) {
        }
      }
    };

    const id = setInterval(load, intervalMs);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, [intervalMs]);

  return <AcquiringHistoryList acquiringHistory={history} />;
}
