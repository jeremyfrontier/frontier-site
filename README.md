# frontier-site

The single scroll static page for Jeremy Rivers at thefrontiergroup.co. No build step, no dependencies, no tracking. Open `index.html`.

- **Read first:** `CONTEXT.md`, then `AGENTS.md`.
- **The spec:** `docs/BRIEF.md`. Copy in §3 is locked.
- **Why the build differs from the spec:** `docs/DECISIONS.md`.
- **Shipping it:** `docs/DEPLOY.md`.

## Preview
```
python3 -m http.server 4173
```
http://localhost:4173

## Copy gate
```
bash tools/check-copy.sh index.html
```
Fails on any hyphen or dash in visible copy. Quotes from other people are exempt.
