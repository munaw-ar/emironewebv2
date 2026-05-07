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
    if (isTouchDevice()) return;

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
