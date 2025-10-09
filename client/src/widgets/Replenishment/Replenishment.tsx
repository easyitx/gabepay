"use client";

import SteamLogin from "../SteamLogin/SteamLogin";

import PromoCode from "../PromoCode/PromoCode";

import { useState } from "react";
import {
  AcquiringProvider,
  type AcquiringMethod,
} from "@/entities/acquiringMethod";

import Payment from "../Payment/Payment";
import { PaymentInfo } from "../PaymentInfo/PaymentInfo";
import { AcquiringMethodList } from "../AcquiringMethodList/AcquiringMethodList";
import { cn } from "@/shared/lib/utils";

const Replenishment = ({
  className,
  acquiringMethods,
}: {
  className?: string;
  acquiringMethods: AcquiringMethod[];
}) => {
  const [selectedAcquiringMethodId, setSelectedAcquiringMethodId] = useState<
    string | null
  >(null);

  const mockAcquiringMethods: AcquiringMethod[] = [
    {
      provider: AcquiringProvider.cashinout,
      code: "cashinout_method",
      relativeProviderCommission: 0,
      relativeCommission: 0,
      isCommissionIncluded: true,
      icon: "/methods/cashinout.svg",
    },
  ];

  const handleSelectAcquiringMethod = (acquiringMethod: AcquiringMethod) => {
    setSelectedAcquiringMethodId(acquiringMethod.provider);
  };

  return (
    <div className={cn("flex gap-3 not-md:flex-wrap", className)}>
      <div className="w-1/2 not-md:w-full gap-6 flex flex-col">
        <SteamLogin />
        {/*<PromoCode />*/}
        <Payment />
      </div>

      <div className="w-1/2 not-md:w-full flex flex-col gap-4">
        <PaymentInfo
          amountToPay={0}
          amountToReceive={0}
          commission={0}
          currency="₽"
        />
        <AcquiringMethodList
          acquiringMethods={acquiringMethods}
          onSelectAcquiringMethod={handleSelectAcquiringMethod}
          selectedAcquiringMethodId={selectedAcquiringMethodId}
        />
      </div>
    </div>
  );
};

export default Replenishment;
