# Emir One v2.0 — React/Vite Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate emironewebv2.0 from vanilla HTML/CSS/JS to a unified React/Vite/TS project that absorbs the admin portal and research hub from emir-one-design, backed by a fresh Supabase project.

**Architecture:** Single Vite/React/TS SPA in the emironewebv2.0 repo. Config files from emir-one-design are brought in wholesale; the design system is replaced with v2.0 editorial tokens. Admin portal and research pages port with minimal changes. Landing page HTML sections are converted to JSX components.

**Tech Stack:** React 19, Vite 5, TypeScript 5, Tailwind CSS 3, shadcn/ui, React Router v6, TanStack Query v5, Supabase JS v2, Lenis, Anime.js, Tiptap

---

## File Map

| File | Action | Notes |
|---|---|---|
| `package.json` | Replace | Full React/Vite deps (minus lovable-tagger) |
| `vite.config.ts` | Create | Simplified from emir-one-design |
| `tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json` | Create | Copy from emir-one-design |
| `postcss.config.js` | Create | Tailwind + autoprefixer |
| `eslint.config.js` | Create | Copy from emir-one-design |
| `components.json` | Create | shadcn config |
| `index.html` | Replace | Vite entry + Google Fonts |
| `src/main.tsx` | Create | React root mount |
| `src/vite-env.d.ts` | Create | Vite env types |
| `src/index.css` | Create | v2.0 tokens as HSL CSS vars + Tailwind directives |
| `src/lib/utils.ts` | Create | cn() utility |
| `tailwind.config.ts` | Create | v2.0 colour/font tokens |
| `src/App.tsx` | Create | Unified router + Lenis init |
| `src/integrations/supabase/client.ts` | Create | Supabase client |
| `src/integrations/supabase/types.ts` | Copy | From emir-one-design (unchanged) |
| `supabase/migrations/*.sql` | Copy | 11 migrations from emir-one-design |
| `.env` | Create | VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY |
| `src/contexts/AdminAuthContext.tsx` | Copy | From emir-one-design |
| `src/hooks/use-toast.ts` | Copy | From emir-one-design |
| `src/hooks/useResearchData.ts` | Copy | From emir-one-design |
| `src/hooks/useDomainHealth.ts` | Create | Converted from vanilla JS in index.html |
| `src/components/ScrollToTop.tsx` | Copy | From emir-one-design |
| `src/components/ui/*` | Install | Via shadcn CLI |
| `src/components/admin/*` | Copy | From emir-one-design |
| `src/components/research/*` | Copy | From emir-one-design, restyle tokens |
| `src/components/layout/Navigation.tsx` | Create | Converted from index.html header |
| `src/components/layout/Footer.tsx` | Create | Converted from index.html footer |
| `src/components/sections/DomainHealthChecker.tsx` | Create | Hero form + drawer |
| `src/components/sections/Hero.tsx` | Create | Section converted from HTML |
| `src/components/sections/SectionProblem.tsx` | Create | Section 01 |
| `src/components/sections/SectionHowWeWork.tsx` | Create | Section 02 |
| `src/components/sections/SectionEthics.tsx` | Create | Section 03 |
| `src/components/sections/SectionOffer.tsx` | Create | Section 04 |
| `src/components/sections/SectionDistinction.tsx` | Create | Section 05 |
| `src/components/sections/SectionProof.tsx` | Create | Section 06 |
| `src/components/sections/SectionCTA.tsx` | Create | Final CTA |
| `src/pages/Index.tsx` | Create | Assembles all sections |
| `src/pages/BookPage.tsx` | Create | Converted from book.html |
| `src/pages/ShariaAligned.tsx` | Copy+restyle | From emir-one-design |
| `src/pages/HowWeMakeIt.tsx` | Copy+restyle | From emir-one-design |
| `src/pages/FitPage.tsx` | Copy+restyle | From emir-one-design |
| `src/pages/PrivacyPolicy.tsx` | Copy | From emir-one-design |
| `src/pages/TermsOfService.tsx` | Copy | From emir-one-design |
| `src/pages/NotFound.tsx` | Copy | From emir-one-design |
| `src/pages/ResearchHub.tsx` | Copy+restyle | From emir-one-design |
| `src/pages/ExperimentLogs.tsx` | Copy+restyle | From emir-one-design |
| `src/pages/IndustryIndex.tsx` | Copy+restyle | From emir-one-design |
| `src/pages/IndustryResearch.tsx` | Copy+restyle | From emir-one-design |
| `src/pages/QuarterlyReports.tsx` | Copy+restyle | From emir-one-design |
| `src/pages/Methodology.tsx` | Copy+restyle | From emir-one-design |
| `src/pages/admin/*` | Copy | From emir-one-design (12 files) |

---

## Task 1: Replace package.json and install dependencies

**Files:**
- Replace: `package.json`

- [ ] **Step 1: Write new package.json**

```json
{
  "name": "emir-one-web",
  "private": true,
  "version": "3.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:dev": "vite build --mode development",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.10.0",
    "@radix-ui/react-accordion": "^1.2.11",
    "@radix-ui/react-alert-dialog": "^1.1.14",
    "@radix-ui/react-aspect-ratio": "^1.1.7",
    "@radix-ui/react-avatar": "^1.1.10",
    "@radix-ui/react-checkbox": "^1.3.2",
    "@radix-ui/react-collapsible": "^1.1.11",
    "@radix-ui/react-context-menu": "^2.2.15",
    "@radix-ui/react-dialog": "^1.1.14",
    "@radix-ui/react-dropdown-menu": "^2.1.15",
    "@radix-ui/react-hover-card": "^1.1.14",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-menubar": "^1.1.15",
    "@radix-ui/react-navigation-menu": "^1.2.13",
    "@radix-ui/react-popover": "^1.1.14",
    "@radix-ui/react-progress": "^1.1.7",
    "@radix-ui/react-radio-group": "^1.3.7",
    "@radix-ui/react-scroll-area": "^1.2.9",
    "@radix-ui/react-select": "^2.2.5",
    "@radix-ui/react-separator": "^1.1.7",
    "@radix-ui/react-slider": "^1.3.5",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.2.5",
    "@radix-ui/react-tabs": "^1.1.12",
    "@radix-ui/react-toast": "^1.2.14",
    "@radix-ui/react-toggle": "^1.1.9",
    "@radix-ui/react-toggle-group": "^1.1.10",
    "@radix-ui/react-tooltip": "^1.2.7",
    "@supabase/supabase-js": "^2.88.0",
    "@tanstack/react-query": "^5.83.0",
    "@tiptap/extension-link": "^3.13.0",
    "@tiptap/extension-placeholder": "^3.13.0",
    "@tiptap/react": "^3.13.0",
    "@tiptap/starter-kit": "^3.13.0",
    "@types/dompurify": "^3.0.5",
    "animejs": "^3.2.2",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "date-fns": "^3.6.0",
    "dompurify": "^3.3.1",
    "embla-carousel-react": "^8.6.0",
    "framer-motion": "^12.23.26",
    "input-otp": "^1.4.2",
    "lenis": "^1.1.14",
    "lucide-react": "^0.462.0",
    "next-themes": "^0.3.0",
    "react": "^19.2.3",
    "react-day-picker": "^8.10.1",
    "react-dom": "^19.2.3",
    "react-hook-form": "^7.61.1",
    "react-resizable-panels": "^2.1.9",
    "react-router-dom": "^6.30.1",
    "recharts": "^2.15.4",
    "sonner": "^1.7.4",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^0.9.9",
    "zod": "^3.25.76"
  },
  "devDependencies": {
    "@eslint/js": "^9.32.0",
    "@tailwindcss/typography": "^0.5.16",
    "@types/node": "^22.16.5",
    "@types/react": "^18.3.23",
    "@types/react-dom": "^18.3.7",
    "@vitejs/plugin-react-swc": "^3.11.0",
    "autoprefixer": "^10.4.21",
    "eslint": "^9.32.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "globals": "^15.15.0",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.8.3",
    "typescript-eslint": "^8.38.0",
    "vite": "^5.4.19"
  }
}
```

- [ ] **Step 2: Delete old node_modules and package-lock.json**

```bash
rm -rf node_modules package-lock.json
```

- [ ] **Step 3: Install dependencies**

```bash
npm install
```

Expected: installs ~150 packages, no errors.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "build: add React/Vite/TS dependency tree"
```

---

## Task 2: Create build config files

**Files:**
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `postcss.config.js`
- Create: `eslint.config.js`
- Create: `components.json`
- Create: `src/vite-env.d.ts`

- [ ] **Step 1: Create vite.config.ts**

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

- [ ] **Step 2: Create tsconfig.json**

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

- [ ] **Step 3: Create tsconfig.app.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

- [ ] **Step 4: Create tsconfig.node.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 5: Create postcss.config.js**

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 6: Create eslint.config.js**

```javascript
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  }
);
```

- [ ] **Step 7: Create components.json**

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

- [ ] **Step 8: Create src/vite-env.d.ts**

```typescript
/// <reference types="vite/client" />
```

- [ ] **Step 9: Commit**

```bash
git add vite.config.ts tsconfig.json tsconfig.app.json tsconfig.node.json postcss.config.js eslint.config.js components.json src/vite-env.d.ts
git commit -m "build: add Vite/TS/ESLint/shadcn config files"
```

---

## Task 3: Design system — Tailwind config + CSS tokens + index.html

**Files:**
- Create: `tailwind.config.ts`
- Create: `src/index.css`
- Create: `src/lib/utils.ts`
- Replace: `index.html`

- [ ] **Step 1: Create tailwind.config.ts**

```typescript
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        serif: ["Fraunces", "Georgia", "serif"],
        body: ["Inter Tight", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Consolas", "monospace"],
        baskerville: ["Libre Baskerville", "Georgia", "serif"],
      },
      maxWidth: {
        site: "1120px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        breathe: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        breathe: "breathe 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
```

- [ ] **Step 2: Create src/index.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* v2.0 editorial tokens mapped to HSL for shadcn compatibility */
    --background:   44 40% 97%;     /* #FAF8F3 paper      */
    --foreground:   36 14% 4%;      /* #0C0B09 ink        */
    --card:         44 40% 97%;
    --card-foreground: 36 14% 4%;
    --popover:      44 40% 97%;
    --popover-foreground: 36 14% 4%;
    --primary:      151 75% 21%;    /* #0D5C38 green      */
    --primary-foreground: 44 40% 97%;
    --secondary:    43 32% 93%;     /* #F3F0E8 paper-2    */
    --secondary-foreground: 36 14% 4%;
    --muted:        43 32% 93%;
    --muted-foreground: 38 12% 32%; /* #5C5648 mid        */
    --accent:       43 32% 93%;
    --accent-foreground: 36 14% 4%;
    --destructive:  0 84% 60%;
    --destructive-foreground: 44 40% 97%;
    --border:       37 15% 80%;     /* #D8D0C0 rule       */
    --input:        37 15% 80%;
    --ring:         151 75% 21%;
    --radius:       0.25rem;

    /* Sidebar tokens */
    --sidebar-background:        44 40% 97%;
    --sidebar-foreground:        36 14% 4%;
    --sidebar-primary:           151 75% 21%;
    --sidebar-primary-foreground: 44 40% 97%;
    --sidebar-accent:            43 32% 93%;
    --sidebar-accent-foreground: 36 14% 4%;
    --sidebar-border:            37 15% 80%;
    --sidebar-ring:              151 75% 21%;

    /* v2.0 named aliases (used in inline styles / legacy CSS) */
    --paper:   hsl(44 40% 97%);
    --paper-2: hsl(43 32% 93%);
    --ink:     hsl(36 14% 4%);
    --ink-2:   hsl(38 14% 14%);
    --mid:     hsl(38 12% 32%);
    --light:   hsl(36 9% 55%);
    --rule:    hsl(37 15% 80%);
    --rule-2:  hsl(40 21% 88%);
    --green:   hsl(151 75% 21%);
    --green-h: hsl(151 77% 16%);

    /* Typography */
    --serif: "Fraunces", Georgia, serif;
    --body:  "Inter Tight", -apple-system, sans-serif;
    --mono:  "JetBrains Mono", Consolas, monospace;

    /* Layout */
    --max:  1120px;
    --ease: cubic-bezier(0.22, 1, 0.36, 1);
  }

  *, *::before, *::after { box-sizing: border-box; }

  html {
    -webkit-text-size-adjust: 100%;
  }

  body {
    @apply bg-background text-foreground;
    font-family: var(--body);
    font-size: 16px;
    line-height: 1.65;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.001ms !important;
      transition-duration: 0.001ms !important;
    }
  }

  a {
    color: var(--green);
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-thickness: 1px;
  }
  a:hover { color: var(--green-h); }
  a:focus-visible,
  button:focus-visible,
  input:focus-visible {
    outline: 2px solid var(--green);
    outline-offset: 3px;
  }
}

/* Layout utility */
.w {
  width: 100%;
  max-width: var(--max);
  margin: 0 auto;
  padding: 0 32px;
}

@media (max-width: 640px) {
  .w { padding: 0 20px; }
}
```

- [ ] **Step 3: Create src/lib/utils.ts**

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 4: Replace index.html**

Replace the entire existing `index.html` with:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#FAF8F3" />
    <title>Emir One — Ethical Cold Email Infrastructure</title>
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23FAF8F3'/%3E%3Ctext x='16' y='22' font-family='Georgia,serif' font-size='13' font-weight='700' text-anchor='middle' fill='%230C0B09'%3EE1%3C/text%3E%3C/svg%3E" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300;1,9..144,400&family=Inter+Tight:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Libre+Baskerville:ital,wght@0,400;1,400&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 5: Create src/main.tsx**

```typescript
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- [ ] **Step 6: Create minimal src/App.tsx to verify dev server starts**

```typescript
export default function App() {
  return <div style={{ fontFamily: "var(--body)", padding: 40 }}>Emir One v3 — scaffold OK</div>;
}
```

- [ ] **Step 7: Run dev server**

```bash
npm run dev
```

Expected: server starts on http://localhost:8080, page shows "Emir One v3 — scaffold OK" with correct font.

- [ ] **Step 8: Commit**

```bash
git add tailwind.config.ts src/index.css src/lib/utils.ts src/main.tsx src/App.tsx index.html
git commit -m "feat: design system — v2.0 editorial tokens + Tailwind config"
```

---

## Task 4: Supabase integration layer

**Files:**
- Create: `src/integrations/supabase/client.ts`
- Create: `src/integrations/supabase/types.ts` (copied from emir-one-design)
- Copy: `supabase/migrations/*.sql` (11 files)
- Create: `.env`
- Create: `.gitignore` entry for `.env`

- [ ] **Step 1: Create integration directories**

```bash
mkdir -p src/integrations/supabase supabase/migrations
```

- [ ] **Step 2: Create src/integrations/supabase/client.ts**

```typescript
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
```

- [ ] **Step 3: Copy types.ts from emir-one-design**

Run this command (requires `gh` CLI authenticated):

```bash
gh api "repos/munaw-ar/emir-one-design/contents/src/integrations/supabase/types.ts" \
  --jq '.content' | base64 -d > src/integrations/supabase/types.ts
```

- [ ] **Step 4: Copy all 11 migrations from emir-one-design**

```bash
for file in \
  "supabase/migrations/20251217025911_214414b7-ff31-49fb-9ac9-4b34f2c99d62.sql" \
  "supabase/migrations/20251217031848_9c10bc96-6c2e-4a0b-9716-dba44fde67a7.sql" \
  "supabase/migrations/20251217031900_caab3c1e-dac9-4fca-95f2-cacaf7403de3.sql" \
  "supabase/migrations/20251217034709_c985a8fc-a420-4f57-994d-6aebe0c72592.sql" \
  "supabase/migrations/20251217041926_f1410abe-59a1-4e71-9516-352fc7894983.sql" \
  "supabase/migrations/20251217051259_4d770bef-c14b-441e-8c1a-ffd269e7a870.sql" \
  "supabase/migrations/20251217053735_04901495-1271-4654-b1c0-8e1eac35574a.sql" \
  "supabase/migrations/20251217054204_24972e9c-ef78-48fb-b189-5f096a1f93a7.sql" \
  "supabase/migrations/20260123162843_4c66aa61-4790-494b-bd62-eb6f2791b877.sql" \
  "supabase/migrations/20260123162913_e8ebc9bc-2d8c-406c-8758-a109014f9ef8.sql" \
  "supabase/migrations/20260202044301_a7e91d14-0f4a-4293-a953-c30b575b12b9.sql"; do
  fname=$(basename "$file")
  gh api "repos/munaw-ar/emir-one-design/contents/$file" \
    --jq '.content' | base64 -d > "supabase/migrations/$fname"
  echo "Copied $fname"
done
```

Expected: 11 `.sql` files in `supabase/migrations/`.

- [ ] **Step 5: Create .env**

```bash
cat > .env << 'EOF'
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
EOF
```

(Fill in real values after Supabase project is created in Task 18.)

- [ ] **Step 6: Ensure .env is in .gitignore**

```bash
grep -q "^\.env$" .gitignore || echo ".env" >> .gitignore
```

- [ ] **Step 7: Commit**

```bash
git add src/integrations/ supabase/migrations/ .gitignore
git commit -m "feat: add Supabase integration layer and migrations"
```

---

## Task 5: Auth context, hooks, and scroll utility

**Files:**
- Create: `src/contexts/AdminAuthContext.tsx`
- Create: `src/hooks/use-toast.ts`
- Create: `src/hooks/useResearchData.ts`
- Create: `src/hooks/useBookingTrigger.ts`
- Create: `src/components/ScrollToTop.tsx`

- [ ] **Step 1: Copy AdminAuthContext.tsx from emir-one-design**

```bash
gh api "repos/munaw-ar/emir-one-design/contents/src/contexts/AdminAuthContext.tsx" \
  --jq '.content' | base64 -d > src/contexts/AdminAuthContext.tsx
```

- [ ] **Step 2: Copy hook files from emir-one-design**

```bash
mkdir -p src/hooks
for f in use-toast.ts useResearchData.ts useBookingTrigger.ts; do
  gh api "repos/munaw-ar/emir-one-design/contents/src/hooks/$f" \
    --jq '.content' | base64 -d > "src/hooks/$f"
  echo "Copied $f"
done
```

- [ ] **Step 3: Copy ScrollToTop.tsx**

```bash
gh api "repos/munaw-ar/emir-one-design/contents/src/components/ScrollToTop.tsx" \
  --jq '.content' | base64 -d > src/components/ScrollToTop.tsx
```

- [ ] **Step 4: Commit**

```bash
git add src/contexts/ src/hooks/ src/components/ScrollToTop.tsx
git commit -m "feat: add auth context, research hooks, scroll utility"
```

---

## Task 6: Install shadcn UI components

**Files:**
- Create: `src/components/ui/*` (via shadcn CLI)

- [ ] **Step 1: Install all required shadcn components**

```bash
npx shadcn@latest add button input label textarea badge card separator tabs skeleton toast sonner tooltip dialog sheet dropdown-menu select checkbox radio-group switch progress avatar scroll-area table alert-dialog popover command
```

When prompted about existing files, choose to overwrite.

- [ ] **Step 2: Verify components installed**

```bash
ls src/components/ui/
```

Expected: 20+ component files.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/
git commit -m "feat: install shadcn UI component library"
```

---

## Task 7: Copy research and admin components from emir-one-design

**Files:**
- Create: `src/components/research/` (7 files)
- Create: `src/components/admin/` (3 files)

- [ ] **Step 1: Copy research components**

```bash
mkdir -p src/components/research src/components/admin
for f in BackToTop.tsx DataTable.tsx EmailGateModal.tsx ExperimentCard.tsx StatCard.tsx SubscribeWidget.tsx TableOfContents.tsx; do
  gh api "repos/munaw-ar/emir-one-design/contents/src/components/research/$f" \
    --jq '.content' | base64 -d > "src/components/research/$f"
  echo "Copied research/$f"
done
```

- [ ] **Step 2: Copy admin components**

```bash
for f in AdminLayout.tsx ProtectedAdminRoute.tsx RichTextEditor.tsx; do
  gh api "repos/munaw-ar/emir-one-design/contents/src/components/admin/$f" \
    --jq '.content' | base64 -d > "src/components/admin/$f"
  echo "Copied admin/$f"
done
```

- [ ] **Step 3: Commit**

```bash
git add src/components/research/ src/components/admin/
git commit -m "feat: port research and admin components from emir-one-design"
```

---

## Task 8: Copy research pages and admin pages from emir-one-design

**Files:**
- Create: `src/pages/ResearchHub.tsx`, `ExperimentLogs.tsx`, `IndustryIndex.tsx`, `IndustryResearch.tsx`, `QuarterlyReports.tsx`, `Methodology.tsx`
- Create: `src/pages/admin/` (12 files)
- Create: `src/pages/NotFound.tsx`, `PrivacyPolicy.tsx`, `TermsOfService.tsx`

- [ ] **Step 1: Copy research pages**

```bash
mkdir -p src/pages/admin
for f in ResearchHub.tsx ExperimentLogs.tsx IndustryIndex.tsx IndustryResearch.tsx QuarterlyReports.tsx Methodology.tsx NotFound.tsx PrivacyPolicy.tsx TermsOfService.tsx; do
  gh api "repos/munaw-ar/emir-one-design/contents/src/pages/$f" \
    --jq '.content' | base64 -d > "src/pages/$f"
  echo "Copied pages/$f"
done
```

- [ ] **Step 2: Copy admin pages**

```bash
for f in AdminDashboard.tsx AdminLogin.tsx AnalyticsPage.tsx ExperimentLogForm.tsx ExperimentLogsList.tsx IndustryResearchForm.tsx IndustryResearchList.tsx MethodologyEditor.tsx QuarterlyReportForm.tsx QuarterlyReportsList.tsx SettingsPage.tsx SubscribersPage.tsx; do
  gh api "repos/munaw-ar/emir-one-design/contents/src/pages/admin/$f" \
    --jq '.content' | base64 -d > "src/pages/admin/$f"
  echo "Copied admin/$f"
done
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/
git commit -m "feat: port research hub, admin pages from emir-one-design"
```

---

## Task 9: Build Navigation component

**Files:**
- Create: `src/components/layout/Navigation.tsx`

The navigation must match index.html exactly: SVG wave logo, wordmark, nav links (Research, Sharia-Aligned, How We Make It), live status dot, hamburger menu for mobile.

- [ ] **Step 1: Create src/components/layout/Navigation.tsx**

```typescript
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Close drawer on route change
  useEffect(() => { setMobileOpen(false); }, [location]);

  // Lock body scroll when mobile nav open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinks = [
    { href: '/research', label: 'Research' },
    { href: '/sharia-aligned', label: 'Sharia-Aligned' },
    { href: '/how-we-make-it', label: 'How We Make It' },
  ];

  const nowAEST = new Date().toLocaleTimeString('en-AU', {
    timeZone: 'Australia/Sydney',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <>
      <header className="site-header" style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'var(--paper)', borderBottom: '1px solid var(--rule)',
        WebkitBackdropFilter: 'blur(8px)', backdropFilter: 'blur(8px)',
      }}>
        <div className="w" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
          {/* Wordmark */}
          <Link to="/" aria-label="Emir One home" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <svg viewBox="0 0 280 95" xmlns="http://www.w3.org/2000/svg" style={{ height: 28, width: 'auto' }} role="img" aria-label="Emir One">
              <g id="logo-wave">
                <path style={{ fill: 'none', stroke: 'var(--ink)', strokeWidth: 2.5, strokeLinecap: 'round' }}
                  d="M 8,55 C 30,55 30,42 52,42 C 74,42 74,55 96,55 C 118,55 118,42 140,35 C 155,30 165,28 175,28" />
              </g>
              <rect x="188" y="16" width="52" height="62" rx="3"
                style={{ fill: 'none', stroke: 'var(--ink)', strokeWidth: 2 }} />
              <text x="214" y="57" fontFamily="Georgia, serif" fontSize="26" fontWeight="700"
                textAnchor="middle" fill="var(--ink)">E1</text>
              <text x="252" y="57" fontFamily="Inter Tight, sans-serif" fontSize="20" fontWeight="500"
                fill="var(--ink)">Emir One</text>
            </svg>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" style={{ display: 'flex', alignItems: 'center', gap: 32 }}
            className="hidden md:flex">
            {navLinks.map(link => (
              <Link key={link.href} to={link.href} style={{
                fontFamily: 'var(--body)', fontSize: 13, fontWeight: 500,
                letterSpacing: '0.04em', textDecoration: 'none',
                color: location.pathname.startsWith(link.href) ? 'var(--green)' : 'var(--ink)',
              }}>
                {link.label}
              </Link>
            ))}
            <Link to="/book" style={{
              fontFamily: 'var(--body)', fontSize: 12, fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--paper)', background: 'var(--green)',
              padding: '7px 16px', borderRadius: 3, textDecoration: 'none',
            }}>
              Book a Call
            </Link>
          </nav>

          {/* Live status dot (desktop) + hamburger (mobile) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="hidden md:flex" style={{ alignItems: 'center', gap: 6 }}>
              <span className="animate-breathe" style={{
                display: 'inline-block', width: 6, height: 6,
                borderRadius: '50%', background: 'var(--green)',
              }} />
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mid)' }}>
                Live · {nowAEST} AEST
              </span>
            </div>
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(o => !o)}
              aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={mobileOpen}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round">
                {mobileOpen
                  ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                  : <><line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" /></>
                }
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <nav aria-label="Mobile navigation" style={{
          position: 'fixed', top: 60, left: 0, right: 0, bottom: 0,
          background: 'var(--paper)', zIndex: 99, padding: '32px 20px',
          borderTop: '1px solid var(--rule)',
        }}>
          {navLinks.map(link => (
            <Link key={link.href} to={link.href} style={{
              display: 'block', fontFamily: 'var(--body)', fontSize: 18, fontWeight: 500,
              color: 'var(--ink)', textDecoration: 'none', padding: '14px 0',
              borderBottom: '1px solid var(--rule-2)',
            }}>
              {link.label}
            </Link>
          ))}
          <Link to="/book" style={{
            display: 'block', marginTop: 32, fontFamily: 'var(--body)', fontSize: 14,
            fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--paper)', background: 'var(--green)',
            padding: '14px 0', borderRadius: 3, textDecoration: 'none', textAlign: 'center',
          }}>
            Book a Call
          </Link>
        </nav>
      )}
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Navigation.tsx
git commit -m "feat: Navigation component — SVG logo, links, mobile drawer"
```

---

## Task 10: Build Footer component

**Files:**
- Create: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Create src/components/layout/Footer.tsx**

```typescript
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async () => {
    if (!email || !email.includes('@')) return;
    setStatus('loading');
    const { error } = await supabase.from('subscribers').insert({ email });
    setStatus(error ? 'error' : 'success');
  };

  const year = new Date().getFullYear();

  return (
    <footer style={{ background: 'var(--ink)', color: 'var(--paper)', padding: '64px 0 40px' }}>
      <div className="w" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
        {/* Brand */}
        <div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 300, marginBottom: 12 }}>
            Emir One
          </div>
          <p style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--light)', lineHeight: 1.7, maxWidth: 280 }}>
            Ethical cold email infrastructure for B2B firms that measure what matters.
          </p>
          <div style={{ marginTop: 24, display: 'flex', gap: 24 }}>
            {[
              { to: '/privacy-policy', label: 'Privacy' },
              { to: '/terms-of-service', label: 'Terms' },
              { to: '/research', label: 'Research' },
              { to: '/sharia-aligned', label: 'Ethics' },
            ].map(l => (
              <Link key={l.to} to={l.to} style={{
                fontFamily: 'var(--body)', fontSize: 12, color: 'var(--light)',
                textDecoration: 'none', letterSpacing: '0.04em',
              }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <div style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--light)', marginBottom: 12 }}>
            Quarterly Intelligence
          </div>
          <p style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--light)', marginBottom: 16 }}>
            Deliverability benchmarks and experiment results — once a quarter.
          </p>
          {status === 'success' ? (
            <p style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--green)' }}>
              You're subscribed. Quarterly updates incoming.
            </p>
          ) : (
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{
                  flex: 1, fontFamily: 'var(--body)', fontSize: 13,
                  padding: '9px 12px', background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.15)', borderRadius: 3,
                  color: 'var(--paper)', outline: 'none',
                }}
              />
              <button
                onClick={handleSubscribe}
                disabled={status === 'loading'}
                style={{
                  fontFamily: 'var(--body)', fontSize: 12, fontWeight: 600,
                  letterSpacing: '0.08em', padding: '9px 18px',
                  background: 'var(--green)', color: 'var(--paper)',
                  border: 'none', borderRadius: 3, cursor: 'pointer',
                  opacity: status === 'loading' ? 0.6 : 1,
                }}
              >
                {status === 'loading' ? '…' : 'Subscribe'}
              </button>
            </div>
          )}
          <p style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--light)', marginTop: 8 }}>
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>

      <div className="w" style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--light)' }}>
          © {year} Emir One. All rights reserved.
        </span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--light)' }}>
          ABN: Available on request
        </span>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: Footer component — newsletter subscribe + links"
```

---

## Task 11: Domain health checker hook and drawer component

**Files:**
- Create: `src/hooks/useDomainHealth.ts`
- Create: `src/components/sections/DomainHealthChecker.tsx`

This is the most complex vanilla JS → React conversion. The full DNS check logic lives in index.html lines 2621–2800.

- [ ] **Step 1: Create src/hooks/useDomainHealth.ts**

```typescript
import { useState, useCallback } from 'react';

const CF_DNS = 'https://cloudflare-dns.com/dns-query';
const DNS_H = { Accept: 'application/dns-json' };

export interface DnsResult {
  spf: { found: boolean; value: string };
  dmarc: { found: boolean; policy: string; value: string };
  mx: { found: boolean; count: number };
  dkim: { found: boolean };
  score: number;
}

interface DomainHealthState {
  domain: string;
  results: DnsResult | null;
  isChecking: boolean;
  drawerOpen: boolean;
}

function dnsFetch(name: string, type: string) {
  return fetch(`${CF_DNS}?name=${encodeURIComponent(name)}&type=${type}`, {
    headers: DNS_H,
  }).then(r => r.json());
}

async function checkDomain(domain: string): Promise<DnsResult> {
  const selectors = ['google', 'mail', 'default', 'selector1', 'selector2'];
  const allChecks = await Promise.allSettled([
    dnsFetch(domain, 'TXT'),
    dnsFetch(`_dmarc.${domain}`, 'TXT'),
    dnsFetch(domain, 'MX'),
    ...selectors.map(s => dnsFetch(`${s}._domainkey.${domain}`, 'TXT')),
  ]);

  const spf = { found: false, value: '' };
  if (allChecks[0].status === 'fulfilled') {
    const ans: any[] = allChecks[0].value.Answer || [];
    const rec = ans.find(a => a.data?.includes('v=spf1'));
    if (rec) { spf.found = true; spf.value = rec.data.replace(/"/g, ''); }
  }

  const dmarc = { found: false, policy: 'none', value: '' };
  if (allChecks[1].status === 'fulfilled') {
    const dans: any[] = allChecks[1].value.Answer || [];
    const drec = dans.find(a => a.data?.includes('v=DMARC1'));
    if (drec) {
      dmarc.found = true;
      dmarc.value = drec.data.replace(/"/g, '');
      const pm = dmarc.value.match(/p=([a-z]+)/i);
      dmarc.policy = pm ? pm[1].toLowerCase() : 'none';
    }
  }

  const mx = { found: false, count: 0 };
  if (allChecks[2].status === 'fulfilled') {
    const mans: any[] = allChecks[2].value.Answer || [];
    if (mans.length > 0) { mx.found = true; mx.count = mans.length; }
  }

  const dkimFound = allChecks.slice(3).some(
    r => r.status === 'fulfilled' && (r.value as any).Answer?.length > 0
  );

  let score = 0;
  if (spf.found) score += 3;
  if (dmarc.found) {
    if (dmarc.policy === 'reject') score += 3;
    else if (dmarc.policy === 'quarantine') score += 2;
    else score += 1;
  }
  if (mx.found) score += 2;
  if (dkimFound) score += 2;

  return { spf, dmarc, mx, dkim: { found: dkimFound }, score };
}

export function getCommentary(score: number, r: DnsResult): string {
  if (score >= 9) return 'Excellent infrastructure. Your domain is inbox-ready.';
  if (score >= 7) {
    if (!r.dkim.found) return 'Close to inbox-ready. Add a DKIM record to complete your authentication stack.';
    if (r.dmarc.policy === 'none') return 'Close to inbox-ready. Upgrade your DMARC policy from none to quarantine to close the gap.';
    return 'Close to inbox-ready. One configuration gap to address.';
  }
  if (score >= 5) {
    const gaps: string[] = [];
    if (!r.spf.found) gaps.push('SPF');
    if (!r.dmarc.found || r.dmarc.policy === 'none') gaps.push('DMARC');
    if (!r.dkim.found) gaps.push('DKIM');
    return `Moderate risk. ${gaps.join(' and ')} need attention before any cold sending.`;
  }
  return 'High risk. Missing fundamentals — emails are likely landing in spam.';
}

export function useDomainHealth() {
  const [state, setState] = useState<DomainHealthState>({
    domain: '',
    results: null,
    isChecking: false,
    drawerOpen: false,
  });

  const check = useCallback(async (rawInput: string) => {
    const domain = rawInput
      .replace(/^https?:\/\//i, '')
      .replace(/\/.*$/, '')
      .toLowerCase()
      .trim();
    if (!domain) return;

    setState(s => ({ ...s, isChecking: true }));
    try {
      const results = await Promise.race([
        checkDomain(domain),
        new Promise<never>((_, rej) =>
          setTimeout(() => rej(new Error('timeout')), 8000)
        ),
      ]);
      setState({ domain, results, isChecking: false, drawerOpen: true });
    } catch {
      setState(s => ({ ...s, domain, results: null, isChecking: false, drawerOpen: true }));
    }
  }, []);

  const closeDrawer = useCallback(() => {
    setState(s => ({ ...s, drawerOpen: false }));
  }, []);

  return { ...state, check, closeDrawer };
}
```

- [ ] **Step 2: Create src/components/sections/DomainHealthChecker.tsx**

```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDomainHealth, getCommentary, type DnsResult } from '@/hooks/useDomainHealth';

function CheckRow({ glyph, label, text, status }: {
  glyph: string; label: string; text: string; status: 'pass' | 'fail' | 'warn' | 'unknown';
}) {
  const color = status === 'pass' ? 'var(--green)' : status === 'warn' ? '#B45309' : status === 'fail' ? '#DC2626' : 'var(--mid)';
  return (
    <div style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--rule-2)', alignItems: 'flex-start' }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 14, color, minWidth: 18 }}>{glyph}</span>
      <div>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500, color: 'var(--ink)' }}>{label}</span>
        <span style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--mid)' }}> — {text}</span>
      </div>
    </div>
  );
}

function HealthDrawer({ domain, results, onClose }: {
  domain: string; results: DnsResult | null; onClose: () => void;
}) {
  const navigate = useNavigate();
  const score = results?.score ?? null;
  const commentary = results ? getCommentary(score!, results) : 'Could not reach DNS — check your connection and try again.';

  const goToBook = () => {
    const params = new URLSearchParams({ domain, source: 'health_drawer' });
    if (score !== null) params.set('score', String(score));
    navigate(`/book?${params.toString()}`);
  };

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, background: 'rgba(12,11,9,0.5)', zIndex: 200,
      }} />
      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: 480,
        background: 'var(--paper)', zIndex: 201, overflowY: 'auto', padding: '32px 28px',
        boxShadow: '-4px 0 32px rgba(0,0,0,0.12)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: 4 }}>
              DNS Health Report
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 300 }}>
              {domain}
            </div>
          </div>
          <button onClick={onClose} aria-label="Close" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mid)', fontSize: 22, lineHeight: 1, padding: 4 }}>
            ×
          </button>
        </div>

        {/* Score */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '24px 0 8px' }}>
          <span style={{ fontFamily: 'var(--serif)', fontSize: 56, fontWeight: 300, lineHeight: 1, color: 'var(--ink)' }}>
            {score !== null ? score : '—'}
          </span>
          <span style={{ fontFamily: 'var(--body)', fontSize: 18, color: 'var(--mid)' }}>/10</span>
        </div>
        <p style={{ fontFamily: 'var(--body)', fontSize: 14, color: 'var(--mid)', marginBottom: 24, lineHeight: 1.6 }}>
          {commentary}
        </p>

        {/* Checks */}
        {results && (
          <div style={{ margin: '0 0 28px' }}>
            <CheckRow
              glyph={results.spf.found ? '✓' : '✗'}
              label="SPF"
              text={results.spf.found ? (results.spf.value || 'Record found') : 'No SPF record found'}
              status={results.spf.found ? 'pass' : 'fail'}
            />
            <CheckRow
              glyph={results.dmarc.found ? (results.dmarc.policy === 'none' ? '⚠' : '✓') : '✗'}
              label="DMARC"
              text={results.dmarc.found
                ? `p=${results.dmarc.policy}${results.dmarc.policy === 'none' ? ' — upgrade to quarantine or reject' : ''}`
                : 'No DMARC record found'}
              status={results.dmarc.found ? (results.dmarc.policy === 'none' ? 'warn' : 'pass') : 'fail'}
            />
            <CheckRow
              glyph={results.mx.found ? '✓' : '✗'}
              label="MX"
              text={results.mx.found ? `${results.mx.count} record${results.mx.count !== 1 ? 's' : ''} found` : 'No MX records found'}
              status={results.mx.found ? 'pass' : 'fail'}
            />
            <CheckRow
              glyph={results.dkim.found ? '✓' : '—'}
              label="DKIM"
              text={results.dkim.found ? 'Selector detected' : 'Selector not found — check manually'}
              status={results.dkim.found ? 'pass' : 'unknown'}
            />
          </div>
        )}

        <button onClick={goToBook} style={{
          width: '100%', fontFamily: 'var(--body)', fontSize: 13, fontWeight: 600,
          letterSpacing: '0.08em', padding: '14px 0',
          background: 'var(--green)', color: 'var(--paper)',
          border: 'none', borderRadius: 3, cursor: 'pointer',
        }}>
          Book a free strategy call →
        </button>
      </div>
    </>
  );
}

export default function DomainHealthChecker() {
  const [input, setInput] = useState('');
  const { check, isChecking, domain, results, drawerOpen, closeDrawer } = useDomainHealth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    check(input);
  };

  return (
    <>
      <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', gap: 0, maxWidth: 440 }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="yourdomain.com"
          inputMode="url"
          autoComplete="off"
          aria-label="Your domain"
          disabled={isChecking}
          style={{
            flex: 1, fontFamily: 'var(--mono)', fontSize: 14,
            padding: '12px 16px', background: 'var(--paper)',
            border: '1px solid var(--rule)', borderRight: 'none',
            borderRadius: '3px 0 0 3px', color: 'var(--ink)', outline: 'none',
          }}
        />
        <button
          type="submit"
          disabled={isChecking}
          style={{
            fontFamily: 'var(--body)', fontSize: 13, fontWeight: 600,
            letterSpacing: '0.06em', padding: '12px 20px',
            background: isChecking ? 'var(--mid)' : 'var(--green)',
            color: 'var(--paper)', border: 'none',
            borderRadius: '0 3px 3px 0', cursor: isChecking ? 'not-allowed' : 'pointer',
            whiteSpace: 'nowrap', transition: 'background 0.2s',
          }}
        >
          {isChecking ? 'Checking…' : 'Score my domain →'}
        </button>
      </form>
      <p style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--mid)', marginTop: 8 }}>
        Free audit. No signup. Results in &lt; 30 seconds.
      </p>

      {drawerOpen && (
        <HealthDrawer domain={domain} results={results} onClose={closeDrawer} />
      )}
    </>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useDomainHealth.ts src/components/sections/DomainHealthChecker.tsx
git commit -m "feat: domain health checker — DNS hook + score drawer component"
```

---

## Task 12: Build landing page section components

**Files:**
- Create: `src/components/sections/Hero.tsx`
- Create: `src/components/sections/SectionProblem.tsx`
- Create: `src/components/sections/SectionHowWeWork.tsx`
- Create: `src/components/sections/SectionEthics.tsx`
- Create: `src/components/sections/SectionOffer.tsx`
- Create: `src/components/sections/SectionDistinction.tsx`
- Create: `src/components/sections/SectionProof.tsx`
- Create: `src/components/sections/SectionCTA.tsx`

For all sections: use `var(--paper)`, `var(--ink)`, `var(--green)` etc. in inline styles (matching v2.0 exactly). The HTML content is taken verbatim from index.html — only the DOM manipulation and event listeners are removed (replaced by React state).

- [ ] **Step 1: Create src/components/sections/Hero.tsx**

```typescript
import DomainHealthChecker from './DomainHealthChecker';

export default function Hero() {
  return (
    <section className="hero-kinetic" aria-label="Hero: Free Deliverability Health Score" style={{
      padding: 'clamp(72px, 10vw, 120px) 0 clamp(56px, 8vw, 96px)',
      background: 'var(--paper)', borderBottom: '1px solid var(--rule)',
    }}>
      <div className="w">
        {/* Overline */}
        <div style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: 20 }}>
          <a href="#sharia" style={{ color: 'inherit', textDecoration: 'none' }}>Sharia-Aligned</a> · Ethical Cold Email Infrastructure
        </div>

        {/* Headline */}
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 5.5vw, 68px)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--ink)', maxWidth: 820, marginBottom: 28 }}>
          Your cold email is failing. <em>We fix the infrastructure,</em> not the copy.
        </h1>

        {/* Sub */}
        <p style={{ fontFamily: 'var(--body)', fontSize: 'clamp(15px, 1.6vw, 18px)', color: 'var(--mid)', maxWidth: 560, lineHeight: 1.7, marginBottom: 40 }}>
          Score your domain free — see exactly what's killing your deliverability before we talk.
        </p>

        {/* Health checker form */}
        <DomainHealthChecker />

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 32, marginTop: 52, paddingTop: 28, borderTop: '1px solid var(--rule)', flexWrap: 'wrap' }}>
          {[
            { n: '98.7%', l: 'Inbox placement' },
            { n: 'Sprint', l: 'Full build time' },
            { n: '0 / 92', l: 'Blacklists' },
          ].map(stat => (
            <div key={stat.l}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 300, color: 'var(--ink)' }}>{stat.n}</div>
              <div style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--mid)', marginTop: 2 }}>{stat.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create src/components/sections/SectionProblem.tsx**

Open `index.html` lines 2062–2112 for reference. Translate the HTML structure verbatim into JSX.

```typescript
export default function SectionProblem() {
  return (
    <section className="section" aria-labelledby="villain-h" style={{ padding: 'clamp(64px, 8vw, 104px) 0', background: 'var(--paper)' }}>
      <div className="w">
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 48, alignItems: 'start' }}>
          <div>
            <div style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--mid)' }}>
              01 — The Problem
            </div>
          </div>
          <div>
            <h2 id="villain-h" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 300, lineHeight: 1.2, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: 20 }}>
              Your outbound is either <em>silent</em> — or burning your reputation.
            </h2>
            <p style={{ fontFamily: 'var(--body)', fontSize: 16, color: 'var(--mid)', lineHeight: 1.7, marginBottom: 32, maxWidth: 600 }}>
              There isn't a third option in 2026. And your domain doesn't forgive.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { glyph: '—', text: 'SPF soft-fail · DKIM missing · DMARC p=none.' },
                { glyph: '—', text: 'Warming with a tool, not a strategy.' },
                { glyph: '—', text: 'Primary domain used for cold sends.' },
                { glyph: '—', text: 'No MXToolbox baseline before launch.' },
                { glyph: '✓', text: 'SPF aligned · DKIM valid · DMARC p=quarantine with reporting.', pass: true },
                { glyph: '✓', text: 'Secondary domains only. Primary stays clean.', pass: true },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: (item as any).pass ? 'var(--green)' : 'var(--mid)', marginTop: 2 }}>{item.glyph}</span>
                  <span style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.5 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create remaining section stubs**

For `SectionHowWeWork`, `SectionEthics`, `SectionOffer`, `SectionDistinction`, `SectionProof`, `SectionCTA`: follow the same pattern — open the matching lines in `index.html`, translate the HTML to JSX using the same `var(--*)` tokens, replacing `class=` with `style=` for all custom classes.

**SectionHowWeWork** — lines 2115–2183 in index.html  
**SectionEthics** — lines 2186–2262 (id="sharia")  
**SectionOffer** — lines 2265–2345  
**SectionDistinction** — lines 2348–2420  
**SectionProof** — lines 2420–2540  
**SectionCTA** — lines 2540–2580  

Key conversion rules:
- `class="section section--alt"` → `style={{ background: 'var(--paper-2)' }}`
- `class="section-num"` → `style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--mid)' }}`
- `class="section-h reveal"` → remove `reveal` (handled by parent), keep heading styles
- `class="section-sub"` → `style={{ fontFamily: 'var(--body)', color: 'var(--mid)', lineHeight: 1.7 }}`
- `&mdash;` → `—`, `&rsquo;` → `'`, `&ndash;` → `–`, `&thinsp;` → ` `, `&amp;` → `&`
- SVG draw-path animations: include the SVGs but skip the Anime.js stroke animation for now — static lines are fine, animation is additive in Task 13

Each section file structure:
```typescript
export default function SectionX() {
  return (
    <section aria-labelledby="X-h" style={{ padding: 'clamp(64px,8vw,104px) 0', background: 'var(--paper)' /* or var(--paper-2) */ }}>
      <div className="w">
        {/* content from index.html translated to JSX */}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Commit after all sections are created**

```bash
git add src/components/sections/
git commit -m "feat: landing page section components — Hero through CTA"
```

---

## Task 13: Assemble Index page with Lenis scroll + reveal animations

**Files:**
- Create: `src/pages/Index.tsx`

- [ ] **Step 1: Create src/pages/Index.tsx**

```typescript
import { useEffect, useRef } from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import SectionProblem from '@/components/sections/SectionProblem';
import SectionHowWeWork from '@/components/sections/SectionHowWeWork';
import SectionEthics from '@/components/sections/SectionEthics';
import SectionOffer from '@/components/sections/SectionOffer';
import SectionDistinction from '@/components/sections/SectionDistinction';
import SectionProof from '@/components/sections/SectionProof';
import SectionCTA from '@/components/sections/SectionCTA';

export default function Index() {
  const revealRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    // Scroll-reveal: add visible class when element enters viewport
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.15 }
    );

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navigation />
      <main id="top">
        <Hero />
        <SectionProblem />
        <SectionHowWeWork />
        <SectionEthics />
        <SectionOffer />
        <SectionDistinction />
        <SectionProof />
        <SectionCTA />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Add reveal animation CSS to src/index.css**

Append to `src/index.css`:

```css
/* Scroll-reveal */
.reveal {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.6s var(--ease), transform 0.6s var(--ease);
}
.reveal.is-visible {
  opacity: 1;
  transform: none;
}
.reveal-delay-1 { transition-delay: 0.12s; }
.reveal-delay-2 { transition-delay: 0.24s; }
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/Index.tsx src/index.css
git commit -m "feat: Index page — section assembly + scroll-reveal"
```

---

## Task 14: BookPage and remaining public pages

**Files:**
- Create: `src/pages/BookPage.tsx`
- Create: `src/pages/ShariaAligned.tsx`
- Create: `src/pages/HowWeMakeIt.tsx`
- Create: `src/pages/FitPage.tsx`

- [ ] **Step 1: Create src/pages/BookPage.tsx**

This page already exists in emir-one-design and reads URL params to pre-fill domain/score:

```bash
gh api "repos/munaw-ar/emir-one-design/contents/src/pages/BookPage.tsx" \
  --jq '.content' | base64 -d > src/pages/BookPage.tsx
```

- [ ] **Step 2: Copy ShariaAligned, HowWeMakeIt, FitPage from emir-one-design**

```bash
for f in ShariaAligned.tsx HowWeMakeIt.tsx FitPage.tsx; do
  gh api "repos/munaw-ar/emir-one-design/contents/src/pages/$f" \
    --jq '.content' | base64 -d > "src/pages/$f"
  echo "Copied $f"
done
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/BookPage.tsx src/pages/ShariaAligned.tsx src/pages/HowWeMakeIt.tsx src/pages/FitPage.tsx
git commit -m "feat: book page and public pages — ShariaAligned, HowWeMakeIt, FitPage"
```

---

## Task 15: Wire App.tsx — full router + Lenis init

**Files:**
- Replace: `src/App.tsx`

- [ ] **Step 1: Replace src/App.tsx with full router**

```typescript
import { useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Index from './pages/Index';
import BookPage from './pages/BookPage';
import ShariaAligned from './pages/ShariaAligned';
import HowWeMakeIt from './pages/HowWeMakeIt';
import FitPage from './pages/FitPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ResearchHub from './pages/ResearchHub';
import IndustryIndex from './pages/IndustryIndex';
import IndustryResearch from './pages/IndustryResearch';
import ExperimentLogs from './pages/ExperimentLogs';
import QuarterlyReports from './pages/QuarterlyReports';
import Methodology from './pages/Methodology';
import NotFound from './pages/NotFound';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import IndustryResearchList from './pages/admin/IndustryResearchList';
import IndustryResearchForm from './pages/admin/IndustryResearchForm';
import ExperimentLogsList from './pages/admin/ExperimentLogsList';
import ExperimentLogForm from './pages/admin/ExperimentLogForm';
import QuarterlyReportsList from './pages/admin/QuarterlyReportsList';
import QuarterlyReportForm from './pages/admin/QuarterlyReportForm';
import MethodologyEditor from './pages/admin/MethodologyEditor';
import SubscribersPage from './pages/admin/SubscribersPage';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import SettingsPage from './pages/admin/SettingsPage';

const queryClient = new QueryClient();

function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const isTouchDevice = () => window.matchMedia('(hover: none)').matches;
    if (isTouchDevice()) return; // native scroll on touch

    let lenis: any;
    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    });

    return () => { lenis?.destroy(); };
  }, []);

  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LenisProvider>
          <ScrollToTop />
          <AdminAuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/book" element={<BookPage />} />
              <Route path="/sharia-aligned" element={<ShariaAligned />} />
              <Route path="/how-we-make-it" element={<HowWeMakeIt />} />
              <Route path="/fit" element={<FitPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/research" element={<ResearchHub />} />
              <Route path="/research/industry" element={<IndustryIndex />} />
              <Route path="/research/industry/:slug" element={<IndustryResearch />} />
              <Route path="/research/experiments" element={<ExperimentLogs />} />
              <Route path="/research/reports" element={<QuarterlyReports />} />
              <Route path="/research/methodology" element={<Methodology />} />

              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<ProtectedAdminRoute><AdminLayout /></ProtectedAdminRoute>}>
                <Route index element={<AdminDashboard />} />
                <Route path="industry-research" element={<IndustryResearchList />} />
                <Route path="industry-research/new" element={<IndustryResearchForm />} />
                <Route path="industry-research/:id" element={<IndustryResearchForm />} />
                <Route path="experiments" element={<ExperimentLogsList />} />
                <Route path="experiments/new" element={<ExperimentLogForm />} />
                <Route path="experiments/:id" element={<ExperimentLogForm />} />
                <Route path="reports" element={<QuarterlyReportsList />} />
                <Route path="reports/new" element={<QuarterlyReportForm />} />
                <Route path="reports/:id" element={<QuarterlyReportForm />} />
                <Route path="methodology" element={<MethodologyEditor />} />
                <Route path="subscribers" element={<SubscribersPage />} />
                <Route path="analytics" element={<AnalyticsPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </AdminAuthProvider>
        </LenisProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
```

- [ ] **Step 2: Run TypeScript check**

```bash
npx tsc --noEmit
```

Fix any type errors before proceeding. Common fixes:
- Missing `React` import in JSX files: add `import React from 'react'` where needed
- `any` type warnings on `allChecks` in useDomainHealth: acceptable (Cloudflare DNS API is untyped)

- [ ] **Step 3: Run dev server and verify routing**

```bash
npm run dev
```

Check each route:
- `http://localhost:8080/` — landing page renders
- `http://localhost:8080/research` — research hub renders
- `http://localhost:8080/admin/login` — login form renders

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "feat: wire full router — public pages + research + admin portal"
```

---

## Task 16: Supabase project setup (manual steps)

This task requires browser access to Supabase dashboard.

- [ ] **Step 1: Create new Supabase project**

Go to https://supabase.com → New project → choose name "emir-one-production" → choose a strong database password → select the closest region.

- [ ] **Step 2: Get project credentials**

In Supabase dashboard → Settings → API:
- Copy "Project URL" → this is `VITE_SUPABASE_URL`
- Copy "anon public" key → this is `VITE_SUPABASE_ANON_KEY`

- [ ] **Step 3: Update .env with real credentials**

Edit `.env`:
```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...your-anon-key...
```

- [ ] **Step 4: Run migrations**

In Supabase dashboard → SQL Editor, run each migration file in chronological order (oldest first by filename timestamp):

```
20251217025911 → paste and run
20251217031848 → paste and run
20251217031900 → paste and run
20251217034709 → paste and run
20251217041926 → paste and run
20251217051259 → paste and run
20251217053735 → paste and run
20251217054204 → paste and run
20260123162843 → paste and run
20260123162913 → paste and run
20260202044301 → paste and run
```

Expected: 11 successful SQL executions. Tables visible in Table Editor.

- [ ] **Step 5: Create admin user**

In Supabase dashboard → Authentication → Users → Invite user:
- Enter your email address
- Complete the email invite

Then in SQL Editor:
```sql
INSERT INTO user_roles (user_id, role)
SELECT id, 'admin'
FROM auth.users
WHERE email = 'anjum.tanjim@gmail.com';
```

- [ ] **Step 6: Verify dev server connects to Supabase**

```bash
npm run dev
```

Navigate to `http://localhost:8080/admin/login` → log in with your credentials. Expected: redirects to `/admin` dashboard.

---

## Task 17: Restyle research pages to v2.0 design tokens

The research pages from emir-one-design use generic shadcn defaults. Apply v2.0 tokens so they feel like the same product.

**For each file in `src/pages/ResearchHub.tsx`, `ExperimentLogs.tsx`, `IndustryIndex.tsx`, `IndustryResearch.tsx`, `QuarterlyReports.tsx`, `Methodology.tsx`:**

- [ ] **Step 1: Add Navigation and Footer wrapping**

Each research page that uses its own layout shell needs to be updated to use the v2.0 Navigation and Footer. Pattern:

```typescript
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

// In the return:
return (
  <>
    <Navigation />
    <main>
      {/* existing page content */}
    </main>
    <Footer />
  </>
);
```

Check each file — those that already import a `Navigation` from emir-one-design should have that import replaced with `@/components/layout/Navigation`.

- [ ] **Step 2: Verify research page renders correctly**

```bash
npm run dev
```

Navigate to `http://localhost:8080/research` — page should show v2.0 nav/footer with research content.

- [ ] **Step 3: Commit**

```bash
git add src/pages/ResearchHub.tsx src/pages/ExperimentLogs.tsx src/pages/IndustryIndex.tsx src/pages/IndustryResearch.tsx src/pages/QuarterlyReports.tsx src/pages/Methodology.tsx
git commit -m "feat: wire v2.0 nav/footer into research pages"
```

---

## Task 18: Build verification

- [ ] **Step 1: Run TypeScript check (must be clean)**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Expected: `dist/` folder created, no build errors.

- [ ] **Step 3: Preview production build**

```bash
npm run preview
```

Navigate to `http://localhost:4173/` — test the following:

| Test | Expected |
|---|---|
| Landing page loads | Editorial design matches original index.html |
| Domain health checker | Submitting a domain returns score and opens drawer |
| Health drawer CTA | Clicking "Book a call" navigates to `/book?domain=...&score=...` |
| Navigation hamburger | Opens mobile drawer on narrow viewport |
| `/research` | Research hub renders with nav + footer |
| `/admin/login` | Login form renders |
| Admin login | Signing in with admin credentials redirects to `/admin` |
| Admin experiment form | Creating a new experiment log saves to Supabase |
| `/research/experiments` | Published experiment logs appear |
| Email gate | Visiting an industry research detail page shows EmailGateModal |
| Newsletter subscribe | Submitting email in footer inserts into subscribers table |

- [ ] **Step 4: Commit final state**

```bash
git add -A
git commit -m "feat: complete v2.0 migration — React/Vite, admin portal, research hub, Supabase"
```

---

## Appendix: Common Import Fixes

When porting files from emir-one-design, these import paths may need updating:

| Old import | New import |
|---|---|
| `@/components/layout/Navigation` | Same — already matches |
| `@/components/layout/Footer` | Same — already matches |
| `@/integrations/supabase/client` | Same |
| `VITE_SUPABASE_PUBLISHABLE_KEY` in client.ts | Change to `VITE_SUPABASE_ANON_KEY` |

If TypeScript reports `Cannot find module 'lenis'`, run: `npm install --save-dev @types/lenis` or add `declare module 'lenis'` to `src/vite-env.d.ts`.
