import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { SolutionLink } from "@/types";

function SolutionNavLink({ logo, href, translationKey, isRTL }: SolutionLink & { isRTL?: boolean }) {
    const t = useTranslations("Navbar.solutions.links");

    const isDisabled = href === "/solutions/customer-experience";

    const content = (
        <article className={`flex items-center py-2 gap-4 ${isRTL ? "lg:flex-row-reverse" : "flex-row"} ${isDisabled && "opacity-60 cursor-auto"}`}>
            <figure className="flex items-center w-[65px] h-[45px] lg:w-20 lg:h-[65px] shrink-0">
                <Image
                    src={logo}
                    alt={`${translationKey} logo`}
                    width={80}
                    height={65}
                    className={`object-contain h-full w-full ${isRTL ? "object-right" : "object-left"}`}

                />
            </figure>

            <div className="space-y-1">
                <p className={`font-semibold ${!isDisabled && "hover:underline hover:text-primary"} text-sm`}>{t(`${translationKey}.title`)}</p>
                <p className="text-muted-foreground text-[10px]">{t(`${translationKey}.description`)}</p>
                {isDisabled && (
                    <p className="text-primary text-xs">
                        {t(`${translationKey}.comingSoon`)}
                    </p>
                )}
            </div>
        </article>
    );

    // Render without link if disabled
    return isDisabled ? content : <Link href={href}>{content}</Link>;
}

export default SolutionNavLink;
