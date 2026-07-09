# ⚡ KaesraCode

> Forked from [anomalyco/opencode](https://github.com/anomalyco/opencode) (183k ⭐)
> **Herkes için** özelleştirilmiş AI coding agent.

---

## 🎯 Neden KaesraCode?

OpenCode harika ama herkese göre değil. KaesraCode şunları ekliyor:

| Özellik | OpenCode | KaesraCode |
|---------|----------|------------|
| 🎯 **Session Goals** | ❌ | `/goal` — ne yapacağını bil |
| 👁️ **Transparan Tema** | ❌ | Terminal wallpaper'ın görünür |
| 🧠 **Prompt Enhancer** | ❌ | Sistem komutlarını doğal dile çevirir |
| 🤖 **Agent Teams** | ❌ | `/team` — fullstack, research, duo |
| 📁 **Custom Prompts** | ❌ | `.kaesra/prompts/*.md` — proje AI kişiliği |
| 👋 **Welcome Wizard** | ❌ | İlk açılışta rehberlik |
| 📊 **Session Stats** | ❌ | `/stats` — token, süre, mesaj sayısı |

---

## 🚀 Komutlar

| Komut | Alias | Ne Yapar |
|-------|-------|----------|
| `/goal` | `/g`, `/hedef` | Oturum hedefi belirle |
| `/team` | `/takim`, `/agents` | Çoklu agent takımı kur |
| `/stats` | `/usage`, `/cost` | Oturum istatistikleri |
| `/models` | (yerleşik) | Model değiştir |
| `/theme` | (yerleşik) | Tema değiştir |

---

## 📁 `.kaesra/prompts/`

Projene özel AI kişiliği tanımla. `.md` dosyalarını `.kaesra/prompts/` dizinine koy yeter:

```markdown
<!-- .kaesra/prompts/style.md -->
## Kod Stili
- Her fonksiyona JSDoc yorumu ekle
- `const` kullan, `let` kullanma
- Türkçe yorum yaz
```

Tüm `.md` dosyaları otomatik olarak sistem prompt'una eklenir.

---

## 🤖 Agent Teams

3 hazır takım şablonu:

- **fullstack**: Tech lead + frontend + backend + DevOps + QA
- **research**: Research lead + researcher + implementer + reviewer  
- **duo**: Solo dev + reviewer (hafif, hızlı)

---

## 🔧 Teknik

```bash
git clone https://github.com/hermes-kaesra/KaesraCode
cd KaesraCode
bun install
bun run dev
```

### Plugin Mimarisi

Tüm KaesraCode özellikleri plugin olarak yazıldı:
- `packages/opencode/src/plugin/kaesra/prompt-enhancer.ts`
- `packages/opencode/src/plugin/kaesra/team-agent.ts`
- `packages/opencode/src/plugin/kaesra/custom-prompts.ts`
- `packages/opencode/src/plugin/kaesra/welcome-wizard.ts`

---

## 📋 Roadmap

- [ ] Vim keybindings (hjkl)
- [ ] Web dashboard
- [ ] Python SDK
- [ ] Sandbox mode (Docker)
- [ ] VS Code / Cursor eklentisi
- [ ] Görsel çıktı (diyagram, UI mockup)

---

<p align="center">
  <sub>⚡ MIT License — Fork it, ship it.</sub>
</p>
