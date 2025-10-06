import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type ButtonVariant = "primary" | "ghost" | "card" | "icon" | "banner";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function cn(...inputs: Array<string | undefined | false>) {
  return twMerge(clsx(inputs));
}

const baseClass =
  "inline-flex cursor-pointer items-center hover:bg-primary text-accent justify-center rounded-md font-medium transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none select-none";

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-[12px] gap-2",
  md: "h-10 px-4 text-[14px] gap-2",
  lg: "h-12 px-5 text-[16px] gap-3",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-accent hover:opacity-90 shadow-sm rounded-xl",
  ghost: "bg-transparent text-foreground hover:bg-[rgba(255,255,255,0.06)]",
  card: "bg-secondary text-foreground hover:bg-secodary  hover:border-primary",
  icon: "rounded-full card  p-0 text-foreground hover:bg-primary text-accent",
  banner:
    "text-accent font-medium shadow-lg hover:shadow-2xl hover:scale-105 hover:brightness-110 transition-all duration-300 group relative overflow-hidden",
};

const iconSizeBySize: Record<ButtonSize, string> = {
  sm: "w-9 h-9 text-[16px]",
  md: "w-10 h-10 text-[18px]",
  lg: "w-12 h-12 text-[20px]",
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    baseClass,
    variantClasses[variant],
    variant === "icon" ? iconSizeBySize[size] : sizeClasses[size],
    className
  );

  const bannerStyle =
    variant === "banner"
      ? {
          background:
            "linear-gradient(90deg, #7057FF 0%, #9481FF 22%, #7057FF 44%, #9481FF 72%, #7057FF 100%)",
        }
      : {};

  return (
    <button className={classes} style={bannerStyle} {...props}>
      {variant === "banner" && (
        <>
          <div className="absolute inset-0 -top-1 -left-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300" />

          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400/30 to-blue-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
        </>
      )}
      <span className={variant === "banner" ? "relative z-10" : ""}>
        {children}
      </span>
    </button>
  );
}
