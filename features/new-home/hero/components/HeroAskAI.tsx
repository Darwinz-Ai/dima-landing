import { AI_ASSISTANTS } from '../constants'
import { Icon } from '@/components/shared/Icon'
import { cn } from '@/lib/utils'
import { useTranslations } from "next-intl"

const HeroAskAI = () => {
    const t = useTranslations("Home_New.hero")
    return (
        <div className="mt-4 flex shrink-0 items-center justify-center gap-3 max-sm:mt-6 max-sm:flex-col max-sm:gap-2">
            <span className="text-[1.05rem] font-medium text-label max-sm:text-[0.95rem]">
                {t("askAI.prompt_cta")}
            </span>
            <div className="flex gap-2">
                {AI_ASSISTANTS.map((assistant) => (
                    <a
                        key={assistant.name}
                        href={assistant.href(t("askAI.prompt_ai"))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            "flex items-center justify-center rounded-sm p-1.5 opacity-90 transition-opacity duration-150 hover:opacity-100",
                            assistant.color
                        )}
                        aria-label={t(`askAI.assistants.${assistant.label}`)}
                        title={t(`askAI.assistants.${assistant.label}`)}
                    >
                        <Icon icon={assistant.icon} size={20} />
                    </a>
                ))}
            </div>
        </div>
    )
}

export default HeroAskAI