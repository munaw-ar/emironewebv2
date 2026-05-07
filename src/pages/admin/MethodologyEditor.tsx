import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, Loader2, Check, Clock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { sanitizeHtml } from '@/lib/sanitize';

const MethodologyPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [content, setContent] = useState('');
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const [methodologyId, setMethodologyId] = useState<string | null>(null);

  useEffect(() => {
    fetchMethodology();
  }, []);

  const fetchMethodology = async () => {
    try {
      const { data, error } = await supabase
        .from('methodology_page')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setContent(data.content || '');
        setLastUpdated(data.last_updated);
        setMethodologyId(data.id);
      }
    } catch (error) {
      console.error('Error fetching methodology:', error);
      toast({
        title: 'Error',
        description: 'Failed to load methodology content.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleContentChange = (value: string) => {
    setContent(value);
    setSaveStatus('unsaved');
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('saving');

    try {
      const dataToSave = {
        content,
        last_updated: new Date().toISOString(),
        updated_by: 'Munawar Anjum',
      };

      if (methodologyId) {
        const { error } = await supabase
          .from('methodology_page')
          .update(dataToSave)
          .eq('id', methodologyId);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('methodology_page')
          .insert(dataToSave)
          .select()
          .single();

        if (error) throw error;
        setMethodologyId(data.id);
      }

      setLastUpdated(new Date().toISOString());
      setSaveStatus('saved');
      toast({
        title: 'Saved!',
        description: 'Methodology content saved successfully.',
      });
    } catch (error: any) {
      console.error('Error saving methodology:', error);
      setSaveStatus('unsaved');
      toast({
        title: 'Error',
        description: error.message || 'Failed to save methodology.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[#038C7F]" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Research Methodology</h1>
          <p className="text-[#6B7280] mt-1">
            Edit how you conduct research (visible to visitors)
          </p>
          <div className="flex items-center gap-2 mt-2">
            {saveStatus === 'saved' && (
              <span className="text-sm text-green-600 flex items-center gap-1">
                <Check className="h-3 w-3" />
                All changes saved
              </span>
            )}
            {saveStatus === 'saving' && (
              <span className="text-sm text-orange-600 flex items-center gap-1">
                <Loader2 className="h-3 w-3 animate-spin" />
                Saving...
              </span>
            )}
            {saveStatus === 'unsaved' && (
              <span className="text-sm text-orange-600 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Unsaved changes
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => window.open('/research/methodology', '_blank')}
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-[#038C7F] hover:bg-[#027368] text-white"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Changes
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-[#E5E7EB]">
          <CardHeader>
            <CardTitle className="text-lg">Content Editor</CardTitle>
          </CardHeader>
          <CardContent>
            <RichTextEditor
              content={content}
              onChange={handleContentChange}
              placeholder="Write your research methodology here..."
              className="min-h-[500px]"
            />
            <div className="mt-4 text-sm text-[#6B7280]">
              <p>
                Word count: {content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E5E7EB]">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Live Preview</CardTitle>
            {lastUpdated && (
              <span className="text-sm text-[#6B7280]">
                Last updated: {format(new Date(lastUpdated), 'MMM d, yyyy')}
              </span>
            )}
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none h-[500px] overflow-y-auto p-4 bg-[#F9FAFB] rounded-lg">
            {content ? (
                <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }} />
              ) : (
                <p className="text-[#9CA3AF] italic">
                  Start typing to see the preview...
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default MethodologyPage;
