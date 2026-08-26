import { NextIntlClientProvider, hasLocale } from "next-intl";
import type { Metadata } from "next";
import { Cairo, Geist, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/navbar/Navbar";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import Footer from "@/components/shared/footer/Footer";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import { Toaster } from "sonner";
import Script from "next/script";
import { buildLocalizedMetadata } from "@/lib/seo";
import { GoogleAnalytics } from "@next/third-parties/google";
import { MotionProvider } from "../providers/MotionProvider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SiteFooter } from "@/components/shared/footer/SiteFooter";

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
});

const cairo = Cairo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-display-face",
  display: "swap",
});

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
        },
      },
    },
  });
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const isAr = locale === "ar";

  return (
    <html
      lang={locale}
      dir={isAr ? "rtl" : "ltr"}
      className={`h-full overflow-hidden antialiased ${displayFont.variable}`}
      suppressHydrationWarning
    >
      <GoogleAnalytics gaId="G-JJGJEDJL2Q" />
      <body
        className={`h-full overflow-hidden bg-surface font-sans text-ink ${isAr ? cairo.className : geistSans.className
          }`}
      >
        <NextIntlClientProvider>
          <ReactQueryProvider>
            <MotionProvider>
              <ScrollArea
                className="h-dvh w-full"
                viewportClassName="scroll-smooth motion-reduce:scroll-auto"
                id="app-scroll-area"
              >
                <Navbar />
                <main className="flex-1">{children}</main>
                <Toaster richColors />
                {/* <Footer /> */}
                <SiteFooter />
              </ScrollArea>
            </MotionProvider>
          </ReactQueryProvider>
        </NextIntlClientProvider>

        <Script
          src="https://static.claydar.com/init.v1.js?id=cxOAeXXAB5"
          strategy="lazyOnload"
        />

        {/* LinkedIn Insight Tag JS */}
        <Script id="linkedin-insight-tag" strategy="lazyOnload">
          {`
            _linkedin_partner_id = "10781313";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);})(window.lintrk);
          `}
        </Script>

        {/* LinkedIn Insight Tag NoScript Fallback */}
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src="https://px.ads.linkedin.com/collect/?pid=10781313&fmt=gif"
          />
        </noscript>
      </body>
    </html>
  );
}