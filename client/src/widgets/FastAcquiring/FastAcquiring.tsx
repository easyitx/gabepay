import Button from "@/shared/ui/Button/Button";

const fastAcquiringList = [100, 200, 500, 1000, 5000];

export const FastAcquiring = ({
  setCurrentSum,
}: {
  setCurrentSum: (sum: number) => void;
}) => (
  <div className="flex gap-2 w-full overflow-x-auto pb-1 overflow-y-hidden">
    {fastAcquiringList.map((item) => (
      <Button
        key={item}
        variant="card"
        size="lg"
        className="border not-sm:p-1  border-secondary   hover:text-accent whitespace-nowrap"
        onClick={() => setCurrentSum(item)}
      >
        {item} ₽
      </Button>
    ))}
  </div>
);
