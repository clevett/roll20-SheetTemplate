#!/usr/bin/env bash

set -e

BUILD_DIR="build"
INPUT_HTML="${BUILD_DIR}/sheet.html"
OUTPUT_JSON="${BUILD_DIR}/translation.json"

if [ ! -f "$INPUT_HTML" ]; then
  echo "Error: $INPUT_HTML not found"
  exit 1
fi

# Extract, dedupe, and sort keys (line-based)
grep -o 'data-i18n="[^"]*"' "$INPUT_HTML" \
  | sed 's/data-i18n="//;s/"$//' \
  | sort -u \
  | {
      echo "{"
      first=true
      while IFS= read -r key; do
        if [ "$first" = true ]; then
          first=false
        else
          echo ","
        fi
        printf '  "%s": "%s"' "$key" "$key"
      done
      echo
      echo "}"
    } > "$OUTPUT_JSON"

echo "Done ✔ created $OUTPUT_JSON"
