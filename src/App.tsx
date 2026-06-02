import { useEffect, lazy, Suspense } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import { AdminAuthProvider } from './contexts/AdminAuthContext';

// Marketing/secondary pages — split out of the homepage's first paint.
const BookPage = lazy(() => import('./pages/BookPage'));
const ShariaAligned = lazy(() => import('./pages/ShariaAligned'));
const HowWeMakeIt = lazy(() => import('./pages/HowWeMakeIt'));
const FitPage = lazy(() => import('./pages/FitPage'));
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

function RouteFallback() {
  return (
    <div style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', color: 'var(--mid)', fontFamily: 'var(--mono)', fontSize: 13 }}>
      Loading…
    </div>
  );
}

function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const isTouchDevice = () => window.matchMedia('(hover: none)').matches;
    const prefersReducedMotion = () =>
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Smooth-scroll hijacking is a vestibular trigger — skip it for these users.
    if (isTouchDevice() || prefersReducedMotion()) return;

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
      <SpeedInsights />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LenisProvider>
          <ScrollToTop />
          <AdminAuthProvider>
            <Suspense fallback={<RouteFallback />}>
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
            </Suspense>
          </AdminAuthProvider>
        </LenisProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
