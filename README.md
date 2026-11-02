# Sri Sujeeth Sirivella — Portfolio

A personal portfolio built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS 4**, **Motion**, and **Lucide**.

The visual direction is dark engineering: graphite surfaces, electric-blue and cyan accents, editorial typography, subtle motion, and a responsive layout.

## Sections

- Intro / hero with animated orbital illustration
- About and education
- Selected project case-study modals
- Internship experience
- Technical toolkit
- Live public GitHub profile statistics
- Verified-credentials gallery placeholder
- Contact / social link

## Run locally

Requirements: Node.js 22+ and npm.

```bash
git clone https://github.com/sujeeth777/sujeeth-portfolio.git
cd sujeeth-portfolio
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm run start
```

## Personalization before public launch

- Add a verified LinkedIn profile URL and public contact email.
- Replace or update project repository links as each repository is made public.
- Add only certificates that have actually been earned, with verifiable credential URLs.
- Review internship dates, titles and descriptions.
- Replace the current resume PDF in `public/resume/` when a newer approved version is ready.
- Set the canonical site URL and social preview image after deployment.

## Notes

- GitHub profile data is fetched from GitHub's public user API in the browser. If the API is unavailable or rate-limited, the section falls back gracefully.
- The contact area links to GitHub until a verified email or contact endpoint is supplied. It does not pretend to submit messages.
- Project statuses are deliberately labeled as prototypes, in-development work, learning projects, or team contributions where appropriate.
- Reduced-motion preferences are respected.

## Deploy

Import this repository into Vercel and use the default Next.js build settings. The production branch is `main`.
