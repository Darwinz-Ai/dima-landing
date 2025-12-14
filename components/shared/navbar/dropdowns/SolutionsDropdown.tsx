import SolutionNavLink from "../SolutionNavLink";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { dimaSolutions } from "@/data/home-page";

function SolutionsDropdown() {
    const t = useTranslations("Navbar");
    const locale = useLocale();
    const isRTL = locale === "ar";

    return (
        <div className="flex flex-col ">
            {/* Header */}
            <div>
                <h2 className={`text-3xl font-semibold ${isRTL ? 'text-right' : ''}`}>
                    {t("solutions.title")}
                </h2>
                <div
                    className={`w-8 h-0.5 bg-primary mb-4 ${isRTL ? 'ml-auto' : 'mr-auto'}`}
                ></div>
            </div>

            <div className={`flex justify-center items-center ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                {/* Customer Insights */}
                <Link href="/solutions/consumer-insights" className={`flex justify-center items-center gap-4 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                    <figure className="flex justify-center items-center">
                        <Image
                            src="/nav-links/ci-desktop.svg"
                            alt="customer insights"
                            width={200}
                            height={200}
                            priority
                            quality={90}
                        />
                    </figure>
                    <div>
                        <p className={`font-semibold hover:underline text-sm ${isRTL ? 'text-right' : ''}`}>{t("solutions.links.consumerInsights.title")}</p>
                        <p className={`text-muted-foreground text-[10px] ${isRTL ? 'text-right' : ''}`}>{t("solutions.links.consumerInsights.description")}</p>
                    </div>
                </Link>

                {/* Links list */}
                <ul className="max-w-4xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {dimaSolutions
                        .filter((s) => s.translationKey !== "consumerInsights")
                        .map((link) => (
                            <li key={link.href} className={`w-full flex items-stretch ${isRTL ? 'justify-end' : 'justify-start'}`}>
                                <SolutionNavLink {...link} isRTL={isRTL} />
                            </li>
                        ))}
                </ul>
            </div>

        </div>
    );
}

export default SolutionsDropdown;