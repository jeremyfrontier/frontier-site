# BUILD BRIEF - Frontier Site (Opus 5 build handoff)

*Written by Skippy (Cowork) 2026-09-09, from the Tech Session B alignment + copy session. This is the spec. The build session builds from it; Skippy does not build. Jeremy tweaks in Cowork after v1 lands.*

---

## 0. What this is
A single scroll, static, one page personal site for Jeremy Rivers at thefrontiergroup.co. It replaces the Kajabi site (which gets cancelled before the Oct 6 2026 hard deadline). No CMS, no forms, no funnel.

## 1. Positioning (do not drift from this)
- **Primary audience: hiring managers.** Jeremy is running an FTE operator/COO/Director-of-Ops search; this page will be Googled by hiring managers. It must never read like an active consulting sales funnel (that signals "will leave for his own thing").
- **Frame: proof of work, not services for sale.** Frontier, Baseline, the Framework, RDM, and the book are exhibits of capability, not products being pitched.
- **Anchor message (everything on the page proves this):** "Not just another resume. I bring the experience, and I built my own systems, frameworks, and processes to run on."
- **Secondary reader:** a warm consulting prospect can still self-identify and reach out. Consulting is mentioned, never sold.
- **Voice:** direct, certain, declarative. No cute/clever prose. No "Most people..." openers. Brunson-style persuasion bones (hook, big domino, story, proof) but executive skin, never infomercial.

## 2. Hard rules
- NO hyphens and NO em dashes in any visible copy (Jeremy's standing rule). Exception he approved: "day-to-day" keeps its hyphens.
- NO forms, NO email opt-ins, NO "download in exchange for your address," NO pricing anywhere. Artifacts are viewable work samples, one click.
- Public email: jeremy@thefrontiergroup.co
- Single scrolling page. Section order below is the scroll order.

## 3. Section-by-section copy (LOCKED - use verbatim)

### HERO
**Headline:** I help overwhelmed leaders build ops and teams that run on a system, not on them.
**Support:** The system is simple: a clear plan, clear roles, and a checkpoint rhythm that runs weekly to yearly and holds everyone accountable. It gets the entire team on the same page, executing with confidence day-to-day in the right direction.
**CTA button:** Connect (soft; anchors to the Connect section)

### CREDIBILITY STRIP (scannable proof row, right under hero)
- 20+ years leading ops and teams
- Grew a nonprofit from 2 to 50 across 10 departments
- Delivered 11,000+ student leadership trips abroad
- Steered an 8 figure org through a pandemic and a war
- Credentialed through ICF, Harvard, and MIT
- Rebuilt a multi-site operation from a personal Gmail account to a full EOS-based operating system
(Six tiles. Fine as a two row grid. If it feels crowded, the 11,000 trips tile is the one to move into the story.)

### WHO I AM
Twenty years ago I watched a mission I believed in nearly come apart. Not from a lack of passion. From a lack of a system. Good people, real purpose, and nothing holding it together. I lived the fallout, and I swore I would never do it again.

Then I got the opportunity and responsibility to build a team and operation from the ground up, determined to do it differently. Over eight years as Founding COO of a nonprofit, we grew it from 2 people to 50 across 10 departments, sent 11,000 leaders to the Holy Land, and held it together through a pandemic and a war. We kept what worked and cut what didn't until we had an operation that ran on more than my presence.

That system is what I install now. First through Frontier Group, the practice I built to pass it on, and most recently rebuilding a two location business from a single Gmail account into a full operating system. I don't just run operations. I build the thing operations run on.

### WHAT I'VE BUILT
**Section header:** Things I've built to get that work done.

**Baseline - the diagnostic**
A full organizational health assessment I designed from scratch. It scores a team across clarity, communication, and culture, names the real constraint, and hands the leader a prioritized plan. I built the instrument, not just the opinion.
> Proof artifact: link the LIVE lite Baseline assessment (captured HTML in Website Migration/). Label it "See it." No email gate.

**The Frontier Framework - the operating system**
A complete planning and execution system, from long range strategy down to the weekly huddle. EOS based, but my own, with OKRs and story built in. It is what I install so an organization runs on structure instead of on the leader.
> Proof artifact: embed the framework diagram image (locate in Brand Assets/Graphis or the Kajabi image manifest; confirm the right one with Jeremy).

**The Reaction Draft Method - the engine**
My method for building strategy: driven by inquiry, modeled through proven frameworks, and committed into action. It produces finished, usable strategy in a fraction of the time a typical brainstorm takes. I do not just have ideas, I systematize them.
> Proof artifact: a facilitator kit SAMPLE/excerpt (one or two pages), NOT a full kit. Full kits are paid IP. This sample is NOT in the captured assets (login-gated) - Jeremy must supply it or it ships as a placeholder in v1.

### THE BOOK - COMING SOON
I'm writing Uncommon Momentum, on the only skill that unlocks the potential in small teams. You can follow the thinking now on my newsletter, Take Account.
(Note: "Uncommon Momentum" is a for-this-page working title, not the locked book title. Substack: takeaccount.substack.com)

### PROOF / TESTIMONIAL WALL
Use ALL testimonials captured from the old site, not a curated few. At least these six from the Session A capture (Website Migration/Kajabi Asset Capture): Ashley P., Mattanah D., Luke B. Ph.D., Ben J., Tiffany W., Harrison K. Sweep the full capture for any others on the about/work pages so none are dropped.

### CONNECT
I'm open to the right operator role, and available for select consulting.
Links: LinkedIn (linkedin.com/in/jeremyfrontier) - Take Account on Substack (takeaccount.substack.com) - Email (jeremy@thefrontiergroup.co)

## 4. Brand system (from Brand Assets/Frontier Group Brand Guide 0326.pdf)
- **Colors:** Sand #F6F1EF (light ground), Charcoal #2C2C2C (text), Coral #EC5B59 (highlight - buttons + callouts). Extended accent palette available: Violet E6B9FF, Sea B8E3DD, Sky A4CAFF, Cobalt 3D39E7, Forest 074A0C, Avocado 617200, Moss 658776, Lichen C4D8A3, Sun F6D57F, Peach FF8E65, Clay D1A394, Berry 791D1F.
- **Type:** Fields (Regular/SemiBold/ExtraBold) for headlines, callouts, quotes - self host the .otf files from Brand Assets/Fonts/Fields/ (check LICENSE.html). DM Sans (Regular/SemiBold/Bold) for subheads + body - Google Fonts.
- **Logo:** Brand Assets/Logos/ has dark + light logotype, monogram, and icon variants. The logotype's compass arrow = true north; do NOT recolor or rotate the arrow. Use the icon/monogram for tight spaces.
- **Assets on hand:** Brand Assets/Photos (AdobeStock jpegs), Brand Assets/Graphis + Icons (brand graphics), Brand Assets/Logos.

## 5. Tech + deploy
- Static single page. Self-contained. Responsive (mobile first; the strip becomes a stacked grid on small screens).
- Build in ~/Code/frontier-site (own repo + GitHub) per the Code Project Standard. Seed CONTEXT.md + BUILD-RULES.md at upstart.
- Host free: Cloudflare Pages or GitHub Pages.
- Domain: repoint thefrontiergroup.co to the new host, then cancel Kajabi BEFORE Oct 6 2026. (Jeremy to confirm where the domain is registered / provide registrar access.)
- Source assets to pull from Drive at ingest: this brief, Brand Assets/, and Website Migration/ (captured copy, testimonials, lite Baseline HTML, sample report HTML).

## 6. Done-line for v1
A live, single scroll, on-brand page at a working URL, all locked copy in place, the testimonial wall complete, Baseline lite linked and clickable, the framework diagram shown, kit sample in place (or a clean labeled placeholder), the domain repointed, and Kajabi safe to cancel. Then Jeremy tweaks copy/layout back in Cowork.

## 7. Open items the build session must close (or flag back)
1. Facilitator kit sample page - Jeremy to supply (login-gated, not captured).
2. Framework diagram - confirm the correct image with Jeremy.
3. Domain registrar access for the repoint - Jeremy.
