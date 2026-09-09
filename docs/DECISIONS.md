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
