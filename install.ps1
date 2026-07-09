# ⚡ KaesraCode Windows Installer
# Run: powershell -ExecutionPolicy Bypass -File install.ps1

$ErrorActionPreference = "Stop"

$INSTALL_DIR = if ($env:KAESRACODE_INSTALL_DIR) { $env:KAESRACODE_INSTALL_DIR } else { "$env:USERPROFILE\.kaesracode" }
$REPO = "https://github.com/hermes-kaesra/KaesraCode.git"
$BRANCH = "dev"

Write-Host ""
Write-Host "⚡ KaesraCode Windows Installer" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check prerequisites
$hasGit = Get-Command git -ErrorAction SilentlyContinue
$hasBun = Get-Command bun -ErrorAction SilentlyContinue

if (-not $hasGit) {
    Write-Host "❌ git not found. Install: https://git-scm.com/download/win" -ForegroundColor Red
    exit 1
}
if (-not $hasBun) {
    Write-Host "❌ bun not found. Install:" -ForegroundColor Red
    Write-Host "   powershell -c 'irm bun.sh/install.ps1 | iex'" -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ git: $(git --version)" -ForegroundColor Green
Write-Host "✓ bun: $(bun --version)" -ForegroundColor Green
Write-Host ""

# Clone or update
if (Test-Path "$INSTALL_DIR\.git") {
    Write-Host "→ Updating existing installation..." -ForegroundColor Cyan
    Set-Location $INSTALL_DIR
    git fetch origin $BRANCH
    git checkout $BRANCH
    git reset --hard origin/$BRANCH
    Write-Host "✓ Updated" -ForegroundColor Green
} else {
    Write-Host "→ Cloning into $INSTALL_DIR..." -ForegroundColor Cyan
    git clone --branch $BRANCH $REPO $INSTALL_DIR --depth 1
    Set-Location $INSTALL_DIR
    Write-Host "✓ Cloned" -ForegroundColor Green
}

# Install dependencies
Write-Host "→ Installing dependencies..." -ForegroundColor Cyan
bun install
Write-Host "✓ Dependencies installed" -ForegroundColor Green

Write-Host ""
Write-Host "⚡ KaesraCode installed!" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Run it:" -ForegroundColor White
Write-Host "    cd $INSTALL_DIR" -ForegroundColor Yellow
Write-Host "    bun run dev" -ForegroundColor Yellow
Write-Host ""
Write-Host "  Or use npx from anywhere:" -ForegroundColor White
Write-Host "    npx @hermes-kaesra/kaesracode" -ForegroundColor Yellow
Write-Host ""
