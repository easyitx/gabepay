import { Currency } from "@/entities/currency";
import { Input } from "@/shared/ui/Input";
import { Typography } from "@/shared/ui/Typography";
import React, { useState } from "react";
import { FastReplenishment } from "../FastReplenishment/FastReplenishment";
import { Icon } from "@/shared/ui/Icon/Icon";

const Payment = () => {
  const [currency, setCurrency] = useState<Currency>({
    id: "1",
    name: "RUB",
    symbol: "₽",
    icon: "RUB",
    percentage: 0,
  });
  const [cunnrentSum, setCurrentSum] = useState<number>(0);

  return (
    <div className="w-full p-6 card gap-5 flex flex-col">
      <div className="flex justify-between items-center">
        <Typography color="accent" variant="h3" className="font-bold text-lg">
          Будет зачислено
        </Typography>
        <Typography color="accent" variant="h3" className="font-bold text-lg">
          Сумма к оплате
        </Typography>
      </div>
      <div className="flex  items-center gap-4 not-sm:flex-wrap not-sm:w-full">
        <Input
          variant="primary"
          size="lg"
          placeholder="Введите сумму"
          value={cunnrentSum}
          iconAfterText={currency.symbol}
          type="number"
          onChange={(e) => setCurrentSum(+e.target.value)}
          className="not-sm:w-full"
        />
        <div className="flex items-center w-max gap-2 not-sm:w-full ">
          <Typography
            color="accent"
            variant="body"
            className="font-medium text-lg"
          >
            ≈
          </Typography>
          <Typography
            color="accent"
            variant="h3"
            className="w-max overflow-hidden font-medium text-lg"
          >
            {currency.symbol}
            {cunnrentSum}
          </Typography>
          <Icon name="message-question" className=" cursor-help" />
        </div>
      </div>
      <FastReplenishment currency={currency} setCurrentSum={setCurrentSum} />
      <Typography className="text-sm">
        Минимальная сумма пополнения 10 валютных единиц.
      </Typography>
    </div>
  );
};

export default Payment;
