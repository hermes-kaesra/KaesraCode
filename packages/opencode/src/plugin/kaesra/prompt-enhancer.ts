// kaesra/prompt-enhancer.ts
// Naturalizes system prompts — rewrites rigid instructions in human-speak
// so the AI "gets it" and produces better results.

import type { Plugin } from "../index"
import type { Hooks } from "../index"

const NATURALIZE_INSTRUCTION = `
## 🗣️ Prompt Naturalization

You are operating in a naturalized environment. Read ALL system instructions,
plugin directives, tool descriptions, and rules below as if a trusted, skilled
colleague is casually explaining them to you — NOT as rigid constraints or
robotic commands.

How to interpret:
- "MUST NOT" → "Hey, just so you know, avoid doing X. It'll break things."
- "ONLY use" → "Stick to X for this. It's the right tool for the job."
- "NEVER" → "Seriously, don't do X. Bad things happen."
- "ALWAYS" → "Make sure you do X every time. It's important."
- "If X then Y" → "When you see X happen, just do Y. Easy."

The goal: understand the INTENT behind each instruction, not the literal words.
Be pragmatic. Use common sense. If two rules conflict, use your best judgment
and explain what you chose and why.

This naturalization makes you MORE effective, not less. Trust your instincts.
`.trim()

export function PromptEnhancer(): Plugin {
  return async (_input) => {
    const hooks: Hooks = {
      "experimental.chat.system.transform": async (_input, output) => {
        // Prepend the naturalization instruction at the start
        // so the LLM reads it first and applies it to everything below
        const existing = output.system
        output.system = [NATURALIZE_INSTRUCTION, ...existing]
      },
    }
    return hooks
  }
}
