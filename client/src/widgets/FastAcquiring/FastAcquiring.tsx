import { AcquiringMethod } from "@/entities/acquiringMethod";

import Button from "@/shared/ui/Button/Button";

const fastReplenishment = [100, 200, 500, 1000, 5000];

export const FastAcquiring = ({
  acquiringMethod,
  setCurrentSum,
}: {
  acquiringMethod: AcquiringMethod;
  setCurrentSum: (sum: number) => void;
}) => (
  <div className="flex gap-2 w-full overflow-x-auto overflow-y-hidden">
    {fastReplenishment.map((item) => (
      <Button
        key={item}
        variant="card"
        size="lg"
        className="border border-secondary hover:border-primary hover:bg-foreground hover:text-accent whitespace-nowrap"
        onClick={() => setCurrentSum(item)}
      >
        {item} ₽
      </Button>
    ))}
  </div>
);
