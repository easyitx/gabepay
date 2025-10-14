"use client";

import { Typography } from "@/shared/ui/Typography";
import { useRatedSteamCurrencies } from "@/features/getRatedSteamCurrencies";
import { AcquiringMethod } from "@/entities/acquiringMethod";
import { useIsMobile } from "@/shared/hooks/useMobile";
import { usePromoCode } from "@/shared/hooks/usePromoCode";

interface PaymentInfoProps {
  amountToPay: number;
  amountToReceive: number;
  commission: number;
  originalCommission?: number;
  acquiringMethod?: AcquiringMethod;
  className?: string;
}

export const PaymentInfo: React.FC<PaymentInfoProps> = ({
  amountToPay,
  amountToReceive,
  commission,
  originalCommission,
  className,
}) => {
  const { currencies, loading } = useRatedSteamCurrencies();
  const { hasActivePromoCode, promoDiscount, activePromoCode } = usePromoCode();

  const getCurrencySymbol = (currency: string) => {
    switch (currency.toUpperCase()) {
      case 'USD':
        return '$';
      case 'KZT':
        return '₸';
      case 'RUB':
        return '₽';
      default:
        return currency;
    }
  };

  const formatCurrencyList = (amount: number) => {
    if (loading || currencies.length === 0) {
      return `${amount.toFixed(2)} ₽`;
    }

    return currencies
      .map((currency) => {
        const convertedAmount = amount * currency.rate;
        const symbol = getCurrencySymbol(currency.currency);
        return `${convertedAmount.toFixed(2)} ${symbol}`;
      })
      .join(" • ");
  };

  const savedAmount = hasActivePromoCode && originalCommission 
    ? originalCommission - commission
    : 0;

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
          Получите на Steam:
        </Typography>
        <div className="flex-1 mx-4 border-b border-dashed border-foreground-secondary"></div>
        <Typography color="foreground" variant="body">
          {formatCurrencyList(amountToReceive)}
        </Typography>
      </div>

      <div className="flex items-center justify-between">
        <Typography color="foreground" variant="body">
          Комиссия gabepay:
        </Typography>
        <div className="flex-1 mx-4 border-b border-dashed border-foreground-secondary"></div>
        <div className="flex flex-col items-end">
          {hasActivePromoCode && originalCommission ? (
            <>
              <Typography color="foreground" variant="body" className="line-through text-gray-500">
                {originalCommission.toFixed(2)} ₽
              </Typography>
              <Typography color="foreground" variant="body">
                {commission.toFixed(2)} ₽
              </Typography>
            </>
          ) : (
            <Typography color="foreground" variant="body">
              {commission.toFixed(2)} ₽
            </Typography>
          )}
        </div>
      </div>

      {hasActivePromoCode && savedAmount > 0 && (
        <div className="flex items-center justify-between border-t border-dashed border-green-300 pt-4">
          <Typography color="foreground" variant="body" className="text-green-600">
            Экономия по промокоду:
          </Typography>
          <div className="flex-1 mx-4 border-b border-dashed border-green-300"></div>
          <Typography color="foreground" variant="body" className="text-green-600 font-medium">
            -{savedAmount.toFixed(2)} ₽
          </Typography>
        </div>
      )}
    </div>
  );
};
