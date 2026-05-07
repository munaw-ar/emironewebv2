import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Download,
  Trash2,
  Mail,
  MoreHorizontal,
  Check,
  X,
  Users,
  TrendingUp,
  Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow, format, subDays } from 'date-fns';

interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string | null;
  source: string | null;
  is_active: boolean | null;
  unsubscribed_at: string | null;
}

const SubscribersPage: React.FC = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    thisWeek: 0,
    thisMonth: 0,
  });
  const { toast } = useToast();

  const fetchSubscribers = async () => {
    try {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('subscribed_at', { ascending: false });

      if (error) throw error;
      setSubscribers(data || []);

      // Calculate stats
      const now = new Date();
      const weekAgo = subDays(now, 7);
      const monthAgo = subDays(now, 30);

      const activeSubscribers = data?.filter(s => s.is_active) || [];
      const thisWeek = activeSubscribers.filter(s => 
        s.subscribed_at && new Date(s.subscribed_at) >= weekAgo
      ).length;
      const thisMonth = activeSubscribers.filter(s => 
        s.subscribed_at && new Date(s.subscribed_at) >= monthAgo
      ).length;

      setStats({
        total: activeSubscribers.length,
        thisWeek,
        thisMonth,
      });
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      toast({
        title: 'Error',
        description: 'Failed to load subscribers.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const filteredSubscribers = subscribers.filter((s) =>
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectAll = () => {
    if (selectedIds.length === filteredSubscribers.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredSubscribers.map((s) => s.id));
    }
  };

  const handleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleUnsubscribe = async (id: string) => {
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .update({ is_active: false, unsubscribed_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      setSubscribers(
        subscribers.map((s) =>
          s.id === id ? { ...s, is_active: false, unsubscribed_at: new Date().toISOString() } : s
        )
      );
      toast({
        title: 'Unsubscribed',
        description: 'Subscriber has been unsubscribed.',
      });
    } catch (error) {
      console.error('Error unsubscribing:', error);
      toast({
        title: 'Error',
        description: 'Failed to unsubscribe.',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .delete()
        .eq('id', deleteId);

      if (error) throw error;

      setSubscribers(subscribers.filter((s) => s.id !== deleteId));
      toast({
        title: 'Deleted',
        description: 'Subscriber deleted permanently.',
      });
    } catch (error) {
      console.error('Error deleting:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete subscriber.',
        variant: 'destructive',
      });
    } finally {
      setDeleteId(null);
    }
  };

  const exportToCSV = () => {
    const dataToExport = selectedIds.length > 0
      ? subscribers.filter(s => selectedIds.includes(s.id))
      : subscribers;

    const headers = ['Email', 'Subscribed At', 'Source', 'Status'];
    const csvContent = [
      headers.join(','),
      ...dataToExport.map((s) =>
        [
          s.email,
          s.subscribed_at ? format(new Date(s.subscribed_at), 'yyyy-MM-dd HH:mm:ss') : '',
          s.source || '',
          s.is_active ? 'Active' : 'Unsubscribed',
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `emir-one-subscribers-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();

    toast({
      title: 'Exported',
      description: `Exported ${dataToExport.length} subscribers to CSV.`,
    });
  };

  const getSourceColor = (source: string | null) => {
    switch (source) {
      case 'Research Hub':
        return 'bg-blue-100 text-blue-700';
      case 'Industry Research':
        return 'bg-purple-100 text-purple-700';
      case 'Quarterly Report':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Newsletter Subscribers</h1>
          <p className="text-[#6B7280] mt-1">Manage your research updates mailing list</p>
        </div>
        <Button onClick={exportToCSV} className="bg-[#038C7F] hover:bg-[#027368] text-white">
          <Download className="h-4 w-4 mr-2" />
          Export to CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-[#E5E7EB]">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#111827]">{stats.total}</p>
                <p className="text-sm text-[#6B7280]">Total Subscribers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#E5E7EB]">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#111827]">{stats.thisWeek}</p>
                <p className="text-sm text-[#6B7280]">This Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#E5E7EB]">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#111827]">{stats.thisMonth}</p>
                <p className="text-sm text-[#6B7280]">This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
        <Input
          placeholder="Search by email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 border-[#E5E7EB]"
        />
      </div>

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <div className="flex items-center gap-4 p-3 bg-[#F3F4F6] rounded-lg">
          <span className="text-sm text-[#6B7280]">
            {selectedIds.length} selected
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={exportToCSV}
          >
            <Download className="h-4 w-4 mr-1" />
            Export Selected
          </Button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg border border-[#E5E7EB] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
              <tr>
                <th className="px-4 py-3 text-left">
                  <Checkbox
                    checked={selectedIds.length === filteredSubscribers.length && filteredSubscribers.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                  Subscribed
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                  Source
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-[#6B7280]">
                    Loading...
                  </td>
                </tr>
              ) : filteredSubscribers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center">
                    <div className="flex flex-col items-center">
                      <div className="h-12 w-12 rounded-full bg-[#F3F4F6] flex items-center justify-center mb-3">
                        <Mail className="h-6 w-6 text-[#9CA3AF]" />
                      </div>
                      <p className="text-[#6B7280]">No subscribers yet</p>
                      <p className="text-sm text-[#9CA3AF]">
                        Subscribers will appear here when visitors sign up
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredSubscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="px-4 py-4">
                      <Checkbox
                        checked={selectedIds.includes(subscriber.id)}
                        onCheckedChange={() => handleSelect(subscriber.id)}
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <a
                          href={`mailto:${subscriber.email}`}
                          className="font-medium text-[#111827] hover:text-[#038C7F]"
                        >
                          {subscriber.email}
                        </a>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(subscriber.email);
                            toast({ title: 'Copied to clipboard' });
                          }}
                          className="text-[#9CA3AF] hover:text-[#6B7280]"
                        >
                          📋
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-[#6B7280]">
                      {subscriber.subscribed_at
                        ? formatDistanceToNow(new Date(subscriber.subscribed_at), { addSuffix: true })
                        : '-'}
                    </td>
                    <td className="px-4 py-4">
                      {subscriber.source && (
                        <Badge className={getSourceColor(subscriber.source)}>
                          {subscriber.source}
                        </Badge>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      {subscriber.is_active ? (
                        <Badge className="bg-[#2ECC71]/10 text-[#047857] border-0">
                          <Check className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-[#E5E7EB] text-[#6B7280]">
                          <X className="h-3 w-3 mr-1" />
                          Unsubscribed
                        </Badge>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white">
                            {subscriber.is_active && (
                              <DropdownMenuItem onClick={() => handleUnsubscribe(subscriber.id)}>
                                <X className="h-4 w-4 mr-2" />
                                Unsubscribe
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => setDeleteId(subscriber.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Subscriber</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently delete this subscriber? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

export default SubscribersPage;
