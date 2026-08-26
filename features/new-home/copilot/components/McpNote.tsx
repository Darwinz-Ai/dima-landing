import { Icon } from "@/components/shared/Icon"
import { GEMINI_GRADIENT_ID, MCP_CLIENTS } from "../constants"

import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

export const McpNote = () => {
  const t = useTranslations("Home_New.copilot")

  return (
    <div className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 text-3.625 text-copy max-sm:mt-6 max-sm:gap-x-5 max-sm:text-3.25">
      <svg className="absolute size-0" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={GEMINI_GRADIENT_ID} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4285F4" />
            <stop offset="52%" stopColor="#9B72CB" />
            <stop offset="100%" stopColor="#D96570" />
          </linearGradient>
        </defs>
      </svg>

      <p>{t("mcpNote")}</p>

      <ul className="flex items-center gap-8 max-sm:gap-5" aria-hidden="true">
        {MCP_CLIENTS.map((client) => (
          <li
            className="flex items-center gap-2.5 font-[490] text-ui-text"
            key={client.name}
          >
            <Icon className={cn(client.tone)} icon={client.icon} size={24} />
            {client.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
