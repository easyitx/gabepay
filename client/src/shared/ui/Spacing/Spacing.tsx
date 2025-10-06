import { cn } from "@/shared/lib/utils";
import { type HTMLAttributes, forwardRef } from "react";

export interface SpacingProps extends HTMLAttributes<HTMLDivElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  direction?: "vertical" | "horizontal" | "both";
}

const spacingVariants = {
  size: {
    xs: "h-1 w-1",
    sm: "h-2 w-2",
    md: "h-4 w-4",
    lg: "h-6 w-6",
    xl: "h-8 w-8",
    "2xl": "h-12 w-12",
    "3xl": "h-16 w-16",
    "4xl": "h-20 w-20",
    "5xl": "h-24 w-24",
  },
  direction: {
    vertical: "w-full",
    horizontal: "h-full",
    both: "h-full w-full",
  },
};

const Spacing = forwardRef<HTMLDivElement, SpacingProps>(
  ({ className, size = "md", direction = "both", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          spacingVariants.size[size],
          spacingVariants.direction[direction],
          className
        )}
        {...props}
      />
    );
  }
);

Spacing.displayName = "Spacing";

export { Spacing };
