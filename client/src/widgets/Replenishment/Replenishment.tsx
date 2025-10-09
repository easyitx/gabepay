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
import { useRouter } from "next/navigation";

const Replenishment = ({
  className,
  acquiringMethods,
}: {
  className?: string;
  acquiringMethods: AcquiringMethod[];
}) => {
  const [selectedAcquiringMethodId, setSelectedAcquiringMethodId] =
    useState<string>(acquiringMethods[0].provider);

  const [username, setUsername] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [currentSum, setCurrentSum] = useState<number>(0);
  const router = useRouter();
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

  const handleSelectAcquiringMethod = (acquiringMethod: AcquiringMethod) => {
    setSelectedAcquiringMethodId(acquiringMethod.provider);
  };

  const paymentIsAvailable =
    username &&
    steamData?.valid &&
    emailInput &&
    isConfirmed &&
    currentSum > 0 &&
    selectedAcquiringMethodId;

  const selectedMethod = acquiringMethods.find(
    (method) => method.provider === selectedAcquiringMethodId
  );

  const fullPaymentAmount = selectedMethod
    ? (() => {
        const acquiringCommission =
          (currentSum * selectedMethod.relativeProviderCommission) / 100;

        const serviceCommission =
          (currentSum * selectedMethod.relativeCommission) / 100;

        const amount = selectedMethod.isCommissionIncluded
          ? currentSum + acquiringCommission + serviceCommission
          : currentSum;

        return Math.round(amount * 100) / 100;
      })()
    : currentSum;

  const { createInvoice, isCreating } = useCreateInvoice();

  const handlePayment = useCallback(async () => {
    const { paymentLink, transactionId } = await createInvoice({
      amount: fullPaymentAmount.toString(),
      currency: "RUB",
      account: username,
      methodCode: selectedAcquiringMethodId,
      email: emailInput,
    });

    window.open(paymentLink, "_blank", "noopener,noreferrer");
  }, [
    createInvoice,
    fullPaymentAmount,
    username,
    selectedAcquiringMethodId,
    emailInput,
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
          setEmailInput={setEmailInput}
          isConfirmed={isConfirmed}
          setIsConfirmed={setIsConfirmed}
        />

        <Payment
          acquiringMethod={
            acquiringMethods.find(
              (method) => method.provider === selectedAcquiringMethodId
            ) || acquiringMethods[0]
          }
          currentSum={currentSum}
          setCurrentSum={setCurrentSum}
        />
      </div>

      <div className="w-1/2 not-md:w-full flex flex-col gap-4">
        <PaymentInfo
          amountToPay={fullPaymentAmount}
          amountToReceive={currentSum}
          commission={fullPaymentAmount - currentSum}
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
