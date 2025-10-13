import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import Header from "@/widgets/Header/Header";
import Footer from "@/widgets/Footer/Footer";
import { Spacing } from "@/shared/ui/Spacing";
import { cn } from "@/shared/lib/utils";
import { AppProvider } from "./providers";
import { AutoRefresh } from "./providers/AutoRefresh";

import { ApiError } from "@/shared/api";
import { IAcquiring } from "@/entities/acquiring/model/types";
import { Toaster } from "sonner";
import { AcquiringMethod } from "@/entities/acquiringMethod";
import { AcquiringMethodsApi } from "@/features/getAcquiringMethods";
import { getCachedAcquiringHistory } from "@/features/getAcquiringHistory";

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

export async function generateMetadata(): Promise<Metadata> {
  const title =
    "Пополнение Steam с комиссией от 2% | GabePay — Быстро и безопасно";
  const description =
    "Пополняйте баланс Steam с минимальной комиссией от 2%. Любой регион, любые способы оплаты. Гарантия сделки и мгновенное зачисление. GabePay — надежный сервис для пополнения Steam кошелька.";
  const keywords =
    "пополнить steam, steam баланс, комиссия steam, пополнение steam кошелька, steam wallet, gabepay, пополнить стим, низкая комиссия steam";

  return {
    title,
    description,
    keywords,
    authors: [{ name: "GabePay" }],
    creator: "GabePay",
    publisher: "GabePay",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL("https://gabepay.ru"),
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "ru_RU",
      siteName: "GabePay",
      title,
      description,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "GabePay - Пополнение Steam",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/twitter-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      // google: '',
      // yandex: '',
    },
    other: {
      'apple-mobile-web-app-title': 'Gabepay',
    },
  };
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "GabePay - Пополнение Steam",
  description: "Сервис пополнения баланса Steam с минимальной комиссией",
  provider: {
    "@type": "Organization",
    name: "GabePay",
    url: "https://gabepay.ru",
  },
  areaServed: "Worldwide",
  serviceType: "Digital payment processing",
  offers: {
    "@type": "Offer",
    description: "Пополнение Steam с комиссией от 2%",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let acquiringMethods: AcquiringMethod[] = [];
  let acquiringHistory: IAcquiring[] = mockAcquiringList;
  try {
    const acquiringMethodsApi = new AcquiringMethodsApi();
    acquiringMethods = await acquiringMethodsApi.getMethods();
  } catch (error) {
    if (error instanceof ApiError) {
      console.log(error);
    }
  }
  try {
    acquiringHistory = await getCachedAcquiringHistory();
  } catch (error) {
    if (error instanceof ApiError) {
      console.log(error);
    }
  }

  return (
    <html lang="ru">
      <body
        className={cn("min-h-screen pt-6 m-0", interTight.variable)}
        suppressHydrationWarning
      >
        <AppProvider>
          <AutoRefresh intervalMs={10000} />
          <Header className="app-container h-15" />
          <Spacing size="lg" direction="vertical" />
          <main className="flex-1">
            {children}
          </main>
          <Spacing size="2xl" direction="vertical" />
          <Footer />
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
