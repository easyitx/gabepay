import React from "react";
import { cn } from "@/shared/lib/utils";
import { Typography } from "@/shared/ui/Typography";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { UserReplenishment } from "@/entities/user";

interface UserReplenishmentCardProps {
  replenishment: UserReplenishment;
  className?: string;
}

export const UserReplenishmentCard: React.FC<UserReplenishmentCardProps> = ({
  replenishment,
  className,
}) => {
  const formatAmount = (
    amount: number,
    currency: string,
    isPositive: boolean
  ) => {
    const sign = isPositive ? "+" : "-";
    return `${sign}${amount}${currency}`;
  };

  return (
    <div
      className={cn(
        "w-full card rounded-full p-1 pr-5 flex items-center gap-4",
        className
      )}
    >
      <Avatar
        src={replenishment.avatar}
        alt={replenishment.username}
        size="lg"
        className="rounded-full"
        fallback={replenishment.username.charAt(0).toUpperCase()}
      />

      <div className="flex-1 flex flex-col gap-1">
        <Typography color="accent" variant="body" className="font-medium">
          {replenishment.username}
        </Typography>
        <Typography className="text-foreground" variant="caption">
          {replenishment.timestamp}
        </Typography>
      </div>

      <Typography
        color={replenishment.isPositive ? "green" : "red"}
        variant="body"
        className="font-medium"
      >
        {formatAmount(
          replenishment.amount,
          replenishment.currency,
          replenishment.isPositive
        )}
      </Typography>
    </div>
  );
};
