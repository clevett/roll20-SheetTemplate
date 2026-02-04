#!/usr/bin/env bash
set -euo pipefail

BUILD_DIR="build"
HTML="${BUILD_DIR}/sheet.html"
CSS="${BUILD_DIR}/styles.css"
OUT_DIR="${BUILD_DIR}/class_audit"

if [[ ! -f "$HTML" ]]; then
  echo "Error: not found: $HTML"
  exit 1
fi

if [[ ! -f "$CSS" ]]; then
  echo "Error: not found: $CSS"
  exit 1
fi

mkdir -p "$OUT_DIR"

# Use Node (since you already rely on npx/node for purgecss)
if ! command -v node >/dev/null 2>&1; then
  echo "Error: node not found. Install Node.js."
  exit 1
fi

node <<'NODE'
const fs = require("fs");

const BUILD_DIR = "build";
const htmlPath = `${BUILD_DIR}/sheet.html`;
const cssPath  = `${BUILD_DIR}/styles.css`;
const outDir   = `${BUILD_DIR}/class_audit`;

const html = fs.readFileSync(htmlPath, "utf8");
const css  = fs.readFileSync(cssPath, "utf8");

// --- Extract classes from HTML ---
const htmlClasses = new Set();
const classAttrRe = /class\s*=\s*("([^"]*)"|'([^']*)')/g;
let m;
while ((m = classAttrRe.exec(html)) !== null) {
  const raw = m[2] ?? m[3] ?? "";
  raw.split(/\s+/).map(s => s.trim()).filter(Boolean).forEach(c => htmlClasses.add(c));
}

// --- Extract class selectors from CSS ---
// Captures things like: .foo, .foo:hover, .foo.bar, .foo\:\hover, .foo--bar
// This is heuristic (CSS can be gnarly), but good for auditing.
const cssClasses = new Set();
const dotClassRe = /\.([^\s\.\#\[\]\(\)\{\}\,\>\+\~\:\;\"\'\\\/]+|\\.|[A-Za-z0-9_\-\\:]+)/g;

// We'll do a second pass with a simpler, more practical regex and then normalize.
const practicalRe = /\.([A-Za-z0-9_\-\\:]+)/g;

function normalizeCssClassName(s) {
  // Convert escaped sequences like "\:" to ":" for easier comparison with HTML
  return s.replace(/\\/g, "");
}

while ((m = practicalRe.exec(css)) !== null) {
  const raw = m[1];
  if (!raw) continue;
  const norm = normalizeCssClassName(raw);

  // Avoid false positives like ".5" in CSS numbers (rare but possible)
  if (/^\d/.test(norm)) continue;

  cssClasses.add(norm);
}

function writeSorted(path, set) {
  const arr = Array.from(set);
  arr.sort((a,b) => a.localeCompare(b));
  fs.writeFileSync(path, arr.join("\n") + (arr.length ? "\n" : ""));
}

const htmlList = `${outDir}/classes_from_html.txt`;
const cssList  = `${outDir}/classes_from_css.txt`;
writeSorted(htmlList, htmlClasses);
writeSorted(cssList,  cssClasses);

// --- Diffs (super helpful for finding exceptions) ---
const cssOnly = new Set([...cssClasses].filter(c => !htmlClasses.has(c)));
const htmlOnly = new Set([...htmlClasses].filter(c => !cssClasses.has(c)));

writeSorted(`${outDir}/classes_css_only.txt`, cssOnly);
writeSorted(`${outDir}/classes_html_only.txt`, htmlOnly);

console.log(`Wrote:
- ${htmlList}
- ${cssList}
- ${outDir}/classes_css_only.txt
- ${outDir}/classes_html_only.txt
`);
NODE
