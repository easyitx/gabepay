"use client";

import React from "react";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import Button from "@/shared/ui/Button/Button";
import { Icon } from "@/shared/ui/Icon/Icon";
import { useModalActions } from "@/app/providers/ModalProvider/useModalActions";
import { cn } from "@/shared/lib/utils";
import { MobileMenuContent } from "../MobileMenuContent/MobileMenuContent";
import Link from "next/link";

const Header = ({ className }: { className?: string }) => {
  const { openModal } = useModalActions();

  const openMobileMenu = () => {
    openModal({
      component: MobileMenuContent,
      size: "full",
      closeOnOverlayClick: true,
      showCloseButton: true,
    });
  };

  return (
    <header className={cn("flex items-center justify-between  ", className)}>
      <div className="h-full flex items-center">
        <Logo />
      </div>

      <div className=" not-sm:hidden">
        <Navigation />
      </div>

      <div className="hidden sm:flex gap-2 ">
        <Link href="https://t.me/gabepay_bot">
          <Button variant="icon" size="md">
            <Icon name="telegram" className=" mr-[2px]" size={16} />
          </Button>
        </Link>
        <Button variant="icon" size="md">
          <Icon name="vk-icon" size={16} />
        </Button>
      </div>

      <Button
        variant="ghost"
        size="lg"
        onClick={openMobileMenu}
        className="sm:hidden"
        aria-label="Toggle mobile menu"
      >
        <Icon name="menu" size={24} />
      </Button>
    </header>
  );
};

export default Header;
