import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Save,
  Eye,
  ArrowLeft,
  Loader2,
  Plus,
  Trash2,
  Check,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { sanitizeHtml } from '@/lib/sanitize';
// Simple debounce function
const debounce = (fn: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

interface ICP {
  segment: string;
  titleRange: string;
  companySize: string;
  geography: string;
  sampleSize: string;
}

interface Angle {
  angleName: string;
  subjectLine: string;
  openRate: string;
  replyRate: string;
  bookingRate: string;
  whyItWorked: string;
  sampleEmail: string;
}

interface Insight {
  title: string;
  description: string;
}

interface FormData {
  title: string;
  industry_name: string;
  quarter: string;
  slug: string;
  sample_size: string;
  author: string;
  open_rate_range: string;
  reply_rate_range: string;
  booking_rate: string;
  industry_overview: string;
  icps_tested: ICP[];
  what_worked: Angle[];
  what_failed: Angle[];
  key_insights: Insight[];
  common_mistakes: string[];
  methodology: string;
  is_published: boolean;
}

const defaultFormData: FormData = {
  title: '',
  industry_name: '',
  quarter: 'Q1 2025',
  slug: '',
  sample_size: '',
  author: 'Munawar Anjum',
  open_rate_range: '',
  reply_rate_range: '',
  booking_rate: '',
  industry_overview: '',
  icps_tested: [],
  what_worked: [],
  what_failed: [],
  key_insights: [],
  common_mistakes: [],
  methodology: '',
  is_published: false,
};

const IndustryResearchForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = !!id;

  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [isLoading, setIsLoading] = useState(isEditing);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const [_lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    if (isEditing) {
      fetchResearch();
    }
  }, [id]);

  const fetchResearch = async () => {
    try {
      const { data, error } = await supabase
        .from('industry_research')
        .select('*')
        .eq('id', id!)
        .single();

      if (error) throw error;

      setFormData({
        title: data.title || '',
        industry_name: data.industry_name || '',
        quarter: data.quarter || 'Q1 2025',
        slug: data.slug || '',
        sample_size: data.sample_size || '',
        author: data.author || 'Munawar Anjum',
        open_rate_range: data.open_rate_range || '',
        reply_rate_range: data.reply_rate_range || '',
        booking_rate: data.booking_rate || '',
        industry_overview: data.industry_overview || '',
        icps_tested: (data.icps_tested as unknown as ICP[]) || [],
        what_worked: (data.what_worked as unknown as Angle[]) || [],
        what_failed: (data.what_failed as unknown as Angle[]) || [],
        key_insights: (data.key_insights as unknown as Insight[]) || [],
        common_mistakes: (data.common_mistakes as unknown as string[]) || [],
        methodology: data.methodology || '',
        is_published: data.is_published || false,
      });
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

  const handleSave = async (publish = false) => {
    setIsSaving(true);
    setSaveStatus('saving');

    try {
      const dataToSave = {
        ...formData,
        is_published: publish ? true : formData.is_published,
        slug: formData.slug || generateSlug(formData.title),
        icps_tested: formData.icps_tested as unknown as any,
        what_worked: formData.what_worked as unknown as any,
        what_failed: formData.what_failed as unknown as any,
        key_insights: formData.key_insights as unknown as any,
        common_mistakes: formData.common_mistakes as unknown as any,
      };

      if (isEditing) {
        const { error } = await supabase
          .from('industry_research')
          .update(dataToSave)
          .eq('id', id!);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('industry_research')
          .insert(dataToSave)
          .select()
          .single();

        if (error) throw error;
        navigate(`/admin/industry-research/${data.id}`, { replace: true });
      }

      setSaveStatus('saved');
      setLastSaved(new Date());
      
      if (publish && !formData.is_published) {
        // First time publishing - check if it will be featured (newest)
        const { data: newestResearch } = await supabase
          .from('industry_research')
          .select('id')
          .eq('is_published', true)
          .order('last_updated', { ascending: false })
          .limit(1)
          .maybeSingle();
        
        const isNewest = !newestResearch || newestResearch.id === (isEditing ? id : undefined);
        
        toast({
          title: '✓ Research published!',
          description: isNewest 
            ? 'This will show as the #1 featured research on the Research Hub.'
            : 'It now appears in Featured Research on the homepage.',
          action: (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('/research', '_blank')}
              className="ml-2"
            >
              Preview Homepage
            </Button>
          ),
        });
      } else {
        toast({
          title: publish ? 'Published!' : 'Saved!',
          description: publish
            ? 'Industry research updated successfully.'
            : 'Industry research saved as draft.',
        });
      }
    } catch (error: any) {
      console.error('Error saving research:', error);
      setSaveStatus('unsaved');
      toast({
        title: 'Error',
        description: error.message || 'Failed to save industry research.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Auto-save
  const debouncedSave = useCallback(
    debounce(() => {
      if (isEditing && saveStatus === 'unsaved') {
        handleSave();
      }
    }, 30000),
    [isEditing, saveStatus, formData]
  );

  useEffect(() => {
    if (saveStatus === 'unsaved') {
      debouncedSave();
    }
  }, [formData, saveStatus]);

  // ICP Management
  const addICP = () => {
    setFormData((prev) => ({
      ...prev,
      icps_tested: [
        ...prev.icps_tested,
        { segment: '', titleRange: '', companySize: '', geography: '', sampleSize: '' },
      ],
    }));
    setSaveStatus('unsaved');
  };

  const updateICP = (index: number, field: keyof ICP, value: string) => {
    const updated = [...formData.icps_tested];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, icps_tested: updated }));
    setSaveStatus('unsaved');
  };

  const removeICP = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      icps_tested: prev.icps_tested.filter((_, i) => i !== index),
    }));
    setSaveStatus('unsaved');
  };

  // Angle Management
  const addAngle = (type: 'what_worked' | 'what_failed') => {
    const newAngle: Angle = {
      angleName: '',
      subjectLine: '',
      openRate: '',
      replyRate: '',
      bookingRate: '',
      whyItWorked: '',
      sampleEmail: '',
    };
    setFormData((prev) => ({
      ...prev,
      [type]: [...prev[type], newAngle],
    }));
    setSaveStatus('unsaved');
  };

  const updateAngle = (
    type: 'what_worked' | 'what_failed',
    index: number,
    field: keyof Angle,
    value: string
  ) => {
    const updated = [...formData[type]];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, [type]: updated }));
    setSaveStatus('unsaved');
  };

  const removeAngle = (type: 'what_worked' | 'what_failed', index: number) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
    setSaveStatus('unsaved');
  };

  // Insight Management
  const addInsight = () => {
    setFormData((prev) => ({
      ...prev,
      key_insights: [...prev.key_insights, { title: '', description: '' }],
    }));
    setSaveStatus('unsaved');
  };

  const updateInsight = (index: number, field: keyof Insight, value: string) => {
    const updated = [...formData.key_insights];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, key_insights: updated }));
    setSaveStatus('unsaved');
  };

  const removeInsight = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      key_insights: prev.key_insights.filter((_, i) => i !== index),
    }));
    setSaveStatus('unsaved');
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
          <Button
            variant="ghost"
            onClick={() => navigate('/admin/industry-research')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-[#111827]">
              {isEditing ? 'Edit Industry Research' : 'New Industry Research'}
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Form */}
        <div className="space-y-6">
          {/* Basic Info */}
          <Card className="border-[#E5E7EB]">
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Research Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g., Cold Email GTM in B2B Compliance & Advisory Firms"
                  className="mt-1 border-[#E5E7EB]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="industry_name">Industry Name *</Label>
                  <Input
                    id="industry_name"
                    value={formData.industry_name}
                    onChange={(e) => handleChange('industry_name', e.target.value)}
                    placeholder="e.g., B2B Compliance & Advisory"
                    className="mt-1 border-[#E5E7EB]"
                  />
                </div>
                <div>
                  <Label htmlFor="quarter">Quarter *</Label>
                  <Input
                    id="quarter"
                    value={formData.quarter}
                    onChange={(e) => handleChange('quarter', e.target.value)}
                    placeholder="e.g., Q4 2024"
                    className="mt-1 border-[#E5E7EB]"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleChange('slug', e.target.value)}
                  placeholder="auto-generated-from-title"
                  className="mt-1 border-[#E5E7EB]"
                />
                <p className="text-xs text-[#6B7280] mt-1">
                  URL: /research/industry/{formData.slug || 'your-slug'}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sample_size">Sample Size</Label>
                  <Input
                    id="sample_size"
                    value={formData.sample_size}
                    onChange={(e) => handleChange('sample_size', e.target.value)}
                    placeholder="e.g., 2,400 emails sent"
                    className="mt-1 border-[#E5E7EB]"
                  />
                </div>
                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => handleChange('author', e.target.value)}
                    placeholder="Munawar Anjum"
                    className="mt-1 border-[#E5E7EB]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Metrics */}
          <Card className="border-[#E5E7EB]">
            <CardHeader>
              <CardTitle className="text-lg">Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="open_rate">Open Rate Range</Label>
                  <Input
                    id="open_rate"
                    value={formData.open_rate_range}
                    onChange={(e) => handleChange('open_rate_range', e.target.value)}
                    placeholder="38-52%"
                    className="mt-1 border-[#E5E7EB]"
                  />
                </div>
                <div>
                  <Label htmlFor="reply_rate">Reply Rate Range</Label>
                  <Input
                    id="reply_rate"
                    value={formData.reply_rate_range}
                    onChange={(e) => handleChange('reply_rate_range', e.target.value)}
                    placeholder="4.2-7.8%"
                    className="mt-1 border-[#E5E7EB]"
                  />
                </div>
                <div>
                  <Label htmlFor="booking_rate">Booking Rate</Label>
                  <Input
                    id="booking_rate"
                    value={formData.booking_rate}
                    onChange={(e) => handleChange('booking_rate', e.target.value)}
                    placeholder="1.2-2.4%"
                    className="mt-1 border-[#E5E7EB]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Industry Overview */}
          <Card className="border-[#E5E7EB]">
            <CardHeader>
              <CardTitle className="text-lg">Industry Context</CardTitle>
            </CardHeader>
            <CardContent>
              <RichTextEditor
                content={formData.industry_overview}
                onChange={(value) => handleChange('industry_overview', value)}
                placeholder="Describe the industry, buyer personas, pain points..."
              />
            </CardContent>
          </Card>

          {/* ICPs Tested */}
          <Card className="border-[#E5E7EB]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Target Profiles Tested</CardTitle>
              <Button variant="outline" size="sm" onClick={addICP}>
                <Plus className="h-4 w-4 mr-1" />
                Add Profile
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.icps_tested.length === 0 ? (
                <p className="text-sm text-[#6B7280] text-center py-4">
                  No profiles added yet. Click "Add Profile" to start.
                </p>
              ) : (
                formData.icps_tested.map((icp, index) => (
                  <div
                    key={index}
                    className="p-4 border border-[#E5E7EB] rounded-lg space-y-3 relative"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 text-red-500 hover:text-red-700"
                      onClick={() => removeICP(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs">Segment</Label>
                        <Input
                          value={icp.segment}
                          onChange={(e) => updateICP(index, 'segment', e.target.value)}
                          placeholder="e.g., Compliance Leaders"
                          className="mt-1 h-9 text-sm border-[#E5E7EB]"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Title Range</Label>
                        <Input
                          value={icp.titleRange}
                          onChange={(e) => updateICP(index, 'titleRange', e.target.value)}
                          placeholder="e.g., Head of Compliance, CCO"
                          className="mt-1 h-9 text-sm border-[#E5E7EB]"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Company Size</Label>
                        <Input
                          value={icp.companySize}
                          onChange={(e) => updateICP(index, 'companySize', e.target.value)}
                          placeholder="e.g., 50-500 employees"
                          className="mt-1 h-9 text-sm border-[#E5E7EB]"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Geography</Label>
                        <Input
                          value={icp.geography}
                          onChange={(e) => updateICP(index, 'geography', e.target.value)}
                          placeholder="e.g., US, UK"
                          className="mt-1 h-9 text-sm border-[#E5E7EB]"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs">Sample Size</Label>
                      <Input
                        value={icp.sampleSize}
                        onChange={(e) => updateICP(index, 'sampleSize', e.target.value)}
                        placeholder="e.g., n=180"
                        className="mt-1 h-9 text-sm border-[#E5E7EB]"
                      />
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* What Worked */}
          <Card className="border-[#E5E7EB]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Messaging Angles That Worked</CardTitle>
              <Button variant="outline" size="sm" onClick={() => addAngle('what_worked')}>
                <Plus className="h-4 w-4 mr-1" />
                Add Angle
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.what_worked.length === 0 ? (
                <p className="text-sm text-[#6B7280] text-center py-4">
                  No angles added yet. Click "Add Angle" to start.
                </p>
              ) : (
                formData.what_worked.map((angle, index) => (
                  <div
                    key={index}
                    className="p-4 border border-[#E5E7EB] rounded-lg space-y-3 relative bg-green-50/50"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 text-red-500 hover:text-red-700"
                      onClick={() => removeAngle('what_worked', index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs">Angle Name</Label>
                        <Input
                          value={angle.angleName}
                          onChange={(e) =>
                            updateAngle('what_worked', index, 'angleName', e.target.value)
                          }
                          placeholder="e.g., Problem-First (Compliance Gap)"
                          className="mt-1 h-9 text-sm border-[#E5E7EB]"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Subject Line</Label>
                        <Input
                          value={angle.subjectLine}
                          onChange={(e) =>
                            updateAngle('what_worked', index, 'subjectLine', e.target.value)
                          }
                          placeholder="Quick question about [Company]'s..."
                          className="mt-1 h-9 text-sm border-[#E5E7EB]"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <Label className="text-xs">Open Rate</Label>
                        <Input
                          value={angle.openRate}
                          onChange={(e) =>
                            updateAngle('what_worked', index, 'openRate', e.target.value)
                          }
                          placeholder="52%"
                          className="mt-1 h-9 text-sm border-[#E5E7EB]"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Reply Rate</Label>
                        <Input
                          value={angle.replyRate}
                          onChange={(e) =>
                            updateAngle('what_worked', index, 'replyRate', e.target.value)
                          }
                          placeholder="7.8%"
                          className="mt-1 h-9 text-sm border-[#E5E7EB]"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Booking Rate</Label>
                        <Input
                          value={angle.bookingRate}
                          onChange={(e) =>
                            updateAngle('what_worked', index, 'bookingRate', e.target.value)
                          }
                          placeholder="2.4%"
                          className="mt-1 h-9 text-sm border-[#E5E7EB]"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs">Why It Worked</Label>
                      <Textarea
                        value={angle.whyItWorked}
                        onChange={(e) =>
                          updateAngle('what_worked', index, 'whyItWorked', e.target.value)
                        }
                        placeholder="Explain why this angle was effective..."
                        className="mt-1 text-sm border-[#E5E7EB]"
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Sample Email</Label>
                      <Textarea
                        value={angle.sampleEmail}
                        onChange={(e) =>
                          updateAngle('what_worked', index, 'sampleEmail', e.target.value)
                        }
                        placeholder="Paste the actual email text here..."
                        className="mt-1 text-sm border-[#E5E7EB] font-mono"
                        rows={4}
                      />
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* What Failed */}
          <Card className="border-[#E5E7EB]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Messaging Angles That Failed</CardTitle>
              <Button variant="outline" size="sm" onClick={() => addAngle('what_failed')}>
                <Plus className="h-4 w-4 mr-1" />
                Add Angle
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.what_failed.length === 0 ? (
                <p className="text-sm text-[#6B7280] text-center py-4">
                  No angles added yet. Click "Add Angle" to start.
                </p>
              ) : (
                formData.what_failed.map((angle, index) => (
                  <div
                    key={index}
                    className="p-4 border border-[#E5E7EB] rounded-lg space-y-3 relative bg-red-50/50"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 text-red-500 hover:text-red-700"
                      onClick={() => removeAngle('what_failed', index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs">Angle Name</Label>
                        <Input
                          value={angle.angleName}
                          onChange={(e) =>
                            updateAngle('what_failed', index, 'angleName', e.target.value)
                          }
                          placeholder="e.g., Generic ROI Pitch"
                          className="mt-1 h-9 text-sm border-[#E5E7EB]"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Subject Line</Label>
                        <Input
                          value={angle.subjectLine}
                          onChange={(e) =>
                            updateAngle('what_failed', index, 'subjectLine', e.target.value)
                          }
                          placeholder="Subject line used..."
                          className="mt-1 h-9 text-sm border-[#E5E7EB]"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <Label className="text-xs">Open Rate</Label>
                        <Input
                          value={angle.openRate}
                          onChange={(e) =>
                            updateAngle('what_failed', index, 'openRate', e.target.value)
                          }
                          placeholder="28%"
                          className="mt-1 h-9 text-sm border-[#E5E7EB]"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Reply Rate</Label>
                        <Input
                          value={angle.replyRate}
                          onChange={(e) =>
                            updateAngle('what_failed', index, 'replyRate', e.target.value)
                          }
                          placeholder="1.8%"
                          className="mt-1 h-9 text-sm border-[#E5E7EB]"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Booking Rate</Label>
                        <Input
                          value={angle.bookingRate}
                          onChange={(e) =>
                            updateAngle('what_failed', index, 'bookingRate', e.target.value)
                          }
                          placeholder="0.4%"
                          className="mt-1 h-9 text-sm border-[#E5E7EB]"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs">Why It Failed</Label>
                      <Textarea
                        value={angle.whyItWorked}
                        onChange={(e) =>
                          updateAngle('what_failed', index, 'whyItWorked', e.target.value)
                        }
                        placeholder="Explain why this angle didn't work..."
                        className="mt-1 text-sm border-[#E5E7EB]"
                        rows={2}
                      />
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Key Insights */}
          <Card className="border-[#E5E7EB]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Key Insights</CardTitle>
              <Button variant="outline" size="sm" onClick={addInsight}>
                <Plus className="h-4 w-4 mr-1" />
                Add Insight
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.key_insights.length === 0 ? (
                <p className="text-sm text-[#6B7280] text-center py-4">
                  No insights added yet. Click "Add Insight" to start.
                </p>
              ) : (
                formData.key_insights.map((insight, index) => (
                  <div
                    key={index}
                    className="p-4 border border-[#E5E7EB] rounded-lg space-y-3 relative"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 text-red-500 hover:text-red-700"
                      onClick={() => removeInsight(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div>
                      <Label className="text-xs">Insight Title</Label>
                      <Input
                        value={insight.title}
                        onChange={(e) => updateInsight(index, 'title', e.target.value)}
                        placeholder="e.g., Personalization depth matters less than relevance"
                        className="mt-1 h-9 text-sm border-[#E5E7EB]"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Description</Label>
                      <Textarea
                        value={insight.description}
                        onChange={(e) => updateInsight(index, 'description', e.target.value)}
                        placeholder="Detailed explanation of the insight..."
                        className="mt-1 text-sm border-[#E5E7EB]"
                        rows={3}
                      />
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Methodology */}
          <Card className="border-[#E5E7EB]">
            <CardHeader>
              <CardTitle className="text-lg">Methodology & Limitations</CardTitle>
            </CardHeader>
            <CardContent>
              <RichTextEditor
                content={formData.methodology}
                onChange={(value) => handleChange('methodology', value)}
                placeholder="Describe how you conducted the research, limitations, data sources..."
              />
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
                      ? 'This research is live on the website'
                      : 'This research is saved as a draft'}
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

        {/* Right Column - Preview */}
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <Card className="border-[#E5E7EB]">
              <CardHeader className="border-b border-[#E5E7EB]">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Live Preview</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      window.open(`/research/industry/${formData.slug}`, '_blank')
                    }
                    disabled={!formData.slug}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Full Page
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0 h-[600px] overflow-y-auto">
                <div className="p-6 prose prose-sm max-w-none">
                  <h1 className="text-xl font-bold text-[#111827] mb-2">
                    {formData.title || 'Untitled Research'}
                  </h1>
                  <p className="text-sm text-[#6B7280] mb-4">
                    {formData.industry_name} • {formData.quarter} • {formData.sample_size}
                  </p>
                  <div className="flex gap-4 mb-6">
                    <div className="text-center p-3 bg-[#F3F4F6] rounded-lg">
                      <p className="text-lg font-bold text-[#038C7F]">
                        {formData.open_rate_range || '--'}
                      </p>
                      <p className="text-xs text-[#6B7280]">Open Rate</p>
                    </div>
                    <div className="text-center p-3 bg-[#F3F4F6] rounded-lg">
                      <p className="text-lg font-bold text-[#038C7F]">
                        {formData.reply_rate_range || '--'}
                      </p>
                      <p className="text-xs text-[#6B7280]">Reply Rate</p>
                    </div>
                    <div className="text-center p-3 bg-[#F3F4F6] rounded-lg">
                      <p className="text-lg font-bold text-[#038C7F]">
                        {formData.booking_rate || '--'}
                      </p>
                      <p className="text-xs text-[#6B7280]">Booking Rate</p>
                    </div>
                  </div>
                  {formData.industry_overview && (
                    <div
                      className="mb-6"
                      dangerouslySetInnerHTML={{ __html: sanitizeHtml(formData.industry_overview) }}
                    />
                  )}
                  {formData.icps_tested.length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold mb-2">Profiles Tested</h2>
                      <ul className="text-sm space-y-1">
                        {formData.icps_tested.map((icp, i) => (
                          <li key={i}>
                            {icp.segment}: {icp.titleRange} ({icp.sampleSize})
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default IndustryResearchForm;
