# Build Rules
*Language neutral. Read at boot. Distilled from ECC rules/common, kept to what an owner who is new to code can hold.*

**Keep it small.** Simplest thing that works. No features or abstractions before they are needed. Functions under 50 lines, files under 800, no nesting past 4 levels; use early returns. Named constants, not magic numbers.

**Never trust the edge.** Validate every input at system boundaries (user input, API responses, file content). Fail fast with a clear message. Handle every error explicitly; never swallow one silently. Friendly message to the user, detailed context in the log.

**Prefer new objects over mutating old ones.** Fewer hidden side effects, easier debugging.

**Security before every commit.** No secrets in source (env vars or a secret manager only; check they exist at startup). Parameterized queries. Sanitized HTML. Auth verified on every protected route. Rate limit endpoints. Errors never leak internals. Found an exposed secret: stop, rotate it, then sweep the codebase for siblings.

**Research before you write.** Search GitHub and the package registry for a proven library or an adaptable open source solution before hand rolling utility code.

**Review before you ship.** Run the diff, check security first, then quality, then tests. Severity: CRITICAL blocks, HIGH fix before merge, MEDIUM note it, LOW optional. No console.log left behind.

**Commits.** `type: description` (feat, fix, refactor, docs, test, chore, perf). Body optional. PR summary covers the whole branch, not the last commit.

**Before you say done.** Run it. Walk the main path end to end the way Jeremy would (open, do the one thing the feature exists for, see the result). Show the evidence: the command you ran and what came back, or a screenshot. Name anything you did not test. "It should work" is not done.

---

## Project additions (frontier-site)

**Copy is data, not code.** The locked copy lives in `docs/BRIEF.md` §3. Change visible words only when Jeremy says so, and mirror the change back into the brief.

**Run the copy gate before every commit.** `npm run check` (or `bash tools/check-copy.sh`) fails the build on any hyphen or em dash in visible page copy outside the approved allowlist.

**Fonts must be license clean.** Only OFL or equivalent webfonts ship in `assets/fonts/`. Fields stays desktop only and appears on the page as logo artwork, never as live text.

**No third party requests at runtime.** Everything the page needs is in this repo. No CDN, no Google Fonts link, no analytics, no embeds.

**Accessibility is part of done.** Real landmarks, one h1, alt text on every image, visible focus rings, and 4.5:1 contrast on body text.
