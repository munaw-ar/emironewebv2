import { useEffect, useState, memo } from "react";
import { motion } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ChevronRight, Calendar, User, Database, Linkedin, Twitter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/research/StatCard";
import DataTable from "@/components/research/DataTable";
import TableOfContents from "@/components/research/TableOfContents";
import SubscribeWidget from "@/components/research/SubscribeWidget";
import BackToTop from "@/components/research/BackToTop";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { sanitizeHtml } from "@/lib/sanitize";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

interface IndustryResearchData {
  id: string;
  title: string;
  industry_name: string;
  slug: string;
  quarter: string;
  author: string | null;
  sample_size: string | null;
  open_rate_range: string | null;
  reply_rate_range: string | null;
  booking_rate: string | null;
  industry_overview: string | null;
  methodology: string | null;
  icps_tested: unknown;
  what_worked: unknown;
  what_failed: unknown;
  key_insights: unknown;
  common_mistakes: unknown;
  last_updated: string | null;
}

// Memoized result card for performance
const ResultCard = memo(({ item, type }: { item: any; type: 'success' | 'failure' }) => {
  const bgColor = type === 'success' ? 'border-[#2ECC71]/30 bg-[#2ECC71]/5' : 'border-[#E74C3C]/30 bg-[#E74C3C]/5';
  
  return (
    <div className={`p-4 sm:p-6 rounded-xl border ${bgColor}`}>
      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">{item.title}</h3>
      {item.subjectLine && (
        <p className="text-xs sm:text-sm text-muted-foreground mb-2 break-words">
          <span className="font-medium">Subject:</span> {item.subjectLine}
        </p>
      )}
      {item.explanation && (
        <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">{item.explanation}</p>
      )}
      <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm">
        {item.openRate && <span>Open: <strong>{item.openRate}</strong></span>}
        {item.replyRate && <span>Reply: <strong>{item.replyRate}</strong></span>}
        {item.meetingRate && <span>Meeting: <strong>{item.meetingRate}</strong></span>}
      </div>
    </div>
  );
});

ResultCard.displayName = 'ResultCard';

const IndustryResearch = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [research, setResearch] = useState<IndustryResearchData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchResearch = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        const { data, error: fetchError } = await supabase
          .from("industry_research")
          .select("*")
          .eq("slug", slug)
          .eq("is_published", true)
          .maybeSingle();

        if (!mounted) return;

        if (fetchError) {
          setError(fetchError.message);
        } else if (data) {
          setResearch(data);
        }
      } catch (err: any) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    // Small delay for mobile stability
    const timer = setTimeout(fetchResearch, 50);
    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [slug]);

  // Simplified animation variants for mobile
  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  const tocItems = [
    { id: "overview", title: "Industry Context" },
    { id: "icps-tested", title: "Target Profiles" },
    { id: "what-worked", title: "What Worked" },
    { id: "what-failed", title: "What Failed" },
    { id: "insights", title: "Key Insights" },
    { id: "mistakes", title: "Common Mistakes" },
    { id: "methodology", title: "Methodology" },
  ];

  const icpColumns = [
    { key: "segment", header: "Segment" },
    { key: "titleRange", header: "Title" },
    { key: "companySize", header: "Size" },
    { key: "geography", header: "Geo" },
    { key: "sampleSize", header: "N", isNumeric: true },
  ];

  const shareUrl = encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '');
  const shareTitle = encodeURIComponent(research?.title || "Cold Email GTM Research");

  // Loading state - mobile optimized
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-primary mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Loading research...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-3 text-center">Something went wrong</h1>
        <p className="text-sm sm:text-base text-muted-foreground mb-6 text-center">{error}</p>
        <Button variant="outline" onClick={() => window.location.reload()} className="touch-target">
          Try Again
        </Button>
      </div>
    );
  }

  // Not found state
  if (!research) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-3 text-center">Research Not Found</h1>
        <p className="text-sm sm:text-base text-muted-foreground mb-6 text-center">This report doesn't exist or hasn't been published yet.</p>
        <Link to="/research/industry">
          <Button variant="outline" className="touch-target">Back to Industry Research</Button>
        </Link>
      </div>
    );
  }

  const icpsData = Array.isArray(research.icps_tested) ? research.icps_tested : [];
  const whatWorked = Array.isArray(research.what_worked) ? research.what_worked : [];
  const whatFailed = Array.isArray(research.what_failed) ? research.what_failed : [];
  const keyInsights = Array.isArray(research.key_insights) ? research.key_insights : [];
  const commonMistakes = Array.isArray(research.common_mistakes) ? research.common_mistakes : [];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container-wide pt-28 md:pt-36 pb-6 sm:pb-8 md:pb-12">
        <div className="flex gap-8 lg:gap-12">
          {/* Sidebar TOC - Desktop only */}
          <aside className="hidden lg:block w-64 shrink-0">
            <TableOfContents items={tocItems} />
            <div className="mt-8">
              <SubscribeWidget />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0 max-w-4xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
              }}
            >
              {/* Breadcrumb - hidden on small mobile */}
              <motion.nav variants={itemVariants} className="hidden sm:flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 flex-wrap">
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                <ChevronRight size={12} className="sm:w-3.5 sm:h-3.5" />
                <Link to="/research" className="hover:text-primary transition-colors">Research</Link>
                <ChevronRight size={12} className="sm:w-3.5 sm:h-3.5" />
                <Link to="/research/industry" className="hover:text-primary transition-colors">Industry</Link>
                <ChevronRight size={12} className="sm:w-3.5 sm:h-3.5" />
                <span className="text-foreground truncate max-w-[120px]">{research.industry_name}</span>
              </motion.nav>

              {/* Page Header */}
              <motion.div variants={itemVariants} className="mb-6 sm:mb-10">
                <h1 className="text-xl sm:text-2xl md:text-heading-1 font-bold text-foreground mb-2 leading-tight">
                  {research.title}
                </h1>
                <p className="text-base sm:text-lg md:text-heading-4 text-muted-foreground mb-4 sm:mb-6">{research.quarter}</p>
                
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground pb-4 sm:pb-6 border-b border-border/30">
                  {research.last_updated && (
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} className="sm:w-3.5 sm:h-3.5" />
                      {format(new Date(research.last_updated), "MMM d, yyyy")}
                    </span>
                  )}
                  {research.sample_size && (
                    <span className="flex items-center gap-1.5">
                      <Database size={12} className="sm:w-3.5 sm:h-3.5" />
                      n={research.sample_size}
                    </span>
                  )}
                  {research.author && (
                    <span className="flex items-center gap-1.5">
                      <User size={12} className="sm:w-3.5 sm:h-3.5" />
                      {research.author}
                    </span>
                  )}
                </div>

                {/* Social Share */}
                <div className="flex items-center gap-3 mt-3 sm:mt-4">
                  <span className="text-xs sm:text-sm text-muted-foreground">Share:</span>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors touch-target p-2 -m-2"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors touch-target p-2 -m-2"
                  >
                    <Twitter size={18} />
                  </a>
                </div>
              </motion.div>

              {/* Quick Stats - mobile optimized grid */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-10 sm:mb-16">
                <StatCard 
                  metric={research.open_rate_range || "N/A"} 
                  label="Open Rate Range" 
                  sampleSize={research.sample_size ? `(${research.sample_size})` : ""} 
                  delay={0} 
                />
                <StatCard 
                  metric={research.reply_rate_range || "N/A"} 
                  label="Reply Rate Range" 
                  sampleSize={research.sample_size ? `(${research.sample_size})` : ""} 
                  delay={0.05} 
                />
                <StatCard 
                  metric={research.booking_rate || "N/A"} 
                  label="Meeting Booking Rate" 
                  sampleSize="" 
                  delay={0.1} 
                />
              </motion.div>

              {/* Industry Overview */}
              {research.industry_overview && (
                <motion.section id="overview" variants={itemVariants} className="mb-10 sm:mb-16">
                  <h2 className="text-lg sm:text-xl md:text-heading-2 font-bold text-foreground mb-4 sm:mb-6">Industry Context</h2>
                  <div 
                    className="prose prose-sm sm:prose-lg max-w-none text-sm sm:text-base text-muted-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(research.industry_overview) }}
                  />
                </motion.section>
              )}

              {/* ICPs Tested */}
              {icpsData.length > 0 && (
                <motion.section id="icps-tested" variants={itemVariants} className="mb-10 sm:mb-16">
                  <h2 className="text-lg sm:text-xl md:text-heading-2 font-bold text-foreground mb-4 sm:mb-6">Target Profiles We Tested</h2>
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <DataTable columns={icpColumns} data={icpsData} />
                  </div>
                </motion.section>
              )}

              {/* What Worked */}
              {whatWorked.length > 0 && (
                <motion.section id="what-worked" variants={itemVariants} className="mb-10 sm:mb-16">
                  <h2 className="text-lg sm:text-xl md:text-heading-2 font-bold text-foreground mb-4 sm:mb-6">✅ Messaging Angles That Worked</h2>
                  <div className="space-y-4 sm:space-y-6">
                    {whatWorked.map((item: any, index: number) => (
                      <ResultCard key={index} item={item} type="success" />
                    ))}
                  </div>
                </motion.section>
              )}

              {/* What Failed */}
              {whatFailed.length > 0 && (
                <motion.section id="what-failed" variants={itemVariants} className="mb-10 sm:mb-16">
                  <h2 className="text-lg sm:text-xl md:text-heading-2 font-bold text-foreground mb-4 sm:mb-6">❌ Messaging Angles That Failed</h2>
                  <div className="space-y-4 sm:space-y-6">
                    {whatFailed.map((item: any, index: number) => (
                      <ResultCard key={index} item={item} type="failure" />
                    ))}
                  </div>
                </motion.section>
              )}

              {/* Key Insights */}
              {keyInsights.length > 0 && (
                <motion.section id="insights" variants={itemVariants} className="mb-10 sm:mb-16">
                  <h2 className="text-lg sm:text-xl md:text-heading-2 font-bold text-foreground mb-4 sm:mb-6">📊 Cross-Cutting Insights</h2>
                  <div className="space-y-3 sm:space-y-4">
                    {keyInsights.map((insight: string, index: number) => (
                      <div key={index} className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-muted/30">
                        <span className="font-mono text-base sm:text-lg font-bold text-primary shrink-0">{index + 1}.</span>
                        <p className="text-sm sm:text-base text-foreground">{insight}</p>
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* Common Mistakes */}
              {commonMistakes.length > 0 && (
                <motion.section id="mistakes" variants={itemVariants} className="mb-10 sm:mb-16">
                  <h2 className="text-lg sm:text-xl md:text-heading-2 font-bold text-foreground mb-4 sm:mb-6">🚨 Common Mistakes We Observed</h2>
                  <div className="space-y-3 sm:space-y-4">
                    {commonMistakes.map((item: any, index: number) => (
                      <div key={index} className="p-3 sm:p-4 rounded-lg border border-border/20">
                        <p className="text-sm sm:text-base mb-2">
                          <span className="text-[#E74C3C] font-medium">❌ Bad:</span> {item.bad}
                        </p>
                        <p className="text-sm sm:text-base">
                          <span className="text-[#2ECC71] font-medium">✅ Good:</span> {item.good}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* Methodology */}
              {research.methodology && (
                <motion.section id="methodology" variants={itemVariants} className="mb-10 sm:mb-16">
                  <h2 className="text-lg sm:text-xl md:text-heading-2 font-bold text-foreground mb-4 sm:mb-6">📋 Methodology</h2>
                  <div 
                    className="prose prose-sm sm:prose-lg max-w-none text-sm sm:text-base text-muted-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(research.methodology) }}
                  />
                </motion.section>
              )}

              {/* Bottom CTA */}
              <motion.section variants={itemVariants} className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 p-6 sm:p-8 md:p-12 text-center">
                <h2 className="text-lg sm:text-xl md:text-heading-2 font-bold text-foreground mb-3 sm:mb-4">
                  Want us to run this for you?
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
                  If you're in {research.industry_name} and need predictable, ethical outbound infrastructure, 
                  we can build and operate a system tailored to your ICP.
                </p>
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="touch-target"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate("/?booking=true#application");
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate("/?booking=true#application");
                  }}
                  style={{ touchAction: 'manipulation' }}
                >
                  See If Your Outbound System Is Built to Scale
                </Button>
              </motion.section>
            </motion.div>
          </main>
        </div>
      </div>

      {/* Mobile Subscribe */}
      <div className="lg:hidden py-6 sm:py-8 bg-secondary/30">
        <div className="container-wide">
          <SubscribeWidget />
        </div>
      </div>

      <Footer />

      <BackToTop />
    </div>
  );
};

export default IndustryResearch;
