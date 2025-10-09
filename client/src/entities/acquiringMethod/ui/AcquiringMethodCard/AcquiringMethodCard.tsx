import React from "react";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import { Typography } from "@/shared/ui/Typography";
import { AcquiringMethod } from "../../model/types/AcquiringMethod";

interface AcquiringMethodCardProps {
  acquiringMethod: AcquiringMethod;
  onClick?: (currency: AcquiringMethod) => void;
  className?: string;
  isSelected?: boolean;
}

export const AcquiringMethodCard: React.FC<AcquiringMethodCardProps> = ({
  acquiringMethod,
  onClick,
  isSelected,
  className,
}) => {
  const handleClick = () => {
    onClick?.(acquiringMethod);
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
          isSelected && "border-primary ring-2 ring-primary/20"
        )}
      >
        <div className="absolute top-2 right-2 bg-purple rounded-full px-3 py-1 flex items-center justify-center">
          <Typography
            color="accent"
            variant="caption"
            className="text-xs font-medium"
          >
            {acquiringMethod.relativeProviderCommission}%
          </Typography>
        </div>

        <div className="flex justify-center mb-2">
          <div className="max-w-12 max-h-12 w-full h-full rounded-full flex items-center justify-center overflow-hidden">
            {acquiringMethod.icon ? (
              <Image
                src={
                  acquiringMethod.icon.startsWith("/")
                    ? acquiringMethod.icon
                    : `/${acquiringMethod.icon}`
                }
                alt={acquiringMethod.provider}
                width={42}
                height={42}
                className="w-full h-full object-contain"
              />
            ) : (
              <Typography
                color="black"
                variant="body"
                className="font-bold text-sm"
              >
                {acquiringMethod.provider}
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
            {acquiringMethod.provider}
          </Typography>
        </div>
      </div>
    </div>
  );
};
