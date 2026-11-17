#!/bin/bash
# KonterMatt Tutorial — build, publish & back up
# Usage (from this folder):  bash deploy.sh "what I changed"
#   • builds the site
#   • publishes the built site to GitHub Pages (branch: main)
#   • backs up the source code (branch: source)
set -e
cd "$(dirname "$0")"

MSG="${1:-update $(date '+%Y-%m-%d %H:%M')}"
REPO="https://github.com/MicromixerC/kontermattapp-tutorial.git"

echo "🔨 Installing, testing & building..."
npm install --silent --no-audit --no-fund
npm test
npm run build

echo "💾 Backing up source code (branch: source)..."
git add -A
git commit -q -m "$MSG" || echo "   (no source changes to commit)"
git push -q origin HEAD:source --force

echo "🚀 Publishing site (branch: main)..."
cd dist
rm -rf .git
git init -q -b main
touch .nojekyll
git add -A
git commit -q -m "deploy: $MSG"
git push -q "$REPO" main --force
rm -rf .git

echo ""
echo "✅ Live in ~1 minute at:"
echo "   https://micromixerc.github.io/kontermattapp-tutorial/"
