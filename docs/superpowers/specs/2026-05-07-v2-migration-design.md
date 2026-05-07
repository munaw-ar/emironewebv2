# Emir One v2.0 — Full Migration Design

**Date:** 2026-05-07  
**Status:** Approved  
**Goal:** Migrate emironewebv2.0 (vanilla HTML/CSS/JS) to a unified React/Vite/TS project that absorbs the admin portal and research hub from emir-one-design (private repo), backed by a fresh Supabase project. The emir-one-design repo is decommissioned after migration.

---

## 1. Architecture

### Stack
- **Framework:** React 18 + Vite + TypeScript
- **Styling:** Tailwind CSS v3 + shadcn/ui components
- **Backend:** Supabase (fresh project — same schema as emir-one-design)
- **Routing:** React Router v6
- **Data fetching:** TanStack Query (React Query)
- **Animations:** Lenis (smooth scroll) + Anime.js — wrapped in useEffect hooks
- **Rich text editing:** RichTextEditor component (from emir-one-design)

### Folder Structure
```
emironewebv2.0/
├── src/
│   ├── App.tsx                        # Unified router
│   ├── main.tsx
│   ├── index.css                      # Design tokens + Tailwind base
│   ├── components/
│   │   ├── layout/                    # Navigation, Footer
│   │   ├── admin/                     # AdminLayout, ProtectedAdminRoute, RichTextEditor
│   │   ├── research/                  # ExperimentCard, EmailGateModal, DataTable, etc.
│   │   ├── sections/                  # Hero, Problem, HowWeWork, Ethics, Offer, Distinction, Proof
│   │   └── ui/                        # shadcn components
│   ├── pages/
│   │   ├── Index.tsx                  # Landing page (from index.html)
│   │   ├── BookPage.tsx
│   │   ├── ShariaAligned.tsx
│   │   ├── HowWeMakeIt.tsx
│   │   ├── FitPage.tsx
│   │   ├── PrivacyPolicy.tsx
│   │   ├── TermsOfService.tsx
│   │   ├── ResearchHub.tsx
│   │   ├── ExperimentLogs.tsx
│   │   ├── IndustryIndex.tsx
│   │   ├── IndustryResearch.tsx
│   │   ├── QuarterlyReports.tsx
│   │   ├── Methodology.tsx
│   │   └── admin/
│   │       ├── AdminLogin.tsx
│   │       ├── AdminDashboard.tsx
│   │       ├── ExperimentLogForm.tsx
│   │       ├── ExperimentLogsList.tsx
│   │       ├── IndustryResearchForm.tsx
│   │       ├── IndustryResearchList.tsx
│   │       ├── QuarterlyReportForm.tsx
│   │       ├── QuarterlyReportsList.tsx
│   │       ├── MethodologyEditor.tsx
│   │       ├── SubscribersPage.tsx
│   │       ├── AnalyticsPage.tsx
│   │       └── SettingsPage.tsx
│   ├── hooks/                         # useResearchData and other data hooks
│   ├── contexts/                      # AdminAuthContext
│   ├── integrations/
│   │   └── supabase/                  # client.ts + types.ts (fresh project)
│   └── lib/                           # utils (cn, etc.)
├── supabase/
│   └── migrations/                    # 11 migrations from emir-one-design
├── public/
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 2. Routes

| Path | Component | Source |
|------|-----------|--------|
| `/` | Index | converted from index.html |
| `/book` | BookPage | converted from book.html |
| `/sharia-aligned` | ShariaAligned | converted from emir-one-design |
| `/how-we-make-it` | HowWeMakeIt | converted from emir-one-design |
| `/fit` | FitPage | converted from emir-one-design |
| `/privacy-policy` | PrivacyPolicy | from emir-one-design |
| `/terms-of-service` | TermsOfService | from emir-one-design |
| `/research` | ResearchHub | from emir-one-design, restyled |
| `/research/industry` | IndustryIndex | from emir-one-design, restyled |
| `/research/industry/:slug` | IndustryResearch | from emir-one-design, restyled |
| `/research/experiments` | ExperimentLogs | from emir-one-design, restyled |
| `/research/reports` | QuarterlyReports | from emir-one-design, restyled |
| `/research/methodology` | Methodology | from emir-one-design, restyled |
| `/admin/login` | AdminLogin | from emir-one-design |
| `/admin/*` | Admin portal | from emir-one-design (protected) |

---

## 3. Design System

### CSS Variables → Tailwind Config
| CSS Variable | Value | Tailwind Token |
|---|---|---|
| `--paper` | `#FAF8F3` | `background`, `colors.paper` |
| `--paper-2` | `#F3F0E8` | `colors.paper2` |
| `--ink` | `#0C0B09` | `foreground`, `colors.ink` |
| `--ink-2` | `#2A2820` | `colors.ink2` |
| `--mid` | `#5C5648` | `muted-foreground` |
| `--light` | `#9A9080` | `colors.light` |
| `--rule` | `#D8D0C0` | `border` |
| `--rule-2` | `#EAE4D8` | `colors.rule2` |
| `--green` | `#0D5C38` | `primary` |
| `--green-h` | `#0A4A2D` | `colors.greenH` |

### Typography
- `font-serif` → Fraunces (headings)
- `font-body` → Inter Tight (body)
- `font-mono` → JetBrains Mono (code/metrics)
- Libre Baskerville available for editorial accents
- All loaded via Google Fonts in `index.html`

### Animations
- **Lenis** smooth scroll: initialised in a top-level `useEffect` in `App.tsx`, destroyed on unmount. Disabled on touch devices (same as current implementation).
- **Anime.js** scroll animations: each animated section gets a `useEffect` with an IntersectionObserver that triggers the animation once in view.
- **Domain health checker**: extracted to `<DomainHealthChecker />` component — all Cloudflare DNS fetch logic moves to a `useDomainHealth` hook.
- **SVG stroke animations**: extracted to `<AnimatedSVG />` component.

### Mobile Responsiveness
The 6 mobile CSS files (`mobile-nav.css`, `mobile-hero.css`, `mobile-layout.css`, `mobile-smooth.css`, `mobile-table.css`, `mobile-type.css`) are consolidated into responsive Tailwind classes during JSX conversion. All mobile behaviour is preserved.

---

## 4. Supabase

### Fresh Project Setup
1. Create new Supabase project
2. Run all 11 migrations from `emir-one-design/supabase/migrations/` in order
3. Set `.env`:
   ```
   VITE_SUPABASE_URL=<new-project-url>
   VITE_SUPABASE_ANON_KEY=<new-anon-key>
   ```
4. Enable Supabase Auth (email/password for admin)
5. Create first admin user manually via Supabase dashboard → assign `admin` role in `user_roles` table

### Database Tables
| Table | Purpose |
|---|---|
| `experiment_logs` | Research experiments (admin CRUD, public read if published) |
| `industry_research` | Industry-specific cold email research |
| `quarterly_reports` | Quarterly cross-industry reports |
| `methodology` | How we research (single record, editable) |
| `subscribers` | Newsletter + email gate subscribers |
| `admin_profiles` | Admin user details |
| `user_roles` | Role-based access (`admin` / `user`) |
| `activity_log` | Admin action audit trail |
| `research_analytics` | View/download event tracking |

### Row Level Security
- Public routes query with anon key — RLS ensures only `is_published = true` records are returned
- Admin routes use authenticated session — full access

---

## 5. Email Gate

```
Visitor → /research/* → page loads → checks localStorage for gate token
  → if no token: EmailGateModal renders (blocks content)
  → visitor submits email → stored in subscribers table → localStorage token set
  → content unlocks for the session (and future visits from same browser)
```

- `EmailGateModal` component from emir-one-design, restyled to v2.0 paper/ink aesthetic
- Gate applies to: IndustryResearch detail pages, QuarterlyReports downloads
- Gate does NOT apply to: ResearchHub index, ExperimentLogs list, Methodology

---

## 6. Admin Portal

Protected by Supabase Auth + `ProtectedAdminRoute` wrapper.

| Route | Function |
|---|---|
| `/admin` | Dashboard — recent activity, quick stats |
| `/admin/experiments` | List + toggle publish experiment logs |
| `/admin/experiments/new` | Rich text form to create experiment log |
| `/admin/experiments/:id` | Edit existing experiment log |
| `/admin/industry-research` | List industry research articles |
| `/admin/industry-research/new` | Create industry research |
| `/admin/industry-research/:id` | Edit industry research |
| `/admin/reports` | List quarterly reports |
| `/admin/reports/new` | Create quarterly report |
| `/admin/reports/:id` | Edit quarterly report |
| `/admin/methodology` | Edit methodology page (single record) |
| `/admin/subscribers` | View subscriber list |
| `/admin/analytics` | View research analytics |
| `/admin/settings` | Site settings |

---

## 7. Migration Execution Order

1. **Scaffold** — Add Vite/React/TS config files, `package.json`, `tsconfig`, `vite.config.ts` to v2.0 repo
2. **Design tokens** — Configure `tailwind.config.ts` with v2.0 colour/font tokens; set up `index.css`
3. **shadcn + dependencies** — Install all packages from emir-one-design
4. **Admin portal + research** — Copy `src/pages/admin/`, `src/pages/Research*.tsx`, `src/components/admin/`, `src/components/research/`, `src/hooks/`, `src/contexts/`, `src/integrations/` from emir-one-design; restyle to v2.0 tokens
5. **Layout components** — Port `Navigation` and `Footer` from v2.0 HTML to JSX
6. **Landing page sections** — Convert `index.html` sections to JSX components in `src/components/sections/`
7. **Remaining public pages** — Port `book.html`, and pages from emir-one-design (`ShariaAligned`, `HowWeMakeIt`, `FitPage`, `PrivacyPolicy`, `TermsOfService`)
8. **Router** — Wire `App.tsx` with all routes
9. **Supabase** — Create fresh project, run migrations, set env vars
10. **End-to-end test** — Verify: public site renders, admin login works, research CRUD flows, email gate fires, domain health checker works

---

## 8. Error Handling

- Supabase query errors: handled by TanStack Query's `isError` state — show inline error message, not full-page crash
- Admin auth: unauthenticated access to `/admin/*` redirects to `/admin/login`
- 404: `NotFound` page for all unmatched routes
- Domain health checker: network errors show a graceful "Unable to check — try again" state

---

## 9. Out of Scope

- Hero variant files (`hero-variants/`) are archived, not migrated
- No SEO/sitemap changes in this pass
- No new features beyond what exists in either repo
- No data migration from old Supabase project (fresh start)
