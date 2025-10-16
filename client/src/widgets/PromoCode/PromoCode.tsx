import { Typography } from "@/shared/ui/Typography";
import React from "react";
import PromoCodeInput from "../PromoCodeInput/PromoCodeInput";

interface Props {
    activePromo: { code: string, discount: number} | null
    clearPromoCode: () => void
    handleActivate: (promoCode: string) => void
}

const PromoCode = ({ activePromo, clearPromoCode, handleActivate }: Props) => {
  return (
    <div className="w-full card flex flex-col gap-4 p-6">
      <Typography color="accent" variant="h3" className="font-bold text-lg">
        Промокод
      </Typography>
      <PromoCodeInput activePromo={activePromo} clearPromoCode={clearPromoCode} handleActivate={handleActivate}/>
    </div>
  );
};

export default PromoCode;
