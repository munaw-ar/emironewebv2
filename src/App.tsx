import { useEffect, lazy, Suspense, createContext, useContext, useRef, useState } from 'react';
import type LenisType from 'lenis';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import { AdminAuthProvider } from './contexts/AdminAuthContext';

// Marketing/secondary pages — split out of the homepage's first paint.
const BookPage = lazy(() => import('./pages/BookPage'));
const ShariaAligned = lazy(() => import('./pages/ShariaAligned'));
const HowWeMakeIt = lazy(() => import('./pages/HowWeMakeIt'));
const FitPage = lazy(() => import('./pages/FitPage'));
const Careers = lazy(() => import('./pages/Careers'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));

// Research hub.
const ResearchHub = lazy(() => import('./pages/ResearchHub'));
const IndustryIndex = lazy(() => import('./pages/IndustryIndex'));
const IndustryResearch = lazy(() => import('./pages/IndustryResearch'));
const ExperimentLogs = lazy(() => import('./pages/ExperimentLogs'));
const QuarterlyReports = lazy(() => import('./pages/QuarterlyReports'));
const Methodology = lazy(() => import('./pages/Methodology'));

// Admin CMS (Tiptap, dashboards) — never shipped to public visitors.
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const ProtectedAdminRoute = lazy(() => import('./components/admin/ProtectedAdminRoute'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const IndustryResearchList = lazy(() => import('./pages/admin/IndustryResearchList'));
const IndustryResearchForm = lazy(() => import('./pages/admin/IndustryResearchForm'));
const ExperimentLogsList = lazy(() => import('./pages/admin/ExperimentLogsList'));
const ExperimentLogForm = lazy(() => import('./pages/admin/ExperimentLogForm'));
const QuarterlyReportsList = lazy(() => import('./pages/admin/QuarterlyReportsList'));
const QuarterlyReportForm = lazy(() => import('./pages/admin/QuarterlyReportForm'));
const MethodologyEditor = lazy(() => import('./pages/admin/MethodologyEditor'));
const SubscribersPage = lazy(() => import('./pages/admin/SubscribersPage'));
const AnalyticsPage = lazy(() => import('./pages/admin/AnalyticsPage'));
const SettingsPage = lazy(() => import('./pages/admin/SettingsPage'));

const queryClient = new QueryClient();

// Expose the live Lenis instance app-wide (null on touch / reduced-motion / admin).
const LenisContext = createContext<LenisType | null>(null);
export const useLenis = () => useContext(LenisContext);

const isAdmin = (path: string) => path.startsWith('/admin');

function RouteFallback() {
  return (
    <div style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', color: 'var(--mid)', fontFamily: 'var(--mono)', fontSize: 13 }}>
      Loading…
    </div>
  );
}

/**
 * Smooth-scroll backbone. Owns a single tuned Lenis instance for buttery
 * wheel/trackpad scrolling on pointer devices, keeps native momentum on touch,
 * and bows out entirely under prefers-reduced-motion or on /admin (where the
 * CMS has its own scroll containers). Also drives:
 *   - scroll reset on route change (synced through Lenis so it never fights it)
 *   - smooth in-page anchor scrolling (#links and hash navigations)
 */
function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<LenisType | null>(null);
  const lenisRef = useRef<LenisType | null>(null);
  const { pathname, hash } = useLocation();
  const adminArea = isAdmin(pathname);

  // Create the instance on capable devices, public area only. Re-runs only when
  // crossing the /admin boundary (so the CMS scrolls natively, not smoothed).
  useEffect(() => {
    const touch = window.matchMedia('(hover: none)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (touch || reduce || adminArea) return;

    let instance: LenisType | undefined;
    let raf = 0;
    let cancelled = false;

    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return;
      instance = new Lenis({
        lerp: 0.08, // lower = longer, silkier glide; 0.08 stays responsive
        smoothWheel: true,
        wheelMultiplier: 1,
      });
      lenisRef.current = instance;
      setLenis(instance);
      const loop = (time: number) => {
        instance!.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      instance?.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, [adminArea]);

  // Scroll handling on every navigation: smooth-scroll to a hash target, else
  // jump to the top — both routed through Lenis when it's active so the
  // internal scroll position stays in sync (no post-nav jump/jank).
  useEffect(() => {
    const l = lenisRef.current;
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 60;

    if (hash) {
      let tries = 0;
      const find = () => {
        const el = document.querySelector(hash);
        if (el) {
          if (l && !isAdmin(pathname)) l.scrollTo(el as HTMLElement, { offset: -(navH + 12), duration: 1.1 });
          else (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (tries++ < 20) {
          requestAnimationFrame(find);
        }
      };
      requestAnimationFrame(find);
      return;
    }

    if (l && !isAdmin(pathname)) l.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, hash]);

  // Buttery in-page anchor clicks (e.g. the hero "Sharia-Aligned" link),
  // intercepted globally so plain <a href="#…"> glides instead of jumping.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement)?.closest('a');
      const href = a?.getAttribute('href');
      if (!a || !href || href === '#' || !href.startsWith('#')) return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      const l = lenisRef.current;
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 60;
      if (l && !isAdmin(window.location.pathname)) l.scrollTo(el as HTMLElement, { offset: -(navH + 12), duration: 1.1 });
      else (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', href);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

/**
 * Route content with a quick, opacity-only cross-fade on navigation. Opacity is
 * used deliberately (no transform) so it never establishes a containing block
 * that would break the sticky nav, the fixed mobile drawer, or the hero canvas.
 */
function AnimatedRoutes() {
  const location = useLocation();
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <motion.div
      key={location.pathname}
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      <Suspense fallback={<RouteFallback />}>
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/book" element={<BookPage />} />
          <Route path="/sharia-aligned" element={<ShariaAligned />} />
          <Route path="/how-we-make-it" element={<HowWeMakeIt />} />
          <Route path="/fit" element={<FitPage />} />
          <Route path="/careers" element={<Careers />} />
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
      </Suspense>
    </motion.div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SpeedInsights />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SmoothScroll>
          <AdminAuthProvider>
            <AnimatedRoutes />
          </AdminAuthProvider>
        </SmoothScroll>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
