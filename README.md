# NorthVoy — University Path Finder

> **Live site:** [northvoy.com](https://northvoy.com)

A free academic guidance web app that helps high school students discover their ideal university major in under 5 minutes. Answer 9 questions about your interests, strengths, and goals — get matched with 20+ majors, career paths, top universities across 60+ countries, and a personalised 12-month action plan.

---

## Features

| Feature | Description |
|---|---|
| **9-Step Quiz** | Covers subjects, interests, strengths, work style, career environment, learning approach, future goals, and budget |
| **Rule-Based Matching** | Dual scoring engine (keyword + 7-dimensional weighting) produces ranked confidence levels |
| **My Matches** | Top 3 major matches with pathway explorer, skill breakdown, and mini-project suggestions |
| **12-Month Roadmap** | Personalised month-by-month action plan for all 3 matches |
| **Major Comparison** | Side-by-side comparison of up to 3 majors — skills, careers, costs, countries |
| **Salary & Job Market Data** | Salary ranges and 10-year job growth indicators per major |
| **Country Deep-Dive Guides** | Visa info, tuition ranges, cost of living, and top universities for 5 countries |
| **Blog** | SEO articles on choosing a major, QS rankings, application writing, and top study destinations |
| **PDF Export** | Programmatic jsPDF report of full results |
| **Compare PDF Export** | Side-by-side major comparison export |
| **Social Share** | Web Share API + clipboard fallback for sharing results |
| **Deadline Tracker** | Browser notification reminders for university application deadlines |
| **Shareable Results URL** | Results encoded in URL — share with counsellors or parents |
| **Auth & Account** | Supabase email/password auth; save results and track applications |
| **Full i18n** | English, Turkish, German — all 700+ keys translated |
| **Dark / Light Mode** | System-preference aware, toggle in navbar |
| **Turkey Hub** | Dedicated guide for Turkish students — YKS, universities, scholarships |

---

## Tech Stack

**Frontend**
- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (strict)
- [Vite](https://vitejs.dev/) — build tool
- [TailwindCSS v4](https://tailwindcss.com/) — utility-first styling
- [Framer Motion](https://www.framer-motion.com/) — animations
- [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) — accessible components
- [Wouter](https://github.com/molefrog/wouter) — lightweight SPA routing
- [Lucide React](https://lucide.dev/) — icons
- [jsPDF](https://github.com/parallax/jsPDF) — PDF generation

**Backend / Infrastructure**
- [Supabase](https://supabase.com/) — auth + user data
- [Vercel](https://vercel.com/) — hosting + CDN (auto-deploy on push to `main`)

**Data**
- All matching logic is rule-based, runs entirely in the browser — no ML, no server round-trips
- 20 majors × 7 scoring dimensions
- 200+ universities across 60+ countries
- 50+ scholarships database

---

## Project Structure

```
artifacts/student-path-ai/
├── public/
│   ├── sitemap.xml          # All routes with hreflang
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── layout/          # Navbar, Footer
│   │   └── ui/              # shadcn components (60+)
│   ├── contexts/
│   │   ├── AccountContext   # Supabase auth + user state
│   │   ├── LanguageContext  # i18n provider
│   │   └── ThemeContext     # Dark/light mode
│   ├── lib/
│   │   ├── matching.ts      # Core matching engine
│   │   ├── i18n.ts          # EN / TR / DE translations (~700 keys)
│   │   ├── store.ts         # Types + localStorage helpers
│   │   ├── universities.ts  # 200+ universities by country × major
│   │   ├── salaryData.ts    # Salary ranges + job growth per major
│   │   ├── blogPosts.ts     # Blog content
│   │   ├── countryGuides.ts # Country guide data
│   │   ├── comparePdf.ts    # Comparison PDF generator
│   │   ├── shareResults.ts  # Web Share API helper
│   │   ├── notifications.ts # Browser notification scheduler
│   │   └── pdf.ts           # Results PDF generator
│   └── pages/
│       ├── Home.tsx
│       ├── Questionnaire.tsx
│       ├── Results.tsx
│       ├── Compare.tsx
│       ├── Tracker.tsx
│       ├── Blog.tsx / BlogPost.tsx
│       ├── Countries.tsx / CountryDetail.tsx
│       ├── Turkiye.tsx
│       ├── About.tsx
│       ├── Auth.tsx / Account.tsx
│       └── not-found.tsx
└── index.html
```

---

## Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/cemkutayaktas/northvoy.git
cd northvoy

# 2. Install dependencies
cd artifacts/student-path-ai
npm install

# 3. Set up environment variables
cp .env.example .env
# Add your Supabase URL and anon key:
# VITE_SUPABASE_URL=...
# VITE_SUPABASE_ANON_KEY=...

# 4. Start dev server
npm run dev
# → http://localhost:5173
```

---

## Deployment

Deployed on **Vercel** with auto-deploy on every push to `main`.

- SPA rewrites in `vercel.json` route all paths to `index.html`
- Canonical `Link` headers set per-route for SEO
- Static assets cached for 1 year (`Cache-Control: immutable`)
- Sitemap at `northvoy.com/sitemap.xml` covers all 20+ routes

---

## SEO

- Per-route `<title>` and `<meta description>` via `ROUTE_META` in `App.tsx`
- `Organization`, `WebSite`, `WebApplication`, and `FAQPage` structured data
- `hreflang` alternate links for EN / TR / DE
- Google Analytics GA4 integrated

---

## Team

| Name | Role |
|---|---|
| **Cem Kutay Aktaş** | Founder & Lead Developer |
| **Doruk Uzer** | Growth Manager |
| **Devin Tolun** | Developer |
| **Can Dalkıran** | Developer |

---

## License

MIT — free to use, fork, and build upon.
