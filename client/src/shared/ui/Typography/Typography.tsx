import React, { JSX } from "react";
import { cn } from "@/shared/lib/utils";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body"
  | "body-sm"
  | "body-lg"
  | "caption"
  | "label"
  | "button";

type TypographyColor =
  | "primary"
  | "secondary"
  | "accent"
  | "muted"
  | "white"
  | "foreground"
  | "black"
  | "green"
  | "red";

interface TypographyProps {
  variant?: TypographyVariant;
  color?: TypographyColor;
  className?: string;
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

const variantClasses: Record<TypographyVariant, string> = {
  h1: "text-4xl lg:text-5xl font-bold leading-tight",
  h2: "text-3xl lg:text-4xl font-bold leading-tight",
  h3: "text-2xl lg:text-3xl font-semibold leading-tight",
  h4: "text-xl lg:text-2xl font-semibold leading-tight",
  h5: "text-lg lg:text-xl font-medium leading-tight",
  h6: "text-base lg:text-lg font-medium leading-tight",
  "body-lg": "text-lg leading-relaxed",
  body: "text-base leading-relaxed",
  "body-sm": "text-sm leading-relaxed",
  caption: "text-xs leading-normal",
  label: "text-sm font-medium leading-tight",
  button: "text-base font-medium leading-tight",
};

const colorClasses: Record<TypographyColor, string> = {
  primary: "text-foreground",
  secondary: "text-secondary",
  accent: "text-accent",
  muted: "text-muted-foreground",
  white: "text-white",
  foreground: "text-foreground",
  black: "text-black",
  green: "text-success",
  red: "text-red-500",
};

const defaultElements: Record<TypographyVariant, keyof JSX.IntrinsicElements> =
  {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    "body-lg": "p",
    body: "p",
    "body-sm": "p",
    caption: "span",
    label: "label",
    button: "span",
  };

export const Typography: React.FC<TypographyProps> = ({
  variant = "body",
  color = "primary",
  className,
  children,
  as,
  ...props
}) => {
  const Component = as || defaultElements[variant];

  const classes = cn(variantClasses[variant], colorClasses[color], className);

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};
