"use client";

import SteamLogin from "../SteamLogin/SteamLogin";

import PromoCode from "../PromoCode/PromoCode";

import { useState } from "react";
import { type Currency } from "@/entities/currency";

import Payment from "../Payment/Payment";
import { PaymentInfo } from "../PaymentInfo/PaymentInfo";
import { CurrencyList } from "../CurrencyList/CurrencyList";
import { cn } from "@/shared/lib/utils";

const Replenishment = ({ className }: { className?: string }) => {
  const [selectedCurrencyId, setSelectedCurrencyId] = useState<string | null>(
    "1"
  );

  const mockCurrencies: Currency[] = [
    {
      id: "1",
      name: "CASHINOUT",
      symbol: "СБП",
      icon: "/methods/cashinout.svg",
      percentage: 0,
    },
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
