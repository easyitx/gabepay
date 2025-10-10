import { Input } from "@/shared/ui/Input";
import { Typography } from "@/shared/ui/Typography";

import { FastAcquiring } from "../FastAcquiring/FastAcquiring";
import { Icon } from "@/shared/ui/Icon/Icon";

const Payment = ({
  currentSum,
  setCurrentSum,
}: {
  currentSum: number;
  setCurrentSum: (value: number) => void;
}) => {
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
          value={currentSum}
          iconAfterText={"₽"}
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
            ₽{currentSum}
          </Typography>
        </div>
      </div>
      <FastAcquiring setCurrentSum={setCurrentSum} />
      <Typography className="text-sm">
        Минимальная сумма пополнения 10 валютных единиц.
      </Typography>
    </div>
  );
};

export default Payment;
