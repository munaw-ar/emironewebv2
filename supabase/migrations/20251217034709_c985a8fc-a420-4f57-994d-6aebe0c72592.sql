-- Add indexes for faster "latest content" queries
CREATE INDEX IF NOT EXISTS idx_quarterly_reports_latest ON quarterly_reports(is_published, year DESC, quarter DESC);
CREATE INDEX IF NOT EXISTS idx_industry_research_latest ON industry_research(is_published, last_updated DESC);