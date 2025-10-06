"use client";

import Button from "@/shared/ui/Button/Button";
import { Typography } from "@/shared/ui/Typography";
import { cn } from "@/shared/lib/utils";

export const navigationConfig = [
  { label: "Пополнить Steam", href: "#replenishment" },
  { label: "F.A.Q", href: "#faq" },
  { label: "Инструкция", href: "#guide" },
] as const;

const scrollToSection = (href: string) => {
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
};

interface NavigationProps {
  className?: string;
  isMobile?: boolean;
  onItemClick?: () => void;
}

export default function Navigation({
  className,
  isMobile = false,
  onItemClick,
}: NavigationProps) {
  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        isMobile ? "block md:hidden" : "hidden md:block",
        className
      )}
    >
      <ul
        className={cn("flex items-center gap-4", isMobile && "flex-col gap-6")}
      >
        {navigationConfig.map((item) => (
          <li key={item.href}>
            <Button
              onClick={() => {
                onItemClick?.();
                setTimeout(() => scrollToSection(item.href), 0);
              }}
              className="text-accent hover:text-accent/80 transition-colors cursor-pointer"
              variant="ghost"
            >
              <Typography variant="body">{item.label}</Typography>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
