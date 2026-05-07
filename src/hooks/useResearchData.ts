import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface LatestQuarterlyReport {
  id: string;
  title: string;
  quarter: string;
  year: number;
  pdf_url: string | null;
  page_count: number | null;
  sample_size_emails: number | null;
  published_date: string;
  download_count: number | null;
}

export interface FeaturedResearch {
  id: string;
  title: string;
  industry_name: string;
  quarter: string;
  slug: string;
  open_rate_range: string | null;
  reply_rate_range: string | null;
  booking_rate: string | null;
  last_updated: string | null;
}

// Hook to fetch the latest published quarterly report
export const useLatestQuarterlyReport = () => {
  return useQuery({
    queryKey: ['latestQuarterlyReport'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quarterly_reports')
        .select('id, title, quarter, year, pdf_url, page_count, sample_size_emails, published_date, download_count')
        .eq('is_published', true)
        .order('year', { ascending: false })
        .order('quarter', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data as LatestQuarterlyReport | null;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    refetchOnWindowFocus: true,
  });
};

// Hook to fetch featured (3 most recent) published industry research
export const useFeaturedResearch = () => {
  return useQuery({
    queryKey: ['featuredResearch'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('industry_research')
        .select('id, title, industry_name, quarter, slug, open_rate_range, reply_rate_range, booking_rate, last_updated')
        .eq('is_published', true)
        .order('last_updated', { ascending: false })
        .limit(3);

      if (error) throw error;
      return data as FeaturedResearch[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: true,
  });
};

// Hook to increment download count
export const useIncrementDownloadCount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reportId: string) => {
      const { data: current, error: fetchError } = await supabase
        .from('quarterly_reports')
        .select('download_count')
        .eq('id', reportId)
        .single();

      if (fetchError) throw fetchError;

      const newCount = (current?.download_count || 0) + 1;

      const { error } = await supabase
        .from('quarterly_reports')
        .update({ download_count: newCount })
        .eq('id', reportId);

      if (error) throw error;
      return newCount;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['latestQuarterlyReport'] });
    },
  });
};

// Utility to check if content is new (within specified days)
export const isNewContent = (dateString: string | null, daysThreshold: number = 30): boolean => {
  if (!dateString) return false;
  const publishDate = new Date(dateString);
  const now = new Date();
  const daysDiff = (now.getTime() - publishDate.getTime()) / (1000 * 60 * 60 * 24);
  return daysDiff <= daysThreshold;
};

// Format large numbers with commas
export const formatNumber = (num: number | null): string => {
  if (num === null || num === undefined) return '0';
  return num.toLocaleString();
};
