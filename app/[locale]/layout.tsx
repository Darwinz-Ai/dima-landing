import { NextIntlClientProvider, hasLocale } from "next-intl";
import type { Metadata } from "next";
import { Cairo, Geist, } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/navbar/Navbar";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import Footer from "@/components/shared/footer/Footer";
import ReactQueryProvider from "../ReactQueryProvider";
// import PageLoader from "@/components/shared/PageLoader";
import { Toaster } from "sonner";
import Script from "next/script";
import { buildLocalizedMetadata } from "@/lib/seo";

const geistSans = Geist({
  subsets: ["latin"],
});

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"]
})

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;

  return buildLocalizedMetadata(locale, "App", {
    overrides: {
      metadataBase: new URL("https://thedar.ai"),
      openGraph: {
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
        images: ["/og-image.png"],
      },
      alternates: {
        canonical: "https://thedar.ai",
        languages: {
          "en-US": "https://thedar.ai/en",
          "ar-SA": "https://thedar.ai/ar"
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
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TGZB44QG');
          `}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body
        className={`${locale === "ar" ? cairo.className : geistSans.className} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TGZB44QG"
            height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}

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
