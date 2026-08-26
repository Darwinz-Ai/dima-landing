import {
  ChatGptIcon,
  ClaudeIcon,
  GoogleGeminiIcon,
} from "@hugeicons/core-free-icons"

export const GEMINI_GRADIENT_ID = "mcp-gemini-gradient"

/** How long each prompt holds before the console advances. */
export const PROMPT_DURATION_MS = 4400

export const MCP_CLIENTS = [
  { name: "Claude", icon: ClaudeIcon, tone: "text-[#D97757]" },
  { name: "ChatGPT", icon: ChatGptIcon, tone: "text-[#0D0D0D]" },
  {
    name: "Gemini",
    icon: GoogleGeminiIcon,
    tone: "[&_path]:[fill:url(#mcp-gemini-gradient)] [&_path]:[stroke:url(#mcp-gemini-gradient)]",
  },
]

export const PROMPT_META = [{ arabic: false }, { arabic: false }, { arabic: false }, { arabic: true }] as const
