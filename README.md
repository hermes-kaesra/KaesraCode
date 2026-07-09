<p align="center">
  <h1 align="center">⚡ KaesraCode</h1>
  <p align="center"><strong>The AI coding agent, customized for everyone.</strong></p>
</p>

<p align="center">
  <a href="https://github.com/hermes-kaesra/KaesraCode"><img alt="GitHub" src="https://img.shields.io/badge/GitHub-hermes--kaesra%2FKaesraCode-181717?style=flat-square&logo=github" /></a>
  <a href="https://github.com/anomalyco/opencode"><img alt="Fork of OpenCode" src="https://img.shields.io/badge/fork%20of-OpenCode%20183k%20⭐-58a6ff?style=flat-square" /></a>
  <a href="LICENSE"><img alt="License" src="https://img.shields.io/badge/license-MIT-green?style=flat-square" /></a>
</p>

---

> Fork of [anomalyco/opencode](https://github.com/anomalyco/opencode) (183k ⭐) — the open source AI coding agent, enhanced with community-requested features.

## ✨ What KaesraCode adds

| Feature | What it does |
|---------|-------------|
| 🎯 **Session Goals** | `/goal` — tell the AI what you want, it tracks progress |
| 🤖 **Agent Teams** | `/team` — assemble multi-agent squads (fullstack, research, duo) |
| 🧠 **Prompt Enhancer** | Naturalizes robotic instructions into human speech — AI understands better |
| 📁 **Custom Prompts** | Drop `.md` files in `.kaesra/prompts/` — project-specific AI personality |
| 👁️ **Transparent Theme** | `kaesra-transparent` — terminal wallpaper visible through TUI |
| 👋 **Welcome Wizard** | First-run onboarding, no confusion |
| 📊 **Session Stats** | `/stats` — token usage, message count, elapsed time |

---

## 📦 Installation

### From source (recommended)

```bash
git clone https://github.com/hermes-kaesra/KaesraCode.git
cd KaesraCode

# Install dependencies (requires Bun)
bun install

# Run
bun run dev
```

### Prerequisites

| Tool | Why |
|------|-----|
| **[Bun](https://bun.sh)** `>=1.2` | Runtime & package manager |
| **Git** | Version control |
| **An API key** | [OpenRouter](https://openrouter.ai), [Anthropic](https://console.anthropic.com), [OpenAI](https://platform.openai.com), or any OpenAI-compatible provider |

### Configure a provider

```bash
# Set your API key
export OPENROUTER_API_KEY="sk-or-v1-..."

# Or configure interactively
bun run dev
# Then type /model to select your provider
```

### Quick install script

```bash
curl -fsSL https://raw.githubusercontent.com/hermes-kaesra/KaesraCode/main/install.sh | bash
```

---

## 🚀 Quick Start

```bash
cd your-project
kaesracode
```

First time? The **Welcome Wizard** guides you through setup.

### Essential commands

| Command | Alias | Does |
|---------|-------|------|
| `/goal` | `/g`, `/hedef` | Set session goal |
| `/team` | `/takim` | Assemble agent team |
| `/stats` | `/usage` | View session stats |
| `/models` | (built-in) | Switch AI model |
| `Tab` | (built-in) | Switch between Build / Plan agents |

---

## 📁 Project Customization

Create `.kaesra/prompts/` in any project:

```bash
mkdir -p .kaesra/prompts
cat > .kaesra/prompts/style.md << 'EOF'
## Code Style
- Use const, never let
- Every function gets a JSDoc comment
- Turkish comments preferred
- Prefer async/await over .then()
EOF
```

All `.md` files are auto-injected into the AI's system prompt. Different project, different personality.

---

## 🤖 Agent Teams

KaesraCode includes three pre-built multi-agent teams:

| Team | Members | Best for |
|------|---------|----------|
| **fullstack** | Tech lead + frontend + backend + DevOps + QA | Full-stack projects |
| **research** | Lead + researcher + implementer + reviewer | Code exploration |
| **duo** | Solo dev + reviewer | Quick, lightweight work |

Activate with `/team fullstack` and the AI automatically distributes work across agents.

---

## 🎨 Themes

20+ built-in themes + our custom transparent theme:

```bash
# In-session
/theme kaesra-transparent
/theme tokyonight
/theme dracula
```

`kaesra-transparent` uses `rgba(0,0,0,0)` background — your terminal wallpaper shows through.

---

## 🔧 Building from source

```bash
git clone https://github.com/hermes-kaesra/KaesraCode.git
cd KaesraCode
bun install
bun run dev          # CLI mode
bun run dev:desktop  # Desktop app (beta)
```

---

## 🧩 Architecture

KaesraCode is a **monorepo** with 36 packages:

```
packages/
├── opencode/     # Main CLI entry
├── tui/          # Terminal UI (SolidJS + OpenTUI)
├── core/         # Core engine (Effect.ts)
├── llm/          # LLM provider layer
├── server/       # HTTP/MCP server
├── plugin/       # Plugin system
├── sdk/          # JS SDK
├── desktop/      # Desktop app (Tauri)
└── ...           # 28 more packages
```

Our custom plugins live in `packages/opencode/src/plugin/kaesra/`:
- `prompt-enhancer.ts` — Natural language transformation
- `team-agent.ts` — Multi-agent orchestration
- `custom-prompts.ts` — Project-level prompt loading
- `welcome-wizard.ts` — First-run experience

---

## 🤝 Contributing

1. Fork the repo
2. Branch off `hermes-features`: `git checkout -b my-feature hermes-features`
3. Conventional commits: `feat(scope): description`
4. PR to `hermes-features`

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full guide.

---

## 📋 Upstream vs KaesraCode

| Feature | OpenCode | KaesraCode |
|---------|:--------:|:----------:|
| TUI coding agent | ✅ | ✅ |
| Provider agnostic | ✅ | ✅ |
| Agent teams | ❌ | ✅ |
| Session goals | ❌ | ✅ |
| Custom prompts | ❌ | ✅ |
| Prompt enhancer | ❌ | ✅ |
| Transparent theme | ❌ | ✅ |
| Welcome wizard | ❌ | ✅ |
| Session stats | ❌ | ✅ |

---

## ⚖️ License

MIT — same as upstream. Fork it, ship it, build on it.

---

<p align="center">
  <sub>Built on the shoulders of <a href="https://github.com/anomalyco/opencode">OpenCode</a> by <a href="https://github.com/anomalyco">AnomalyCo</a>. Enhanced by <a href="https://github.com/hermes-kaesra">Hermes</a>.</sub>
</p>
