import React, { InputHTMLAttributes, useState, useEffect } from "react";
import { cn } from "@/shared/lib/utils";
import { Icon } from "@/shared/ui/Icon/Icon";

type InputVariant = "primary" | "secondary" | "ghost";
type InputSize = "sm" | "md" | "lg";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: InputVariant;
  size?: InputSize;
  iconRight?: string | React.ReactNode;
  iconAfterText?: string | React.ReactNode;
  className?: string;
}

const baseClass =
  "w-full transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none";

const sizeClasses: Record<InputSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-base",
  lg: "h-14 px-5 text-base",
};

const variantClasses: Record<InputVariant, string> = {
  primary:
    "bg-secondary rounded-lg text-accent placeholder:text-foreground-secondary border border-secondary focus:border-primary focus:outline-none",
  secondary:
    "bg-background-card text-foreground border border-secondary rounded-md focus:border-primary focus:outline-none",
  ghost: "bg-transparent text-foreground border-none focus:outline-none",
};

export const Input: React.FC<InputProps> = ({
  variant = "primary",
  size = "md",
  iconRight,
  iconAfterText,
  className,
  onChange,
  value,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(value || "");

  useEffect(() => {
    setInternalValue(value || "");
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    if (
      newValue.length > 1 &&
      newValue.startsWith("0") &&
      !newValue.startsWith("0.")
    ) {
      newValue = newValue.replace(/^0+/, "");
    }

    setInternalValue(newValue);

    const newEvent = {
      ...e,
      target: {
        ...e.target,
        value: newValue,
      },
    };

    onChange?.(newEvent);
  };
  const classes = cn(
    baseClass,
    variantClasses[variant],
    sizeClasses[size],
    iconRight && "pr-10",
    iconAfterText && "pl-10",
    className
  );

  return (
    <div className="relative">
      <input
        className={classes}
        {...props}
        value={internalValue}
        onChange={handleChange}
      />
      {iconRight && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {typeof iconRight === "string" ? (
            <Icon name={iconRight as any} className="text-accent" size={16} />
          ) : (
            iconRight
          )}
        </div>
      )}
      {iconAfterText && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          {iconAfterText}
        </div>
      )}
    </div>
  );
};
