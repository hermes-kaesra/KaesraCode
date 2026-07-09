# ⚡ KaesraCode

> Forked from [anomalyco/opencode](https://github.com/anomalyco/opencode) (183k ⭐)
> Agent harness enhanced with natural language understanding and multi-agent orchestration.

## Features

| Feature | Status | Description |
|---------|--------|-------------|
| 🎯 `/goal` | ✅ | Session goal tracking with persistent storage |
| 🔍 Transparent TUI | ✅ | `kaesra-transparent` theme — terminal background visible |
| 🧠 Prompt Enhancer | ✅ | Naturalizes system prompts — AI "understands" instructions better |
| 🤖 Multi-Agent Teams | ✅ | `/team` command — fullstack, research, duo templates |
| ⌨️ Vim keybindings | 📋 | Coming soon |

## Prompt Enhancer

System prompts and plugin instructions are often written in rigid, robotic language.
The Prompt Enhancer rewrites these in natural, human-like speech so the AI
interprets them correctly and produces better results.

- "MUST NOT" → "Hey, avoid doing X. It'll break things."
- "ONLY use" → "Stick to X, it's the right tool."
- "NEVER" → "Seriously, don't. Bad things happen."

## Multi-Agent Teams

Use `/team` to assemble an agent team:

- **fullstack**: Tech lead + frontend + backend + DevOps + QA
- **research**: Research lead + researcher + implementer + reviewer
- **duo**: Solo dev + reviewer

The team leader decomposes tasks, delegates to workers, and aggregates results.

## Install

```bash
npm i -g kaesracode
# or from source
git clone https://github.com/hermes-kaesra/KaesraCode
cd KaesraCode && bun install && bun run dev
```

## License

MIT — same as upstream.
