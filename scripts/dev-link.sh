#!/usr/bin/env bash
set -euo pipefail

# Starts watch-mode rebuilds for all Atlantis packages, with output directed
# to a consumer app's node_modules for live development.
#
# Usage:
#   ./scripts/dev-link.sh <platform> <consumer-path>
#
# Examples:
#   ./scripts/dev-link.sh native ~/workspace/jobber-mobile
#   ./scripts/dev-link.sh web ~/workspace/jobber-frontend

PLATFORM="${1:-}"
CONSUMER_PATH="${2:-}"

if [[ -z "$PLATFORM" || -z "$CONSUMER_PATH" ]]; then
  echo "Usage: $0 <native|web> <path-to-consumer-app>"
  echo ""
  echo "Examples:"
  echo "  $0 native ../jobber-mobile"
  echo "  $0 web ../jobber-frontend"
  exit 1
fi

if [[ "$PLATFORM" != "native" && "$PLATFORM" != "web" ]]; then
  echo "Error: platform must be 'native' or 'web', got '$PLATFORM'"
  exit 1
fi

if [[ ! -d "$CONSUMER_PATH/node_modules" ]]; then
  echo "Error: '$CONSUMER_PATH' doesn't look like a consumer app (no node_modules/)"
  exit 1
fi

CONSUMER_PATH="$(cd "$CONSUMER_PATH" && pwd)"
NM="$CONSUMER_PATH/node_modules"

echo "Platform:  $PLATFORM"
echo "Consumer:  $CONSUMER_PATH"
echo ""

if [[ "$PLATFORM" == "native" ]]; then
  COMP_PKG="components-native"
  COMP_CMD="tsc -p tsconfig.build.json --watch --preserveWatchOutput --outDir $NM/@jobber/components-native/dist"
else
  COMP_PKG="components"
  COMP_CMD="ATLANTIS_DIST_DIR=$NM/@jobber/components/dist rollup --config --watch"
fi

npx concurrently -k \
  -n design,fmt,hooks,$COMP_PKG \
  -c blue,green,yellow,magenta \
  "cd packages/design && ATLANTIS_DIST_DIR=$NM/@jobber/design/dist chokidar 'src/**/*.ts' 'src/**/*.json' 'src/**/*.svg' --ignore 'src/assets/**' -c 'npm run generate:assets && npm run build:design'" \
  "cd packages/formatters && ATLANTIS_DIST_DIR=$NM/@jobber/formatters/dist rollup -c rollup.config.mjs --watch" \
  "cd packages/hooks && ATLANTIS_DIST_DIR=$NM/@jobber/hooks/dist rollup -c rollup.config.mjs --watch" \
  "cd packages/$COMP_PKG && $COMP_CMD"
