# Dr Maggie He's website — how to take it over and put it live

This is the complete website. Everything needed to run it is in this folder.

Follow the steps in order. You do not need to write any code, and you do not need to
install anything on your computer. Everything happens in a web browser.

Once you have finished, the website is entirely yours: it runs on your accounts, it is
paid for by nobody (all three services below are free at this size), and no one else
needs to be involved to keep it running or to change the words on it.

**Set aside about an hour**, plus waiting time for the domain to start working, which can
take a few hours and is out of anybody's control.

> **A note about two other files in this folder.** `DEPLOY-GUIDE.md` and `SETUP-GUIDE.md`
> came with the original template this site was built from. They are generic, they name a
> different doctor, and they suggest buying a domain from a company you are not using.
> Ignore both of them. This file replaces them.

---

## What you will end up with

| Piece | What it does | Cost |
|---|---|---|
| A **GitHub** account | Stores the website's files | Free |
| A **Vercel** account | Turns those files into the live website | Free |
| The **drmaggiehe.com.au** domain you already bought at VentraIP | The address people type | Already paid |

The three connect in a chain: you put the files on GitHub, you point Vercel at GitHub, and
you point the domain at Vercel. After that, any change saved to GitHub rebuilds the live
site by itself, usually within a minute.

---

## Step 1 — Create a GitHub account

1. Go to **https://github.com** and choose **Sign up**.
2. Use whichever email address you want to own the site long-term.
3. Pick any username. It becomes part of an address only you will see, so it does not
   matter what it is.
4. Verify the email GitHub sends you.

If you already have a GitHub account, use it and skip to step 2.

---

## Step 2 — Put the website files on GitHub

1. Signed in to GitHub, click the **+** in the top right, then **New repository**.
2. Under **Repository name**, type: `drmaggiehe-website`
3. Leave everything else alone. **Private** and **Public** both work; private is fine.
4. Do **not** tick "Add a README file".
5. Click **Create repository**.
6. On the page that appears, find the line **"uploading an existing file"** and click it.
7. Open the `website` folder that came with this guide. Select **everything inside it**
   and drag it all onto the GitHub page.
   - Drag the *contents* of the folder, not the folder itself.
   - It is normal for this to take a few minutes and to show a long list of files.
8. Scroll to the bottom and click **Commit changes**.

When it finishes you should see files like `package.json` and folders like `src` listed on
the page. That is the whole website, stored safely.

---

## Step 3 — Put the website online

1. Go to **https://vercel.com** and choose **Sign Up**.
2. Choose **Continue with GitHub** and allow it access when asked. Using GitHub to sign in
   is what lets the two talk to each other.
3. On your Vercel dashboard, click **Add New**, then **Project**.
4. Find `drmaggiehe-website` in the list and click **Import**.
5. Change nothing. Vercel recognises this kind of website on its own.
6. Click **Deploy**.

After a minute or two you will get a working web address ending in `.vercel.app`. Click it
and check the site looks right. It is live on the internet at this point, just not yet at
her own address.

---

## Step 4 — Tell Vercel about the domain

1. In Vercel, open your project, then **Settings**, then **Domains** in the side menu.
2. Click **Add Domain**, type `drmaggiehe.com.au`, and confirm.
3. Vercel will offer to add `www.drmaggiehe.com.au` as well. **Accept this.**

Vercel will now show you a short list of DNS settings. **Leave this page open.** You are
about to copy those values into VentraIP, and you need them exactly as Vercel shows them
to you.

> **Read the values from your own Vercel screen. Do not copy DNS values out of this guide
> or any other guide you find online.** Vercel now gives each project its own individual
> address to point at, so a value that is correct for one website is wrong for another.
> Vercel's documentation shows these as looking something like
> `d1d4fc829fe7bc7c.vercel-dns-017.com`, and the digits at the front differ per project.

**Why the site will live at `www.drmaggiehe.com.au`:** Vercel recommends using the `www`
version as the real address, with the plain `drmaggiehe.com.au` bouncing visitors across
to it. That is what the website is already configured for, and it is what the instructions
below set up. Visitors who leave off the `www` still arrive in the right place, and most
browsers hide the `www` from the address bar anyway.

---

## Step 5 — Point the domain at Vercel, at VentraIP

This is the only fiddly step, and it is fiddly for everyone.

**First, a check.** VentraIP can only edit these settings if the domain is using
VentraIP's own DNS hosting. If you bought the domain from them and have not changed
anything, it already is.

1. Sign in to **VIPcontrol** at VentraIP.
2. Click **My Services**, then the **Domains** tab.
3. Find `drmaggiehe.com.au` and click its **DNS** button.
4. You will see a table of existing records. Add records using the **plus icon** above the
   table. Each one asks for:
   - **Type** — chosen from a dropdown
   - **Hostname** — the part before the domain. **Leave it blank for the plain domain**;
     type `www` for the www version.
   - **Value** — what it points at
   - **TTL** — leave as it is
5. Add the two records Vercel showed you on the other tab:
   - The **www** one: Type `CNAME`, Hostname `www`, Value = the address Vercel gave you.
   - The **plain domain** one: Type `A`, Hostname blank, Value = the IP address Vercel
     gave you.
6. If there are existing records of the same type and hostname pointing somewhere else
   (often a parking or "coming soon" page), edit or delete those, or the old ones will
   win.
7. Save.

**Then wait.** VentraIP says these changes take roughly **2 to 8 hours** to spread across
the internet. Nothing is broken during that time. Go back to Vercel's Domains page every
so often, and when it is ready both entries turn to a green tick and the site answers at
**https://www.drmaggiehe.com.au**. The security padlock is added automatically.

---

## Step 6 — Turn on the editor so she can change words herself

The site has a built-in editing screen so nobody has to touch code to fix a phone number
or reword a paragraph.

1. On GitHub, open your `drmaggiehe-website` repository.
2. Open the folder `public`, then `admin`, then click the file `config.yml`.
3. Click the **pencil icon** to edit it.
4. Near the top find this line:

   ```
   repo: CHANGE-ME-github-account/CHANGE-ME-repository-name
   ```

   Replace it with your GitHub username and the repository name, like this:

   ```
   repo: your-github-username/drmaggiehe-website
   ```

5. Click **Commit changes**.

Now create a key that lets the editor save:

6. On GitHub go to **Settings** (under your profile picture), scroll to the very bottom to
   **Developer settings**, then **Personal access tokens**, then **Fine-grained tokens**.
7. Click **Generate new token**. Give it any name. Under **Repository access** choose only
   `drmaggiehe-website`. Under **Permissions**, set **Contents** to **Read and write**.
8. Generate it and **copy the token immediately** — GitHub shows it only once. Keep it
   somewhere safe, like a password manager.

To use the editor, go to **https://www.drmaggiehe.com.au/admin/**, choose **Sign In with
Token**, and paste that token. Anything saved there commits to GitHub and the live site
rebuilds by itself within a minute or two.

This token is the only "password" for editing the site. Treat it like one.

---

## How to change things from now on

**Words, phone numbers, opening times, articles** — use the `/admin/` editor from step 6.
That covers nearly everything.

**Photos** — the images live in the `public/images` folder on GitHub. You can upload a
replacement with the same filename to swap a picture out.

**The logo** — the original artwork is in the `original-logo` folder beside this guide.
The website uses two prepared versions, a normal one and a brighter one for dark mode.
If the logo is ever redrawn, both need replacing; the notes in `CLAUDE.md` explain where.

**Anything structural** — this is a standard Next.js website, so any web developer can
work on it. There is nothing unusual or private in how it is built.

---

## If something goes wrong

**The site shows an error after an edit.** Nothing is lost. In Vercel, open your project,
click **Deployments**, find the last one that worked, and use its menu to **Promote to
Production**. The site returns to that version immediately, and you can then fix the edit
without any pressure.

**The domain is not working after a day.** Recheck the two records at VentraIP against
what Vercel's Domains page is asking for, character by character. A stray space or a
missing `www` is the usual cause. Vercel's page tells you which record it is unhappy with.

**The editor will not sign in.** The token has probably expired, or it was created without
**Contents: read and write**, or the `repo:` line in step 6 does not exactly match your
account and repository names. Make a fresh token and try again.

---

## Things worth knowing

- **The medical content is her responsibility.** The clinical wording, the AHPRA number,
  and the deliberate absence of patient testimonials were all set by Dr He herself to
  comply with the Medical Board's advertising rules. Do not add testimonials or reviews.
- **Nothing on the site collects patient data.** There is no contact form storing
  anything, no database, and no tracking. The contact section shows a phone number and an
  email address only.
- **The site is a set of fixed pages**, so it is fast and there is very little that can
  break once it is up.
- **`CLAUDE.md`** in the website folder is the maintainer's notes: how the site is put
  together, which decisions were hers and should not be undone, and a record of what has
  been changed and when. Worth keeping.

---

## Where these instructions come from

The Vercel and VentraIP steps were taken from each company's own current documentation
rather than from memory, because both have changed their instructions in the past:

- Vercel, [Adding & Configuring a Custom Domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain)
  — how to add a domain, and that each project now gets its own individual DNS address.
- Vercel, [Deploying & Redirecting Domains](https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting)
  — why `www` is recommended as the main address.
- VentraIP, [Adding, removing, and managing DNS records within VIPcontrol](https://ventraip.com.au/support-centre/add-remove-or-manage-dns-records-within-vipcontrol/)
  — the click path, the field names, and the 2 to 8 hour wait.
- Sveltia CMS, [GitHub backend](https://sveltiacms.app/en/docs/backends/github)
  — that a personal access token is enough for a single editor, with no OAuth app needed.

If a screen does not look like the description here, trust the company's own current
documentation over this guide.
