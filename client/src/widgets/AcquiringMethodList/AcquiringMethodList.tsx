import React from "react";
import { cn } from "@/shared/lib/utils";

import Button from "@/shared/ui/Button/Button";
import {
  AcquiringMethod,
  AcquiringMethodCard,
} from "@/entities/acquiringMethod";

interface AcquiringMethodListProps {
  acquiringMethods: AcquiringMethod[];
  onSelectAcquiringMethod: (acquiringMethod: AcquiringMethod) => void;
  selectedAcquiringMethodId: string | null;
  className?: string;
}

export const AcquiringMethodList: React.FC<AcquiringMethodListProps> = ({
  acquiringMethods,
  onSelectAcquiringMethod,
  selectedAcquiringMethodId,
  className,
}) => {
  return (
    <div className={cn("w-full   rounded-2xl  flex flex-col gap-6", className)}>
      <div className="grid max-h-133 overflow-x-hidden  overflow-auto  grid-cols-4 gap-4">
        {acquiringMethods.map((acquiringMethod) => (
          <AcquiringMethodCard
            key={acquiringMethod.provider}
            acquiringMethod={acquiringMethod}
            onClick={onSelectAcquiringMethod}
            isSelected={selectedAcquiringMethodId === acquiringMethod.provider}
          />
        ))}
      </div>
    </div>
  );
};
