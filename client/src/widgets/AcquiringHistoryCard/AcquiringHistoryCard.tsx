import React from "react";
import { cn } from "@/shared/lib/utils";
import { Typography } from "@/shared/ui/Typography";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { IAcquiring } from "@/entities/acquiring/model/types";

interface AcquiringHistoryCardProps {
  acquiring: IAcquiring;
  className?: string;
}

export const AcquiringHistoryCard: React.FC<AcquiringHistoryCardProps> = ({
  acquiring,
  className,
}) => {
  
  const formatAmount = (
    amount: number,
    currency: string,
    isPositive: boolean
  ) => {
    const sign = isPositive ? "+" : "-";
    return `${sign}${amount} ${currency}`;
  };

  return (
    <div
      className={cn(
        "w-full max-w-max card rounded-full p-1 pr-5 flex items-center gap-4",
        className
      )}
    >
      <Avatar
        src={""}
        alt={acquiring.email}
        size="lg"
        className="rounded-full"
        fallback={acquiring.account.charAt(0).toUpperCase()}
      />

      <div className="flex-1 flex flex-col gap-1">
        <Typography color="accent" variant="body" className="font-medium">
          {acquiring.account.length > 4
            ? acquiring.account.slice(0, -4) + '***' 
            : acquiring.account}
        </Typography>
        {/* <Typography className="text-foreground" variant="caption">
          {acquiring.timestamp}
        </Typography> */}
      </div>

      <Typography color="green" variant="body" className="font-medium">
        {formatAmount(+acquiring.paidAmount, acquiring.currency, true)}
      </Typography>
    </div>
  );
};
