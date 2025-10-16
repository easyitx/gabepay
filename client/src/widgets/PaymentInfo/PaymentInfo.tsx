"use client";

import {Typography} from "@/shared/ui/Typography";
import {useRatedSteamCurrencies} from "@/features/getRatedSteamCurrencies";
import {AcquiringMethod} from "@/entities/acquiringMethod";

interface PaymentInfoProps {
    amount: number;
    amountToPay: number;
    commission: number;
    acquiringMethod?: AcquiringMethod;
    className?: string;
}

export const PaymentInfo: React.FC<PaymentInfoProps> = ({
                                                            amount,
                                                            amountToPay,
                                                            commission,
                                                            className,
                                                        }) => {
    const {currencies, loading} = useRatedSteamCurrencies();

    const getCurrencySymbol = (currency: string) => {
        switch (currency.toUpperCase()) {
            case 'USD':
                return '$';
            case 'KZT':
                return '₸';
            case 'RUB':
                return '₽';
            default:
                return currency;
        }
    };

    const formatCurrencyList = (amount: number) => {
        if (loading || currencies.length === 0) {
            return `${amount.toFixed(2)} ₽`;
        }

        return currencies
            .map((currency) => {
                const convertedAmount = amount * currency.rate;
                const symbol = getCurrencySymbol(currency.currency);
                return `${convertedAmount.toFixed(2)} ${symbol}`;
            })
            .join(" • ");
    };

    return (
        <div
            className={`w-full card rounded-2xl p-6 flex flex-col gap-4 ${className}`}
        >
            <div className="flex items-center justify-between">
                <Typography color="foreground" variant="body">
                    Сумма к оплате:
                </Typography>
                <div className="flex-1 mx-4 border-b border-dashed border-foreground-secondary"></div>
                <Typography color="foreground" variant="body">
                    {amountToPay.toFixed(2)} ₽
                </Typography>
            </div>

            <div className="flex items-center justify-between">
                <Typography color="foreground" variant="body">
                    Получите на Steam:
                </Typography>
                <div className="flex-1 mx-4 border-b border-dashed border-foreground-secondary"></div>
                <Typography color="foreground" variant="body">
                    {formatCurrencyList(amount)}
                </Typography>
            </div>

            <div className="flex items-center justify-between">
                <Typography color="foreground" variant="body">
                    Комиссия:
                </Typography>
                <div className="flex-1 mx-4 border-b border-dashed border-foreground-secondary"></div>
                <div className="flex flex-col items-end">
                    <Typography color="foreground" variant="body">
                        {commission.toFixed(2)} ₽
                    </Typography>
                </div>
            </div>
        </div>
    );
};
