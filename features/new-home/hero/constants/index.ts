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
    color: "text-[#ffb300] bg-[#fff7e6] hover:bg-[#ffe5b3] border border-[#ffb300]",
    label: "Ask about dima on Claude",
  },
  {
    name: "Gemini",
    icon: GoogleGeminiIcon,
    href: (prompt: string) =>
      `https://www.google.com/search?q=${encodeURIComponent(prompt)}&udm=50`,
    color: "text-[#7856ff] bg-[#f6f1ff] hover:bg-[#e3dbff] border border-[#7856ff]",
    label: "Ask about dima on Gemini",
  },
  {
    name: "ChatGPT",
    icon: ChatGptIcon,
    href: (prompt: string) =>
      `https://chat.openai.com/?prompt=${encodeURIComponent(
        prompt
      )}`,
    color: "text-[#10a37f] bg-[#e6faf5] hover:bg-[#c3f1e5] border border-[#10a37f]",
    label: "Ask about dima on ChatGPT",
  },
  {
    name: "Perplexity",
    icon: PerplexityAiIcon,
    href: (prompt: string) =>
      `https://www.perplexity.ai/search?q=${encodeURIComponent(prompt)}`,
    color: "text-[#266ae2] bg-[#e7f1fb] hover:bg-[#d3e3f8] border border-[#266ae2]",
    label: "Ask about dima on Perplexity",
  },
]

export const DEMO_AIPROMPT = "We are a company looking for social listening. How can dima help ?"