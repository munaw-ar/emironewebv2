import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Building2,
  FlaskConical,
  Mail,
  Download,
  Plus,
  ArrowUpRight,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { format, formatDistanceToNow } from 'date-fns';

interface StatsData {
  industryResearchCount: number;
  experimentsCount: number;
  subscribersCount: number;
  downloadsCount: number;
  recentSubscribers: number;
}

interface ActivityItem {
  id: string;
  action: string;
  description: string;
  created_at: string;
}

const AdminDashboard: React.FC = () => {
  useAdminAuth();
  const [stats, setStats] = useState<StatsData>({
    industryResearchCount: 0,
    experimentsCount: 0,
    subscribersCount: 0,
    downloadsCount: 0,
    recentSubscribers: 0,
  });
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [_isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch counts
        const [
          { count: industryCount },
          { count: experimentsCount },
          { count: subscribersCount },
          { data: reportsData },
          { data: recentSubs },
          { data: activityData },
        ] = await Promise.all([
          supabase.from('industry_research').select('*', { count: 'exact', head: true }).eq('is_published', true),
          supabase.from('experiment_logs').select('*', { count: 'exact', head: true }).eq('is_published', true),
          supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true }).eq('is_active', true),
          supabase.from('quarterly_reports').select('download_count').eq('is_published', true),
          supabase
            .from('newsletter_subscribers')
            .select('*', { count: 'exact', head: true })
            .eq('is_active', true)
            .gte('subscribed_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
          supabase.from('activity_log').select('*').order('created_at', { ascending: false }).limit(10),
        ]);

        const totalDownloads = reportsData?.reduce((sum, r) => sum + (r.download_count || 0), 0) || 0;

        setStats({
          industryResearchCount: industryCount || 0,
          experimentsCount: experimentsCount || 0,
          subscribersCount: subscribersCount || 0,
          downloadsCount: totalDownloads,
          recentSubscribers: recentSubs?.length || 0,
        });

        setActivities((activityData || []).map(a => ({ ...a, created_at: a.created_at ?? '' })));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const statCards = [
    {
      title: 'Industry Research',
      value: stats.industryResearchCount,
      subtitle: 'Published pages',
      icon: Building2,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Experiment Logs',
      value: stats.experimentsCount,
      subtitle: 'Published experiments',
      icon: FlaskConical,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'Newsletter Subscribers',
      value: stats.subscribersCount,
      subtitle: `+${stats.recentSubscribers} this week`,
      icon: Mail,
      color: 'bg-green-50 text-green-600',
    },
    {
      title: 'Report Downloads',
      value: stats.downloadsCount,
      subtitle: 'Total downloads',
      icon: Download,
      color: 'bg-orange-50 text-orange-600',
    },
  ];

  const quickActions = [
    { label: 'Create Industry Research', href: '/admin/industry-research/new', primary: true },
    { label: 'Upload Quarterly Report', href: '/admin/reports/new', primary: true },
    { label: 'Add Experiment Log', href: '/admin/experiments/new', primary: false },
    { label: 'Export Subscribers', href: '/admin/subscribers', primary: false },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold text-[#111827]">Dashboard</h1>
        <p className="text-[#6B7280] mt-1">
          Welcome back, Munawar • {format(new Date(), 'EEEE, MMMM d, yyyy')}
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <Card key={index} className="border-[#E5E7EB] hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-[#6B7280]">{stat.title}</p>
                  <p className="text-3xl font-bold text-[#111827] mt-2">{stat.value}</p>
                  <p className="text-sm text-[#6B7280] mt-1">{stat.subtitle}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="border-[#E5E7EB]">
            <CardHeader className="border-b border-[#E5E7EB]">
              <CardTitle className="text-lg font-semibold text-[#111827]">
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {activities.length > 0 ? (
                <div className="divide-y divide-[#E5E7EB]">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-4">
                      <div className="p-2 rounded-lg bg-[#F3F4F6]">
                        <Clock className="h-4 w-4 text-[#6B7280]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#111827]">
                          {activity.action}
                        </p>
                        <p className="text-sm text-[#6B7280] truncate">
                          {activity.description}
                        </p>
                      </div>
                      <p className="text-xs text-[#6B7280] whitespace-nowrap">
                        {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Clock className="h-8 w-8 text-[#D1D5DB] mx-auto mb-2" />
                  <p className="text-sm text-[#6B7280]">No recent activity</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <Card className="border-[#E5E7EB]">
            <CardHeader className="border-b border-[#E5E7EB]">
              <CardTitle className="text-lg font-semibold text-[#111827]">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {quickActions.map((action, index) => (
                <Link key={index} to={action.href} className="block">
                  <Button
                    variant={action.primary ? 'default' : 'outline'}
                    className={`w-full justify-between ${
                      action.primary
                        ? 'bg-[#038C7F] hover:bg-[#027368] text-white'
                        : 'border-[#E5E7EB] text-[#111827] hover:bg-[#F9FAFB]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      {action.label}
                    </span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </Link>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
