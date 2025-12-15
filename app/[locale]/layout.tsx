import { NextIntlClientProvider, hasLocale } from "next-intl";
import type { Metadata } from "next";
import { Cairo, Geist, } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/navbar/Navbar";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import Footer from "@/components/shared/footer/Footer";
import ReactQueryProvider from "../ReactQueryProvider";
import PageLoader from "@/components/shared/PageLoader";
import { Toaster } from "sonner";
import Script from "next/script";

const geistSans = Geist({
  subsets: ["latin"],
});

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"]
})

export const metadata: Metadata = {
  title: "TheDar.AI",
  description:
    "A Saudi-Egyptian startup offering an AI Copilot for Brand Managers, Marketers & PR Professionals at leading agencies & enterprises in MENA. With the AI Copilot called dima©, users are able to enhance their daily productivity by up to 80% through finding innovative ways to truly understand brand & audience perception for their products & offerings, analyzing hundreds of thousands of data points from a variety of key channels.",
  keywords: [
    "TheDar.AI",
    "dima",
    "media monitoring",
    "AI copilot",
    "PR analytics",
    "social listening",
    "brand monitoring",
    "Arabic media",
    "MENA marketing",
    "crisis detection",
  ],
  metadataBase: new URL("https://thedar.ai"),

  openGraph: {
    title: "dima - Your Media Monitoring Copilot",
    description:
      "AI-powered media monitoring for marketers, PR teams, and brand managers. Track campaigns, detect crises, analyze competitors, and automate reporting — all in one place.",
    url: "https://thedar.ai",
    siteName: "dima",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "dima OG Image",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "dima - Your Media Monitoring Copilot",
    description:
      "AI-powered media monitoring for marketers, PR teams, and brand managers. Track campaigns, detect crises, analyze competitors, and automate reporting — all in one place.",
    images: ["/og-image.png"],
  },

  alternates: {
    canonical: "https://thedar.ai",
  },
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} suppressHydrationWarning>
      <body
        className={`${locale === "ar" ? cairo.className : geistSans.className} antialiased`}
      >
        <NextIntlClientProvider>
          <ReactQueryProvider>
            <div className="min-h-dvh h-full flex flex-col justify-between">
              <Navbar />
              <div className="flex-1">
                {/* <PageLoader /> */}
                {children}
                <Toaster richColors />
              </div>
              <Footer />
            </div>
          </ReactQueryProvider>
        </NextIntlClientProvider>
        <Script src="https://static.claydar.com/init.v1.js?id=cxOAeXXAB5"></Script>
      </body>
    </html>
  );
}
