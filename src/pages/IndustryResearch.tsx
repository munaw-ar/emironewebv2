import { useEffect, useState, memo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ChevronRight, Calendar, User, Database, Linkedin, Twitter, Loader2, ArrowRight } from "lucide-react";
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
import { useScrollReveal } from "@/hooks/useScrollReveal";

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

const bodyStyle: React.CSSProperties = { fontFamily: "var(--body)", fontSize: "var(--step-0)", color: "var(--mid)", lineHeight: "var(--lh-body)" };
const leadStyle: React.CSSProperties = { fontFamily: "var(--body)", fontSize: "var(--step-1)", color: "var(--mid)", lineHeight: "var(--lh-lead)" };
const metaStyle: React.CSSProperties = { fontFamily: "var(--body)", fontSize: "var(--step--1)", color: "var(--light)" };

// Memoized result card for performance
const ResultCard = memo(({ item, type }: { item: any; type: 'success' | 'failure' }) => {
  const accent = type === 'success' ? 'var(--green)' : '#B91C1C';

  return (
    <div className="glass" style={{ padding: "var(--s5)", borderLeft: `3px solid ${accent}` }}>
      <h3 style={{ fontFamily: "var(--display)", fontSize: "var(--step-1)", fontWeight: 400, color: "var(--ink)", marginBottom: "var(--s2)" }}>{item.title}</h3>
      {item.subjectLine && (
        <p style={{ ...bodyStyle, fontSize: "var(--step--1)", marginBottom: "var(--s2)", wordBreak: "break-word" }}>
          <span style={{ fontWeight: 600, color: "var(--ink)" }}>Subject:</span> {item.subjectLine}
        </p>
      )}
      {item.explanation && (
        <p style={{ ...bodyStyle, marginBottom: "var(--s4)" }}>{item.explanation}</p>
      )}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--s4)", ...metaStyle }}>
        {item.openRate && <span>Open: <strong style={{ color: "var(--ink)" }}>{item.openRate}</strong></span>}
        {item.replyRate && <span>Reply: <strong style={{ color: "var(--ink)" }}>{item.replyRate}</strong></span>}
        {item.meetingRate && <span>Meeting: <strong style={{ color: "var(--ink)" }}>{item.meetingRate}</strong></span>}
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
  useScrollReveal();

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
      <div style={{ minHeight: "100vh", background: "var(--paper)", display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--s4)" }}>
        <div style={{ textAlign: "center" }}>
          <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin" style={{ color: "var(--green)", margin: "0 auto var(--s3)" }} />
          <p style={metaStyle}>Loading research...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--paper)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "var(--s4)" }}>
        <h1 className="h-section" style={{ marginBottom: "var(--s3)", textAlign: "center" }}>Something went wrong</h1>
        <p style={{ ...bodyStyle, marginBottom: "var(--s6)", textAlign: "center" }}>{error}</p>
        <Button variant="outline" onClick={() => window.location.reload()} className="touch-target">
          Try Again
        </Button>
      </div>
    );
  }

  // Not found state
  if (!research) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--paper)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "var(--s4)" }}>
        <h1 className="h-section" style={{ marginBottom: "var(--s3)", textAlign: "center" }}>Research Not Found</h1>
        <p style={{ ...bodyStyle, marginBottom: "var(--s6)", textAlign: "center" }}>This report doesn't exist or hasn't been published yet.</p>
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
    <div style={{ minHeight: "100vh", background: "var(--paper)" }}>
      <a href="#main" className="skip-link">Skip to content</a>
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
          <main id="main" className="flex-1 min-w-0 max-w-4xl">
            {/* Breadcrumb - hidden on small mobile */}
            <nav className="reveal hidden sm:flex items-center gap-2 flex-wrap" style={{ ...metaStyle, marginBottom: "var(--s4)" }}>
              <Link to="/" className="link-wipe" style={{ color: "var(--green)" }}>Home</Link>
              <ChevronRight size={12} className="sm:w-3.5 sm:h-3.5" style={{ color: "var(--light)" }} />
              <Link to="/research" className="link-wipe" style={{ color: "var(--green)" }}>Research</Link>
              <ChevronRight size={12} className="sm:w-3.5 sm:h-3.5" style={{ color: "var(--light)" }} />
              <Link to="/research/industry" className="link-wipe" style={{ color: "var(--green)" }}>Industry</Link>
              <ChevronRight size={12} className="sm:w-3.5 sm:h-3.5" style={{ color: "var(--light)" }} />
              <span className="truncate max-w-[120px]" style={{ color: "var(--ink)" }}>{research.industry_name}</span>
            </nav>

            {/* Page Header */}
            <div style={{ marginBottom: "var(--s7)" }}>
              <h1 className="reveal h-hero" style={{ marginBottom: "var(--s3)" }}>
                {research.title}
              </h1>
              <p className="reveal reveal-delay-1 measure-lead" style={{ ...leadStyle, marginBottom: "var(--s5)" }}>{research.quarter}</p>

              <div className="reveal reveal-delay-2 flex flex-wrap items-center gap-3 sm:gap-4" style={{ ...metaStyle, paddingBottom: "var(--s4)", borderBottom: "1px solid var(--rule)" }}>
                {research.last_updated && (
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} className="sm:w-3.5 sm:h-3.5" style={{ color: "var(--green)" }} />
                    {format(new Date(research.last_updated), "MMM d, yyyy")}
                  </span>
                )}
                {research.sample_size && (
                  <span className="flex items-center gap-1.5">
                    <Database size={12} className="sm:w-3.5 sm:h-3.5" style={{ color: "var(--green)" }} />
                    n={research.sample_size}
                  </span>
                )}
                {research.author && (
                  <span className="flex items-center gap-1.5">
                    <User size={12} className="sm:w-3.5 sm:h-3.5" style={{ color: "var(--green)" }} />
                    {research.author}
                  </span>
                )}
              </div>

              {/* Social Share */}
              <div className="reveal reveal-delay-3 flex items-center gap-3" style={{ marginTop: "var(--s4)" }}>
                <span style={metaStyle}>Share:</span>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target p-2 -m-2"
                  style={{ color: "var(--green)" }}
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target p-2 -m-2"
                  style={{ color: "var(--green)" }}
                >
                  <Twitter size={18} />
                </a>
              </div>
            </div>

            {/* Quick Stats - mobile optimized grid */}
            <div className="reveal grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4" style={{ marginBottom: "var(--s8)" }}>
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
            </div>

            {/* Industry Overview */}
            {research.industry_overview && (
              <section id="overview" style={{ marginBottom: "var(--s8)" }}>
                <h2 className="reveal h-section" style={{ marginBottom: "var(--s5)" }}>
                  Industry <em>Context</em>
                </h2>
                <div
                  className="reveal reveal-delay-1 prose prose-sm sm:prose-lg max-w-none measure"
                  style={{ ...bodyStyle }}
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(research.industry_overview) }}
                />
              </section>
            )}

            {/* ICPs Tested */}
            {icpsData.length > 0 && (
              <section id="icps-tested" style={{ marginBottom: "var(--s8)" }}>
                <h2 className="reveal h-section" style={{ marginBottom: "var(--s5)" }}>
                  Target Profiles <em>We Tested</em>
                </h2>
                <div className="reveal reveal-delay-1 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                  <DataTable columns={icpColumns} data={icpsData} />
                </div>
              </section>
            )}

            {/* What Worked */}
            {whatWorked.length > 0 && (
              <section id="what-worked" style={{ marginBottom: "var(--s8)" }}>
                <h2 className="reveal h-section" style={{ marginBottom: "var(--s5)" }}>
                  ✅ Messaging Angles <em>That Worked</em>
                </h2>
                <div style={{ display: "grid", gap: "var(--s4)" }}>
                  {whatWorked.map((item: any, index: number) => (
                    <div key={index} className={`reveal${index % 3 === 1 ? " reveal-delay-1" : index % 3 === 2 ? " reveal-delay-2" : ""}`}>
                      <ResultCard item={item} type="success" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* What Failed */}
            {whatFailed.length > 0 && (
              <section id="what-failed" style={{ marginBottom: "var(--s8)" }}>
                <h2 className="reveal h-section" style={{ marginBottom: "var(--s5)" }}>
                  ❌ Messaging Angles <em>That Failed</em>
                </h2>
                <div style={{ display: "grid", gap: "var(--s4)" }}>
                  {whatFailed.map((item: any, index: number) => (
                    <div key={index} className={`reveal${index % 3 === 1 ? " reveal-delay-1" : index % 3 === 2 ? " reveal-delay-2" : ""}`}>
                      <ResultCard item={item} type="failure" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Key Insights */}
            {keyInsights.length > 0 && (
              <section id="insights" style={{ marginBottom: "var(--s8)" }}>
                <h2 className="reveal h-section" style={{ marginBottom: "var(--s5)" }}>
                  Cross-Cutting <em>Insights</em>
                </h2>
                <div style={{ display: "grid", gap: "var(--s3)" }}>
                  {keyInsights.map((insight: string, index: number) => (
                    <div key={index} className="reveal glass" style={{ display: "flex", gap: "var(--s4)", padding: "var(--s4)" }}>
                      <span style={{ fontFamily: "var(--display)", fontSize: "var(--step-1)", fontWeight: 400, color: "var(--green)", flexShrink: 0 }}>{index + 1}.</span>
                      <p style={{ ...bodyStyle, color: "var(--ink)", minWidth: 0 }}>{insight}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Common Mistakes */}
            {commonMistakes.length > 0 && (
              <section id="mistakes" style={{ marginBottom: "var(--s8)" }}>
                <h2 className="reveal h-section" style={{ marginBottom: "var(--s5)" }}>
                  Common Mistakes <em>We Observed</em>
                </h2>
                <div style={{ display: "grid", gap: "var(--s3)" }}>
                  {commonMistakes.map((item: any, index: number) => (
                    <div key={index} className="reveal glass" style={{ padding: "var(--s4)" }}>
                      <p style={{ ...bodyStyle, marginBottom: "var(--s2)" }}>
                        <span style={{ color: "#B91C1C", fontWeight: 600 }}>❌ Bad:</span> {item.bad}
                      </p>
                      <p style={bodyStyle}>
                        <span style={{ color: "var(--green)", fontWeight: 600 }}>✅ Good:</span> {item.good}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Methodology */}
            {research.methodology && (
              <section id="methodology" style={{ marginBottom: "var(--s8)" }}>
                <h2 className="reveal h-section" style={{ marginBottom: "var(--s5)" }}>
                  📋 <em>Methodology</em>
                </h2>
                <div
                  className="reveal reveal-delay-1 prose prose-sm sm:prose-lg max-w-none measure"
                  style={{ ...bodyStyle }}
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(research.methodology) }}
                />
              </section>
            )}

            {/* Bottom CTA */}
            <section className="reveal glass" style={{ padding: "var(--s7)", textAlign: "center" }}>
              <h2 className="h-cta" style={{ marginBottom: "var(--s4)" }}>
                Want us to <em>run this for you?</em>
              </h2>
              <p className="measure-lead" style={{ ...leadStyle, margin: "0 auto var(--s6)" }}>
                If you're in {research.industry_name} and need predictable, ethical outbound infrastructure,
                we can build and operate a system tailored to your ICP.
              </p>
              <button
                className="cta"
                style={{ fontFamily: "var(--body)", fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "15px 30px", minHeight: 48, display: "inline-flex", alignItems: "center", gap: 10, touchAction: "manipulation" }}
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
              >
                See If Your Outbound System Is Built to Scale <ArrowRight size={16} />
              </button>
            </section>
          </main>
        </div>
      </div>

      {/* Mobile Subscribe */}
      <div className="lg:hidden" style={{ padding: "var(--s6) 0", background: "var(--paper-2)" }}>
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
