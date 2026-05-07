import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Save,
  ArrowLeft,
  Loader2,
  Check,
  Clock,
  Upload,
  FileText,
  X,
  Image,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface FormData {
  title: string;
  quarter: string;
  year: number;
  published_date: string;
  slug: string;
  description: string;
  page_count: number | null;
  sample_size_emails: number | null;
  sample_size_replies: number | null;
  sample_size_meetings: number | null;
  pdf_url: string;
  pdf_file_size: string;
  cover_image_url: string;
  is_published: boolean;
}

const defaultFormData: FormData = {
  title: '',
  quarter: 'Q1',
  year: new Date().getFullYear(),
  published_date: format(new Date(), 'yyyy-MM-dd'),
  slug: '',
  description: '',
  page_count: null,
  sample_size_emails: null,
  sample_size_replies: null,
  sample_size_meetings: null,
  pdf_url: '',
  pdf_file_size: '',
  cover_image_url: '',
  is_published: false,
};

const QuarterlyReportForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = !!id;

  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [isLoading, setIsLoading] = useState(isEditing);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (isEditing) {
      fetchReport();
    }
  }, [id]);

  const fetchReport = async () => {
    try {
      const { data, error } = await supabase
        .from('quarterly_reports')
        .select('*')
        .eq('id', id!)
        .single();

      if (error) throw error;

      setFormData({
        title: data.title || '',
        quarter: data.quarter || 'Q1',
        year: data.year || new Date().getFullYear(),
        published_date: data.published_date || format(new Date(), 'yyyy-MM-dd'),
        slug: data.slug || '',
        description: data.description || '',
        page_count: data.page_count,
        sample_size_emails: data.sample_size_emails,
        sample_size_replies: data.sample_size_replies,
        sample_size_meetings: data.sample_size_meetings,
        pdf_url: data.pdf_url || '',
        pdf_file_size: data.pdf_file_size || '',
        cover_image_url: data.cover_image_url || '',
        is_published: data.is_published || false,
      });
    } catch (error) {
      console.error('Error fetching report:', error);
      toast({
        title: 'Error',
        description: 'Failed to load quarterly report.',
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

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const handleFileUpload = async (file: File, type: 'pdf' | 'image') => {
    if (type === 'pdf' && file.type !== 'application/pdf') {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a PDF file.',
        variant: 'destructive',
      });
      return;
    }

    if (type === 'image' && !file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload an image file.',
        variant: 'destructive',
      });
      return;
    }

    const maxSize = type === 'pdf' ? 50 * 1024 * 1024 : 5 * 1024 * 1024; // 50MB for PDF, 5MB for image
    if (file.size > maxSize) {
      toast({
        title: 'File too large',
        description: `Maximum file size is ${type === 'pdf' ? '50' : '5'} MB.`,
        variant: 'destructive',
      });
      return;
    }

    type === 'pdf' ? setIsUploading(true) : setIsUploadingImage(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = type === 'pdf' ? `reports/${fileName}` : `covers/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('research-files')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('research-files')
        .getPublicUrl(filePath);

      if (type === 'pdf') {
        setFormData((prev) => ({
          ...prev,
          pdf_url: publicUrl,
          pdf_file_size: formatFileSize(file.size),
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          cover_image_url: publicUrl,
        }));
      }

      setSaveStatus('unsaved');
      toast({
        title: 'Uploaded',
        description: `${type === 'pdf' ? 'PDF' : 'Cover image'} uploaded successfully.`,
      });
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload failed',
        description: error.message || 'Failed to upload file.',
        variant: 'destructive',
      });
    } finally {
      type === 'pdf' ? setIsUploading(false) : setIsUploadingImage(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        handleFileUpload(file, 'pdf');
      }
    }
  };

  const removePdf = () => {
    setFormData((prev) => ({
      ...prev,
      pdf_url: '',
      pdf_file_size: '',
    }));
    setSaveStatus('unsaved');
  };

  const removeCoverImage = () => {
    setFormData((prev) => ({
      ...prev,
      cover_image_url: '',
    }));
    setSaveStatus('unsaved');
  };

  const handleSave = async (publish = false) => {
    setIsSaving(true);
    setSaveStatus('saving');

    try {
      const dataToSave = {
        title: formData.title,
        quarter: formData.quarter,
        year: formData.year,
        published_date: formData.published_date,
        slug: formData.slug || generateSlug(formData.title),
        description: formData.description,
        page_count: formData.page_count,
        sample_size_emails: formData.sample_size_emails,
        sample_size_replies: formData.sample_size_replies,
        sample_size_meetings: formData.sample_size_meetings,
        pdf_url: formData.pdf_url,
        pdf_file_size: formData.pdf_file_size,
        cover_image_url: formData.cover_image_url,
        is_published: publish ? true : formData.is_published,
      };

      if (isEditing) {
        const { error } = await supabase
          .from('quarterly_reports')
          .update(dataToSave)
          .eq('id', id!);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('quarterly_reports')
          .insert(dataToSave)
          .select()
          .single();

        if (error) throw error;
        navigate(`/admin/reports/${data.id}`, { replace: true });
      }

      setSaveStatus('saved');
      
      if (publish && !formData.is_published) {
        // First time publishing - show enhanced toast
        toast({
          title: '✓ Report published!',
          description: `${dataToSave.quarter} ${dataToSave.year} is now the featured report on the Research Hub homepage.`,
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
            ? 'Quarterly report updated successfully.'
            : 'Quarterly report saved as draft.',
        });
      }
    } catch (error: any) {
      console.error('Error saving report:', error);
      setSaveStatus('unsaved');
      toast({
        title: 'Error',
        description: error.message || 'Failed to save quarterly report.',
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
          <Button variant="ghost" onClick={() => navigate('/admin/reports')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-[#111827]">
              {isEditing ? 'Edit Quarterly Report' : 'New Quarterly Report'}
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
              <Label htmlFor="title">Report Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g., Q4 2024 Outbound Reality Report"
                className="mt-1 border-[#E5E7EB]"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="quarter">Quarter *</Label>
                <select
                  id="quarter"
                  value={formData.quarter}
                  onChange={(e) => handleChange('quarter', e.target.value)}
                  className="mt-1 w-full h-10 px-3 border border-[#E5E7EB] rounded-md bg-white text-sm"
                >
                  <option value="Q1">Q1</option>
                  <option value="Q2">Q2</option>
                  <option value="Q3">Q3</option>
                  <option value="Q4">Q4</option>
                </select>
              </div>
              <div>
                <Label htmlFor="year">Year *</Label>
                <Input
                  id="year"
                  type="number"
                  value={formData.year}
                  onChange={(e) => handleChange('year', parseInt(e.target.value))}
                  className="mt-1 border-[#E5E7EB]"
                />
              </div>
              <div>
                <Label htmlFor="published_date">Published Date</Label>
                <Input
                  id="published_date"
                  type="date"
                  value={formData.published_date}
                  onChange={(e) => handleChange('published_date', e.target.value)}
                  className="mt-1 border-[#E5E7EB]"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="What's inside this report..."
                className="mt-1 border-[#E5E7EB]"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="page_count">Page Count</Label>
              <Input
                id="page_count"
                type="number"
                value={formData.page_count || ''}
                onChange={(e) => handleChange('page_count', e.target.value ? parseInt(e.target.value) : null)}
                placeholder="e.g., 28"
                className="mt-1 border-[#E5E7EB] w-32"
              />
            </div>
          </CardContent>
        </Card>

        {/* Sample Sizes */}
        <Card className="border-[#E5E7EB]">
          <CardHeader>
            <CardTitle className="text-lg">Sample Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="emails">Emails Sent</Label>
                <Input
                  id="emails"
                  type="number"
                  value={formData.sample_size_emails || ''}
                  onChange={(e) => handleChange('sample_size_emails', e.target.value ? parseInt(e.target.value) : null)}
                  placeholder="e.g., 12400"
                  className="mt-1 border-[#E5E7EB]"
                />
              </div>
              <div>
                <Label htmlFor="replies">Replies</Label>
                <Input
                  id="replies"
                  type="number"
                  value={formData.sample_size_replies || ''}
                  onChange={(e) => handleChange('sample_size_replies', e.target.value ? parseInt(e.target.value) : null)}
                  placeholder="e.g., 847"
                  className="mt-1 border-[#E5E7EB]"
                />
              </div>
              <div>
                <Label htmlFor="meetings">Meetings Booked</Label>
                <Input
                  id="meetings"
                  type="number"
                  value={formData.sample_size_meetings || ''}
                  onChange={(e) => handleChange('sample_size_meetings', e.target.value ? parseInt(e.target.value) : null)}
                  placeholder="e.g., 94"
                  className="mt-1 border-[#E5E7EB]"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* PDF Upload */}
        <Card className="border-[#E5E7EB]">
          <CardHeader>
            <CardTitle className="text-lg">Upload Report PDF</CardTitle>
          </CardHeader>
          <CardContent>
            {formData.pdf_url ? (
              <div className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <FileText className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-[#111827]">PDF Uploaded</p>
                    <p className="text-sm text-[#6B7280]">{formData.pdf_file_size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={formData.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#038C7F] hover:underline text-sm"
                  >
                    View
                  </a>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={removePdf}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? 'border-[#038C7F] bg-[#038C7F]/5'
                    : 'border-[#E5E7EB] hover:border-[#038C7F]'
                }`}
              >
                {isUploading ? (
                  <div className="flex flex-col items-center">
                    <Loader2 className="h-10 w-10 animate-spin text-[#038C7F] mb-3" />
                    <p className="text-[#6B7280]">Uploading...</p>
                  </div>
                ) : (
                  <>
                    <Upload className="h-10 w-10 text-[#9CA3AF] mx-auto mb-3" />
                    <p className="text-[#111827] font-medium mb-1">
                      Drag and drop PDF here
                    </p>
                    <p className="text-sm text-[#6B7280] mb-3">or click to browse</p>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'pdf')}
                      className="hidden"
                      id="pdf-upload"
                    />
                    <label htmlFor="pdf-upload">
                      <Button variant="outline" size="sm" asChild>
                        <span>Choose File</span>
                      </Button>
                    </label>
                    <p className="text-xs text-[#9CA3AF] mt-2">Max file size: 50 MB</p>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Cover Image */}
        <Card className="border-[#E5E7EB]">
          <CardHeader>
            <CardTitle className="text-lg">Cover Image (Optional)</CardTitle>
          </CardHeader>
          <CardContent>
            {formData.cover_image_url ? (
              <div className="relative">
                <img
                  src={formData.cover_image_url}
                  alt="Cover"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={removeCoverImage}
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-[#E5E7EB] rounded-lg p-6 text-center">
                {isUploadingImage ? (
                  <Loader2 className="h-8 w-8 animate-spin text-[#038C7F] mx-auto" />
                ) : (
                  <>
                    <Image className="h-8 w-8 text-[#9CA3AF] mx-auto mb-2" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'image')}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload">
                      <Button variant="outline" size="sm" asChild>
                        <span>Upload Cover Image</span>
                      </Button>
                    </label>
                    <p className="text-xs text-[#9CA3AF] mt-2">Max: 5 MB (JPG, PNG, WebP)</p>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Publishing */}
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
                    ? 'This report is live on the website'
                    : 'This report is saved as a draft'}
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

export default QuarterlyReportForm;
