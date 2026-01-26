#!/usr/bin/env bash
set -euo pipefail

BUILD_DIR="build"
HTML="${BUILD_DIR}/sheet.html"
CSS="${BUILD_DIR}/styles.css"

if [[ ! -f "$HTML" ]]; then
  echo "Error: not found: $HTML"
  exit 1
fi

if [[ ! -f "$CSS" ]]; then
  echo "Error: not found: $CSS"
  exit 1
fi

if ! command -v npx >/dev/null 2>&1; then
  echo "Error: npx not found. Install Node.js (npm/npx)."
  exit 1
fi

TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

# Edit this if you have runtime / state-based classes
SAFE_LIST_REGEX=(
  "^(is-|has-|js-|state-)"
  "^(active|open|show|hide)$"
)

SAFE_ARGS=()
for re in "${SAFE_LIST_REGEX[@]}"; do
  SAFE_ARGS+=( "--safelist" "$re" )
done

echo "Purging unused CSS selectors..."
echo "  HTML: $HTML"
echo "  CSS : $CSS"

npx --yes purgecss \
  --css "$CSS" \
  --content "$HTML" \
  --output "$TMP_DIR" \
  --rejected \
  "${SAFE_ARGS[@]}"

# Replace original CSS
mv -f "$TMP_DIR/$(basename "$CSS")" "$CSS"

echo "Done ✔ styles.css cleaned"
