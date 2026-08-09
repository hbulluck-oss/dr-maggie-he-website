# Dr Maggie He's website: how to put it online and look after it

**Read this first. It is the only instruction file you need.**

You do not need to know how to code. You do not need to install anything on your computer.
Everything happens in a normal web browser, and every step is written out below.

If you follow this from top to bottom, you will end up with the website running at
**www.drmaggiehe.com.au**, owned entirely by you, costing nothing to keep online, with a
simple screen for changing the words on it whenever you like.

---

## First, what is all this?

The website is just a folder of files. On its own, a folder of files does nothing. Three
separate things have to happen to turn it into a website people can visit.

**1. The files need to live somewhere.** That is **GitHub**. Think of it as Dropbox, but
for website files. It keeps them safe and keeps a copy of every version, so nothing can be
permanently broken.

**2. Something has to turn those files into a real website.** That is **Vercel**. It reads
the files from GitHub and serves the finished site to visitors. It is free, and it does its
job automatically: every time the files change, Vercel rebuilds the site within a minute.

**3. The address has to point at it.** That is the **domain**, `drmaggiehe.com.au`, which
Dr He has already bought from **VentraIP**. Right now that address points nowhere useful.
You will point it at Vercel.

So the chain is: **GitHub holds it, Vercel serves it, the domain points at it.**

Once those three are connected, they keep working on their own. You will not need to repeat
any of this.

---

## Four words you will meet

You do not need to understand these deeply, but they will stop the screens looking strange.

**Repository** (often shortened to "repo"). GitHub's word for one project's folder of files.
You will make one, and it will hold this website.

**Deploy**. To publish. When Vercel "deploys", it is building the site and putting it live.

**DNS**. The internet's phone book. It is what turns a name people type, like
`drmaggiehe.com.au`, into the actual computer that answers. Connecting the domain means
adding two entries to that phone book.

**Commit**. GitHub's word for "save". When you save a change on GitHub, it calls it
committing.

---

## Before you start

**You will need:**

- The folder that came with this guide, unzipped (see below).
- An email address you are happy to use for the long term. Whoever owns these accounts owns
  the website, so use an address that will not disappear.
- The VentraIP login for the domain. If Dr He bought it, she has this.
- About **an hour**, plus a wait of a few hours at step 5 that is out of anyone's control.

**Unzipping the folder.** You were sent a file ending in `.zip`. Double-click it. On both
Mac and Windows this creates a normal folder next to it with the same name. Open that
folder. Inside you will find:

- **README** (this file)
- **website** (a complete copy of the site. If you follow the recommended route in Part 2 you
  will not need to open or upload it at all. Keep it anyway: it is your offline backup, and
  it is what you would hand to a web developer)
- **original-logo** (Dr He's original logo artwork, kept safe in case it is ever needed again)

**This is the only guide.** Earlier copies of this package also contained files called
`DEPLOY-GUIDE.md` and `SETUP-GUIDE.md`. They came with the off-the-shelf template this site
was built from, they named a completely different doctor, and their instructions were wrong.
They have been deleted. If you are holding an older copy of the package and can see them,
delete that copy and use this one.

---

## Part 1: Create a GitHub account

If you already have one, skip to Part 2.

1. Go to **https://github.com**
2. Click **Sign up** (top right).
3. Enter your email address, then choose a password and a username.
   - The username can be anything. It becomes part of a web address only you will really
     see. Something like her name or your name is fine.
4. GitHub will ask you to solve a small puzzle to prove you are human. Do that.
5. GitHub emails you a code. Copy it from the email and paste it in.
6. If it offers you paid plans, choose the **free** option.

**You should now see:** a GitHub home page, with your username shown if you click your
picture in the top right corner.

---

## Part 2: Put the website files on GitHub

There are two ways to do this. **Use Route A.** It is three fields and a button, you never
touch a file, and it cannot go wrong in the way Route B can. Route B is only here in case
Route A is unavailable.

### Route A: copy it straight across (recommended)

The finished website already sits in a public GitHub repository. GitHub can copy it into
your own account for you.

1. Click the **+** symbol in the top right of GitHub, then choose **Import repository**.
2. In the box for the address of the existing repository, paste exactly:

   ```
   https://github.com/hbulluck-oss/dr-maggie-he-website
   ```

3. Under **Owner**, choose your own account.
4. In **Repository name**, type exactly: `drmaggiehe-website`
5. Choose **Private** or **Public**. Either works. **Private** is the safer instinct and is
   what most people pick. Nothing about the finished website changes either way.
6. Click **Begin import**.

You are not asked for a password or a token: the source is public, so nothing is needed.
Importing takes under a minute, and GitHub emails you when it has finished.

**You should now see:** your own repository page, listing folders like `public` and `src`,
and files like `package.json` and `next.config.mjs`.

> **What this does and does not do.** It takes a complete copy of the site as it stands
> today, into your account, owned by you. It is a copy, not a link: nothing you do afterwards
> affects the original, and nothing that happens to the original affects you. Dr He's site is
> yours from that moment on.

### Route B: upload the files by hand (only if Route A is unavailable)

1. Click the **+** symbol in the top right of GitHub, then choose **New repository**.
2. In **Repository name**, type exactly: `drmaggiehe-website`
3. Leave the description blank, and choose **Private** or **Public** as above.
4. **Do not tick** "Add a README file", and leave the other two dropdowns as "None".
   - This matters. If you tick it, the upload gets more complicated.
5. Click **Create repository**.
6. On the page that appears, find the phrase **uploading an existing file** and click it.
   - If you cannot find it, the direct address is your repository's web address with
     `/upload/main` added on the end.
7. Open the `website` folder from the unzipped folder on your computer.
8. Select **everything inside** it. On a Mac press **Cmd+A**; on Windows press **Ctrl+A**.
9. Drag all of it into the dotted box on the GitHub page.

> **The one thing people get wrong here, and it is the reason Route A exists.** Drag the
> *contents* of the `website` folder, not the `website` folder itself. If you drag the
> folder, everything ends up one level too deep, and Vercel then builds nothing and shows you
> an error or a blank page. After dropping, the list on screen must start with names like
> `package.json` and `next.config.mjs`. If instead you see a single line saying `website`,
> you have dragged the folder. Reload the page and start the drag again.

10. Uploading takes a few minutes and shows a long list of file names. That is normal.
11. Scroll to the bottom and click the green **Commit changes** button.

**You should now see:** your repository page, listing folders like `public` and `src`, and
files like `package.json`.

### Check this before you go on

Look at your repository's front page. **`package.json` must be in the list you can see, not
inside another folder.** If you have to click into a folder called `website` to find it, the
next part will fail. Fix it now: the quickest fix is to delete the repository and do Route A.

---

## Part 3: Put the website on the internet

1. Go to **https://vercel.com**
2. Click **Sign Up**.
3. Choose **Continue with GitHub**.
   - Sign in this way and not with an email address. This is what allows Vercel to read the
     files from GitHub. It is the link in the chain.
4. GitHub will ask whether to give Vercel access. Click **Authorize**.
5. If asked what kind of account you want, choose the free **Hobby** option, and enter a
   name if prompted.
6. On your Vercel dashboard, click **Add New**, then **Project**.
7. You will see a list of your GitHub repositories. Find **drmaggiehe-website** and click
   **Import** next to it.
   - If the list is empty or your repository is missing, click the option about configuring
     GitHub access, and give Vercel permission to see your repositories. Then come back.
8. A settings page appears. **Change nothing.** Vercel recognises this kind of website by
   itself and fills everything in correctly.
   - One thing is worth a glance before you click. Near the top there is a box called
     **Framework Preset**. It should already say **Next.js**. If it says **Other**, stop:
     that means Vercel cannot see the website's files, which almost always means the files
     went into GitHub one level too deep. Go back and read "Check this before you go on" at
     the end of Part 2.
9. Click **Deploy**.

Vercel now builds the site. It takes one to two minutes and shows scrolling text while it
works. That text is normal, and you can ignore it.

**You should now see:** a congratulations screen with a small picture of the website.

> **If instead you get a red error, or the site opens blank or shows "404".** Do not start
> over from scratch, and do not change any build settings. Nine times out of ten the files
> are one level too deep in GitHub. Two ways out, either is fine:
>
> - **Cleanest:** delete the repository on GitHub and redo Part 2 using Route A.
> - **Or tell Vercel where to look:** in Vercel open the project, go to **Settings**, then
>   **Build and Deployment**, scroll to **Root Directory**, type `website`, click **Save**,
>   then go to **Deployments** and redeploy the most recent one.
>
> The full list of symptoms and what each one means is in "If something goes wrong" near the
> end of this guide.

10. Click the picture, or the web address shown near it. It will end in `.vercel.app`.

**The website is now live on the internet.** Look through it properly at this point. Check
the pages, click the menu, try it on your phone. It is easier to sort out any problem now
than after the real address is connected.

---

## Part 4: Tell Vercel the real address

Now you connect `drmaggiehe.com.au`.

1. In Vercel, open your project.
2. Click **Settings** along the top.
3. Click **Domains** in the menu down the left.
4. Click **Add Domain**.
5. Type `drmaggiehe.com.au` and confirm.
6. Vercel will offer to add **www.drmaggiehe.com.au** as well. **Say yes.**

**You should now see:** both addresses listed, each marked as needing configuration, with
some settings displayed. Vercel is telling you exactly what to put into VentraIP.

**Leave this browser tab open.** You are about to copy these values, and you need them
exactly as Vercel is showing them to you.

> ### The single most important warning in this guide
>
> **Use the values on your own Vercel screen. Do not copy DNS values from this guide, from
> Google, or from any tutorial you find online.**
>
> Vercel now gives every website its own individual values. They look something like
> `d1d4fc829fe7bc7c.vercel-dns-017.com`, and the letters and numbers at the front are
> different for every project. A value that is correct for someone else's website will
> simply not work for this one.
>
> Older guides on the internet still quote one shared value that used to work for everybody.
> It is out of date. Trust your own screen.

**Why the address will be www.drmaggiehe.com.au:** Vercel recommends using the `www` version
as the real address, with the plain `drmaggiehe.com.au` automatically bouncing visitors
across to it. The website is already set up expecting that. Anyone who types the address
without the `www` still arrives in the right place, and most browsers hide the `www` from
view anyway.

---

## Part 5: Point the domain at Vercel, over at VentraIP

This is the fiddliest part. It is fiddly for everybody, including professionals. Take it
slowly and it is fine.

**One thing to check first.** VentraIP can only edit these settings if the domain is using
VentraIP's own DNS hosting. If Dr He bought the domain from VentraIP and nothing has been
changed since, it already is, and you have nothing to do here.

1. Sign in to **VIPcontrol**, which is VentraIP's control panel.
2. Click **My Services**, then the **Domains** tab.
3. Find `drmaggiehe.com.au` in the list, and click its **DNS** button.

**You should now see:** a table of existing DNS entries.

4. To add a new one, click the **plus icon** above the table. Each entry asks for four
   things:

   | Field | What to put |
   |---|---|
   | **Type** | Chosen from a dropdown list |
   | **Hostname** | The bit in front of the domain. **Leave it completely blank** for the plain domain. Type `www` for the www version. |
   | **Value** | What it points at. This is what you copy from the Vercel tab. |
   | **TTL** | Leave exactly as it is |

5. Add the **www** entry:
   - Type: **CNAME**
   - Hostname: `www`
   - Value: the address Vercel gave you for the www version
6. Add the **plain domain** entry:
   - Type: **A**
   - Hostname: leave blank
   - Value: the numeric address Vercel gave you for the plain domain
7. **Look for entries that clash.** If the table already has an `A` entry with a blank
   hostname, or a `CNAME` entry with hostname `www`, pointing somewhere else, they will win
   and yours will be ignored. This is common, because domains often start out pointing at a
   holding page. Edit those old entries to the new values, or delete them.
8. Save.

### Then wait

VentraIP says these changes take roughly **2 to 8 hours** to spread across the internet.
Occasionally longer. Nothing is broken during this time and there is nothing to fix. It is
simply how DNS works.

Every so often, go back to the Vercel **Domains** page and reload it. When it is ready, both
entries change to a green tick, and the site answers at **https://www.drmaggiehe.com.au**.

The padlock symbol and the security certificate are added by Vercel automatically. You do
not have to buy or configure anything for that.

---

## Part 6: Switch on the editing screen

This is what lets Dr He reword a paragraph, correct a phone number or change consulting days
herself, without touching any code and without needing you.

You can do this at any time. It does not hold up the website going live.

### 6a. Tell the editor which website it is editing

1. On GitHub, open your **drmaggiehe-website** repository.
2. Click the **public** folder, then the **admin** folder, then the file **config.yml**.
3. Click the **pencil icon** near the top right to edit it.
4. Near the top you will find this line:

   ```
   repo: CHANGE-ME-github-account/CHANGE-ME-repository-name
   ```

5. Replace it so it reads your GitHub username, a slash, then the repository name. For
   example, if your username were `mhe-admin`:

   ```
   repo: mhe-admin/drmaggiehe-website
   ```

   Keep the two spaces at the start of the line exactly as they are. This kind of file cares
   about indentation.

6. Click **Commit changes**, then confirm.

### 6b. Create the key that lets it save

The editor needs permission to save changes back to GitHub. That permission is a long
password called a token.

1. On GitHub, click your picture (top right), then **Settings**.
2. Scroll right to the bottom of the left-hand menu and click **Developer settings**.
3. Click **Personal access tokens**, then **Fine-grained tokens**.
4. Click **Generate new token**.
5. Fill it in:
   - **Token name:** anything, for example `website editor`
   - **Expiration:** your choice. A longer period means doing this again less often. When it
     does expire, the editor stops signing in, and you simply make a new one.
   - **Repository access:** choose **Only select repositories**, then pick
     **drmaggiehe-website**
   - **Permissions:** find **Contents** and set it to **Read and write**
6. Click **Generate token**.
7. **Copy the token straight away and save it somewhere safe**, such as a password manager.
   GitHub shows it once and never again. If you lose it, no harm done, you just make another.

### 6c. Use it

1. Go to **https://www.drmaggiehe.com.au/admin/**
   - Before the domain is connected, use your `.vercel.app` address with `/admin/` on the
     end instead.
2. Choose **Sign In with Token**.
3. Paste the token.

You can now edit the site's wording in a normal form, click save, and the live website
updates itself a minute or two later.

**Treat that token like a password.** It is the only thing standing between the internet and
the ability to edit the website.

---

## Making changes from now on

**Wording, phone numbers, consulting days, articles.** Use the `/admin/` editor. This covers
almost everything anyone will ever want to change.

**Photographs.** These live in the `public/images` folder on GitHub. To swap one, upload a
new picture with exactly the same file name, and it replaces the old one everywhere it
appears.

**The logo.** The original artwork is in the `original-logo` folder that came with this
guide. The website uses two prepared versions of it: a normal one, and a brighter one used
when a visitor's phone or computer is set to dark mode. If the logo is ever redrawn, both
need replacing. The file `CLAUDE.md` inside the website folder explains where they are.

**Anything bigger.** This is an ordinary, modern website built with well-known tools. Any
web developer can pick it up. There is nothing unusual, private or locked about it.

---

## If something goes wrong

### The first deployment failed, or the site looks wrong

Work down this list in order. The first four are all the same underlying problem, and it is
the commonest one by a distance.

| What you see | What it means | What to do |
|---|---|---|
| Vercel says **"No Next.js version detected"**, or the build fails almost immediately | Vercel cannot find `package.json`, so the files went in one level too deep | Part 2's "Check this before you go on". Redo Part 2 by Route A, or set **Root Directory** to `website` |
| **Framework Preset** said **Other**, not **Next.js** | Same cause as above | Same fix |
| The address opens but shows **404** or a blank white page | Same cause as above, or the build never finished | Same fix, then check **Deployments** shows a green "Ready" |
| The repository front page makes you click into a folder called `website` to see `package.json` | The folder was dragged instead of its contents | Delete the repository and redo Part 2 by Route A |
| The pages load but have **no colours or layout**, just black text on white | The upload stopped part-way through, so some files are missing | Delete the repository and redo Part 2 by Route A |
| **Images are missing** but everything else looks right | Same as above, the picture files did not all arrive | Same fix |
| The build fails and the red text mentions a **file name** | A file was changed and something is mistyped in it | Look at what you last edited. In Vercel, **Deployments**, reopen the last one that worked, **...** menu, **Promote to Production** |

**A note on what "it does not work" usually is not.** The website itself needs no setting up:
no passwords, no keys, no configuration, no paid extras. It is checked before release by
building it from scratch on a clean machine. So if the first deployment fails, suspect how
the files reached GitHub, not the website.

### The website shows an error after an edit

Nothing is lost, and you can undo it in about thirty seconds. In Vercel, open the project,
click **Deployments**, find the most recent one that worked, open its **...** menu, and
choose **Promote to Production**. The website goes straight back to that version. Then fix
the edit calmly.

### Other things

**The domain still is not working the next day.** Go back to the Vercel Domains page. It
tells you which entry it is unhappy with and what it expected. Compare that against what is
in VentraIP, character by character. The usual causes are a typing slip, a leftover old
entry that clashes (see step 7 in Part 5), or something typed into the Hostname box that
should have been left blank.

**The editor will not let you sign in.** One of three things. The token has expired, so make
a new one. Or the token was created without **Contents: read and write**. Or the `repo:`
line from Part 6a does not exactly match your GitHub username and repository name.

**A screen does not look like this guide describes.** GitHub, Vercel and VentraIP all
redesign their websites from time to time, so a button may have moved or been renamed. The
order of what you are doing stays the same. Look for the same words, and if in doubt trust
the company's own current help pages over this guide.

---

## Worth knowing

- **The medical content is Dr He's responsibility, not yours.** The clinical wording, her
  AHPRA registration number, and the deliberate absence of any patient testimonials were all
  her decisions, made to comply with the Medical Board of Australia's advertising rules.
  **Do not add testimonials, reviews or star ratings**, even if someone offers them.
- **The website does not collect anything about anybody.** There is no contact form storing
  data, no database, no tracking, no cookies for advertising. The contact section shows a
  phone number and an email address, and nothing more.
- **It is a set of fixed pages.** That makes it fast, cheap and very hard to break once it
  is running.
- **All three services are free** at this size. There is no bill to watch, beyond renewing
  the domain with VentraIP each year.
- **`CLAUDE.md`** inside the website folder is the technical maintainer's notes: how the
  site is built, which decisions were Dr He's and should not be undone, and a record of what
  has changed. Keep it. Any developer who works on the site later will want it.

---

## Quick checklist

- [ ] GitHub account created
- [ ] Repository `drmaggiehe-website` created in your account, by import (Route A) or upload
- [ ] Its front page shows `package.json` without clicking into any folder
- [ ] Vercel account created by signing in with GitHub
- [ ] Framework Preset showed **Next.js**, not "Other", before you pressed Deploy
- [ ] Project deployed, and the `.vercel.app` address checked and working
- [ ] `drmaggiehe.com.au` and `www.drmaggiehe.com.au` both added in Vercel
- [ ] The two entries Vercel asked for added at VentraIP, and any clashing old entries removed
- [ ] Waited, and both entries show a green tick in Vercel
- [ ] `https://www.drmaggiehe.com.au` loads with a padlock
- [ ] `config.yml` updated with your GitHub username and repository name
- [ ] Access token created and stored safely
- [ ] Signed in successfully at `/admin/` and made one small test edit

---

## Where these instructions come from

The GitHub, Vercel and VentraIP steps were taken from those companies' own current
documentation rather than from memory, because all of them have changed their instructions
before:

- GitHub, [Importing a repository with GitHub Importer](https://docs.github.com/en/migrations/importing-source-code/using-github-importer/importing-a-repository-with-github-importer).
  The **+** menu, the fields you fill in, and that no credentials are needed when the
  repository being copied is public.
- Vercel, [Configuring a build](https://vercel.com/docs/builds/configure-a-build).
  That an undetected framework falls back to "Other", and the exact path to the
  **Root Directory** setting used in the troubleshooting table.
- Vercel, [Adding and configuring a custom domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain).
  How to add a domain, and confirmation that each project now gets its own individual DNS
  values.
- Vercel, [Deploying and redirecting domains](https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting).
  Why `www` is recommended as the main address.
- VentraIP, [Adding, removing and managing DNS records within VIPcontrol](https://ventraip.com.au/support-centre/add-remove-or-manage-dns-records-within-vipcontrol/).
  The click path, the field names, that Hostname is left blank for the root domain, and the
  2 to 8 hour wait.
- Sveltia CMS, [GitHub backend](https://sveltiacms.app/en/docs/backends/github).
  That a personal access token is enough for a single editor, with no OAuth application or
  authentication server needed.
