import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, FileText, FlaskConical, BookOpen, TestTube, Download, Check } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import SubscribeWidget from "@/components/research/SubscribeWidget";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLatestQuarterlyReport, useFeaturedResearch, useIncrementDownloadCount, isNewContent, formatNumber } from "@/hooks/useResearchData";

const bodyStyle: React.CSSProperties = { fontFamily: "var(--body)", fontSize: "var(--step-0)", color: "var(--mid)", lineHeight: "var(--lh-body)" };
const leadStyle: React.CSSProperties = { fontFamily: "var(--body)", fontSize: "var(--step-1)", color: "var(--mid)", lineHeight: "var(--lh-lead)" };

const ResearchCard = memo(({ research, isNew }: { research: any; isNew: boolean }) => (
  <Link
    to={`/research/industry/${research.slug}`}
    className="reveal glass group"
    style={{ position: "relative", display: "block", padding: "var(--s5)", minWidth: 0 }}
  >
    {isNew && (
      <span
        style={{
          position: "absolute",
          top: "var(--s4)",
          right: "var(--s4)",
          fontFamily: "var(--body)",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "var(--track-caps)",
          textTransform: "uppercase",
          color: "var(--green)",
        }}
      >
        NEW
      </span>
    )}
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "var(--s2)" }}>
      <span style={{ fontFamily: "var(--body)", fontSize: "var(--step--1)", fontWeight: 600, color: "var(--green)" }}>{research.industry_name}</span>
      <span style={{ fontFamily: "var(--body)", fontSize: "var(--step--1)", color: "var(--light)" }}>· {research.quarter}</span>
    </div>
    <h3 style={{ fontFamily: "var(--display)", fontSize: "var(--step-1)", fontWeight: 400, color: "var(--ink)", lineHeight: 1.25, marginBottom: "var(--s4)" }}>
      {research.title}
    </h3>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s3)", paddingTop: "var(--s4)", borderTop: "1px solid var(--rule)" }}>
      <div>
        <p style={{ fontFamily: "var(--display)", fontSize: "var(--step-2)", color: "var(--ink)" }}>{research.open_rate_range || "N/A"}</p>
        <p style={{ fontFamily: "var(--body)", fontSize: "var(--step--1)", color: "var(--light)" }}>Open Rate</p>
      </div>
      <div>
        <p style={{ fontFamily: "var(--display)", fontSize: "var(--step-2)", color: "var(--ink)" }}>{research.reply_rate_range || "N/A"}</p>
        <p style={{ fontFamily: "var(--body)", fontSize: "var(--step--1)", color: "var(--light)" }}>Reply Rate</p>
      </div>
    </div>
  </Link>
));
ResearchCard.displayName = "ResearchCard";

const ResearchCardSkeleton = () => (
  <div className="glass" style={{ padding: "var(--s5)", minWidth: 0 }}>
    <Skeleton className="h-4 w-3/4 mb-2" />
    <Skeleton className="h-4 w-1/2 mb-3" />
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s3)", paddingTop: "var(--s4)", borderTop: "1px solid var(--rule)" }}>
      <Skeleton className="h-5 w-14" />
      <Skeleton className="h-5 w-14" />
    </div>
  </div>
);

const ResearchHub = () => {
  const { data: latestReport, isLoading: isLoadingReport } = useLatestQuarterlyReport();
  const { data: featuredResearch, isLoading: isLoadingResearch } = useFeaturedResearch();
  const incrementDownload = useIncrementDownloadCount();
  const navigate = useNavigate();
  useScrollReveal();

  const tabs = [
    { label: "Industry Research", href: "/research/industry", icon: FileText, desc: "Cold email benchmarks by industry" },
    { label: "Experiment Logs", href: "/research/experiments", icon: FlaskConical, desc: "Real tests, real results" },
    { label: "Quarterly Reports", href: "/research/reports", icon: BookOpen, desc: "Cross-industry insights" },
    { label: "Methodology", href: "/research/methodology", icon: TestTube, desc: "How we research" },
  ];

  const bridgeBullets = [
    "Targeting refinements based on ICP response data",
    "Message patterns that generate qualified replies",
    "Pacing rules derived from deliverability experiments",
    "Objection insights from real prospect responses",
  ];

  const handleDownload = async () => {
    if (!latestReport?.pdf_url) return;
    incrementDownload.mutate(latestReport.id);
    window.open(latestReport.pdf_url, "_blank");
  };

  const isReportNew = latestReport ? isNewContent(latestReport.published_date, 30) : false;

  return (
    <div style={{ minHeight: "100vh", background: "var(--paper)" }}>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navigation />
      <main id="main">
        {/* 1. Hero */}
        <section style={{ padding: "var(--section-y-lg) 0 var(--section-y)", background: "radial-gradient(900px 520px at 88% -8%, rgba(52,211,153,0.12), transparent 60%), var(--paper)", borderBottom: "1px solid var(--rule)" }}>
          <div className="w">
            <h1 className="reveal h-hero" style={{ maxWidth: 880, marginBottom: "var(--s5)" }}>
              Emir One GTM <em>Research Lab.</em>
            </h1>
            <p className="reveal reveal-delay-1 measure-lead" style={{ ...leadStyle, marginBottom: "var(--s6)" }}>
              Real outbound experiments. Real data. Real ethical constraints.
            </p>

            <div className="reveal reveal-delay-2" style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
              {isLoadingReport ? (
                <Skeleton className="h-[52px] w-60" />
              ) : (
                <button
                  onClick={handleDownload}
                  disabled={!latestReport?.pdf_url}
                  className="cta"
                  style={{ fontFamily: "var(--body)", fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "15px 30px", minHeight: 48, display: "inline-flex", alignItems: "center", gap: 10 }}
                >
                  <Download size={16} />
                  {latestReport
                    ? `Download ${latestReport.quarter} ${latestReport.year} Report`
                    : "Download Latest Report"}
                  {isReportNew && (
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.85 }}>NEW</span>
                  )}
                </button>
              )}
              <Link
                to={featuredResearch?.[0]?.slug ? `/research/industry/${featuredResearch[0].slug}` : "/research/industry"}
                className="btn-ghost"
                style={{ fontFamily: "var(--body)", fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", padding: "15px 28px", minHeight: 48, display: "inline-flex", alignItems: "center", gap: 8 }}
              >
                View Latest Research
                <ArrowRight size={16} />
              </Link>
            </div>

            {latestReport?.page_count && latestReport?.sample_size_emails && (
              <p className="reveal reveal-delay-3" style={{ fontFamily: "var(--body)", fontSize: "var(--step--1)", color: "var(--light)", marginTop: "var(--s4)" }}>
                {latestReport.page_count} pages · {formatNumber(latestReport.sample_size_emails)} emails analyzed
              </p>
            )}
          </div>
        </section>

        {/* 2. Featured Benchmark */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper-2)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">01</span>Featured</div>
            <div>
              <h2 className="reveal h-section" style={{ marginBottom: "var(--s6)" }}>
                Featured <em>industry research.</em>
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "var(--s4)", marginBottom: "var(--s6)" }}>
                {isLoadingResearch
                  ? Array.from({ length: 3 }).map((_, i) => <ResearchCardSkeleton key={i} />)
                  : featuredResearch && featuredResearch.length > 0
                    ? featuredResearch.map((r) => (
                        <ResearchCard key={r.id} research={r} isNew={isNewContent(r.last_updated, 14)} />
                      ))
                    : (
                      <div className="glass" style={{ gridColumn: "1 / -1", padding: "var(--s6)", textAlign: "center" }}>
                        <p style={bodyStyle}>Research coming soon — we're analyzing cold email data across industries.</p>
                      </div>
                    )}
              </div>

              <Link to="/research/industry" className="link-wipe" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--green)", fontFamily: "var(--body)", fontSize: 13, fontWeight: 600, letterSpacing: "0.04em" }}>
                View All Industry Research
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* 3. What We Publish (categories) */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">02</span>Catalog</div>
            <div>
              <h2 className="reveal h-section" style={{ marginBottom: "var(--s6)" }}>
                What <em>we publish.</em>
              </h2>

              <div className="grid-2">
                {tabs.map((tab, i) => (
                  <Link
                    key={tab.href}
                    to={tab.href}
                    className={`reveal ${i % 3 === 1 ? "reveal-delay-1" : i % 3 === 2 ? "reveal-delay-2" : ""} glass`}
                    style={{ display: "block", padding: "var(--s5)", minWidth: 0 }}
                  >
                    <tab.icon className="w-5 h-5" style={{ color: "var(--green)", marginBottom: "var(--s3)" }} strokeWidth={2} />
                    <h3 style={{ fontFamily: "var(--display)", fontSize: "var(--step-1)", fontWeight: 400, color: "var(--ink)", marginBottom: "var(--s2)" }}>{tab.label}</h3>
                    <p style={bodyStyle}>{tab.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. Research → Execution bridge */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper-2)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">03</span>Execution</div>
            <div>
              <h2 className="reveal h-section" style={{ marginBottom: "var(--s6)" }}>
                Research that directly <em>informs execution.</em>
              </h2>

              <ul className="reveal reveal-delay-1" style={{ display: "grid", gap: "var(--s3)", maxWidth: "var(--measure)", marginBottom: "var(--s6)" }}>
                {bridgeBullets.map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, ...bodyStyle, color: "var(--ink)" }}>
                    <Check className="w-4 h-4 shrink-0" style={{ color: "var(--green)", marginTop: 4 }} strokeWidth={2.5} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="reveal reveal-delay-2">
                <button
                  onClick={() => navigate("/book")}
                  className="cta"
                  style={{ fontFamily: "var(--body)", fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "15px 30px", minHeight: 48, display: "inline-flex", alignItems: "center", gap: 10 }}
                >
                  BOOK A REVENUE SPRINT CALL
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Lead Capture */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">04</span>Updates</div>
            <div>
              <h2 className="reveal h-cta" style={{ marginBottom: "var(--s4)" }}>
                Get <em>research updates.</em>
              </h2>
              <p className="reveal reveal-delay-1 measure" style={{ ...bodyStyle, marginBottom: "var(--s6)" }}>
                4 emails/year max. Unsubscribe anytime.
              </p>
              <div className="reveal reveal-delay-2" style={{ maxWidth: 440, minWidth: 0 }}>
                <SubscribeWidget variant="inline" source="research-hub" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ResearchHub;
