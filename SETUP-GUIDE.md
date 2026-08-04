# How to Set Up Your Own Doctor Website

A step-by-step guide for medical consultants. No coding experience needed.
Total time: about 1-2 hours. Cost: free (or ~$10/year if you buy a custom domain).

---

## What you will need

- A laptop or desktop computer with internet access
- An email address
- 30 minutes of uninterrupted time for the initial setup
- Your professional details (bio, GMC number, clinic locations, etc.)
- A headshot photo (optional but recommended)

---

## Part 1: Get your site live (20 minutes)

### Step 1: Create a GitHub account (free)

GitHub stores your website's files. Think of it as a smart filing cabinet.

1. Go to [github.com](https://github.com)
2. Click **"Sign up"**
3. Enter your email, create a password, and choose a username
4. Verify your email address
5. You are now signed in to GitHub

### Step 2: Copy the website template

1. Go to the template repository (your colleague will share this link with you)
2. Click the green **"Fork"** button (top right of the page)
3. On the next screen, leave everything as default and click **"Create fork"**
4. Wait a few seconds — you now have your own copy of the website

### Step 3: Update the repository name (optional)

1. In your forked repository, click **"Settings"** (the gear icon tab)
2. Under **"Repository name"**, change it to something like `my-cardiology-website`
3. Click **"Rename"**

### Step 4: Deploy your site on Vercel (free)

Vercel is the service that makes your website visible on the internet. It is free.

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** and choose **"Continue with GitHub"**
3. Authorise Vercel to access your GitHub account
4. You will land on the Vercel dashboard
5. Click **"Add New..."** then **"Project"**
6. You will see a list of your GitHub repositories — click **"Import"** next to your website repository
7. Leave all settings as default
8. Click **"Deploy"**
9. Wait about 60 seconds — Vercel will build your site
10. When it says **"Congratulations!"**, your site is live
11. Click **"Visit"** to see it — it will be at an address like `your-project.vercel.app`

**Your website is now live on the internet.** Everything below is customisation.

---

## Part 2: Personalise your content (30-60 minutes)

You have two ways to edit your website:

- **Option A: Visual admin panel** (easier, recommended) — go to `your-site.vercel.app/admin/`
- **Option B: Edit on GitHub directly** (simpler setup) — edit the file `src/data/site-content.json`

### Option A: Using the visual admin panel

The admin panel gives you a form-based editor — no code to look at.

**One-time setup:**

1. Go to [github.com/settings/developers](https://github.com/settings/developers)
2. Click **"OAuth Apps"** in the left sidebar
3. Click **"New OAuth App"**
4. Fill in:
   - **Application name:** `My Website Admin`
   - **Homepage URL:** `https://your-project.vercel.app` (use your actual Vercel URL)
   - **Authorization callback URL:** `https://your-project.vercel.app/admin/`
5. Click **"Register application"**
6. You will see a **Client ID** — copy it
7. Click **"Generate a new client secret"** — copy the secret too
8. Now go to your GitHub repository
9. Open the file `public/admin/config.yml`
10. Click the pencil icon to edit
11. Change the line `repo: your-username/doctor-website` to your actual GitHub username and repository name (e.g. `repo: drsmith/my-cardiology-website`)
12. Click **"Commit changes"**
13. Wait 60 seconds for Vercel to rebuild
14. Go to `your-site.vercel.app/admin/`
15. Click **"Login with GitHub"**
16. You are now in the admin panel

**Editing your content:**

Once logged in, you will see sections for:

| Section | What to edit |
|---------|-------------|
| **Doctor Details** | Your name, credentials, bio, photo, professional roles |
| **Hero Section** | The main headline and button text |
| **Conditions You Treat** | The conditions shown on your homepage |
| **Services** | Investigations and procedures you offer |
| **Articles for Patients** | Patient-friendly articles with images |
| **Selected Publications** | Your research papers (title, journal, year, DOI) |
| **Clinic Locations** | Where you see patients (name, address, days) |
| **Fees** | Consultation fees |
| **Patient Testimonials** | Quotes from patients (keep GMC-compliant) |
| **FAQs** | Frequently asked questions |
| **Contact Details** | Your email, phone, booking method |
| **Colour Scheme** | Pick your brand colours using the colour picker |
| **SEO Settings** | Your website URL, page title, meta description |

Click into any section, make your changes, and click **"Save"**. Your website updates automatically in about 60 seconds.

### Option B: Edit directly on GitHub

If you prefer not to set up the admin panel:

1. Go to your repository on GitHub
2. Navigate to `src/data/site-content.json`
3. Click the pencil icon to edit
4. Find the section you want to change (e.g. your name, bio, phone number)
5. Edit the text between the quote marks `"like this"`
6. Click **"Commit changes"**
7. Vercel automatically rebuilds your site in about 60 seconds

---

## Part 3: Add your photo (5 minutes)

### On GitHub:

1. Go to your repository on GitHub
2. Navigate to the `public/images/` folder
3. Click **"Add file"** then **"Upload files"**
4. Drag your headshot photo in
5. Name it `doctor-placeholder.jpg` (or update the photo path in your content)
6. Click **"Commit changes"**

### Via the admin panel:

1. Go to your admin panel
2. Open **Doctor Details**
3. Click the **Photo** field and upload your image
4. Save

**Photo tips:** Use a professional headshot. Landscape or square works best. Keep the file under 500KB.

---

## Part 4: Update your condition pages (15 minutes)

Your website comes with 8 pre-written condition pages (chest pain, palpitations, heart failure, etc.). You should review and personalise these.

### Via the admin panel:

1. In the admin panel, click **"Condition Pages"** in the left sidebar
2. Click on any condition to edit it
3. Use the rich text editor to update the content
4. Save when done

### On GitHub:

1. Go to `src/content/conditions/` in your repository
2. Click on any `.mdx` file (e.g. `chest-pain.mdx`)
3. Click the pencil icon to edit
4. The format is simple:
   - `##` creates a heading
   - `-` creates a bullet point
   - `**text**` makes text bold
5. Edit the text, then click **"Commit changes"**

### Adding a new condition:

1. In the admin panel, go to **Condition Pages** and click **"New"**
2. Fill in the title, description, and content
3. Also go to **Site Content > Conditions You Treat** and add a matching entry

### Removing a condition:

1. Delete the condition page
2. Remove the matching entry from **Conditions You Treat**

---

## Part 5: Choose your colours (2 minutes)

In the admin panel under **Colour Scheme**, use the colour pickers. Or pick from these pre-made medical palettes:

| Style | Primary colour | Accent colour |
|-------|---------------|---------------|
| Royal Blue + Coral (default) | `#2b6cb0` | `#c53030` |
| Navy + Teal | `#1e3a5f` | `#2c7a7b` |
| Deep Blue + Gold | `#1a365d` | `#a0720f` |
| Forest + Sage | `#22543d` | `#2f855a` |
| Burgundy + Warm Grey | `#742a2a` | `#566373` |

All palettes have been tested for accessibility (WCAG AA contrast).

Your website also has a **dark mode toggle** (moon/sun icon in the top right) that visitors can use to switch between light and dark themes.

---

## Part 6: Set up the contact form (10 minutes, optional)

The contact form sends patient enquiries to your email. It uses a free service called Formspree.

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Click **"New Form"**
3. Give it a name (e.g. "Patient Enquiries")
4. Set the recipient email to your secretary's email
5. Copy the **Form ID** (it looks like `xabcdefg`)
6. In your admin panel (or `site-content.json`), go to **Contact Details**
7. Paste the Form ID into the **Formspree Form ID** field
8. Make sure **Booking Type** is set to **"Contact Form (Formspree)"**
9. Save

Patients can now submit enquiries through your website, and they will arrive in your email inbox.

**Without Formspree:** The form will open the visitor's email app with a pre-filled message to your email address. This still works, just less seamless.

---

## Part 7: Buy and connect a custom domain (15 minutes, optional)

Your site works fine at `your-project.vercel.app`, but a custom domain (like `www.drsmith.co.uk`) looks more professional.

### Step 1: Buy a domain

You can buy a domain from:
- [Namecheap](https://namecheap.com) — typically ~$8-12/year for a `.co.uk` or `.com`
- [Google Domains](https://domains.google) — simple interface
- [Vercel](https://vercel.com/domains) — buy directly in Vercel (most convenient)

**Recommended domain format:** `www.dryourlastname.co.uk` or `www.dryourlastname.com`

### Step 2: Connect the domain to Vercel

1. Log in to [vercel.com](https://vercel.com)
2. Click on your project
3. Go to **Settings** (top menu)
4. Click **"Domains"** in the left sidebar
5. Type your domain name (e.g. `www.drsmith.co.uk`) and click **"Add"**
6. Vercel will show you DNS records to add

### Step 3: Update your DNS settings

This tells the internet to point your domain to your Vercel website.

**If you bought from Namecheap:**
1. Log in to [namecheap.com](https://namecheap.com)
2. Go to **Domain List** and click **"Manage"** next to your domain
3. Click the **"Advanced DNS"** tab
4. Add the records that Vercel showed you (typically an A record and CNAME)
5. Save

**If you bought from Vercel:**
- It is automatic — no DNS changes needed

### Step 4: Wait for it to activate

DNS changes can take up to 48 hours, but usually work within 30 minutes. Vercel will show a green checkmark when your domain is active.

### Step 5: Update your site URL

1. In the admin panel, go to **SEO Settings**
2. Change **Website URL** to your new domain (e.g. `https://www.drsmith.co.uk`)
3. Save

---

## Part 8: Ongoing maintenance

### Updating your website

Any time you want to change something:
1. Go to your admin panel (`your-domain.com/admin/`) or edit on GitHub
2. Make your changes
3. Save/commit — your site updates automatically in 60 seconds

### Adding articles for patients

1. In the admin panel, go to **Articles for Patients**
2. Click **"Add"**
3. Enter the title, a short excerpt, an optional cover image, and a link
4. Save

### Adding publications

1. In the admin panel, go to **Selected Publications**
2. Click **"Add"**
3. Enter the paper title, authors, journal, year, DOI, and PubMed URL
4. Save

### Common questions

**Q: How much does this cost?**
Everything is free except the custom domain (~$10/year). GitHub, Vercel, and the website template are all free.

**Q: Can I break my website?**
It is very difficult to break. If you make a mistake in the admin panel or JSON file, you can always undo it by going to your GitHub repository and clicking "History" to revert to a previous version.

**Q: Who can see my admin panel?**
Only people who can log in with your GitHub account. Visitors to your website cannot see or access `/admin/`.

**Q: Do I need to keep my laptop on for the website to work?**
No. Your website is hosted by Vercel's servers. It works 24/7 regardless of whether your laptop is on.

**Q: Can patients book appointments through my website?**
Yes, if you set up the contact form (Part 6). You can also integrate Cal.com for online booking — set the **Booking Type** to "Cal.com" and enter your Cal.com link.

**Q: Is it GDPR compliant?**
The website uses Plausible Analytics (cookieless, no cookie banner needed) and does not store patient data. Contact form submissions go directly to your email via Formspree. You should still include a privacy policy link in your footer if you collect patient enquiries.

---

## Need help?

If you get stuck, the most common issues are:

1. **Site not updating after a change** — Wait 60 seconds. Check Vercel dashboard for build errors.
2. **Admin panel not loading** — Make sure the `repo` field in `config.yml` matches your GitHub username/repo.
3. **Photo not showing** — Make sure the file is in `public/images/` and the filename matches.
4. **Domain not working** — DNS changes can take up to 48 hours. Check Vercel's domain settings for errors.

For technical help, contact the person who shared this template with you.
