"use client";
import React from "react";

import { Typography } from "@/shared/ui/Typography";

import { IAcquiring } from "@/entities/acquiring/model/types";
import { AcquiringHistoryCard } from "../AcquiringHistoryCard/AcquiringHistoryCard";

const AcquiringHistoryList = ({
  acquiringHistory,
}: {
  acquiringHistory: IAcquiring[];
}) => {
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="app-container  w-full">
        <Typography color="accent" variant="h2">
          Недавние пополнения
        </Typography>
      </div>

      <div className="w-full overflow-hidden flex  gap-3">
        {acquiringHistory.map((acquiring) => (
          <AcquiringHistoryCard key={acquiring._id} acquiring={acquiring} />
        ))}
      </div>
    </div>
  );
};

export default AcquiringHistoryList;
