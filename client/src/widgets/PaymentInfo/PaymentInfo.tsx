"use client";

import React from "react";
import { Typography } from "@/shared/ui/Typography";
import { AcquiringMethod } from "@/entities/acquiringMethod";
import { useRatedSteamCurrencies } from "@/features/getRatedSteamCurrencies";

interface PaymentInfoProps {
  amountToPay: number;
  amountToReceive: number;
  commission: number;
  acquiringMethod?: AcquiringMethod;
  className?: string;
}

export const PaymentInfo: React.FC<PaymentInfoProps> = ({
  amountToPay,
  amountToReceive,
  commission,
  className,
}) => {
  const { currencies, loading } = useRatedSteamCurrencies();

  const formatCurrencyList = (amount: number) => {
    if (loading || currencies.length === 0) {
      return `${amount.toFixed(2)} ₽`;
    }

    return currencies
      .map((currency) => {
        const convertedAmount = amount / currency.rate;
        return `${convertedAmount.toFixed(2)} ${currency.currency}`;
      })
      .join(" • ");
  };

  return (
    <div
      className={`w-full card rounded-2xl p-6 flex flex-col gap-4 ${className}`}
    >
      <div className="flex items-center justify-between">
        <Typography color="foreground" variant="body">
          Сумма к оплате:
        </Typography>
        <div className="flex-1 mx-4 border-b border-dashed border-foreground-secondary"></div>
        <Typography color="foreground" variant="body">
          {amountToPay.toFixed(2)} ₽
        </Typography>
      </div>

      <div className="flex items-center justify-between">
        <Typography color="foreground" variant="body">
          Получите на кошелек Steam:
        </Typography>
        <div className="flex-1 mx-4 border-b border-dashed border-foreground-secondary"></div>
        <Typography color="foreground" variant="body">
          {formatCurrencyList(amountToReceive)}
        </Typography>
      </div>

      <div className="flex items-center justify-between">
        <Typography color="foreground" variant="body">
          Комиссия:
        </Typography>
        <div className="flex-1 mx-4 border-b border-dashed border-foreground-secondary"></div>
        <Typography color="foreground" variant="body">
          {commission.toFixed(2)} ₽
        </Typography>
      </div>
    </div>
  );
};
