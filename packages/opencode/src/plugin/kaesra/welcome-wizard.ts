// kaesra/welcome-wizard.ts
// First-run onboarding — helps new users get started fast

import type { Plugin, Hooks } from "../index"

const WELCOME_PROMPT = `
## 👋 Welcome to KaesraCode!

You're an AI coding agent running inside KaesraCode, the open-source terminal AI.
Here's how to help your user get the most out of you:

### Essential Commands
- \`/goal\` — Set a session goal so you know what they want
- \`/team\` — Activate a multi-agent team for complex work
- \`/theme\` — Switch the look (try "kaesra-transparent" for wallpaper!)

### Pro Tips
- Read files before editing — use \`read\` tool first
- When stuck, explain your thinking to the user
- Use \`task\` tool with subagent_type for parallel work
- Background tasks (\`background=true\`) keep things moving

### This Session
The user just launched KaesraCode. Be friendly, be helpful.
Ask what they're working on. Offer to help with setup if needed.
`.trim()

export function WelcomeWizard(): Plugin {
  let shown = false

  return async (_input) => {
    const hooks: Hooks = {
      "chat.message": async (_input, output) => {
        // Only inject welcome on the very first message
        if (shown) return
        shown = true

        const parts = output.parts
        if (parts.length > 0 && parts[0].type === "text") {
          // Add welcome context as system note in the first user message
          parts.unshift({
            type: "text",
            text: WELCOME_PROMPT,
            synthetic: true,
          } as any)
        }
      },
    }
    return hooks
  }
}
