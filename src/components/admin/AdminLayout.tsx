import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Building2,
  FlaskConical,
  FileText,
  BookOpen,
  Mail,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Industry Research', href: '/admin/industry-research', icon: Building2 },
  { name: 'Experiment Logs', href: '/admin/experiments', icon: FlaskConical },
  { name: 'Quarterly Reports', href: '/admin/reports', icon: FileText },
  { name: 'Methodology', href: '/admin/methodology', icon: BookOpen },
  { name: 'Subscribers', href: '/admin/subscribers', icon: Mail },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAdminAuth();

  // Admin portal uses a light theme (better for content editing).
  useEffect(() => {
    document.body.classList.add('admin-theme');
    return () => document.body.classList.remove('admin-theme');
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const isActive = (href: string) => {
    if (href === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(href);
  };

  const getBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = paths.map((path, index) => {
      const href = '/' + paths.slice(0, index + 1).join('/');
      const name = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
      return { name, href };
    });
    return breadcrumbs;
  };

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div
      className={cn(
        'flex flex-col h-full bg-[#0B1224]',
        mobile ? 'w-full' : 'w-[260px]'
      )}
    >
      {/* Header */}
      <div className="px-6 py-6 border-b border-white/10">
        <Link to="/admin" className="block">
          <h1 className="text-xl font-bold text-white tracking-tight">EMIR ONE</h1>
          <p className="text-sm text-white/60 mt-0.5">Research Admin</p>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => mobile && setSidebarOpen(false)}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                active
                  ? 'bg-[#038C7F] text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer - User Profile */}
      <div className="px-3 py-4 border-t border-white/10">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#038C7F] flex items-center justify-center text-white font-medium">
              MA
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                Munawar Anjum
              </p>
              <p className="text-xs text-white/60 truncate">
                {user?.email}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={handleSignOut}
            className="w-full mt-3 justify-start text-white/70 hover:text-white hover:bg-white/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 w-[280px] lg:hidden"
            >
              <div className="relative h-full">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(false)}
                  className="absolute top-4 right-4 text-white hover:bg-white/10 z-10"
                >
                  <X className="h-5 w-5" />
                </Button>
                <Sidebar mobile />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-[260px]">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="lg:ml-[260px]">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-[#E5E7EB]">
          <div className="flex items-center gap-4 px-4 sm:px-6 lg:px-8 h-16">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Breadcrumbs */}
            <nav className="flex items-center text-sm">
              {getBreadcrumbs().map((crumb, index, arr) => (
                <React.Fragment key={crumb.href}>
                  {index > 0 && (
                    <ChevronRight className="h-4 w-4 mx-2 text-[#6B7280]" />
                  )}
                  <Link
                    to={crumb.href}
                    className={cn(
                      'capitalize',
                      index === arr.length - 1
                        ? 'text-[#111827] font-medium'
                        : 'text-[#6B7280] hover:text-[#111827]'
                    )}
                  >
                    {crumb.name}
                  </Link>
                </React.Fragment>
              ))}
            </nav>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
