# DEPLOY.md — getting the page live

**Recommendation: GitHub Pages.** Free, no extra account, serves a static repo directly, supports a custom domain with a free certificate. Cloudflare Pages is the alternative and is equally fine, but it adds a second account to manage for no gain on a page this simple.

Everything below is one step at a time. Do them in order.

---

## Step 1. Create the repo on GitHub
Go to github.com/new, signed in as **jeremyfrontier**.
- Repository name: `frontier-site`
- Public
- Do NOT add a README, .gitignore, or license. The repo already has them.

Click Create repository. Stop there.

## Step 2. Push this repo
In Terminal:
```
cd ~/Code/frontier-site
git remote add origin https://github.com/jeremyfrontier/frontier-site.git
git push -u origin main
```
GitHub will ask for a username and a password. The password is a **personal access token**, not your account password. If you do not have one: github.com/settings/tokens, Generate new token (classic), scope `repo`, copy it, paste it as the password.

## Step 3. Turn on Pages
In the repo: Settings, then Pages in the left sidebar.
- Source: **Deploy from a branch**
- Branch: `main`, folder `/ (root)`
- Save

Give it about a minute. The page goes live at:
```
https://jeremyfrontier.github.io/frontier-site/
```
Open it and confirm it looks right. That is the checkpoint before touching the domain.

## Step 4. Point thefrontiergroup.co at it
Find where the domain is registered. If it is inside Kajabi, move it out first; do not cancel Kajabi until the domain is somewhere you control.

At the registrar's DNS panel:
- Four `A` records for the apex `@`, pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- One `CNAME` for `www`, pointing to `jeremyfrontier.github.io`

Then back in the repo, Settings, Pages, Custom domain: enter `thefrontiergroup.co` and Save. That writes a `CNAME` file into the repo. Tick **Enforce HTTPS** once the certificate is issued, which can take up to a few hours.

## Step 5. Cancel Kajabi
Only after thefrontiergroup.co loads the new page over https. Hard deadline: before 2026-10-06.

---

## Updating the page later
Edit `index.html`, then:
```
cd ~/Code/frontier-site
bash tools/check-copy.sh index.html
git add -A && git commit -m "copy: <what changed>" && git push
```
Pages redeploys in under a minute.
