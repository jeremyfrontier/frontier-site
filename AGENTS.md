# AGENTS.md — frontier-site

**Boot order:** (1) `CONTEXT.md`, (2) `BUILD-RULES.md`, (3) `docs/BRIEF.md`, (4) `docs/DECISIONS.md`, (5) `CURRENT-HANDOFF.md`. Full history is in `MEMORY.md`; read it only when you need it.

This repo is self contained. Do not read Drive files. Do not add a build step, a framework, or a dependency without Jeremy's go.

## What this is
A single scroll static page for Jeremy Rivers at thefrontiergroup.co. It replaces a Kajabi site that gets cancelled before 2026-10-06.

## Layout
```
index.html                     the whole site
assets/fonts/                  OFL webfonts (DM Sans, Fraunces) + licenses
assets/img/                    logos, icons, framework diagram
assets/artifacts/              viewable work samples, one click, no gate
docs/BRIEF.md                  the spec, with locked copy in §3
docs/DECISIONS.md              why the build differs from the brief
tools/check-copy.sh            the hyphen and em dash gate
CURRENT-HANDOFF.md             where we stopped
MEMORY.md                      running project history
```

## Local preview
```
python3 -m http.server 4173
```
Then open http://localhost:4173

## Before you say done
Run the copy gate, open the page, scroll it at 390px and 1440px, click every link and every artifact, and show the evidence.

## Code end sesh (the 10 steps)
1. Review the session for reusable lessons.
2. Separate standards from bugs and app specific decisions.
3. Present inferred standards for approval: Add, Revise, or Drop.
4. Update `BUILD-RULES.md` with confirmed changes only.
5. Record app specific decisions in `docs/DECISIONS.md` or `MEMORY.md`.
6. Summarize what changed in plain language.
7. Propose a commit message and get Jeremy's approval.
8. Commit all session changes.
9. Push to GitHub.
10. Write the one line handoff into `CURRENT-HANDOFF.md` and push it with the commit.
