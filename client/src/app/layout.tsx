import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import Header from "@/widgets/Header/Header";
import Footer from "@/widgets/Footer/Footer";
import { Banner } from "@/widgets/Banner/Banner";
import { Spacing } from "@/shared/ui/Spacing";
import Replenishment from "@/widgets/Replenishment/Replenishment";
import { cn } from "@/shared/lib/utils";
import ReplenishmentsList from "@/widgets/ReplenishmentsList/ReplenishmentsList";
import { FAQ } from "@/widgets/FAQ/FAQ";
import { WhyChooseUs } from "@/widgets/WhyChooseUs/WhyChooseUs";

const interTight = localFont({
  src: [
    {
      path: "../shared/assets/fonts/InterTight/InterTight-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../shared/assets/fonts/InterTight/InterTight-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-intertight",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gabepay",
  description: "Donate with Gabepay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen pt-6 m-0", interTight.variable)}>
        <Header className="app-container h-[55px]" />
        <Spacing size="lg" direction="vertical" />
        <Banner className="app-container " />
        <Spacing size="lg" direction="vertical" />
        <div id="replenishment">
          <Replenishment className="app-container " />
        </div>
        <Spacing size="2xl" direction="vertical" />

        <ReplenishmentsList />
        <Spacing size="2xl" direction="vertical" />
        <div id="faq">
          <FAQ className="app-container" />
        </div>
        <Spacing size="2xl" direction="vertical" />
        <div id="guide">
          <WhyChooseUs className="app-container" />
        </div>
        <main className="flex-1 app-container">{children}</main>
        <Spacing size="2xl" direction="vertical" />
        <Footer />
      </body>
    </html>
  );
}
