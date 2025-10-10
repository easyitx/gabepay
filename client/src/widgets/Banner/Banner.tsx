import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import Button from "@/shared/ui/Button/Button";

import bannerDesktop from "@/shared/assets/images/banner-desktop.webp";
import { Icon } from "@/shared/ui/Icon/Icon";
import { Typography } from "@/shared/ui/Typography";
import Link from "next/link";

interface BannerProps {
  alt?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export const Banner: React.FC<BannerProps> = ({
  className,
  priority = false,
}) => {
  const BannerHeader = () => (
    <div className="w-full custom-xl:w-1/2  flex flex-col md:gap-3 gap-2 xl:gap-4">
      <Typography color="accent" className="text-lg md:text-sm" variant="h3">
        Пополняйте с выгодой
        <br /> вместе с cashinout.io
      </Typography>
      <Typography
        color="foreground"
        className="text-base md:max-w-3/4"
        variant="body"
      >
        Комиссия всего <b>2%</b> при пополнении
        <br /> через кошелек
      </Typography>
    </div>
  );

  const BannerCTA = () => (
    <Link href="https://t.me/Cashinout_bot?start=194805" target="_blank">
      <Button
        variant="banner"
        size="lg"
        className="rounded-full max-w-fit text-accent flex pl-1 gap-2 items-center"
      >
        <span className="flex flex-row gap-2 items-center">
          <Icon
            name="sphere"
            className="group-hover:rotate-12 bg-primary h-full p-2 w-auto rounded-full transition-transform duration-300"
          />
          <Typography color="accent" variant="caption">
            ПОПОЛНИТЬ СЕЙЧАС
          </Typography>
        </span>
      </Button>
    </Link>
  );

  const FeatureCard = ({
    icon,
    title,
    description,
    className,
  }: {
    icon: "security-card" | "flash" | "strong-box";
    title: string;
    description: string;
    className?: string;
  }) => (
    <div
      className={cn(
        "flex  gap-3   w-1/3  items-start justify-start  max-w-[340px]",
        className
      )}
    >
      <Icon
        name={icon}
        className="rounded-xl h-12 w-12 p-2 bg-accent text-primary"
      />
      <div className="flex w-full flex-col gap-1">
        <Typography color="accent" className="text-md" variant="body">
          {title}
        </Typography>
        <Typography color="foreground" className="text-sm" variant="body">
          {description}
        </Typography>
      </div>
    </div>
  );

  const BannerFeatures = () => (
    <div className="flex w-full justify-between ">
      <FeatureCard
        icon="security-card"
        title="Полное сохранение средств"
        description="2% комиссии — вы пополняете максимально выгодно"
        className="border-r pr-5"
      />
      <FeatureCard
        icon="flash"
        title="Скорость и надежность"
        description="Мгновенное зачисление без простоев"
        className="border-r px-5"
      />
      <FeatureCard
        icon="strong-box"
        title="Простота и безопасность"
        description="Интуитивный интерфейс и защита на уровне банка"
        className="pl-5"
      />
    </div>
  );

  return (
    <div className={cn("relative", className)}>
      <Image
        src={bannerDesktop}
        alt={""}
        priority={priority}
        quality={100}
        placeholder="blur"
        unoptimized
        sizes="(min-width: 1024px) 100vw, 100vw"
        className="rounded-[4rem] object-cover w-full  min-h-65"
      />
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-0 right-0 flex w-full p-2 custom-xl:p-10 flex-col h-full justify-center items-start overflow-hidden">
          <div className="w-full sm:max-w-[90%] md:max-w-none ">
            <div className="flex flex-col gap-3 md:gap-4 sm:gap-4 p-4">
              <BannerHeader />
              <div className="flex justify-start">
                <BannerCTA />
              </div>
            </div>
          </div>

          <div className="hidden custom-xl:block w-full mt-auto">
            <BannerFeatures />
          </div>
        </div>
      </div>
    </div>
  );
};
