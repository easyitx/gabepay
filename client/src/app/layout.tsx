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
import { AppProvider } from "./providers";
import { AcquiringMethodsApi } from "@/features/getAcquiringMethods";

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

// Генерация метаданных с SEO-оптимизацией
export async function generateMetadata(): Promise<Metadata> {
    const title = "Пополнение Steam с комиссией от 2% | GabePay — Быстро и безопасно";
    const description = "Пополняйте баланс Steam с минимальной комиссией от 2%. Любой регион, любые способы оплаты. Гарантия сделки и мгновенное зачисление. GabePay — надежный сервис для пополнения Steam кошелька.";
    const keywords = "пополнить steam, steam баланс, комиссия steam, пополнение steam кошелька, steam wallet, gabepay, пополнить стим, низкая комиссия steam";

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
        metadataBase: new URL('https://gabepay.ru'),
        alternates: {
            canonical: '/',
        },
        openGraph: {
            type: 'website',
            locale: 'ru_RU',
            siteName: 'GabePay',
            title,
            description,
            images: [
                {
                    url: '/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'GabePay - Пополнение Steam',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['/twitter-image.jpg'],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        verification: {
            // google: '',
            // yandex: '',
        },
    };
}

// Структурированные данные для SEO
const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'GabePay - Пополнение Steam',
    description: 'Сервис пополнения баланса Steam с минимальной комиссией',
    provider: {
        '@type': 'Organization',
        name: 'GabePay',
        url: 'https://gabepay.ru'
    },
    areaServed: 'Worldwide',
    serviceType: 'Digital payment processing',
    offers: {
        '@type': 'Offer',
        description: 'Пополнение Steam с комиссией от 2%'
    }
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const acquiringMethodsApi = new AcquiringMethodsApi();
    const acquiringMethods = (await acquiringMethodsApi.getMethods()) || [];

    return (
        <html lang="ru">
        <head>
            <link
                rel="preload"
                href="../shared/assets/fonts/InterTight/InterTight-Medium.ttf"
                as="font"
                type="font/ttf"
                crossOrigin="anonymous"
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
        </head>

        <body
            className={cn("min-h-screen pt-6 m-0", interTight.variable)}
            suppressHydrationWarning
            itemScope
            itemType="https://schema.org/WebPage"
        >
        <AppProvider>
            {/* Основной контент страницы */}
            <Header className="app-container h-15" />
            <Spacing size="lg" direction="vertical" />

            <main className="flex-1">
                <Banner className="app-container" />
                <Spacing size="lg" direction="vertical" />

                <section id="replenishment" itemScope itemType="https://schema.org/Service">
                    <Replenishment
                        className="app-container"
                        acquiringMethods={acquiringMethods}
                    />
                </section>

                <Spacing size="2xl" direction="vertical" />

                <ReplenishmentsList />
                <Spacing size="2xl" direction="vertical" />

                <section id="faq" itemScope itemType="https://schema.org/FAQPage">
                    <FAQ className="app-container" />
                </section>

                <Spacing size="2xl" direction="vertical" />

                <section id="guide">
                    <WhyChooseUs className="app-container" />
                </section>

                {children}
            </main>

            <Spacing size="2xl" direction="vertical" />
            <Footer />
        </AppProvider>
        </body>
        </html>
    );
}