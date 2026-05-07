import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  MoreHorizontal,
  ExternalLink,
  Check,
  X,
  Download,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface QuarterlyReport {
  id: string;
  title: string;
  quarter: string;
  year: number;
  published_date: string;
  slug: string;
  pdf_url: string | null;
  pdf_file_size: string | null;
  download_count: number | null;
  is_published: boolean | null;
}

const QuarterlyReportsList: React.FC = () => {
  const [reports, setReports] = useState<QuarterlyReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchReports = async () => {
    try {
      let query = supabase
        .from('quarterly_reports')
        .select('id, title, quarter, year, published_date, slug, pdf_url, pdf_file_size, download_count, is_published')
        .order('year', { ascending: false })
        .order('quarter', { ascending: false });

      if (statusFilter === 'published') {
        query = query.eq('is_published', true);
      } else if (statusFilter === 'draft') {
        query = query.eq('is_published', false);
      }

      const { data, error } = await query;

      if (error) throw error;
      setReports(data || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast({
        title: 'Error',
        description: 'Failed to load quarterly reports.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [statusFilter]);

  const filteredReports = reports.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const { error } = await supabase
        .from('quarterly_reports')
        .delete()
        .eq('id', deleteId);

      if (error) throw error;

      setReports(reports.filter((r) => r.id !== deleteId));
      toast({
        title: 'Deleted',
        description: 'Quarterly report deleted successfully.',
      });
    } catch (error) {
      console.error('Error deleting report:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete quarterly report.',
        variant: 'destructive',
      });
    } finally {
      setDeleteId(null);
    }
  };

  const togglePublish = async (item: QuarterlyReport) => {
    try {
      const { error } = await supabase
        .from('quarterly_reports')
        .update({ is_published: !item.is_published })
        .eq('id', item.id);

      if (error) throw error;

      setReports(
        reports.map((r) =>
          r.id === item.id ? { ...r, is_published: !r.is_published } : r
        )
      );
      toast({
        title: item.is_published ? 'Unpublished' : 'Published',
        description: `Quarterly report ${item.is_published ? 'unpublished' : 'published'} successfully.`,
      });
    } catch (error) {
      console.error('Error toggling publish:', error);
      toast({
        title: 'Error',
        description: 'Failed to update publish status.',
        variant: 'destructive',
      });
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
          <h1 className="text-2xl font-bold text-[#111827]">Quarterly Reports</h1>
          <p className="text-[#6B7280] mt-1">Manage your quarterly research reports</p>
        </div>
        <Link to="/admin/reports/new">
          <Button className="bg-[#038C7F] hover:bg-[#027368] text-white">
            <Plus className="h-4 w-4 mr-2" />
            New Report
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
          <Input
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-[#E5E7EB]"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px] border-[#E5E7EB]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-[#E5E7EB] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                  Quarter
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                  Downloads
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                  PDF
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
              ) : filteredReports.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center">
                    <div className="flex flex-col items-center">
                      <div className="h-12 w-12 rounded-full bg-[#F3F4F6] flex items-center justify-center mb-3">
                        <FileText className="h-6 w-6 text-[#9CA3AF]" />
                      </div>
                      <p className="text-[#6B7280]">No quarterly reports found</p>
                      <Link to="/admin/reports/new" className="mt-2">
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Create your first
                        </Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredReports.map((item) => (
                  <tr key={item.id} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="px-4 py-4">
                      <Link
                        to={`/admin/reports/${item.id}`}
                        className="font-medium text-[#111827] hover:text-[#038C7F]"
                      >
                        {item.title}
                      </Link>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant="secondary" className="bg-[#F3F4F6] text-[#374151]">
                        {item.quarter} {item.year}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 text-[#6B7280]">
                        <Download className="h-4 w-4" />
                        {item.download_count || 0}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {item.pdf_url ? (
                        <a
                          href={item.pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#038C7F] hover:underline text-sm flex items-center gap-1"
                        >
                          <FileText className="h-4 w-4" />
                          {item.pdf_file_size || 'View PDF'}
                        </a>
                      ) : (
                        <span className="text-[#9CA3AF] text-sm">No PDF</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      {item.is_published ? (
                        <Badge className="bg-[#2ECC71]/10 text-[#047857] border-0">
                          <Check className="h-3 w-3 mr-1" />
                          Published
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-[#E5E7EB] text-[#6B7280]">
                          Draft
                        </Badge>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => navigate(`/admin/reports/${item.id}`)}
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white">
                            <DropdownMenuItem
                              onClick={() =>
                                window.open(`/research/reports`, '_blank')
                              }
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View on Website
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => togglePublish(item)}>
                              {item.is_published ? (
                                <>
                                  <X className="h-4 w-4 mr-2" />
                                  Unpublish
                                </>
                              ) : (
                                <>
                                  <Check className="h-4 w-4 mr-2" />
                                  Publish
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => setDeleteId(item.id)}
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
            <AlertDialogTitle>Delete Quarterly Report</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this quarterly report? This action cannot be
              undone.
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

export default QuarterlyReportsList;
