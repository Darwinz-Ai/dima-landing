import { BookOpenText, CircleHelp } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";

const resourceLinks = [
    {
        href: "/blogs",
        translationKey: "blogs",
        icon: BookOpenText,
    },
    {
        href: "/faq",
        translationKey: "faqs",
        icon: CircleHelp,
    },
] as const;

function ResourcesDropdown() {
    const t = useTranslations("Navbar.resources");
    const locale = useLocale();
    const isRTL = locale === "ar";

    return (
        <div className="flex flex-col">
            <div>
                <h2 className={`text-3xl font-semibold ${isRTL ? "text-right" : ""}`}>
                    {t("title")}
                </h2>
                <div
                    className={`mb-4 h-0.5 w-8 bg-primary ${isRTL ? "ml-auto" : "mr-auto"}`}
                ></div>
            </div>

            <ul className={`grid gap-3 md:grid-cols-2 ${isRTL ? "text-right" : ""}`}>
                {resourceLinks.map((link) => {
                    const Icon = link.icon;

                    return (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`flex h-full items-center gap-4 rounded-2xl px-3 py-2 transition-colors hover:bg-surface ${isRTL ? "flex-row-reverse" : ""}`}
                            >
                                <figure className="flex h-[65px] w-20 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                                    <Icon className="size-8 text-primary" strokeWidth={1.6} />
                                </figure>
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold hover:text-primary hover:underline">
                                        {t(`links.${link.translationKey}.title`)}
                                    </p>
                                    <p className="text-[10px] text-muted-foreground">
                                        {t(`links.${link.translationKey}.description`)}
                                    </p>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default ResourcesDropdown;
