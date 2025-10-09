import React from "react";
import { Typography } from "@/shared/ui/Typography";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/shared/ui/Accordion/Accordion";
import { cn } from "@/shared/lib/utils";

const faqData = [
    {
        id: "item-1",
        question: "Как пополнить баланс Steam через GabePay?",
        answer:
            "Наш сервис позволяет пополнять баланс Steam кошелька различными способами оплаты. Выберите удобный способ, введите логин Steam и сумму, затем следуйте инструкциям для оплаты.",
    },
    {
        id: "item-2",
        question: "Что делать при ошибке в логине Steam при пополнении?",
        answer:
            "Если вы допустили ошибку в логине и такого аккаунта нет в Steam, форма оплаты не позволит вам совершить платёж. В случае, когда вы ввели свой аккаунт неправильно, а кто-то другой использует этот логин на платформе Steam, платёж будет осуществлён на его счёт, и вернуть его не получится.",
    },
    {
        id: "item-3",
        question: "В какие страны можно пополнить Steam через GabePay?",
        answer:
            "Республика Армения, Республика Белоруссия, Республика Казахстан, Киргизская Республика, Республика Молдова, Российская Федерация, Республика Таджикистан и Республика Узбекистан, Грузия, Азербайджан, Украина",
    },
    {
        id: "item-4",
        question: "Какие лимиты на пополнение Steam в GabePay?",
        answer:
            "Минимальный платеж 30 руб\n" +
            "Лимит на разовое макс. пополнение 50 000 руб\n" +
            "Лимит на суточное пополнение аккаунта Steam - 500 USD и не более 3 пополнений в пределах суток по часовому поясу UTC\n",
    },
    {
        id: "item-5",
        question: "Как сохранить регион России при первом пополнении Steam?",
        answer:
            "Первое пополнение? Что делать чтобы регион Steam остался Россия?\n" +
            "Добавить любую игру в корзину Steam и ждать пополнения с запущенными приложением Steam\n",
    },
    {
        id: "item-6",
        question: "Деньги не пришли на Steam кошелек - что делать?",
        answer:
            "Обратится в Техническую поддержку за помощью \n" +
            "Причины:\n" +
            "- Крыма, ЛНР и ДНР \\\\ Решение:  нужно выйти из сети Steam на всех устройствах (на телефоне тоже. Можно включить авиа-режим на 1 час и активировать транзакцию повторно\n" +
            "- Некорректный логин\n"
    },
];

const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer.replace(/\n/g, "<br>")
        }
    }))
};

export const FAQ: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <div className={cn("w-full", className)}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
            />

            <Typography color="accent" variant="h2">
                Частые вопросы о пополнении Steam
            </Typography>

            <div className="w-full">
                <Accordion type="multiple" className="w-full">
                    {faqData.map((item) => (
                        <AccordionItem
                            className="py-6"
                            key={item.id}
                            value={item.id}
                            itemScope
                            itemProp="mainEntity"
                            itemType="https://schema.org/Question"
                        >
                            <AccordionTrigger
                                className="text-left data-[state=open]:text-accent text-lg"
                                itemProp="name"
                            >
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent
                                itemScope
                                itemProp="acceptedAnswer"
                                itemType="https://schema.org/Answer"
                            >
                                <Typography variant="body">
                                    {item.answer}
                                </Typography>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
};