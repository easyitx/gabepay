"use client";

import React, {useState, useEffect} from "react";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import Button from "@/shared/ui/Button/Button";
import {Icon} from "@/shared/ui/Icon/Icon";
import {cn} from "@/shared/lib/utils";

const Header = ({className}: { className?: string }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileMenuOpen]);

    return (
        <header
            className={cn("flex items-center flex-1 relative", className)}
        >
            <div className="w-[185px] h-[44px] md:w-[185px] md:h-[44px]">
                <Logo/>
            </div>

            <div className="ml-[220px]">
                <Navigation/>
            </div>

            <div className="hidden md:flex gap-2 ml-auto">
                <Button variant="icon" size="md">
                    <Icon name="telegram" className="text-foreground mr-[2px]" size={16}/>
                </Button>
                <Button variant="icon" size="md">
                    <Icon name="vk-icon" className="text-foreground" size={16}/>
                </Button>
            </div>

            <Button
                variant="ghost"
                size="lg"
                onClick={toggleMobileMenu}
                className="md:hidden z-[1000]"
                aria-label="Toggle mobile menu"
            >
                <Icon
                    name={isMobileMenuOpen ? "close" : "menu"}
                    className="text-foreground"
                    size={24}
                />
            </Button>

            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[999] md:hidden">
                    <div className="flex flex-col items-center justify-center h-full gap-8">
                        <Navigation
                            isMobile={true}
                            onItemClick={() => setIsMobileMenuOpen(false)}
                        />
                        <div className="flex gap-5">
                            <Button variant="icon" size="lg">
                                <Icon name="telegram" className="text-foreground"/>
                            </Button>
                            <Button variant="icon" size="lg">
                                <Icon name="vk-icon" className="text-foreground"/>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
