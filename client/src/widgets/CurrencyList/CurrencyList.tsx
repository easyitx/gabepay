import React from "react";
import { cn } from "@/shared/lib/utils";

import Button from "@/shared/ui/Button/Button";
import { Currency, CurrencyCard } from "@/entities/currency";

interface CurrencyListProps {
  currencies: Currency[];
  onSelectCurrency: (currency: Currency) => void;
  selectedCurrencyId: string | null;
  className?: string;
}

export const CurrencyList: React.FC<CurrencyListProps> = ({
  currencies,
  onSelectCurrency,
  selectedCurrencyId,
  className,
}) => {
  return (
    <div className={cn("w-full   rounded-2xl  flex flex-col gap-6", className)}>
      <div className="grid max-h-133 overflow-x-hidden  overflow-auto  grid-cols-4 gap-4">
        {currencies.map((currency) => (
          <CurrencyCard
            key={currency.id}
            currency={{
              ...currency,
              isSelected: currency.id === selectedCurrencyId,
            }}
            onClick={onSelectCurrency}
          />
        ))}
      </div>
      <Button variant="primary" size="lg" className="w-full">
        Пополнить баланс
      </Button>
    </div>
  );
};
