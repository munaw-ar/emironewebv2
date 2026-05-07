import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, Loader2, Check, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface MetricsGroup {
  name: string;
  openRate: string;
  replyRate: string;
  bookingRate?: string;
}

interface FormData {
  title: string;
  industry: string;
  date_published: string;
  slug: string;
  hypothesis: string;
  test_setup: string;
  results: string;
  conclusion: string;
  next_test: string;
  sample_size: string;
  metrics: {
    groupA: MetricsGroup;
    groupB: MetricsGroup;
  };
  is_published: boolean;
}

const defaultFormData: FormData = {
  title: '',
  industry: '',
  date_published: format(new Date(), 'yyyy-MM-dd'),
  slug: '',
  hypothesis: '',
  test_setup: '',
  results: '',
  conclusion: '',
  next_test: '',
  sample_size: '',
  metrics: {
    groupA: { name: 'Group A', openRate: '', replyRate: '' },
    groupB: { name: 'Group B', openRate: '', replyRate: '' },
  },
  is_published: false,
};

const ExperimentLogForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = !!id;

  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [isLoading, setIsLoading] = useState(isEditing);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');

  useEffect(() => {
    if (isEditing) {
      fetchExperiment();
    }
  }, [id]);

  const fetchExperiment = async () => {
    try {
      const { data, error } = await supabase
        .from('experiment_logs')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      const metricsData = data.metrics as any;

      setFormData({
        title: data.title || '',
        industry: data.industry || '',
        date_published: data.date_published || format(new Date(), 'yyyy-MM-dd'),
        slug: data.slug || '',
        hypothesis: data.hypothesis || '',
        test_setup: data.test_setup || '',
        results: data.results || '',
        conclusion: data.conclusion || '',
        next_test: data.next_test || '',
        sample_size: data.sample_size || '',
        metrics: metricsData || defaultFormData.metrics,
        is_published: data.is_published || false,
      });
    } catch (error) {
      console.error('Error fetching experiment:', error);
      toast({
        title: 'Error',
        description: 'Failed to load experiment log.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      title: value,
      slug: prev.slug || generateSlug(value),
    }));
    setSaveStatus('unsaved');
  };

  const handleChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setSaveStatus('unsaved');
  };

  const handleMetricsChange = (
    group: 'groupA' | 'groupB',
    field: keyof MetricsGroup,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        [group]: {
          ...prev.metrics[group],
          [field]: value,
        },
      },
    }));
    setSaveStatus('unsaved');
  };

  const handleSave = async (publish = false) => {
    setIsSaving(true);
    setSaveStatus('saving');

    try {
      const dataToSave = {
        title: formData.title,
        industry: formData.industry,
        date_published: formData.date_published,
        slug: formData.slug || generateSlug(formData.title),
        hypothesis: formData.hypothesis,
        test_setup: formData.test_setup,
        results: formData.results,
        conclusion: formData.conclusion,
        next_test: formData.next_test,
        sample_size: formData.sample_size,
        metrics: formData.metrics as unknown as any,
        is_published: publish ? true : formData.is_published,
      };

      if (isEditing) {
        const { error } = await supabase
          .from('experiment_logs')
          .update(dataToSave)
          .eq('id', id);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('experiment_logs')
          .insert(dataToSave)
          .select()
          .single();

        if (error) throw error;
        navigate(`/admin/experiments/${data.id}`, { replace: true });
      }

      setSaveStatus('saved');
      toast({
        title: publish ? 'Published!' : 'Saved!',
        description: publish
          ? 'Experiment log published successfully.'
          : 'Experiment log saved as draft.',
      });
    } catch (error: any) {
      console.error('Error saving experiment:', error);
      setSaveStatus('unsaved');
      toast({
        title: 'Error',
        description: error.message || 'Failed to save experiment log.',
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
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/admin/experiments')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-[#111827]">
              {isEditing ? 'Edit Experiment Log' : 'New Experiment Log'}
            </h1>
            <div className="flex items-center gap-2 mt-1">
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
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => handleSave(false)}
            disabled={isSaving}
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Draft
          </Button>
          <Button
            onClick={() => handleSave(true)}
            disabled={isSaving}
            className="bg-[#038C7F] hover:bg-[#027368] text-white"
          >
            {formData.is_published ? 'Update' : 'Publish'}
          </Button>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl space-y-6">
        {/* Basic Info */}
        <Card className="border-[#E5E7EB]">
          <CardHeader>
            <CardTitle className="text-lg">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Experiment Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g., Ethical Angle vs ROI Angle in Legal Consultancies"
                className="mt-1 border-[#E5E7EB]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="industry">Industry *</Label>
                <Input
                  id="industry"
                  value={formData.industry}
                  onChange={(e) => handleChange('industry', e.target.value)}
                  placeholder="e.g., Legal Services"
                  className="mt-1 border-[#E5E7EB]"
                />
              </div>
              <div>
                <Label htmlFor="date_published">Date Published</Label>
                <Input
                  id="date_published"
                  type="date"
                  value={formData.date_published}
                  onChange={(e) => handleChange('date_published', e.target.value)}
                  className="mt-1 border-[#E5E7EB]"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="sample_size">Sample Size</Label>
              <Input
                id="sample_size"
                value={formData.sample_size}
                onChange={(e) => handleChange('sample_size', e.target.value)}
                placeholder="e.g., 300 emails (150 per group)"
                className="mt-1 border-[#E5E7EB]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Experiment Details */}
        <Card className="border-[#E5E7EB]">
          <CardHeader>
            <CardTitle className="text-lg">Experiment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Hypothesis *</Label>
              <p className="text-xs text-[#6B7280] mb-2">What did you expect to happen?</p>
              <RichTextEditor
                content={formData.hypothesis}
                onChange={(value) => handleChange('hypothesis', value)}
                placeholder="We hypothesized that..."
              />
            </div>
            <div>
              <Label>Test Setup *</Label>
              <p className="text-xs text-[#6B7280] mb-2">How did you run the test?</p>
              <RichTextEditor
                content={formData.test_setup}
                onChange={(value) => handleChange('test_setup', value)}
                placeholder="We split our sample into two groups..."
              />
            </div>
            <div>
              <Label>Results *</Label>
              <p className="text-xs text-[#6B7280] mb-2">What actually happened?</p>
              <RichTextEditor
                content={formData.results}
                onChange={(value) => handleChange('results', value)}
                placeholder="The results showed that..."
              />
            </div>
            <div>
              <Label>Conclusion *</Label>
              <p className="text-xs text-[#6B7280] mb-2">What did you learn?</p>
              <RichTextEditor
                content={formData.conclusion}
                onChange={(value) => handleChange('conclusion', value)}
                placeholder="Based on these results, we conclude..."
              />
            </div>
            <div>
              <Label>What We'll Test Next</Label>
              <p className="text-xs text-[#6B7280] mb-2">Next hypothesis (optional)</p>
              <RichTextEditor
                content={formData.next_test}
                onChange={(value) => handleChange('next_test', value)}
                placeholder="Based on these findings, we plan to test..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Metrics */}
        <Card className="border-[#E5E7EB]">
          <CardHeader>
            <CardTitle className="text-lg">Test Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Group A */}
            <div className="p-4 border border-[#E5E7EB] rounded-lg bg-blue-50/50">
              <h4 className="font-medium text-[#111827] mb-3">Group A (Control/Test)</h4>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label className="text-xs">Name</Label>
                  <Input
                    value={formData.metrics.groupA.name}
                    onChange={(e) =>
                      handleMetricsChange('groupA', 'name', e.target.value)
                    }
                    placeholder="e.g., Ethical Angle"
                    className="mt-1 h-9 text-sm border-[#E5E7EB]"
                  />
                </div>
                <div>
                  <Label className="text-xs">Open Rate</Label>
                  <Input
                    value={formData.metrics.groupA.openRate}
                    onChange={(e) =>
                      handleMetricsChange('groupA', 'openRate', e.target.value)
                    }
                    placeholder="52%"
                    className="mt-1 h-9 text-sm border-[#E5E7EB]"
                  />
                </div>
                <div>
                  <Label className="text-xs">Reply Rate</Label>
                  <Input
                    value={formData.metrics.groupA.replyRate}
                    onChange={(e) =>
                      handleMetricsChange('groupA', 'replyRate', e.target.value)
                    }
                    placeholder="7.2%"
                    className="mt-1 h-9 text-sm border-[#E5E7EB]"
                  />
                </div>
              </div>
            </div>

            {/* Group B */}
            <div className="p-4 border border-[#E5E7EB] rounded-lg bg-orange-50/50">
              <h4 className="font-medium text-[#111827] mb-3">Group B (Variant)</h4>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label className="text-xs">Name</Label>
                  <Input
                    value={formData.metrics.groupB.name}
                    onChange={(e) =>
                      handleMetricsChange('groupB', 'name', e.target.value)
                    }
                    placeholder="e.g., ROI Angle"
                    className="mt-1 h-9 text-sm border-[#E5E7EB]"
                  />
                </div>
                <div>
                  <Label className="text-xs">Open Rate</Label>
                  <Input
                    value={formData.metrics.groupB.openRate}
                    onChange={(e) =>
                      handleMetricsChange('groupB', 'openRate', e.target.value)
                    }
                    placeholder="28%"
                    className="mt-1 h-9 text-sm border-[#E5E7EB]"
                  />
                </div>
                <div>
                  <Label className="text-xs">Reply Rate</Label>
                  <Input
                    value={formData.metrics.groupB.replyRate}
                    onChange={(e) =>
                      handleMetricsChange('groupB', 'replyRate', e.target.value)
                    }
                    placeholder="1.8%"
                    className="mt-1 h-9 text-sm border-[#E5E7EB]"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Publishing Settings */}
        <Card className="border-[#E5E7EB]">
          <CardHeader>
            <CardTitle className="text-lg">Publishing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Label>Publish Status</Label>
                <p className="text-sm text-[#6B7280]">
                  {formData.is_published
                    ? 'This experiment is live on the website'
                    : 'This experiment is saved as a draft'}
                </p>
              </div>
              <Switch
                checked={formData.is_published}
                onCheckedChange={(checked) => handleChange('is_published', checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default ExperimentLogForm;
