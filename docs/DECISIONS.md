# DECISIONS.md — where the build differs from the brief, and why

*Every entry is a place the brief said one thing and the build did another. Jeremy overrides any of these.*

---

## D1. Fields is not shipped as a webfont (2026-09-09)
**Brief §4:** "self host the .otf files from Brand Assets/Fonts/Fields/ (check LICENSE.html)."
**Finding:** `Brand Assets/Fonts/LICENSE.html` is the Adam Ladd Design / The Type Founders **Desktop** EULA. It licenses install and use on workstations and embedding into electronic documents. It does not grant web font rights, and it explicitly excludes glyphs "individually addressed by software, a website, a hardware device or other means." Shipping the .otf files in `assets/fonts/` and calling them from `@font-face` would be a license violation.
**Decision:** Headlines use **Fraunces** (variable, SIL Open Font License), body uses **DM Sans** (SIL OFL). Both are self hosted in `assets/fonts/` with their licenses. The real Fields logotype still appears, as logo artwork, which the desktop license covers.
**To reverse:** buy a webfont license for Fields from The Type Founders, drop the woff2 files in `assets/fonts/`, and swap the two `@font-face` blocks plus `--serif`.

## D2. Baseline proof artifact is the sample report, not the lite assessment (2026-09-09)
**Brief §3:** link the captured lite Baseline assessment, "No email gate."
**Finding:** the captured file (`free-health-assessment - Custom Quiz.html`) opens on a hard lead gate. Screen 1 is titled "Where should we send your results?" and `submitLead()` refuses to advance without a name and a valid email. That is exactly the email opt in the brief's Hard Rules forbid.
**Decision:** the Baseline card links `assets/artifacts/baseline-sample-report.html`, the Meridian sample report. It is ungated, one click, and it shows the instrument's actual output, which is the stronger exhibit for a hiring manager anyway. The lite assessment is kept out of v1.
**To reverse:** strip the lead gate screen out of the assessment file, then link it as a second artifact.

## D3. Framework diagram is built in HTML, not an image (2026-09-09)
**Brief §3:** "embed the framework diagram image (locate in Brand Assets/Graphis or the Kajabi image manifest; confirm the right one with Jeremy)."
**Finding:** `Brand Assets/Graphis` is a set of hand drawn accent marks (arrows, checks, underlines, circles). There is no framework diagram in it. The Kajabi manifest's CDN hashes are truncated and the CDN is unreachable from this session.
**Decision:** the diagram is built as live HTML inside the Framework card, from canon (`ABOUT ME/my-company.md`): three competencies (Clarity, Communication, Culture) over three layers (Planning, Structure, Execution Checkpoints) with each layer's artifacts. It is responsive, readable by screen readers, and uses the real type.
**To reverse:** replace the `.fw` block with `<img src="assets/img/frontier-framework.png" alt="...">` once Jeremy supplies the official graphic.

## D4. Two copy edits inside the LOCKED block (2026-09-09)
**Brief §2** forbids hyphens; **Brief §3** locks the copy. Credibility tile 06 contained two hyphens.
**Changed:** "Rebuilt a multi-site operation from a personal Gmail account to a full EOS-based operating system" became "Rebuilt a multi site operation from a personal Gmail account into a full EOS based operating system."
Section titles that used a dash as a separator ("Baseline - the diagnostic") are rendered as a label above the name instead of a dash.
Testimonials are quoted verbatim, hyphens included, because they are other people's words. The copy gate exempts `<blockquote>`.

## D5. Portrait in, testimonial photos out (2026-09-09, revised)
Jeremy supplied `website headshot.png` (a cutout on a near white ground). The near white background was keyed to transparency with a soft alpha ramp and the subject cropped to `assets/img/jeremy-portrait.png`, sitting in a warm rounded panel in the Who I Am section and bleeding to the panel's bottom edge.
The six testimonial headshots still live only on the Kajabi CDN, which this session's network policy blocks. Per Jeremy 2026-09-09 the wall is text only: quote, then name, title and org above a hairline rule. No avatars, no initials. Do not add them back.

## D6. Two testimonials added beyond the brief's six (2026-09-09)
Brief §3 says sweep the full capture so none are dropped. Two more were found in the capture's workshop and kits pages: a second Ben J. quote (Owner, Gather Better) and a second Harrison K. quote about the AI Builders. Both are on the wall. A Bret S. quote is referenced in the capture but its text was not preserved.

## D7b. RDM artifact swapped to the 2 Page Strategy Session Guide (2026-09-09)
Jeremy replaced the trimmed Master Planning brochure with the real thing: `~/Downloads/2-Page Strategy - Strategic Session Guide .pdf`, now at `assets/artifacts/2-page-strategy-session-guide.pdf`. Five pages, no phone number, one embedded link to the 2 Page Strategy AI Builder GPT, left intact. This is genuine paid IP from Kit 1 and Jeremy published it knowingly after the D7 flag. The Master Planning extract was removed.

## D7. Kit sample is a trimmed extract, not the shipped PDF (2026-09-09, superseded by D7b)
Jeremy asked for the Master Planning Facilitator Kit as the download on the RDM card. The source PDF (`Frontier Books Resources/Facilitator Kits/01 Kit PDFs/Master Planning.pdf`, 9 pages) could not go up as is:
- **Page 8 carries six live links to the paid IP**: three Google Docs Session Guides on anyone with the link sharing, and three custom GPT AI Builders. Publishing that page hands the $495 kit to anyone who downloads the file.
- **Page 9 carries Jeremy's personal mobile number** with a "text me" CTA. That is a public page a hiring manager reads; a personal cell on it invites scrapers and reads as a sales pitch, against the brief's positioning.
- **Pages 2, 3 and 4 are the same page three times**, a defect in the source export.
**Shipped:** `assets/artifacts/master-planning-kit-sample.pdf`, pages 1, 2, 5, 6 and 7, with every link annotation stripped and the title metadata reset. Cover, the Part 1 overview once, the three documents breakdown, RDM Thinking, and How To Use Your Kit. Five pages, no live links, no phone number.
**To reverse:** re-run the qpdf page selection with the pages Jeremy wants. Do not publish page 8 while those share links are live.

## D8. Testimonial wall trimmed to six (2026-09-09)
Per Jeremy: keep the later Ben J. and Harrison K. quotes, drop the earlier ones. Removed Ben J. (Owner, Gather Better, the 90 days quote) and Harrison K. (Author, the AI tools quote). The wall is back to the brief's original six.

## D9. Color on the framework diagram (2026-09-09)
The three competencies and the three layers now carry three accents from the brand's extended palette: Cobalt for Clarity and Planning, a deepened Forest for Communication and Structure, a deepened Berry for Culture and Execution Checkpoints. Competency cards get a tinted fill and matching title; layer rows get a colored left rule and eyebrow, with chips tinted to their layer. Coral stays reserved for the page's primary accents so the diagram does not compete with the buttons.

## D10. Photographs (2026-09-09)
Hero carries the keyed out headshot cutout (`jeremy-portrait.png`) on a soft warm arch. Who I Am carries the speaking photo (`jeremy-speaking.jpg`, from `~/Downloads/speaking pic .png`, cropped 4:5 to frame Jeremy right of centre with the laptop and gesture in shot, 900x1125, JPEG). The Who I Am panel switched from a padded cutout frame to a full bleed cover crop.

## D11. New tab on every outbound and document link (2026-09-09)
LinkedIn, Substack (both instances), the mailto, the session guide PDF and the Baseline sample report all carry `target="_blank" rel="noopener noreferrer"`. Baseline was not on Jeremy's list but behaves as a document like the PDF, so it matches.

## D12. Credibility tiles and framework colour, second pass (2026-09-09)
Tile numerals went 15px/600 to 38px/700 and tile body 16.5px to 19px. Framework diagram picked up more colour: layer names now carry their accent, the left rule went 3px to 5px, and both section captions get a three segment Cobalt, Forest and Berry rule.

## D12. Baseline Snapshot at /baseline/, with a lead gate (2026-09-28)
**Rules touched:** Hard Rules (no email opt in) and BUILD-RULES (no third party requests at runtime).
**Decision (Jeremy, 2026-09-28):** the homepage stays hiring manager first and ungated (D2 stands). The Snapshot is a separate sales page at `/baseline/`, sent directly in outreach, and it is gated on purpose: it is the lead capture for Frontier Group's planning season offer.
**Runtime requests (revised 2026-09-28):** EmailJS was removed; its notifications never arrived. On submit the page makes one call, a POST to Jeremy's Google Apps Script web app, which appends a row to the "Baseline Snapshot Leads" sheet (Org Health Assessment folder) and emails Jeremy from his own Gmail. The endpoint URL is the `LEAD_ENDPOINT` constant; the script source is in Jeremy OS Downloads as `Snapshot Leads Script.txt` (to be filed with the Baseline v2 outputs). Headlines use Newsreader from Google Fonts, matching the homepage.
**Source of truth for the instrument:** Jeremy OS `OUTPUTS/Baseline v2 (2026-09-28)/Baseline v2 Spec.md`.

## D13. Offer page at /work/, not linked from the homepage (2026-09-29)
**Brief:** the homepage is proof of work for hiring managers, with no pricing and no selling.
**Decision (Jeremy, 2026-09-28):** keep the homepage as is. `/work/` is a separate sales page with pricing (Planning Day $2,500; Baseline plus Planning Day $4,500, or $5,500 for teams of 26 to 40; Founding Pilot; Build and Retainer ranges), sent directly in outreach. It is not in the homepage nav. Its CTAs point to `/baseline/` and the debrief calendar link. Copy passed Jeremy's landing page copy directives. Editable in the file: the planning season deadline (November 15) and founding spots (3 of 3).

## D14. Work Review Builder at /workreview/, a second gated sales page (2026-10-13)
**Rules touched:** Hard Rules (no email opt in) and BUILD-RULES (no third party requests at runtime), same as D12.
**Decision (Jeremy, 2026-10-13):** a free lead magnet for planning season, built to match the Snapshot's design and flow. Not linked from the homepage. Six steps: intake (name, email, organization, title, org type that drives all wording, industry, team size, annual objective, Substack opt in); one screen per function where the book's questions sit over example chips and a tapped example drops into an editable "Your metrics" list (3 to 5); a setup screen (Format, Monthly Target, Year adds up as Total or Average, Lower is better); a review and confirm screen; then the download page with an Uncommon Kit checklist (Work Review checked, the rest of the Kit listed), the debrief, the book, and the Snapshot.
**The spreadsheet is built in the browser** by `workreview/xlsx.js`, a small dependency free writer (no library, no CDN). One tab: org name and Annual Objective on top, then Metric, Monthly Target, Jan to Dec, Year to Date (sums or averages per the user's choice; Annual Target was cut as redundant). Months turn green or red against the Monthly Target, flipped for lower is better. Footer carries the debrief link and the Kit link.
**Runtime requests:** one POST to Jeremy's Apps Script web app (`LEAD_ENDPOINT`), carrying the fields, the metrics, and the .xlsx as base64. The script logs a row to "Work Review Builder Leads", emails Jeremy call prep, and emails the respondent the file. Script source and spec: Jeremy OS `OUTPUTS/Work Review Builder (2026-10-13)/`.
**Revised 2026-10-13 (Jeremy's review):** intake has no opt in checkbox; a line under the button says building subscribes them to the free Uncommon Work newsletter, and every lead logs Opt in = Yes. Headings are title case and the copy says metrics, not numbers. Setup asks Format (Number or Percent; money shows a dollar sign automatically), Good when it is Higher or Lower, one Monthly Target (ranges were tried and cut 2026-10-13: too complicated for a free tool; ranges are part of Jeremy's paid work), and how Year to Date adds up. Sheet: Metric, Monthly Target, Jan to Dec, Year to Date; months go green at the target, red when they miss. Selected options and focus use the light red. Headline: "If You're Not Tracking, You're Just Playing Games With Your Time, Money, and Team." No "scorecard" or "score" in the copy: the product is the Work Review. The people word is a setting at the top of the Product and Service screen: Clients, Members, Customers, or Custom (Custom opens one text box). Headline words Time, Money, and Team are in coral. "On Target Means: At or Above / At or Below" replaces Higher or Lower. The full width button class is .wide (it had collided with the .block section style). Download page order: Kit checklist (Planning, Reviews with the Work Review checked, Check Points), then the download, then the debrief with a five quote swipe card (real testimonials, verbatim), then the book and the Snapshot.
**Sheet styling (Jeremy, 2026-10-13):** Ink theme: function bands run sand, taupe, charcoal (lightest to darkest); the column header row stays charcoal; the Monthly Target and Year to Date headers are coral and both columns share the light red tint and bold numbers; the current month's header turns coral automatically; the FRONTIER GROUP footer band is coral; footer links are real hyperlinks (not formulas) so they show in every app; Arial throughout; prints one page wide; the footer band with links to the debrief, the Kit, the book, and the Snapshot. No logo at the top. Annual revenue was considered for intake and skipped.
**Cut for V1:** the weekly tracking tab (over architecture for a lead magnet; weekly reads become a debrief question), and the Stage and Goal columns. `KIT_LINK` points to the homepage until the Kit is live on Gumroad.

## D15. Uncommon Kit sales page at /kit/, with a Stripe checkout (2026-10-21)
**Rules touched:** Hard Rules (no pricing) and BUILD-RULES (no third party requests at runtime), same family as D12 to D14.
**Decision (Jeremy, 2026-10-21):** the $95 Uncommon Kit sells from `/kit/` through a Stripe Payment Link, replacing the Gumroad plan (about $3 in fees a sale instead of about $13, and his own URL). The book prints thefrontiergroup.co/kit, so the checkout behind it can change without a reprint. Not linked from the homepage.
**Checkout:** every "Get the Kit" button points to one Payment Link (`buy.stripe.com/14AfZggQj5pP94ggCL8k800`). Stripe redirects to `/kit/thanks/` after payment and sends an invoice whose memo carries the Kit link. Stripe Tax collection is off at launch (no registration yet; CPA question open), so the page makes no tax promise either way.
**Delivery:** `/kit/thanks/` is noindex and links the public, view only Notion hub. No "Duplicate as template" (Jeremy, 2026-10-21): buyers open and bookmark it; the Jump Start Tracker and 1:1 templates are downloads inside the Kit. The thanks page is not secret; anyone with the URL can reach the Kit link. Accepted for a $95 product.
**Copy:** written to Jeremy's landing page directives (one buyer: the ED who carries every decision; proof next to each claim; objections before the buy box). Testimonials are verbatim excerpts from `Source - Testimonials (2026-10-14).md`; Bret is credited as President and CEO, Eagle's Wings Athletics (Jeremy, 2026-10-21). 30 day money back guarantee, refunds by email (Jeremy, 2026-10-21). Testimonials render as pull quotes with a coral rule, not boxed cards.
**Assets:** `assets/img/uncommon-kit-cover.png` (square Kit cover) and `assets/img/huddle-os-map.png` (the system map from the Kit).

## D16. Brand refresh on the Frontier Group Design System; Fields goes live (2026-10-26)
**Reverses D1.** Jeremy decided to use Fields as live headline text, accepting the risk that the desktop EULA does not grant webfont use. A webfont license from The Type Founders would close it. `fields-600.otf` and `fields-800.otf` are self hosted; the Newsreader Google Fonts link is gone, so the page makes no third party requests again.
**Visual only, copy untouched.** The one visible change is the credibility tile numerals (01 to 05), replaced by brand shapes; they were decoration, not a sequence. Horizontal wordmark in header and footer. Hero: Sea field with Sun and Cobalt shapes. Framework diagram in primary palette variants (Charcoal, Coral, deep Sand). Book band deep Sand. Coral compass arrow on the Framework card. Eyebrows Charcoal, buttons 10px radius, no hover lift or glow, true Charcoal bands.
**Motion (sparing):** underline draws on once at load, hero shapes settle, section heads and cards rise in on first view, cards lift 4px on hover, header hairline on scroll. All off under reduced motion; content is visible without the script.

## D17. Framework card becomes the Huddle Operating System, 5 and 5 (2026-10-26)
Jeremy flagged the card as out of date (three layers, Quarterly Planning, Weekly Huddle). It now matches the book's system: 10 huddles in two families, Clarity (5 Planning Huddles) and Accountability (5 Check Point Huddles), shown side by side in Charcoal and Coral. The three competency tiles (Clarity, Communication, Culture) are retired. New card copy drafted by Skippy at Jeremy's direction and mirrored into BRIEF §3.

## D18. Baseline and the method card brought up to the book (2026-10-26)
**Frontier Baseline:** copy follows Baseline v2 (Communication became Accountability; Leader Dependency Index; 10 huddle existence check) and the card gains a graphic of the instrument plus the score scale. Status colors follow the Brand Standard (Clay, Sun, Lichen).
**The TRC Method** replaces the Reaction Draft Method, per the book's brand architecture (the method inside the Huddle Operating System). Track, React, Commit shown as three steps with a loop line. Clarity list: Playbook replaced by Activity Map (matches Baseline v2 huddle 3).

## D19. Sample Baseline report rebranded to Magnolia Landscaping (2026-10-26)
`assets/artifacts/baseline-sample-report.html`: the fictional client is now **Magnolia Landscaping**, consistent with the book (was Meridian Group). Restyled on the design system: Fields and DM Sans served locally (Google Fonts removed), Sand wordmark in the masthead, brand shapes in place of the decorative glows, status colors per the Brand Standard (Lichen/Forest healthy, Sun/amber at risk, Clay/Berry critical; Coral no longer means critical). Category relabeled Communication to Accountability per Baseline v2; scores and narrative otherwise unchanged. Its motion (bars filling, fades, accordions) kept as is.

## D20. Pain and outcome copy pass, testimonial order, TRC arrows removed (2026-10-26)
Who I am and the three What I built paragraphs rewritten to lead with pain and land on outcome, no fluff (Jeremy's final wording, drawn from the book's intro and TRC chapter; mirrored into BRIEF §3). Testimonials now open with Luke B. then Ben J. The arrows between the Track, React, Commit boxes are removed.

