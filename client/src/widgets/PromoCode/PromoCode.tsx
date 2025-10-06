import { Typography } from "@/shared/ui/Typography";
import React from "react";
import PromoCodeInput from "../PromoCodeInput/PromoCodeInput";

const PromoCode = () => {
  return (
    <div className="w-full card flex flex-col gap-4 p-6">
      <Typography color="accent" variant="h3">
        Промокод
      </Typography>
      <PromoCodeInput />
    </div>
  );
};

export default PromoCode;
