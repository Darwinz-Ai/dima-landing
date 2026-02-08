import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { SolutionLink } from "@/types";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Image from "next/image";

function SolutionCard({ logo, href, translationKey }: SolutionLink) {
  const locale = useLocale();
  const t = useTranslations("Home.dimaSuite");
  const isRTL = locale === "ar";

  return (
    <article
      className={`flex flex-col justify-between h-full gap-3 shadow-[0_0_15px_rgba(0,0,0,0.08)] rounded-3xl py-[30px] px-6 ${isRTL ? "items-end text-right" : "items-start text-left"
        }`}
      dir="ltr"
    >
      {/* Logo */}
      <figure className="flex justify-center items-center max-h-[65px] w-auto shrink-0">
        <Image
          src={logo}
          alt={translationKey}
          width={80}
          height={60}
          className="object-contain min-h-[65px] max-h-[65px]"

        />
      </figure>

      {/* Title + Description */}
      <div className={`flex flex-col gap-2 w-full ${isRTL ? "items-end" : "items-start"}`}>
        <h3 className="text-[22px]">{t(`solutions.${translationKey}.title`)}</h3>
        <p className="text-[15px] text-muted-foreground">
          {t(`solutions.${translationKey}.description`)}
        </p>
      </div>

      {/* Explore / Coming Soon */}
      <div className={`w-full ${isRTL ? "text-right" : "text-left"}`}>
        {href === "/solutions/customer-experience" ? (
          <p className="text-primary">{t("comingSoon")}</p>
        ) : (
          <Link href={href} aria-label={`Go To ${t(`solutions.${translationKey}.title`)}`}>
            <Button variant="outline" className="px-3 py-2 h-[34px] font-normal">
              {t("explore")}
            </Button>
          </Link>
        )}
      </div>
    </article>
  );
}

export default SolutionCard;
