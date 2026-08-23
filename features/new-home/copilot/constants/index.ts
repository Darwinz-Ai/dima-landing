import {
  ChatGptIcon,
  ClaudeIcon,
  GoogleGeminiIcon,
} from "@hugeicons/core-free-icons"

import { type PromptInputType } from "../types"

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

export const DUMMY_PROMPTS: PromptInputType[] = [
  {
    label: "Competitor benchmarking",
    prompt:
      "Compare us with our two closest competitors over the last 30 days. What changed?",
  },
  {
    label: "Market trends",
    prompt: "Which topics are gaining momentum with Gulf audiences this month?",
  },
  {
    label: "Sentiment analysis",
    prompt: "Break down sentiment on our launch by dialect and platform.",
  },
  {
    label: "Ask in Arabic",
    prompt: "لخّص لي شكاوى العملاء هذا الأسبوع، ووش أكثر موضوع تكرر؟",
    arabic: true,
  },
]
