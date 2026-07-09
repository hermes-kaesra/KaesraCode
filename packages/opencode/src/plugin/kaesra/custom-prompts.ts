// kaesra/custom-prompts.ts
// Loads custom system prompts from .kaesra/prompts/*.md
// Gives every project its own AI personality

import type { Plugin, Hooks } from "../index"
import { readFileSync, existsSync, readdirSync } from "node:fs"
import { join, dirname } from "node:path"

/**
 * Scans upward from cwd to find .kaesra/prompts/ directories.
 * Loads all .md files and injects them into the system prompt.
 */
function loadPromptFiles(): string[] {
  const prompts: string[] = []
  const seen = new Set<string>()

  // Walk up from cwd to find .kaesra/prompts/
  let current = process.cwd()
  while (true) {
    const promptsDir = join(current, ".kaesra", "prompts")
    if (existsSync(promptsDir)) {
      try {
        const files = readdirSync(promptsDir).filter(f => f.endsWith(".md"))
        for (const file of files.sort()) {
          const fullPath = join(promptsDir, file)
          if (seen.has(fullPath)) continue
          seen.add(fullPath)
          const content = readFileSync(fullPath, "utf-8").trim()
          if (content) {
            prompts.push(`## 📁 .kaesra/prompts/${file}\n\n${content}`)
          }
        }
      } catch {}
    }

    const parent = dirname(current)
    if (parent === current) break
    current = parent
  }

  return prompts
}

export function CustomPrompts(): Plugin {
  return async (_input) => {
    const hooks: Hooks = {
      "experimental.chat.system.transform": async (_input, output) => {
        const customPrompts = loadPromptFiles()
        if (customPrompts.length > 0) {
          // Insert custom prompts after the header but before tools
          output.system = [...output.system.slice(0, 1), ...customPrompts, ...output.system.slice(1)]
        }
      },
    }
    return hooks
  }
}
