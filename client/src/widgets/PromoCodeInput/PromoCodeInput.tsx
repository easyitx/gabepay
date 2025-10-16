import Button from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input";
import React, { useState } from "react";
import { Typography } from "@/shared/ui/Typography";
import { Icon } from "@/shared/ui/Icon/Icon";
import { toast } from "sonner";

interface Props {
    activePromo: { code: string, discount: number} | null
    clearPromoCode: () => void
    handleActivate: (promoCode: string) => void
}

const PromoCodeInput = ({ activePromo, clearPromoCode, handleActivate }: Props) => {
  const [promoCode, setPromoCode] = useState("");
  const [validationError, setValidationError] = useState<string>("");

  const handleDeactivate = () => {
    clearPromoCode();
    setPromoCode("")
    toast.info("Промокод отменен");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPromoCode(value);
    
    // Очищаем ошибку валидации при вводе
    if (validationError) {
      setValidationError("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !activePromo) {
      handleActivate(promoCode);
    }
  };

  if (activePromo) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between p-4  border border-green-200 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Icon name="tick-circle" className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <Typography variant="body-sm" className="font-medium">
                Промокод {activePromo.code} активирован!
              </Typography>
              <Typography variant="caption" className="text-green-200">
                Скидка {activePromo.discount}% на комиссию
              </Typography>
            </div>
          </div>
          <Button 
            size="sm" 
            variant="primary" 
            onClick={handleDeactivate}
          >
            Отменить
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Input
        variant="primary"
        size="lg"
        placeholder="Введите промокод"
        value={promoCode}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className={validationError ? "border-red-500 focus:border-red-500" : ""}
        iconRight={
          <Button 
            size="sm" 
            variant="primary" 
            onClick={() => handleActivate(promoCode)}
            disabled={activePromo || !promoCode.trim()}
          >
            {activePromo ? "..." : "Применить"}
          </Button>
        }
      />
      {validationError && (
        <Typography variant="caption" className="text-red-600 mt-1">
          {validationError}
        </Typography>
      )}
    </div>
  );
};

export default PromoCodeInput;
