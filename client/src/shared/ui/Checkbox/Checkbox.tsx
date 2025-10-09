import React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "@/shared/lib/utils";
import { Icon } from "@/shared/ui/Icon/Icon";
import { Typography } from "@/shared/ui/Typography";

interface CheckboxProps {
  id?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked,
  onCheckedChange,
  disabled,
  className,
  children,
}) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <CheckboxPrimitive.Root
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={cn(
          "peer h-6 w-6 shrink-0 rounded-sm border border-foreground",
          "bg-secondary text-accent",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-[state=checked]:bg-primary data-[state=checked]:border-primary",
          "transition-colors duration-200"
        )}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
          <Icon name="tick-circle" className="h-5 w-5 text-accent" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {children && (
        <label
          onClick={() => {
            if (disabled) return;
            onCheckedChange?.(!checked);
          }}
          htmlFor={id}
          className="text-foreground text-sm leading-relaxed cursor-pointer"
        >
          {children}
        </label>
      )}
    </div>
  );
};
