import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  Copy,
  MoreHorizontal,
  ExternalLink,
  Check,
  X,
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
import { formatDistanceToNow } from 'date-fns';

interface IndustryResearch {
  id: string;
  title: string;
  industry_name: string;
  quarter: string;
  slug: string;
  is_published: boolean;
  updated_at: string;
}

const IndustryResearchList: React.FC = () => {
  const [research, setResearch] = useState<IndustryResearch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchResearch = async () => {
    try {
      let query = supabase
        .from('industry_research')
        .select('id, title, industry_name, quarter, slug, is_published, updated_at')
        .order('updated_at', { ascending: false });

      if (statusFilter === 'published') {
        query = query.eq('is_published', true);
      } else if (statusFilter === 'draft') {
        query = query.eq('is_published', false);
      }

      const { data, error } = await query;

      if (error) throw error;
      setResearch(data || []);
    } catch (error) {
      console.error('Error fetching research:', error);
      toast({
        title: 'Error',
        description: 'Failed to load industry research.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResearch();
  }, [statusFilter]);

  const filteredResearch = research.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.industry_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const { error } = await supabase
        .from('industry_research')
        .delete()
        .eq('id', deleteId);

      if (error) throw error;

      setResearch(research.filter((r) => r.id !== deleteId));
      toast({
        title: 'Deleted',
        description: 'Industry research deleted successfully.',
      });
    } catch (error) {
      console.error('Error deleting research:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete industry research.',
        variant: 'destructive',
      });
    } finally {
      setDeleteId(null);
    }
  };

  const handleDuplicate = async (item: IndustryResearch) => {
    try {
      const { data: original, error: fetchError } = await supabase
        .from('industry_research')
        .select('*')
        .eq('id', item.id)
        .single();

      if (fetchError) throw fetchError;

      const { id, created_at, updated_at, ...rest } = original;
      const { error: insertError } = await supabase.from('industry_research').insert({
        ...rest,
        title: `${rest.title} (Copy)`,
        slug: `${rest.slug}-copy-${Date.now()}`,
        is_published: false,
      });

      if (insertError) throw insertError;

      fetchResearch();
      toast({
        title: 'Duplicated',
        description: 'Industry research duplicated successfully.',
      });
    } catch (error) {
      console.error('Error duplicating research:', error);
      toast({
        title: 'Error',
        description: 'Failed to duplicate industry research.',
        variant: 'destructive',
      });
    }
  };

  const togglePublish = async (item: IndustryResearch) => {
    try {
      const { error } = await supabase
        .from('industry_research')
        .update({ is_published: !item.is_published })
        .eq('id', item.id);

      if (error) throw error;

      setResearch(
        research.map((r) =>
          r.id === item.id ? { ...r, is_published: !r.is_published } : r
        )
      );
      toast({
        title: item.is_published ? 'Unpublished' : 'Published',
        description: `Industry research ${item.is_published ? 'unpublished' : 'published'} successfully.`,
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
          <h1 className="text-2xl font-bold text-[#111827]">Industry Research</h1>
          <p className="text-[#6B7280] mt-1">Manage your industry research pages</p>
        </div>
        <Link to="/admin/industry-research/new">
          <Button className="bg-[#038C7F] hover:bg-[#027368] text-white">
            <Plus className="h-4 w-4 mr-2" />
            New Research
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
          <Input
            placeholder="Search by title or industry..."
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
                  Industry
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                  Quarter
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                  Updated
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
              ) : filteredResearch.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center">
                    <div className="flex flex-col items-center">
                      <div className="h-12 w-12 rounded-full bg-[#F3F4F6] flex items-center justify-center mb-3">
                        <Search className="h-6 w-6 text-[#9CA3AF]" />
                      </div>
                      <p className="text-[#6B7280]">No industry research found</p>
                      <Link to="/admin/industry-research/new" className="mt-2">
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Create your first
                        </Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredResearch.map((item) => (
                  <tr key={item.id} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="px-4 py-4">
                      <Link
                        to={`/admin/industry-research/${item.id}`}
                        className="font-medium text-[#111827] hover:text-[#038C7F]"
                      >
                        {item.title}
                      </Link>
                    </td>
                    <td className="px-4 py-4 text-[#6B7280]">{item.industry_name}</td>
                    <td className="px-4 py-4">
                      <Badge variant="secondary" className="bg-[#F3F4F6] text-[#374151]">
                        {item.quarter}
                      </Badge>
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
                    <td className="px-4 py-4 text-sm text-[#6B7280]">
                      {formatDistanceToNow(new Date(item.updated_at), { addSuffix: true })}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => navigate(`/admin/industry-research/${item.id}`)}
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
                                window.open(`/research/industry/${item.slug}`, '_blank')
                              }
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View on Website
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDuplicate(item)}>
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicate
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
            <AlertDialogTitle>Delete Industry Research</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this industry research? This action cannot be
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

export default IndustryResearchList;
