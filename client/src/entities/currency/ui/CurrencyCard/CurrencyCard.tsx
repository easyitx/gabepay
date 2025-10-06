import React from "react";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import { Typography } from "@/shared/ui/Typography";
import { Currency } from "../../model/types/Currency";

interface CurrencyCardProps {
  currency: Currency;
  onClick?: (currency: Currency) => void;
  className?: string;
}

export const CurrencyCard: React.FC<CurrencyCardProps> = ({
  currency,
  onClick,
  className,
}) => {
  const handleClick = () => {
    onClick?.(currency);
  };

  return (
    <div className={cn("relative w-full", className)} onClick={handleClick}>
      <div className="pb-[100%]" />
      <div
        className={cn(
          "absolute inset-0 bg-secondary rounded-3xl p-4 cursor-pointer transition-all duration-200",
          "hover:border-primary hover:bg-foreground",
          "border border-secondary",
          "flex flex-col justify-center items-center",
          currency.isSelected && "border-primary ring-2 ring-primary/20"
        )}
      >
        <div className="absolute top-1 right-1 bg-purple rounded-full px-3 py-1 flex items-center justify-center">
          <Typography
            color="accent"
            variant="caption"
            className="text-xs font-medium"
          >
            {currency.percentage}%
          </Typography>
        </div>

        <div className="flex justify-center mb-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
            {currency.icon ? (
              <Image
                src={
                  currency.icon.startsWith("/")
                    ? currency.icon
                    : `/${currency.icon}`
                }
                alt={currency.name}
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            ) : (
              <Typography
                color="black"
                variant="body"
                className="font-bold text-sm"
              >
                {currency.symbol}
              </Typography>
            )}
          </div>
        </div>

        <div className="text-center">
          <Typography
            color="accent"
            variant="body"
            className="font-medium text-sm"
          >
            {currency.name}
          </Typography>
        </div>
      </div>
    </div>
  );
};
