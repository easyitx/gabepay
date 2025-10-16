import type {Metadata} from "next";
import localFont from "next/font/local";
import Script from "next/script";

import "./globals.css";
import Header from "@/widgets/Header/Header";
import Footer from "@/widgets/Footer/Footer";

import {Spacing} from "@/shared/ui/Spacing";

import {cn} from "@/shared/lib/utils";

import {AppProvider} from "./providers";

import {Toaster} from "sonner";

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
        authors: [{name: "GabePay"}],
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
    };
}

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
        <head>
            {/* Noscript часть Яндекс.Метрики */}
            <noscript>
                <div>
                    <img
                        src="https://mc.yandex.ru/watch/104661822"
                        style={{position: 'absolute', left: '-9999px'}}
                        alt=""
                    />
                </div>
            </noscript>
        </head>
        <body
            className={cn("min-h-screen pt-6 m-0", interTight.variable)}
            suppressHydrationWarning
        >
        {/* Скрипт Яндекс.Метрики */}
        <Script
            id="yandex-metrika"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
                    (function(m,e,t,r,i,k,a){
                        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                        m[i].l=1*new Date();
                        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
                    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

                    ym(104661822, 'init', {
                        ssr:true,
                        webvisor:true,
                        clickmap:true,
                        ecommerce:"dataLayer",
                        accurateTrackBounce:true,
                        trackLinks:true
                    });
                `
            }}
        />

        <AppProvider>
            <Header className="app-container h-15"/>
            <Spacing size="lg" direction="vertical"/>
            <main className="flex-1">{children}</main>
            <Spacing size="2xl" direction="vertical"/>
            <Footer/>
            <Toaster/>
        </AppProvider>
        </body>
        </html>
    );
}