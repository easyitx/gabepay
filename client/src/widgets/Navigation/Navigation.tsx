"use client";

import Button from "@/shared/ui/Button/Button";
import { Typography } from "@/shared/ui/Typography";
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";

export const navigationConfig = [
  { label: "Пополнить Steam", href: "#replenishment" },
  { label: "F.A.Q", href: "#faq" },
  { label: "Почему мы?", href: "#guide" },
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
  onItemClick,
  className,
}: NavigationProps) {
  const router = useRouter();

  const handleItemClick = (item: typeof navigationConfig[number]) => {
    onItemClick?.();
    
    if (item.label === "Пополнить Steam") {
      // Переход на главную страницу
      router.push("/");
    } else {
      // Скролл к секции для других пунктов
      setTimeout(() => scrollToSection(item.href), 0);
    }
  };

  return (
    <nav aria-label="Main navigation">
      <ul className={cn("flex items-center gap-2", className)}>
        {navigationConfig.map((item) => (
          <li key={item.href}>
            <Button
              onClick={() => handleItemClick(item)}
              className="text-accent hover:text-accent transition-colors cursor-pointer"
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
