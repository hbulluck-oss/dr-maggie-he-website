# How to Deploy Your Website — Step by Step

This guide is for non-technical users. Follow each step carefully.

---

## What You Need Before Starting

- A **GitHub account** (free) — sign up at https://github.com
- A **Vercel account** (free) — sign up at https://vercel.com (use "Sign up with GitHub")
- A **domain name** (optional) — buy one at https://www.namecheap.com or https://domains.google.com
- Your **headshot photo** — JPEG or PNG, at least 800x800 pixels

---

## Step 1: Upload the Website to GitHub

### Option A: Using GitHub Desktop (easiest)
1. Download GitHub Desktop from https://desktop.github.com
2. Install it and sign in with your GitHub account
3. Click **File → Add Local Repository**
4. Select this folder: `dr-veerasamy-website`
5. If it says "not a git repository", click **Create a Repository** instead
6. Fill in the name: `dr-veerasamy-website`
7. Click **Create Repository**
8. Click **Publish repository** (top bar)
9. Untick "Keep this code private" if you want it public (either works)
10. Click **Publish Repository**

### Option B: Using GitHub.com directly
1. Go to https://github.com and sign in
2. Click the **+** icon (top right) → **New repository**
3. Name it `dr-veerasamy-website`
4. Click **Create repository**
5. Follow the instructions GitHub shows to upload files

---

## Step 2: Deploy on Vercel

1. Go to https://vercel.com and sign in with GitHub
2. Click **Add New → Project**
3. Find `dr-veerasamy-website` in the list and click **Import**
4. Leave all settings as default (Vercel auto-detects Next.js)
5. Click **Deploy**
6. Wait 1-2 minutes — you'll get a live URL like `dr-veerasamy-website.vercel.app`
7. **Done!** Your website is live.

---

## Step 3: Add Your Photo

1. Go to your repo on github.com
2. Click into: `public` → `images`
3. Click **Add file → Upload files**
4. Drag your headshot photo in (name it `doctor-placeholder.jpg`)
5. Click **Commit changes**
6. Vercel auto-redeploys in ~1 minute

---

## Step 4: Connect Your Domain (optional)

### If you bought a domain (e.g. www.drveerasamy.co.uk):

1. In Vercel, go to your project → **Settings → Domains**
2. Type your domain name and click **Add**
3. Vercel will show you DNS records to add
4. Go to your domain registrar (Namecheap, Google Domains, etc.)
5. Find **DNS settings** or **Manage DNS**
6. Add the records Vercel showed you:
   - Usually an **A record** pointing to `76.76.21.21`
   - And a **CNAME record** for `www` pointing to `cname.vercel-dns.com`
7. Wait 10-30 minutes for DNS to update
8. Your website is now live at your custom domain with free HTTPS

---

## How to Edit Your Website

### To change text content:
1. Go to your repo on github.com
2. Navigate to `src/data/site-content.json`
3. Click the pencil icon (edit)
4. Make changes (careful with commas and quotes)
5. Click **Commit changes**
6. Vercel auto-redeploys in ~1 minute

### To change condition page full text:
1. Navigate to `src/content/conditions/` on GitHub
2. Click the file you want to edit (e.g. `chest-pain.mdx`)
3. Click the pencil icon
4. Edit the text
5. Commit changes

### To change article full text:
1. Navigate to `src/content/articles/` on GitHub
2. Same process as conditions

### To change colour scheme:
1. Edit `src/data/site-content.json`
2. Search for `"design"`
3. Change `primaryColour` and `accentColour` — see options below:

| Palette | primaryColour | accentColour |
|---------|--------------|-------------|
| Royal Blue + Coral (default) | #1e4e8c | #c53030 |
| Navy + Teal | #1e3a5f | #2c7a7b |
| Deep Blue + Gold | #1a365d | #c6922e |
| Forest + Sage | #22543d | #68d391 |
| Burgundy + Grey | #742a2a | #a0aec0 |
| Dark Blue + Orange | #1a2744 | #dd6b20 |
| Black + Gold | #1a1a2e | #d4a843 |

---

## Important Notes

- Every time you edit a file on GitHub and commit, Vercel automatically rebuilds your site
- Changes go live within 1-2 minutes
- If the build fails, check for missing commas or quotes in site-content.json
- Your site is free on Vercel unless you get millions of visitors
- The site has built-in: Privacy Policy, Cookie Policy, Accessibility Statement, and Terms pages
