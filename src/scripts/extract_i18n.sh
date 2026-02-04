#!/usr/bin/env bash
set -euo pipefail

BUILD_DIR="build"
INPUT_HTML="${BUILD_DIR}/sheet.html"
OUTPUT_JSON="${BUILD_DIR}/translation.json"

if [ ! -f "$INPUT_HTML" ]; then
  echo "Error: $INPUT_HTML not found"
  exit 1
fi

# Extract:
# 1) data-i18n="key"
# 2) data-i18n-placeholder="key"
# 3) data-i18n-title="key"
# 4) ^{key}
grep -oE 'data-i18n(-placeholder|-title)?="[^"]*"|\^\{[^}]+\}' "$INPUT_HTML" \
  | sed -E '
      s/^data-i18n(-placeholder|-title)?="//;
      s/"$//;
      s/^\^\{//;
      s/\}$//;
    ' \
  | awk 'NF' \
  | sort -u \
  | {
      echo "{"
      first=true
      while IFS= read -r key; do
        # JSON escape: backslash, quote, and common control chars
        esc="$key"
        esc="${esc//\\/\\\\}"
        esc="${esc//\"/\\\"}"
        esc="${esc//$'\t'/\\t}"
        esc="${esc//$'\r'/\\r}"
        esc="${esc//$'\n'/\\n}"

        if [ "$first" = true ]; then
          first=false
        else
          echo ","
        fi
        printf '  "%s": "%s"' "$esc" "$esc"
      done
      echo
      echo "}"
    } > "$OUTPUT_JSON"

echo "Done ✔ created $OUTPUT_JSON"
