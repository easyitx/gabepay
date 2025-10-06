import { cn } from "@/shared/lib/utils";
import React from "react";
import { Icon } from "@/shared/ui/Icon/Icon";
import Logo from "@/widgets/Logo/Logo";
import Navigation from "../Navigation/Navigation";
import Button from "@/shared/ui/Button/Button";

const Footer = ({ className }: { className?: string }) => {
  return (
    <div className={cn("w-full py-12 bg-background", className)}>
      <div className="flex flex-col items-center gap-8">
        <div className='w-[140px]'>
            <Logo />
        </div>

        <Navigation />

        {/* Social Media Icons */}
        <div className="flex gap-4">
          <Button variant="icon" size="lg">
            <Icon name="telegram" size={20} />
          </Button>
          <Button variant="icon" size="lg">
            <Icon name="vk-icon" size={20} />
          </Button>
        </div>

        {/* Legal Links */}
        <div className="flex  flex-col">
          <Button variant="ghost" className="underline">
            Политика конфиденциальности
          </Button>
          <Button variant="ghost" className="underline">
            Пользовательское соглашение
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
