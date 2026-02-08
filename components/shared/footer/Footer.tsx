import Image from "next/image";
import FooterLinks from "./FooterLinks";
import SocialMediaLinks from "./SocialMediaLinks";
import LanguageSwitcher from "../LanguageSwitcher";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { dimaSolutions, footerResourcesLinks } from "@/data/home-page";
import dimaLogoWhite from "@/public/dima-logo/dima-logo-white.png"

function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <footer className="bg-[#2C2C2C] text-white rounded-t-4xl" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto flex flex-col px-6 py-12 space-y-8">
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:gap-8 ${isRTL ? "text-right" : "text-left"}`}>
          <div className="flex flex-col gap-4 mb-8">
            {/* Dima logo */}
            <figure>
              <Image src={dimaLogoWhite}
                alt="dima logo white"
                width={120}
                height={50}
                unoptimized={true}
              />
            </figure>
            <h2 className="capitalize md:text-2xl">{t("dima.description")}</h2>

            {/* CTA Button */}
            <Link href="/request-demo" className="w-fit">
              <Button className="group bg-white! text-black! hover:text-white! hover:bg-black! transition-colors duration-300 w-fit h-12" size="xl">
                <div className="relative w-[30px] h-[30px]">
                  {/* Black icon (default) */}
                  <Image
                    src="/computer-black.svg"
                    alt="black computer icon"
                    fill
                    sizes="30px"
                    className="object-contain transition-opacity duration-300 group-hover:opacity-0"

                  />
                  {/* White icon (shown on hover) */}
                  <Image
                    src="/computer.svg"
                    alt="white computer icon"
                    fill
                    sizes="30px"
                    className="object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100 absolute top-0 left-0"

                  />
                </div>

                <span className="tracking-wide">{t("dima.requestDemo")}</span>
              </Button>
            </Link>

          </div>

          {/* Footer Links */}
          <FooterLinks title={t("solutions.title")} links={dimaSolutions} section="solutions" />
          <FooterLinks title={t("resources.title")} links={footerResourcesLinks} section="resources" />

          {/* Get In Touch */}
          <div>
            <h3 className="md:text-xl font-medium mb-4">{t("getInTouch.title")}</h3>
            <a
              href={`mailto:${t("getInTouch.mail")}`}
              className="font-light hover:text-primary transition-colors duration-200"
            >
              {t("getInTouch.mail")}
            </a>
          </div>
        </div>

        {/* Social Media */}
        <div className="w-full flex justify-center lg:justify-end">
          <SocialMediaLinks />
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-white/20"></div>

        {/* Copyright */}
        <div className={`flex flex-col sm:flex-row justify-between items-center gap-4 text-sm ${isRTL ? "text-right" : "text-left"}`}>
          <LanguageSwitcher />
          <p className="text-gray-300">{t("copyright")}</p>
          <Link href="/privacy-policy" className="hover:text-primary transition-colors duration-200">
            {t("privacyPolicy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
