"use client";

import { Typography } from "@/shared/ui/Typography";
import SteamLogin from "../SteamLogin/SteamLogin";

import PromoCodeInput from "../PromoCodeInput/PromoCodeInput";
import PromoCode from "../PromoCode/PromoCode";
import { Input } from "@/shared/ui/Input";
import { useState } from "react";
import { Currency, CurrencyCard } from "@/entities/currency";
import { Icon } from "@/shared/ui/Icon/Icon";
import Button from "@/shared/ui/Button/Button";
import Payment from "../Payment/Payment";
import { PaymentInfo } from "../PaymentInfo/PaymentInfo";
import { CurrencyList } from "../CurrencyList/CurrencyList";
import { cn } from "@/shared/lib/utils";

const Replenishment = ({ className }: { className?: string }) => {
  const [selectedCurrencyId, setSelectedCurrencyId] = useState<string | null>(
    "1"
  );

  const mockCurrencies: Currency[] = [
    { id: "1", name: "CASHINOUT", symbol: "СБП", icon: "/methods/cashinout.svg", percentage: 0 },
  ];

  const handleSelectCurrency = (currency: Currency) => {
    setSelectedCurrencyId(currency.id);
  };

  return (
    <div className={cn("flex gap-3 not-md:flex-wrap", className)}>
      <div className="w-1/2 not-md:w-full gap-6 flex flex-col">
        <SteamLogin />
        <PromoCode />
        <Payment />
      </div>

      <div className="w-1/2 not-md:w-full flex flex-col gap-4">
        <PaymentInfo
          amountToPay={0}
          amountToReceive={0}
          commission={0}
          currency="₽"
        />
        <CurrencyList
          currencies={mockCurrencies}
          onSelectCurrency={handleSelectCurrency}
          selectedCurrencyId={selectedCurrencyId}
        />
      </div>
    </div>
  );
};

export default Replenishment;
