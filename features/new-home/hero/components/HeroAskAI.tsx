import { AI_ASSISTANTS, DEMO_AIPROMPT } from '../constants'
import { Icon } from '@/components/shared/Icon'
import { cn } from '@/lib/utils'

const HeroAskAI = () => {
    return (
        <div className="mt-4 flex shrink-0 items-center justify-center gap-3 opacity-90 transition-opacity hover:opacity-100 max-sm:mt-3">
            <span className="text-[0.95rem] font-medium text-label">Want a third-party opinion? Ask AI:</span>
            <div className="flex gap-2">
                {AI_ASSISTANTS.map((assistant) => (
                    <a
                        key={assistant.name}
                        href={assistant.href(DEMO_AIPROMPT)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            "flex items-center justify-center rounded-full p-1.5 transition-colors duration-150",
                            assistant.color
                        )}
                        aria-label={assistant.label}
                        title={assistant.label}
                    >
                        <Icon icon={assistant.icon} size={18} />
                    </a>
                ))}
            </div>
        </div>
    )
}

export default HeroAskAI