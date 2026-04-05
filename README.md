# U.S. Immigration Dashboard — FY 2022

Interactive dashboard covering Refugees, Asylum, Legal Permanent Residents, and Naturalizations.  
Data source: DHS Office of Homeland Security Statistics, Yearbook of Immigration Statistics FY 2022.

## Deploy to GitHub Pages

### Step 1 — Create a GitHub repository

1. Go to [github.com](https://github.com) and sign in (or create a free account)
2. Click the **+** icon → **New repository**
3. Name it anything, e.g. `immigration-dashboard`
4. Set it to **Public** (required for free GitHub Pages)
5. Click **Create repository**

### Step 2 — Upload the files

**Option A — Drag and drop (no Git required)**

1. On your new repo page, click **uploading an existing file**
2. Drag all four files into the upload area:
   - `index.html`
   - `data.js`
   - `charts.js`
   - `.nojekyll`
3. Scroll down, click **Commit changes**

**Option B — Git command line**

```bash
cd path/to/asylum-dashboard
git init
git add .
git commit -m "Initial dashboard upload"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/immigration-dashboard.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. In your repo, go to **Settings** → **Pages** (left sidebar)
2. Under **Source**, select **Deploy from a branch**
3. Set branch to **main**, folder to **/ (root)**
4. Click **Save**

### Step 4 — Get your link

After about 60 seconds, GitHub will show:

> Your site is live at `https://YOUR_USERNAME.github.io/immigration-dashboard/`

That is the link you share with anyone.

## Local preview

Just open `index.html` directly in any browser — no server needed.
