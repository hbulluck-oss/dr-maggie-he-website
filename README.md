# Doctor Website Template

A free, open-source website template for medical consultants. Edit your content through a visual admin panel — no coding required.

Built with Next.js, Tailwind CSS, and Sveltia CMS. Deploys for free on Vercel.

---

## Quick Start for Doctors

### Step 1: Get the code

1. Create a free account at [github.com](https://github.com)
2. Go to this repository and click **"Fork"** (top right)
3. You now have your own copy of the website code

### Step 2: Deploy for free

1. Go to [vercel.com](https://vercel.com) and click **"Sign Up"** with your GitHub account
2. Click **"Add New Project"**
3. Select your forked repository
4. Click **"Deploy"** — your site will be live at `your-project.vercel.app` in about 60 seconds

### Step 3: Edit your content (visual admin panel)

Once deployed, go to `your-site.vercel.app/admin/` — this opens the visual admin panel where you can edit everything:

- **Doctor Details** — your name, credentials, bio, photo, roles
- **Hero Section** — headline and call-to-action text
- **Conditions** — conditions you treat (with dropdown icon picker)
- **Services** — investigations and procedures you offer
- **Publications** — your selected research publications
- **Locations** — clinic names, addresses, opening days
- **Fees** — consultation fees
- **Testimonials** — patient quotes
- **FAQs** — frequently asked questions
- **Contact** — email, phone, booking method
- **Colour Scheme** — primary and accent colours (with colour picker)
- **SEO** — page title, description, website URL

When you save changes in the admin panel, they are automatically committed to GitHub and Vercel rebuilds your site in about 60 seconds.

### Step 4: Set up admin panel authentication

The admin panel uses GitHub for login. To set it up:

1. Go to [github.com/settings/developers](https://github.com/settings/developers)
2. Click **"New OAuth App"**
3. Fill in:
   - **Application name:** My Website Admin
   - **Homepage URL:** `https://your-site.vercel.app`
   - **Authorization callback URL:** `https://your-site.vercel.app/admin/`
4. Copy the **Client ID** and **Client Secret**
5. In your repo, edit `public/admin/config.yml` and update the `repo` field with your GitHub username and repo name

**Alternative (no OAuth setup):** You can also edit content directly on GitHub by editing `src/data/site-content.json` — click the pencil icon, make changes, and commit.

### Step 5: Change the colours

In the admin panel under **Colour Scheme**, use the colour pickers. Or edit `src/data/site-content.json` directly.

**Suggested medical colour palettes:**

| Style | Primary | Accent | Notes |
|-------|---------|--------|-------|
| Royal Blue + Coral (default) | `#2b6cb0` | `#c53030` | Modern, approachable |
| Navy + Teal | `#1e3a5f` | `#2c7a7b` | Clinical trust, calm |
| Deep Blue + Gold | `#1a365d` | `#a0720f` | Premium, Harley Street |
| Forest + Sage | `#22543d` | `#2f855a` | Natural, wellness |
| Burgundy + Warm Grey | `#742a2a` | `#566373` | Traditional, warm |

All palettes are WCAG AA compliant (4.5:1+ contrast ratio).

### Step 6: Add your photo

1. Replace `public/images/doctor-placeholder.jpg` with your headshot
2. Or upload a new photo through the admin panel under **Doctor Details > Photo**

### Step 7: Update your condition pages

Each condition has its own page with patient-friendly content. You can edit these through the admin panel under **Condition Pages**, or directly in `src/content/conditions/` as `.mdx` files.

**To edit:** Open the condition in the admin panel and use the rich text editor.

**To add a new condition:**
1. Add a new condition page in the admin panel
2. Also add a matching entry under **Conditions You Treat** in site content

**To remove:** Delete the condition page and remove the matching entry.

### Step 8: Add publications

In the admin panel under **Selected Publications**, click "Add" and enter:
- Paper title
- Authors (e.g. "Bulluck H, Smith J, et al.")
- Journal name
- Year
- DOI (optional)
- PubMed URL

### Step 9: Set up the contact form (optional)

The contact form uses [Formspree](https://formspree.io) — a free service that forwards form submissions to your email.

1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form and copy the form ID (looks like `xabcdefg`)
3. In the admin panel under **Contact Details**, set the Formspree Form ID

Without Formspree, the form falls back to opening the user's email client with a pre-filled message.

### Step 10: Connect your domain

1. Buy a domain (e.g., on [Namecheap](https://namecheap.com) or directly on Vercel)
2. In Vercel, go to your project > **Settings** > **Domains**
3. Add your domain and follow the instructions to update your DNS settings
4. Update the **Website URL** in the admin panel under **SEO Settings**

---

## For Developers

### Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

The admin panel is available at [http://localhost:3000/admin/](http://localhost:3000/admin/).

### Build for production

```bash
npm run build
```

This creates a fully static site in the `out/` directory.

### Tech stack

- **Framework:** Next.js 14 (App Router, static export)
- **Styling:** Tailwind CSS v3
- **CMS:** Sveltia CMS (visual admin panel, Git-based)
- **Content:** JSON data file + MDX condition pages
- **Icons:** Lucide React
- **Forms:** Formspree (client-side)
- **Fonts:** Inter + Playfair Display (Google Fonts)
- **Deploy:** Vercel (free tier)

### Architecture

- `src/data/site-content.json` — all editable content (edited by CMS or directly)
- `src/config/site.config.ts` — imports JSON and adds TypeScript types
- `src/content/conditions/` — MDX files for condition pages
- `src/components/` — React components (layout, sections, UI primitives)
- `src/lib/content.ts` — MDX reader utility
- `public/admin/` — Sveltia CMS admin panel (config.yml + index.html)
- All components read from `siteConfig` — no hardcoded content

### Key features

- Visual admin panel at `/admin/` (Sveltia CMS)
- Fully static export (no server required)
- Dark mode via `prefers-color-scheme` (automatic)
- Print stylesheet
- SEO: JSON-LD structured data, OG tags, sitemap, robots.txt
- Accessible: skip-to-content, ARIA attributes, focus states, semantic HTML
- Responsive: mobile-first design
- Urgent symptoms banner with dismiss functionality
- Contact form with Formspree, Cal.com, or phone-only modes
- Selected publications section
