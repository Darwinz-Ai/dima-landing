import { NextIntlClientProvider, hasLocale } from "next-intl";
import type { Metadata } from "next";
import { Cairo, Geist, } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/navbar/Navbar";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import Footer from "@/components/shared/footer/Footer";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import { Toaster } from "sonner";
import Script from "next/script";
import { buildLocalizedMetadata } from "@/lib/seo";
import { GoogleTagManager } from '@next/third-parties/google';
import { MotionProvider } from "../providers/MotionProvider";

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
});

const cairo = Cairo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
})


export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;

  return buildLocalizedMetadata(locale, "App", {
    overrides: {
      metadataBase: new URL("https://thedar.ai"),
      openGraph: {
        url: `https://thedar.ai/${locale}`,
        siteName: "dima",
        locale,
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
        images: ["/og-image.png"],
      },
      alternates: {
        canonical: `https://thedar.ai/${locale}`,
        languages: {
          en: "https://thedar.ai/en",
          ar: "https://thedar.ai/ar",
          "x-default": "https://thedar.ai/",
        }
      },
    },
  });
}

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
      <GoogleTagManager gtmId="GTM-TGZB44QG" />
      <body
        className={`${locale === "ar" ? cairo.className : geistSans.className} antialiased`}
      >
        <NextIntlClientProvider>
          <ReactQueryProvider>
            <MotionProvider >
              <div className="min-h-dvh h-full flex flex-col justify-between">
                <Navbar />
                <div className="flex-1">
                  {children}
                  <Toaster richColors />
                </div>
                <Footer />
              </div>
            </MotionProvider>
          </ReactQueryProvider>
        </NextIntlClientProvider>
        <Script src="https://static.claydar.com/init.v1.js?id=cxOAeXXAB5" strategy="lazyOnload" />
      </body>
    </html>
  );
}
