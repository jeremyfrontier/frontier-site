#!/usr/bin/env bash
# Copy gate: no hyphens and no em dashes in visible page copy.
# Allowlist: "day-to-day" (approved by Jeremy), plus anything inside
# <style>, <script>, HTML tags, comments, and href/src/class values.
set -u
FILE="${1:-index.html}"
python3 - "$FILE" <<'PY'
import re, sys
path = sys.argv[1]
html = open(path, encoding="utf-8").read()
html = re.sub(r"<!--.*?-->", " ", html, flags=re.S)
html = re.sub(r"<(script|style|svg|blockquote)\b.*?</\1>", " ", html, flags=re.S | re.I)
html = re.sub(r"<[^>]+>", " ", html)
ALLOW = ["day-to-day"]
for a in ALLOW:
    html = html.replace(a, "dayXtoXday")
bad = []
for n, line in enumerate(html.splitlines(), 1):
    for m in re.finditer(r"\S*[—–-]\S*", line):
        bad.append((n, m.group(0).strip()))
if bad:
    print("COPY GATE FAILED: hyphen or dash in visible copy")
    for n, tok in bad:
        print(f"  line ~{n}: {tok}")
    sys.exit(1)
print("COPY GATE PASSED: no hyphens or dashes in visible copy")
PY
