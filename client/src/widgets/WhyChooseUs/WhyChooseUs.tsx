import React from "react";
import { Typography } from "@/shared/ui/Typography";
import { Icon } from "@/shared/ui/Icon/Icon";
import { cn } from "@/shared/lib/utils";

interface FeatureCardProps {
  icon: string;
  title: string;
  description?: string;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  className,
}) => {
  return (
    <div
      className={cn(
        "card rounded-3xl  p-12 flex flex-col items-center justify-center gap-4",
        className
      )}
    >
      <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center">
        <Icon name={icon as any} className="text-primary w-10 h-10" />
      </div>
      <div className="flex flex-col gap-2  text:lg">
        <Typography
          color="accent"
          variant="body"
          className=" text-center text-[25px]"
        >
          {title}
        </Typography>
        {description && <Typography variant="body">{description}</Typography>}
      </div>
    </div>
  );
};

const featuresData = [
  {
    icon: "discount-circle",
    title: "самая низкая комиссия на рынке",
  },
  {
    icon: "flash",
    title: "мгновенное зачисление на ваш steam-счет",
  },
  {
    icon: "security-user",
    title: "максимальная защита ваших данных",
  },
  {
    icon: "headphone",
    title: "поддержка 24/7 для решения любых вопросов",
  },
  {
    icon: "ticket",
    title: "выгодный старт для новых клиентов",
    description:
      "введите промокод «gabepay100» и получите дополнительные средства на счет или повышенный кэшбэк",
  },
];

export const WhyChooseUs: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <div className={cn("w-full flex flex-col gap-6", className)}>
      <Typography color="accent" variant="h2">
        Почему выбирают нас
      </Typography>

      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuresData.slice(0, 3).map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {featuresData.slice(3).map((feature, index) => (
            <FeatureCard
              key={index + 3}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
