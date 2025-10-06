import { Currency } from "@/entities/currency";
import Button from "@/shared/ui/Button/Button";

const fastReplenishment = [100, 200, 500, 1000, 5000];

export const FastReplenishment = ({
  currency,
  setCurrentSum,
}: {
  currency: Currency;
  setCurrentSum: (sum: number) => void;
}) => (
  <div className="flex gap-2">
    {fastReplenishment.map((item) => (
      <Button
        key={item}
        variant="primary"
        size="sm"
        onClick={() => setCurrentSum(item)}
      >
        {item} {currency.symbol}
      </Button>
    ))}
  </div>
);
