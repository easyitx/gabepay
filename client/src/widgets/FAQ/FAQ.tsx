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
    question: "Как это работает?",
    answer:
      "Наш сервис позволяет пополнять баланс Steam кошелька различными способами оплаты. Выберите удобный способ, введите логин Steam и сумму, затем следуйте инструкциям для оплаты.",
  },
  {
    id: "item-2",
    question: "Что делать, если я ошибся в логине Steam?",
    answer:
      "Если вы допустили ошибку в логине и такого аккаунта нет в Steam, форма оплаты не позволит вам совершить платёж. В случае, когда вы ввели свой аккаунт неправильно, а кто-то другой использует этот логин на платформе Steam, платёж будет осуществлён на его счёт, и вернуть его не получится.",
  },
  {
    id: "item-3",
    question: "Какие регионы можно пополнить?",
    answer:
      "Мы поддерживаем пополнение Steam кошельков для всех регионов, включая Россию, СНГ, Европу, США и другие страны. Комиссия может варьироваться в зависимости от региона.",
  },
  {
    id: "item-4",
    question: "Как оплатить?",
    answer:
      "Доступны различные способы оплаты: банковские карты (VISA, Mastercard, МИР), СБП, криптовалюты (Bitcoin, Ethereum, USDT, TON), электронные кошельки. Выберите удобный способ при оформлении заказа.",
  },
  {
    id: "item-5",
    question: "Где посмотреть все покупки?",
    answer:
      "Все ваши транзакции отображаются в личном кабинете. Там вы можете посмотреть историю пополнений, статус заказов и получить детальную информацию по каждой операции.",
  },
];

export const FAQ: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("w-full", className)}>
      <Typography color="accent" variant="h2">
        Частые вопросы
      </Typography>

      <div className="w-full">
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((item) => (
            <AccordionItem className="py-6" key={item.id} value={item.id}>
              <AccordionTrigger className="text-left">
                <Typography
                  color="accent"
                  variant="h3"
                  className="font-medium text-lg text-accent"
                >
                  {item.question}
                </Typography>
              </AccordionTrigger>
              <AccordionContent>
                <Typography variant="body">{item.answer}</Typography>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
