"use client";

import SteamLogin from "../SteamLogin/SteamLogin";

import { useCallback, useState } from "react";
import { type AcquiringMethod } from "@/entities/acquiringMethod";

import Payment from "../Payment/Payment";
import { PaymentInfo } from "../PaymentInfo/PaymentInfo";
import { AcquiringMethodList } from "../AcquiringMethodList/AcquiringMethodList";
import { cn } from "@/shared/lib/utils";
import Button from "@/shared/ui/Button/Button";
import { useSteamValidation } from "@/features/validateSteamAccount/model/hooks/useSteamValidation";
import { useCreateInvoice } from "@/features/createInvoice/model/hooks/useCreateInvoice";
import { usePromoCode } from "@/shared/hooks/usePromoCode";
import { applyPromoCodeDiscount } from "@/shared/lib/promoCode";
import PromoCode from "@/widgets/PromoCode/PromoCode";

const Replenishment = ({
  className,
  acquiringMethods,
}: {
  className?: string;
  acquiringMethods: AcquiringMethod[];
}) => {
  const [selectedAcquiringMethodId, setSelectedAcquiringMethodId] =
    useState<string>(acquiringMethods[0].code);

  const [username, setUsername] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [currentSum, setCurrentSum] = useState<number>(0);
  const [emailError, setEmailError] = useState<string>("");
  const [isEmailFocused, setIsEmailFocused] = useState<boolean>(false);

  const { activePromoCode, promoDiscount } = usePromoCode();

  const {
    validateSteamAccount,
    isLoading,
    error,
    data: steamData,
    reset,
  } = useSteamValidation();

  const handleBlur = useCallback(async () => {
    if (username.trim()) {
      await validateSteamAccount(username);
    }
  }, [username, validateSteamAccount]);

  const handleUsernameChange = useCallback(
    (value: string) => {
      setUsername(value);

      if (steamData || error) {
        reset();
      }
    },
    [steamData, error, reset]
  );

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Введите корректный email адрес");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleEmailChange = (value: string) => {
    setEmailInput(value);
    if (emailError) {
      setEmailError("");
    }
  };

  const handleEmailFocus = () => {
    setIsEmailFocused(true);
  };

  const handleEmailBlur = () => {
    setIsEmailFocused(false);
    if (emailInput.trim()) {
      validateEmail(emailInput.trim());
    }
  };

  const handleSelectAcquiringMethod = (acquiringMethod: AcquiringMethod) => {
    setSelectedAcquiringMethodId(acquiringMethod.code);
  };

  const paymentIsAvailable =
    username &&
    steamData?.valid &&
    emailInput &&
    !emailError &&
    isConfirmed &&
    currentSum > 0 &&
    selectedAcquiringMethodId;

  const selectedMethod = acquiringMethods.find(
    (method) => method.code === selectedAcquiringMethodId
  );

  const amountToPay = selectedMethod
    ? (() => {
        const acquiringCommission =
          (currentSum * selectedMethod.relativeProviderCommission) / 100;

        let serviceCommission =
          (currentSum * selectedMethod.relativeCommission) / 100;

        // Применяем скидку по промокоду к сервисной комиссии
        if (activePromoCode && promoDiscount > 0) {
          serviceCommission = applyPromoCodeDiscount(serviceCommission, promoDiscount);
        }

        const amount = selectedMethod.isCommissionIncluded
          ? currentSum + acquiringCommission + serviceCommission
          : currentSum;

        return Math.round(amount * 100) / 100;
      })()
    : currentSum;

  const { createInvoice, isCreating } = useCreateInvoice();

  const handlePayment = useCallback(async () => {
    const data = await createInvoice({
      amount: currentSum.toString(),
      currency: "RUB",
      account: username,
      methodCode: selectedAcquiringMethodId,
      email: emailInput,
      promoCode: activePromoCode?.code || undefined,
    });
    if (data) {
      window.open(data.paymentLink, "_blank", "noopener,noreferrer");
    }
  }, [
    createInvoice,
    currentSum,
    username,
    selectedAcquiringMethodId,
    emailInput,
    activePromoCode,
  ]);

  return (
    <div className={cn("flex gap-3 not-md:flex-wrap", className)}>
      <div className="w-1/2 not-md:w-full gap-6 flex flex-col">
        <SteamLogin
          username={username}
          handleUsernameChange={handleUsernameChange}
          handleBlur={handleBlur}
          isLoading={isLoading}
          data={steamData}
          emailInput={emailInput}
          setEmailInput={handleEmailChange}
          isConfirmed={isConfirmed}
          setIsConfirmed={setIsConfirmed}
          emailError={emailError}
          isEmailFocused={isEmailFocused}
          onEmailFocus={handleEmailFocus}
          onEmailBlur={handleEmailBlur}
        />

          <PromoCode/>

        <Payment currentSum={currentSum} setCurrentSum={setCurrentSum} />
      </div>

      <div className="w-1/2 not-md:w-full flex flex-col gap-4">
        <PaymentInfo
          amountToPay={amountToPay}
          amountToReceive={currentSum}
          commission={amountToPay - currentSum}
          originalCommission={selectedMethod ? 
            (currentSum * selectedMethod.relativeCommission) / 100 : 0
          }
        />
        <AcquiringMethodList
          acquiringMethods={acquiringMethods}
          onSelectAcquiringMethod={handleSelectAcquiringMethod}
          selectedAcquiringMethodId={selectedAcquiringMethodId}
        />
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          disabled={!paymentIsAvailable || isCreating}
          onClick={handlePayment}
        >
          {isCreating ? "Создание платежа..." : "Пополнить баланс"}
        </Button>
      </div>
    </div>
  );
};

export default Replenishment;
