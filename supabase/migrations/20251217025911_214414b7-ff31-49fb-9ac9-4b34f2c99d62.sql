-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create user roles table for admin access
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Admin profiles table
CREATE TABLE public.admin_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL DEFAULT 'Munawar Anjum',
  email TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Industry Research table
CREATE TABLE public.industry_research (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  industry_name TEXT NOT NULL,
  quarter TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT now(),
  sample_size TEXT,
  author TEXT DEFAULT 'Munawar Anjum',
  open_rate_range TEXT,
  reply_rate_range TEXT,
  booking_rate TEXT,
  industry_overview TEXT,
  icps_tested JSONB DEFAULT '[]'::jsonb,
  what_worked JSONB DEFAULT '[]'::jsonb,
  what_failed JSONB DEFAULT '[]'::jsonb,
  key_insights JSONB DEFAULT '[]'::jsonb,
  common_mistakes JSONB DEFAULT '[]'::jsonb,
  methodology TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.industry_research ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_industry_research_slug ON public.industry_research(slug);
CREATE INDEX idx_industry_research_published ON public.industry_research(is_published);

-- Experiment Logs table
CREATE TABLE public.experiment_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  industry TEXT NOT NULL,
  date_published DATE NOT NULL DEFAULT CURRENT_DATE,
  slug TEXT UNIQUE NOT NULL,
  hypothesis TEXT NOT NULL,
  test_setup TEXT NOT NULL,
  results TEXT NOT NULL,
  conclusion TEXT NOT NULL,
  next_test TEXT,
  sample_size TEXT,
  metrics JSONB DEFAULT '{}'::jsonb,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.experiment_logs ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_experiment_logs_slug ON public.experiment_logs(slug);
CREATE INDEX idx_experiment_logs_published ON public.experiment_logs(is_published);

-- Quarterly Reports table
CREATE TABLE public.quarterly_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  quarter TEXT NOT NULL,
  year INTEGER NOT NULL,
  published_date DATE NOT NULL DEFAULT CURRENT_DATE,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  page_count INTEGER,
  sample_size_emails INTEGER,
  sample_size_replies INTEGER,
  sample_size_meetings INTEGER,
  pdf_url TEXT,
  pdf_file_size TEXT,
  cover_image_url TEXT,
  is_published BOOLEAN DEFAULT false,
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.quarterly_reports ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_quarterly_reports_slug ON public.quarterly_reports(slug);
CREATE INDEX idx_quarterly_reports_published ON public.quarterly_reports(is_published);

-- Methodology page table (single row)
CREATE TABLE public.methodology_page (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL DEFAULT '',
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_by TEXT DEFAULT 'Munawar Anjum'
);

ALTER TABLE public.methodology_page ENABLE ROW LEVEL SECURITY;

-- Newsletter Subscribers table
CREATE TABLE public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  source TEXT,
  is_active BOOLEAN DEFAULT true,
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'::jsonb
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_subscribers_email ON public.newsletter_subscribers(email);
CREATE INDEX idx_subscribers_active ON public.newsletter_subscribers(is_active);

-- Analytics table
CREATE TABLE public.research_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type TEXT NOT NULL,
  content_id UUID,
  event_type TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
  metadata JSONB DEFAULT '{}'::jsonb
);

ALTER TABLE public.research_analytics ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_analytics_content ON public.research_analytics(content_type, content_id);
CREATE INDEX idx_analytics_timestamp ON public.research_analytics(timestamp);

-- Activity log for dashboard
CREATE TABLE public.activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  metadata JSONB DEFAULT '{}'::jsonb
);

ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- User roles: Only admins can read/write
CREATE POLICY "Admins can manage user roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Admin profiles: Only admins can read/write their own
CREATE POLICY "Admins can view own profile"
ON public.admin_profiles
FOR SELECT
TO authenticated
USING (user_id = auth.uid() AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update own profile"
ON public.admin_profiles
FOR UPDATE
TO authenticated
USING (user_id = auth.uid() AND public.has_role(auth.uid(), 'admin'));

-- Industry Research: Public read for published, admin write
CREATE POLICY "Public can view published industry research"
ON public.industry_research
FOR SELECT
TO anon, authenticated
USING (is_published = true);

CREATE POLICY "Admins can manage all industry research"
ON public.industry_research
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Experiment Logs: Public read for published, admin write
CREATE POLICY "Public can view published experiment logs"
ON public.experiment_logs
FOR SELECT
TO anon, authenticated
USING (is_published = true);

CREATE POLICY "Admins can manage all experiment logs"
ON public.experiment_logs
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Quarterly Reports: Public read for published, admin write
CREATE POLICY "Public can view published quarterly reports"
ON public.quarterly_reports
FOR SELECT
TO anon, authenticated
USING (is_published = true);

CREATE POLICY "Admins can manage all quarterly reports"
ON public.quarterly_reports
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Methodology: Public read, admin write
CREATE POLICY "Public can view methodology"
ON public.methodology_page
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admins can update methodology"
ON public.methodology_page
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Newsletter Subscribers: Public insert, admin read/write
CREATE POLICY "Anyone can subscribe"
ON public.newsletter_subscribers
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can manage subscribers"
ON public.newsletter_subscribers
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Analytics: Public insert, admin read
CREATE POLICY "Anyone can log analytics"
ON public.research_analytics
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can view analytics"
ON public.research_analytics
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Activity Log: Admin only
CREATE POLICY "Admins can manage activity log"
ON public.activity_log
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_industry_research_updated_at
  BEFORE UPDATE ON public.industry_research
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_experiment_logs_updated_at
  BEFORE UPDATE ON public.experiment_logs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_quarterly_reports_updated_at
  BEFORE UPDATE ON public.quarterly_reports
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_admin_profiles_updated_at
  BEFORE UPDATE ON public.admin_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to create admin profile and role after user signup
CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.admin_profiles (user_id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data ->> 'full_name', 'Munawar Anjum'));
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'admin');
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_admin_user();

-- Initialize methodology page with default content
INSERT INTO public.methodology_page (content)
VALUES ('# Research Methodology

Our research methodology is designed to provide actionable insights for B2B founders and revenue leaders.

## Data Collection

We collect data through real-world cold email campaigns across multiple industries.

## Sample Sizes

All sample sizes are clearly stated in each research piece. We are transparent about the limitations of our data.

## Ethical Standards

We maintain strict ethical standards in all our research and outreach practices.');

-- Create storage bucket for research files
INSERT INTO storage.buckets (id, name, public) VALUES ('research-files', 'research-files', true);

-- Storage policies for research files
CREATE POLICY "Public can view research files"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'research-files');

CREATE POLICY "Admins can upload research files"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'research-files' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update research files"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'research-files' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete research files"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'research-files' AND public.has_role(auth.uid(), 'admin'));