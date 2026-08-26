import { ChatGptIcon, ClaudeIcon, GoogleGeminiIcon, PerplexityAiIcon } from "@hugeicons/core-free-icons"
import { type HeroReadoutType } from "../types"

export const HERO_READOUT: [HeroReadoutType, HeroReadoutType] = [
  {
    stat: {
      caption: "Trend detection",
      value: "Early",
      detail: "spot the shift before it becomes the story",
    },
    read: {
      caption: "Crisis management",
      body: "Catch unusual spikes, trace what caused them, and brief the right team while the story is still moving.",
      chips: ["Real-time alerts", "Root cause"],
    },
  },
  {
    stat: {
      caption: "Arabic first",
      value: "Native",
      detail: "dialect, sarcasm and emotion understood as written",
    },
    read: {
      caption: "Ask dima",
      body: "Ask your live data a question, then export the answer as a client-ready report.",
      chips: ["Export reports", "Ready to share"],
    },
  },
]

export const AI_ASSISTANTS = [
  {
    name: "Claude",
    icon: ClaudeIcon,
    href: (prompt: string) =>
      `https://claude.ai/new?q=${encodeURIComponent(prompt)}`,
    color:
      "text-[#fc9502] bg-gradient-to-br from-[#fff5e1] via-[#ffedb5] to-[#fff8ed] border border-[#ffdfa1] shadow-sm",
    label: "claude",
  },
  {
    name: "Gemini",
    icon: GoogleGeminiIcon,
    href: (prompt: string) =>
      `https://www.google.com/search?q=${encodeURIComponent(prompt)}&udm=50`,
    color:
      "[&_path]:[fill:url(#mcp-gemini-gradient)] [&_path]:[stroke:url(#mcp-gemini-gradient)] bg-gradient-to-br from-[#E2EEFA] via-[#C9E1F6] to-[#F2F6FA] border border-[#B6E0FE] shadow-sm",
    label: "gemini",
  },
  {
    name: "ChatGPT",
    icon: ChatGptIcon,
    href: (prompt: string) =>
      `https://chat.openai.com/?prompt=${encodeURIComponent(prompt)}`,
    color:
      "text-[#10a37f] bg-gradient-to-br from-[#dcfff4] via-[#e6f9fa] to-[#e8fcf5] border border-[#bde9dd] shadow-sm",
    label: "chatgpt",
  },
  {
    name: "Perplexity",
    icon: PerplexityAiIcon,
    href: (prompt: string) =>
      `https://www.perplexity.ai/search?q=${encodeURIComponent(prompt)}`,
    color:
      "text-[#266ae2] bg-gradient-to-br from-[#e7f1ff] via-[#d5e7fc] to-[#eaf4ff] border border-[#b1d2fa] shadow-sm",
    label: "perplexity",
  },
]

