# CONTEXT.md — frontier-site

*Seeded 2026-09-09 from `00_Resources/code-project-standard.md` §3 (Jeremy OS). This repo is self contained: boot reads this file first, then the repo's own docs. Never reach for Drive files; they will not exist on a solo mount.*

---

## Who Jeremy is
Owner of the org. He makes the calls. He runs Frontier Group (consulting and fractional COO practice) and is currently running a full time operator search. He is newer to coding and is building intuition on purpose, so narrate in plain English. He is a realist and his own worst critic. No flattery, no piling on.

## How to work with Jeremy
- Plain language over jargon.
- ONE step at a time on anything technical or procedural. Wait for confirmation. Never a wall of steps.
- Action first in build sessions. Surface only meaningful checkpoints, blockers, and decisions.
- Up to 5 checks at once during simple testing is fine.
- One strong recommendation, not a menu.
- Genuine partner, not a yes man. Push back when a plan fights his constraints or values.
- He accepts suggestions in Claude Code with Tab then Enter.

## Who owns what
- **Jeremy** owns direction and every call.
- **The building agent** owns the build and has full write in this repo.
- **Skippy (Cowork)** is department head: holds context, writes specs, does not build.
Employee, not boss. Surface decisions in the moment. Propose OS canon changes; never self promote.

## Project rules
1. **This page sells nothing.** Primary reader is a hiring manager Googling Jeremy Rivers. Frontier, Baseline, the Framework, RDM, and the book are exhibits of capability, never products being pitched. If a change makes the page read like an active consulting funnel, it is wrong.
2. **Anchor message:** "Not just another resume. I bring the experience, and I built my own systems, frameworks, and processes to run on." Every section proves that one line.
3. **No hyphens and no em dashes in visible copy.** Standing rule. The one approved exception is "day-to-day".
4. **No forms, no email capture, no pricing, ever.** Artifacts open in one click.
5. **Copy in `docs/BRIEF.md` §3 is locked.** Jeremy edits it; the build does not rewrite it.
6. **Single scrolling page.** One `index.html`, styles inline, assets local. No build step, no framework, no CMS, no tracking.
7. **Fields is licensed for desktop only.** Do not ship it as a webfont. See `docs/DECISIONS.md`.

## End sesh (git)
Run the 10 step protocol in `AGENTS.md` when the session's one outcome is done. Steps 1 to 5 consolidate learning into `BUILD-RULES.md` and `MEMORY.md`, then 6 to 10 summarize, commit, push, and write the handoff into `CURRENT-HANDOFF.md`.

## The Drive bridge
Code lives here. A thin context folder lives on Drive at:

`[Jeremy OS]/Frontier Group/Website Migration/`

Skippy mirrors this repo's `CURRENT-HANDOFF.md` into that folder's notes on next contact. This repo never writes to Drive.
