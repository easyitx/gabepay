import React from "react";
import { Typography } from "@/shared/ui/Typography";

interface PaymentInfoProps {
  amountToPay: number;
  amountToReceive: number;
  commission: number;
  currency?: string;
  className?: string;
}

export const PaymentInfo: React.FC<PaymentInfoProps> = ({
  amountToPay,
  amountToReceive,
  commission,
  currency = "₽",
  className,
}) => {
  const formatAmount = (amount: number) => {
    return `${amount.toFixed(2)}${currency}`;
  };

  return (
    <div
      className={`w-full card rounded-2xl p-6 flex flex-col gap-4 ${className}`}
    >
      <div className="flex items-center justify-between">
        <Typography color="foreground" variant="body">
          Заплатите:
        </Typography>
        <div className="flex-1 mx-4 border-b border-dashed border-foreground-secondary"></div>
        <Typography color="foreground" variant="body">
          {formatAmount(amountToPay)}
        </Typography>
      </div>

      <div className="flex items-center justify-between">
        <Typography color="foreground" variant="body">
          Получите на кошелек Steam:
        </Typography>
        <div className="flex-1 mx-4 border-b border-dashed border-foreground-secondary"></div>
        <Typography color="foreground" variant="body">
          {formatAmount(amountToReceive)}
        </Typography>
      </div>

      <div className="flex items-center justify-between">
        <Typography color="foreground" variant="body">
          Комиссия на конвертации:
        </Typography>
        <div className="flex-1 mx-4 border-b border-dashed border-foreground-secondary"></div>
        <Typography color="foreground" variant="body">
          {formatAmount(commission)}
        </Typography>
      </div>
    </div>
  );
};
