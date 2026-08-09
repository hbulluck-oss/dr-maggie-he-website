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

## Logo

Her monogram (heart + M + H, red/navy/gold) is the site mark. Source art is the sibling file
`../Maggie He Logo.jpeg` — a JPEG **on a black background**, not transparent. The web assets were
derived from it by keying out the black, un-multiplying the antialiased edges so they do not fringe
grey, and cropping to the mark (414x256).

There are **two variants** and the swap is CSS-only, in `globals.css`:

| File | Used when | Navy |
|---|---|---|
| `public/images/logo-mh.png` | light mode | `#01367c` (hers) — 11.2:1 on cream |
| `public/images/logo-mh-dark.png` | dark mode | `#4f87d1` lifted — 4.8:1 on `#111827` |

Her navy measures **1.5:1** against the dark background, against the 3:1 WCAG asks of graphical
objects, so the M all but disappeared. Only the navy is lifted; the red and gold already clear 7:1
and are untouched, and this matches how the site already lightens its own palette in dark mode. The
classes are `.logo-light`/`.logo-dark` and the rules live **outside `@layer`** so they beat the
Tailwind height utilities; they cover both dark paths (`prefers-color-scheme` and the `.dark` class),
since a JS swap would flash on load. A white keyline was considered and rejected: at 40-48px it
closes up the counters where the heart crosses the M.

`src/app/favicon.ico` and `src/app/apple-icon.png` come from the light PNG. If she ever supplies real
vector art, replace all four rather than re-keying the JPEG.

**The header is width-constrained.** The desktop nav is 773px wide on its own (six links, theme
toggle, and a 160px "Book a consultation" button), so the full nav plus the logo and name cannot fit
below about 1000px. The nav therefore appears at `lg` (1024px) and everything narrower uses the
hamburger. Before touching header sizes, re-measure: shrinking the nav (fewer links, or a shorter CTA
label) is the only way to lower that breakpoint.

## Handover

**`README.md` is the authoritative handover guide** and deliberately occupies the README slot so
GitHub renders it as the first thing anyone sees on the repo. It replaced the template's generic
readme (recoverable at `76111ec`), which told the reader to *fork* the template and was wrong for
her. It is written for someone who has never done any of this: what GitHub, Vercel and DNS each are,
then click-by-click through account creation, upload, deploy, connecting `drmaggiehe.com.au` at
VentraIP, and switching on `/admin`, with a "you should now see" checkpoint after each stage. Its
Vercel and VentraIP steps come from those companies' live docs, not from memory, and it cites them.

**`DEPLOY-GUIDE.md` and `SETUP-GUIDE.md` are stale template leftovers** — they name a different
doctor (`dr-veerasamy-website`) and recommend a registrar she does not use. `README.md` tells the
reader to ignore both. Delete them once HB confirms.

Nothing in this repo is tied to HB's accounts: `formspreeId` is empty, there are no `.env` files, no
analytics domain is set, and no HB identifiers remain in `src/` or `public/`. The only couplings were
the GitHub repo and the Vercel project themselves, which is what the handover replaces.

`/admin` (Sveltia CMS) needs `public/admin/config.yml` `repo:` set to the account and repository that
Vercel deploys from — it currently holds a deliberate `CHANGE-ME-...` placeholder, so the editor does
**not** work until whoever owns the site sets it. A single editor can sign in with a GitHub
fine-grained token (Contents: read and write); no OAuth app or auth proxy is needed.

## Open items

- Domain purchase and connection (then update `seo.siteUrl`).
- Consulting days per location (she will supply/edit).
- No Open Graph image is set, so link previews show text only. Her logo on the cream background
  would be the obvious 1200x630 card.
- Delete `DEPLOY-GUIDE.md` and `SETUP-GUIDE.md` once HB confirms.

## Session log

### 2026-08-09 (later) — Header wordmark: serif, one size below the headline
- "Dr Maggie He" moved from sans to **Playfair Display, the hero headline's face**, and is
  deliberately held **one size below it — 40px against the headline's 48px**:
  `text-3xl min-[390px]:text-4xl sm:text-[2.5rem]/none lg:text-3xl xl:text-[2.5rem]/none`.
  The mobile-menu bar's small wordmark went serif too, size unchanged.
- It briefly matched the headline outright at 48px (`123d8b7`); she found it too dominant, so
  40px is the settled middle between the old 36px and that. 40px also restores breathing room
  next to the nav: **62px** clear at 1280px+, against 11px at 48px.
- **Two fallbacks to 30px are forced by width, not taste.** Below 390px the 36px name touches the
  hamburger once the logo shows (375px overflowed by 2px, 360px by 17px). Between 1024 and 1279px
  the desktop nav sits beside the name and 1024px clears only **32px** — 36px overflows by 3px.
  So the match holds at 390-1023px and 1280px+, and steps down in the two tight bands.
- It is the **max-width-1200 bar** that binds the header, not the viewport, so 1920px is no
  roomier than 1280px. At the rejected 48px there were only 11px to spare; at 40px there are 62px.
- Measured at 320/360/375/390/414/480/640/768/820/900/1023/1024/1100/1180/1279/1280/1440/1920: no
  collision, no horizontal scroll, no console errors, mobile menu opens clean at 360/375/768.

### 2026-08-09 — Hero gold strapline scaled up, then reverted (net: unchanged)
- `94fe0d1` took the gold specialty line from `text-sm` (14px) to 20/24/30px; `f0f1f4a` put it
  back. **The styling is now byte-identical to `45eb9ee`** — only an explanatory comment differs.
  Do not re-propose this without her asking.
- Why it does not scale: the specialty string is **79 characters, all caps**. At the headline's
  own 48px it wraps to 4 lines (240px) on desktop and 7 on mobile, taller than the headline and
  inverting the hierarchy. Even the 30px middle ground ran to two lines and crowded the headline.
  Shortening the string is the only route to a bigger strapline, and that is her content call.
- Revert point for the whole day: branch `backup/pre-hero-type-scale-20260809` at `45eb9ee`.

### 2026-08-08 (later) — Logo in the header, and the header made to fit
- Added her monogram top-left of the name/degrees/title, vertically centred against the whole text
  block, at 40px on phones, 56px on tablet, 48px at `lg`, 64px at `xl` (it steps *down* at `lg`
  because that is where the nav appears and reclaims the width).
- Replaced the Next.js default favicon (black circle and triangle) with her mark; added
  `apple-icon.png` on the cream background, since iOS composites transparency to black.
- **Fixed a pre-existing bug:** the desktop nav overflowed the viewport between 768px and ~880px,
  putting the "Book a consultation" button off-screen and running the nav links over the
  "BMedSci, MD, FRACP" line. iPad portrait (768px) was affected. Nav moved from `md:flex` to
  `lg:flex`, nav gap `lg:gap-8` to `xl:gap-6`, and the name from `md:text-2xl` to `lg:text-2xl
  xl:text-4xl`.
- The theme toggle is hidden below `sm` and appears as a "Dark mode" row inside the mobile menu
  instead. Without this the logo could not fit beside her name at 375px without shrinking the name,
  which she had explicitly asked to be larger.
- Below 360px the logo is hidden so her name keeps its full size.
- `scroll-padding-top`/`scroll-margin-top` gain a 7.5rem step at 1280px to match the 117px header.
- Verified in Chromium at 320/360/375/390/414/480/640/768/820/900/1024/1100/1280/1440/1920 in both
  colour schemes: no overlap, no overflow, no horizontal scroll, no console errors, on the homepage,
  an article, a condition page and a policy page.

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
