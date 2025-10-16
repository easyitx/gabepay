'use client';

import React, { useEffect } from 'react';
import Link from "next/link";
import { useSearchParams } from 'next/navigation';

const Page = () => {
    const searchParams = useSearchParams();

    useEffect(() => {
        // Получаем параметры из URL
        const amount = searchParams.get('amount');
        const currency = searchParams.get('currency') || 'RUB';

        console.log('Параметры платежа:', { amount, currency });

        // Отслеживание конверсии в Яндекс.Метрике
        if (typeof window !== 'undefined' && window.ym) {
            // Основная цель - успешный платеж
            window.ym(104661822, 'reachGoal', 'success_payment');

            // Если есть сумма, отправляем детализированную цель
            if (amount) {
                window.ym(104661822, 'reachGoal', 'purchase_completed', {
                    orderValue: amount,
                    currency: currency
                });

                // Ecommerce данные для аналитики
                window.ym(104661822, 'ecommerce', 'purchase', {
                    orderValue: amount,
                    currency: currency,
                    products: [{
                        id: 'steam_topup',
                        name: 'Пополнение Steam',
                        price: amount,
                        quantity: 1,
                        currency: currency
                    }]
                });
            }

            console.log('Конверсия отправлена в Яндекс.Метрику');
        }
    }, [searchParams]);

    // Форматируем сумму для отображения
    const formatAmount = (amount: string | null) => {
        if (!amount) return '';
        const numAmount = parseFloat(amount);
        return new Intl.NumberFormat('ru-RU', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(numAmount);
    };

    const amount = searchParams.get('amount');
    const currency = searchParams.get('currency') || 'RUB';

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-2xl p-8 mx-4 text-center rounded-xl">
                <div className="flex items-center justify-center w-24 h-24 mx-auto mb-8 bg-green-100 rounded-full">
                    <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>

                <h1 className="mb-4 text-3xl font-bold text-green-600">
                    Платеж прошел успешно!
                </h1>

                {amount && (
                    <div className="mb-6 p-4 bg-green-50 rounded-lg">
                        <p className="text-lg font-semibold text-gray-800">
                            Сумма: {formatAmount(amount)} {currency}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                            Баланс Steam будет пополнен в течение 1-10 минут
                        </p>
                    </div>
                )}

                <p className="mb-8 text-gray-600">
                    Спасибо за использование нашего сервиса!
                </p>

                <div className="mt-8">
                    <Link
                        href="/"
                        className="inline-block px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                        Вернуться на главную
                    </Link>
                </div>

                <div className="mt-6">
                    <Link
                        href="/"
                        className="inline-block px-6 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                        Создать новый платеж
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Page;