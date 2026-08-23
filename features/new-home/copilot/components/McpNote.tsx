
import { Icon } from "@/components/shared/Icon"
import { GEMINI_GRADIENT_ID, MCP_CLIENTS } from "../constants"

import { cn } from "@/lib/utils"

export const McpNote = () => (
  <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 text-3.125 text-copy max-sm:mt-5 max-sm:gap-x-3.5 max-sm:text-2.75">
    {/* Referenced by the Gemini mark's stroke; renders nothing itself. */}
    <svg className="absolute size-0" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={GEMINI_GRADIENT_ID} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4285F4" />
          <stop offset="52%" stopColor="#9B72CB" />
          <stop offset="100%" stopColor="#D96570" />
        </linearGradient>
      </defs>
    </svg>

    <p>
      Or connect over MCP
      <span className="sr-only">
        . Ask dima from Claude, ChatGPT or Gemini.
      </span>
    </p>

    <ul className="flex items-center gap-5 max-sm:gap-3.5" aria-hidden="true">
      {MCP_CLIENTS.map((client) => (
        <li
          className="flex items-center gap-1.5 font-[490] text-ui-text"
          key={client.name}
        >
          <Icon className={cn(client.tone)} icon={client.icon} size={16} />
          {client.name}
        </li>
      ))}
    </ul>
  </div>
)
