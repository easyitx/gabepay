import React from "react";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import Button from "@/shared/ui/Button/Button";
import { Icon } from "@/shared/ui/Icon/Icon";
import { cn } from "@/shared/lib/utils";

const Header = ({ className }: { className?: string }) => {
  return (
    <header className={cn("flex  items-center justify-between", className)}>
      <Logo />
      <Navigation />
      <div className="flex gap-5">
        <Button variant="icon" size="lg">
          <Icon name="telegram" className="text-foreground" />
        </Button>
        <Button variant="icon" size="lg">
          <Icon name="vk-icon" className="text-foreground" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
