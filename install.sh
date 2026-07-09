#!/usr/bin/env bash
set -euo pipefail

# ⚡ KaesraCode Installer
# Fork of OpenCode (183k ⭐) — customized for everyone

REPO="https://github.com/hermes-kaesra/KaesraCode.git"
INSTALL_DIR="${KAESRACODE_INSTALL_DIR:-$HOME/.kaesracode}"
BIN_DIR="${KAESRACODE_BIN_DIR:-$HOME/.local/bin}"

# --- Colors ---
RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m'

info()  { echo -e "${CYAN}→${NC} $*"; }
ok()    { echo -e "${GREEN}✓${NC} $*"; }
err()   { echo -e "${RED}✗${NC} $*"; exit 1; }

echo ""
echo "⚡ KaesraCode Installer"
echo "======================"
echo ""

# --- Check prerequisites ---
info "Checking prerequisites..."

command -v git  >/dev/null 2>&1 || err "git is required. Install: apt install git / brew install git"
command -v bun  >/dev/null 2>&1 || err "bun is required. Install: curl -fsSL https://bun.sh/install | bash"
command -v node >/dev/null 2>&1 || err "node is required (bun installs it)"

ok "git, bun, node found"

# --- Clone or update ---
if [ -d "$INSTALL_DIR" ]; then
  info "Updating existing installation..."
  cd "$INSTALL_DIR"
  git pull origin hermes-features --ff-only 2>/dev/null || git fetch origin hermes-features && git checkout hermes-features && git reset --hard origin/hermes-features
  ok "Updated"
else
  info "Cloning into $INSTALL_DIR..."
  git clone --branch hermes-features "$REPO" "$INSTALL_DIR" --depth 1
  ok "Cloned"
fi

cd "$INSTALL_DIR"

# --- Install dependencies ---
info "Installing dependencies (this may take a minute)..."
bun install --frozen-lockfile 2>/dev/null || bun install
ok "Dependencies installed"

# --- Create executable wrapper ---
mkdir -p "$BIN_DIR"

cat > "$BIN_DIR/kaesracode" << 'WRAPPER'
#!/usr/bin/env bash
exec bun run --cwd "${KAESRACODE_INSTALL_DIR:-$HOME/.kaesracode}" dev "$@"
WRAPPER

chmod +x "$BIN_DIR/kaesracode"
ok "Created kaesracode → $BIN_DIR/kaesracode"

# --- PATH check ---
if [[ ":$PATH:" != *":$BIN_DIR:"* ]]; then
  echo ""
  echo "  ⚠️  Add this to your ~/.bashrc or ~/.zshrc:"
  echo ""
  echo "     export PATH=\"$BIN_DIR:\$PATH\""
  echo ""
fi

# --- Provider setup ---
echo ""
echo "⚡ KaesraCode installed!"
echo ""
echo "  Next steps:"
echo "  1. Set your API key:"
echo "     export OPENROUTER_API_KEY=\"sk-or-v1-...\""
echo ""
echo "  2. Run it:"
echo "     kaesracode"
echo ""
echo "  3. First time? Type these:"
echo "     /models  → pick your AI provider"
echo "     /goal \"build a todo app\"  → set a goal"
echo "     /team fullstack  → assemble a team"
echo ""
echo "  Docs: https://github.com/hermes-kaesra/KaesraCode"
echo ""
