# MEMORY.md — frontier-site

*Running project history. `CURRENT-HANDOFF.md` is the boot file; this is the long form.*

## What this is
A single scroll static page for Jeremy Rivers at thefrontiergroup.co, replacing the Kajabi site before its 2026-10-06 cancellation deadline. Primary reader is a hiring manager. It sells nothing.

## State
- **2026-09-09 (2).** Testimonial wall reduced to text only, no avatars. Jeremy's portrait added to Who I Am from `~/Downloads/website headshot.png`, background keyed out.
- **2026-09-09.** Repo scaffolded to the Jeremy OS Code Project Standard. v1 page built and verified locally at 390px, 900px, and 1440px: no horizontal overflow, no failed requests, copy gate passing. Committed locally. **Not pushed:** no GitHub credential on this machine.

## Decisions in force
See `docs/DECISIONS.md`. The load bearing ones: Fields is desktop licensed so the page uses Fraunces and DM Sans (D1); the Baseline proof artifact is the sample report because the lite assessment has a hard email gate (D2); the framework diagram is built in HTML because no diagram exists in Brand Assets (D3).

## Open threads
1. **Push and deploy.** Needs Jeremy: create the GitHub repo, push, turn on Pages. `docs/DEPLOY.md` walks it.
2. **Domain repoint.** Needs Jeremy: find the registrar, set the DNS records, then cancel Kajabi.
3. **Facilitator kit sample.** Login gated, never captured. The RDM card shows "Sample coming soon" until Jeremy supplies one or two pages.
4. **Testimonial photographs.** Still only on the Kajabi CDN, unreachable from the build session. Grab them from Kajabi admin before cancelling, though the wall is deliberately text only now.
5. **Framework graphic.** If an official one exists, it replaces the HTML diagram.

## Contacts and links
- Domain: thefrontiergroup.co (registrar unknown as of 2026-09-09)
- GitHub: github.com/jeremyfrontier
- Newsletter: takeaccount.substack.com
- LinkedIn: linkedin.com/in/jeremyfrontier

## Drive bridge
`[Jeremy OS]/Frontier Group/Website Migration/`
