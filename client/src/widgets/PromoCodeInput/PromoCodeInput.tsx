import Button from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input";
import React, { useState } from "react";

const PromoCodeInput = () => {
  const [promoCode, setPromoCode] = useState("");

  return (
    <Input
      variant="primary"
      size="lg"
      placeholder="Введите промокод"
      value={promoCode}
      onChange={(e) => setPromoCode(e.target.value)}
      iconRight={
        <Button size="sm" variant="primary">
          Применить
        </Button>
      }
    />
  );
};

export default PromoCodeInput;
