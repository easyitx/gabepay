"use client";

import SteamLogin from "../SteamLogin/SteamLogin";
import React, { useCallback, useState, useEffect } from "react";
import {type AcquiringMethod} from "@/entities/acquiringMethod";
import Payment from "../Payment/Payment";
import {PaymentInfo} from "../PaymentInfo/PaymentInfo";
import {AcquiringMethodList} from "../AcquiringMethodList/AcquiringMethodList";
import {cn} from "@/shared/lib/utils";
import Button from "@/shared/ui/Button/Button";
import { useSteamValidation } from "@/features/validateSteamAccount/model/hooks/useSteamValidation";
import { useCreateInvoice } from "@/features/createInvoice/model/hooks/useCreateInvoice";
import PromoCode from "@/widgets/PromoCode/PromoCode";
import {formatPromoCode, validatePromoCodeClient} from "@/shared/lib/promoCode";
import {toast} from "sonner";
import {ActivatePromoCodeApi} from "@/features/activatePromoCode";
import {ApiError} from "@/shared/api";

const Replenishment = ({ className, acquiringMethods }: {
    className?: string;
    acquiringMethods: AcquiringMethod[];
}) => {
    const [selectedAcquiringMethodId, setSelectedAcquiringMethodId] =
        useState<string>(acquiringMethods[0].code);

    const [username, setUsername] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [isEmailFocused, setIsEmailFocused] = useState(false);

    const [amount, setAmount] = useState<number>(0);
    const [activePromo, setActivePromo] = useState<{ code: string, discount: number } | null>(null);

    useEffect(() => {
        const savedPromo = localStorage.getItem('promo_gabepay');
        if (savedPromo) {
            try {
                const promoData = JSON.parse(savedPromo);
                if (promoData && promoData.code && promoData.discount !== undefined) {
                    setActivePromo(promoData);
                }
            } catch (error) {
                console.error('Ошибка при парсинге промокода из localStorage:', error);
                localStorage.removeItem('promo_gabepay');
            }
        }
    }, []);

    const handleActivate = async (promoCode: string) => {
        if (activePromo) {
            toast.error("Уже активирован");
            return;
        }
        const validation = validatePromoCodeClient(promoCode);
        if (!validation.isValid) {
            toast.error(validation.error);
            return null;
        }

        const formattedCode = formatPromoCode(promoCode);

        try {
            const api = new ActivatePromoCodeApi();
            const response = await api.activatePromoCode(formattedCode);

            if (response.success) {
                localStorage.setItem('promo_gabepay', JSON.stringify(response));
                setActivePromo(response);
                toast.success(response.message || `Промокод активирован! Скидка ${response.discount}%`);
            } else {
                toast.error(response.message || "Не удалось активировать промокод");
            }

            return response;
        } catch (err) {
            if (err instanceof ApiError) {
                const errorMessage = err.errorData || err.message || "Ошибка при активации промокода";
                toast.error(errorMessage);
            } else {
                const errorMessage = "Неизвестная ошибка";
                toast.error(errorMessage);
            }
            return null;
        }
    };

    const clearPromoCode = useCallback(() => {
        setActivePromo(null);
        localStorage.removeItem('promo_gabepay');
    }, []);

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
        amount > 0 &&
        selectedAcquiringMethodId;

    const method = React.useMemo(() => {
        return acquiringMethods.find((method: AcquiringMethod) => method.code === selectedAcquiringMethodId)
    }, [acquiringMethods, selectedAcquiringMethodId])

    const serviceCommission = amount > 0 && method?.relativeCommission ? ((amount * method?.relativeCommission) / 100) : 0;
    const providerCommission = amount > 0 && method?.relativeProviderCommission ? ((amount * method?.relativeProviderCommission) / 100) : 0;
    const totalCommission = serviceCommission + providerCommission
    const discount = activePromo ? (totalCommission * activePromo.discount) / 100 : 0;
    const finalCommission = totalCommission - discount;
    const amountToPay = amount + finalCommission

    const { createInvoice, isCreating } = useCreateInvoice();

    const handlePayment = useCallback(async () => {
        const data = await createInvoice({
            amount: amount.toString(),
            currency: "RUB",
            account: username,
            methodCode: selectedAcquiringMethodId,
            email: emailInput,
            promoCode: activePromo?.code, // Передаем промокод в запрос
        });
        localStorage.removeItem('promo_gabepay');
        if (data) {
            window.open(data.paymentLink, "_blank", "noopener,noreferrer");
        }
    }, [
        createInvoice,
        amount,
        username,
        selectedAcquiringMethodId,
        emailInput,
        activePromo?.code
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

                <PromoCode
                    handleActivate={handleActivate}
                    activePromo={activePromo}
                    clearPromoCode={clearPromoCode}
                />

                <Payment currentSum={amount} setCurrentSum={setAmount} amountToPay={amountToPay}/>
            </div>

            <div className="w-1/2 not-md:w-full flex flex-col gap-4">
                <PaymentInfo
                    amount={amount}
                    amountToPay={amountToPay}
                    commission={finalCommission}
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