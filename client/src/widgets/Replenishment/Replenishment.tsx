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
    { id: "1", name: "сбп", symbol: "СБП", icon: "", percentage: 0 },
    { id: "2", name: "МИР VISA", symbol: "VISA", icon: "", percentage: 2 },
    { id: "3", name: "USDT", symbol: "USDT", icon: "", percentage: 2 },
    { id: "4", name: "TON", symbol: "TON", icon: "", percentage: 2 },
    { id: "5", name: "BTC", symbol: "BTC", icon: "", percentage: 2 },
    { id: "6", name: "LTC", symbol: "LTC", icon: "", percentage: 2 },
    { id: "7", name: "ETH", symbol: "ETH", icon: "", percentage: 2 },
    { id: "8", name: "SOL", symbol: "SOL", icon: "", percentage: 2 },
    { id: "9", name: "BNB", symbol: "BNB", icon: "", percentage: 2 },
    { id: "10", name: "TRX", symbol: "TRX", icon: "", percentage: 2 },
    { id: "11", name: "TRX", symbol: "TRX", icon: "", percentage: 2 },
    { id: "12", name: "TRX", symbol: "TRX", icon: "", percentage: 2 },
    { id: "13", name: "TRX", symbol: "TRX", icon: "", percentage: 2 },
    { id: "14", name: "TRX", symbol: "TRX", icon: "", percentage: 2 },
    { id: "15", name: "TRX", symbol: "TRX", icon: "", percentage: 2 },
    { id: "16", name: "TRX", symbol: "TRX", icon: "", percentage: 2 },
    { id: "17", name: "TRX", symbol: "TRX", icon: "", percentage: 2 },
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
