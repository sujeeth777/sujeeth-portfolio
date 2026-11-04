# sujeeth-portfolio

Pure HTML / CSS / JavaScript portfolio for **Sri Sujeeth Sirivella** — black × white × neon-green hacker terminal aesthetic. No frameworks, no build step, no dependencies.

## Structure

```
index.html                  # the whole site
css/style.css               # all styling
js/app.js                   # boot sequence, matrix rain, live data sync
data/badges.json            # Credly badge wallet snapshot (auto-updated)
data/projects-fallback.json # GitHub repos snapshot (auto-updated)
assets/                     # favicon + resume.pdf
scripts/sync_data.py        # data sync script (stdlib only)
.github/workflows/sync-data.yml  # daily auto-sync
```

## Auto-sync — how it stays current

- **Projects** are fetched **live from the GitHub API** in the browser — a new public repo at [github.com/sujeeth777](https://github.com/sujeeth777) appears on the site immediately (forks excluded; edit `excludeRepos` in `js/app.js` to hide more).
- **Certifications** come from [Credly](https://www.credly.com/users/sri-sujeeth-sirivella) via `data/badges.json`. A GitHub Action (`sync-data.yml`) runs daily, re-fetches the Credly badge wallet + GitHub snapshot, and commits any changes — new badges show up automatically within ~24h.
- The snapshots in `data/` double as offline fallbacks if the GitHub API is rate-limited.

Run the sync manually:

```
python scripts/sync_data.py
```

## Deploy

It's a fully static site — works anywhere:

- **GitHub Pages**: Settings → Pages → Deploy from branch → `main` / root
- **Vercel / Netlify**: import the repo, zero config
- or just open `index.html` through any static server (`python -m http.server`)

## Edit your content

- Personal info & experience: `index.html`
- Colors: CSS variables at the top of `css/style.css`
- GitHub username / hidden repos: `CONFIG` at the top of `js/app.js`
- Contact form email: `FORM_ENDPOINT` / `FORM_EMAIL` in `js/app.js` (messages go through formsubmit.co when reachable, and fall back to opening the visitor's email app with the message prefilled when it isn't)
- Credly user id: `CREDLY_USER_ID` in `scripts/sync_data.py`
