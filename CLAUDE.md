# CLAUDE.md

Guidance for Claude Code when working in this repo. The global rules in `~/.claude/CLAUDE.md`
(British English, no em dashes, report every file op, confirm destructive operations) apply.

## What this is

Personal consultant website for **Dr Maggie He**, Consultant Cardiologist with subspecialty
expertise in interventional cardiology (Brisbane; Queensland Cardiovascular Group). Built by
Heeraj from the doctor-website template. Next.js 14 (App Router) + Tailwind + TypeScript.

- **Repo:** `github.com/hbulluck-oss/dr-maggie-he-website` (origin, push to `main`)
- **Deploy:** Vercel builds on every push to `main`. Preview:
  https://dr-maggie-he-website-gfgw.vercel.app
- **Domain:** NOT purchased yet. `seo.siteUrl` holds the placeholder `www.drmaggiehe.com.au`.
- This folder lives inside the second-brain vault at
  `projects/DRMAGGIEHE website/website-files/` but is its own git repo; the vault does not
  track it. Sibling file `../Dr-Maggie-He-website-questions-ANSWERED-2026-08-08.xlsx` is the
  archived owner questionnaire.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server (repo launch.json uses :3001; outer-folder launch.json uses :3000). |
| `npm run build` | Production build. Never run while dev is running (shared `.next` corrupts CSS). |
| `npm run import` | Excel content import (template: `doctor-website-template.xlsx`). |

## Content model

- `src/data/site-content.json` is the single source for structured content (doctor identity,
  hero, conditions, services, locations, fees, FAQs, contact, SEO, design tokens). Prefer
  targeted string edits; validate JSON after editing.
- Articles and conditions are MDX in `src/content/`.

## Owner decisions (from her answered questionnaire, 2026-08-08 — do not undo without her OK)

- AHPRA number MED0002072419 confirmed.
- **Fees are NOT shown on the website** (her explicit instruction; placeholders blanked).
- Bookings: phone **07 3016 1111**, email **bookings@qcg.com.au** (QCG rooms).
- Publications section stays empty; **no testimonials anywhere** (AHPRA advertising rules).
- Services/procedures list confirmed accurate for her subspecialty (no EP procedures).
- Locations: Mater Medical Centre (South Brisbane) and St Andrews Hospital Specialist Suites
  (Spring Hill), both referral-required; consulting days TBC (she will edit).
- Bio stays third person; she may edit tone herself.

## Clinical/regulatory rules

- Australian context: AHPRA/Medical Board advertising rules — no testimonials, no misleading
  claims. Titles use AHPRA-compliant wording ("subspecialty expertise in interventional
  cardiology", not a protected-title claim).
- Never fabricate clinical numbers or citations in articles; verify against primary sources.

## Open items

- Domain purchase and connection (then update `seo.siteUrl`).
- Logo design (she requested one).
- Consulting days per location (she will supply/edit).

## Session log

### 2026-08-08 — Questionnaire applied + header/hero polish
- `62b2093` Applied her questionnaire answers: booking contact set (07 3016 1111 /
  bookings@qcg.com.au), fee placeholders blanked (fees not rendered), headshot moved above
  the headline on mobile, header name enlarged, location days reworded to patient-facing copy,
  `tel:` links strip spaces.
- `3ab5d6b` Cut mobile hero dead space (pt-32 → pt-10; sm:pt-24; lg unchanged); fixed tablet
  header wrapping (nowrap name/credentials, tighter md nav gaps).
- `c4b8549` Her follow-up: name two sizes bigger (text-3xl mobile / text-4xl desktop;
  text-2xl on md where the name shares the row with the nav), degrees + title one size bigger
  (text-sm).
- `6b05480` Breathing room between name, degrees and title lines (mt-1.5 / mt-1).
- All verified at 375 / 768 / desktop widths and confirmed live on the Vercel preview.

### Earlier (2026-08-04, pre-log)
- `76111ec` Initial site; `1804250` section-jump/CTA/about-photo fixes; `8edadb4` articles
  rewritten distinct from drbulluck.com; `684861c` AHPRA-compliant subspecialty wording;
  `69a0670` header subtitle shortened to gold "Consultant Cardiologist".
