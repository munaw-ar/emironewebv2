import { useState, useEffect } from "react";
import { FileText, Download, Calendar, Database, Sparkles, Loader2 } from "lucide-react";
import EmailGateModal from "@/components/research/EmailGateModal";
import SubscribeWidget from "@/components/research/SubscribeWidget";
import BackToTop from "@/components/research/BackToTop";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import Navigation from "@/components/layout/Navigation";
import HeroFlow from "@/components/sections/HeroFlow";
import Footer from "@/components/layout/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface QuarterlyReport {
  id: string;
  title: string;
  slug: string;
  quarter: string;
  year: number;
  description: string | null;
  published_date: string;
  page_count: number | null;
  sample_size_emails: number | null;
  sample_size_replies: number | null;
  sample_size_meetings: number | null;
  pdf_url: string | null;
  pdf_file_size: string | null;
  download_count: number | null;
}

const eyebrowStyle: React.CSSProperties = { fontFamily: "var(--body)", fontSize: "var(--step--1)", fontWeight: 600, letterSpacing: "var(--track-caps)", textTransform: "uppercase", color: "var(--green)" };
const leadStyle: React.CSSProperties = { fontFamily: "var(--body)", fontSize: "var(--step-1)", color: "var(--mid)", lineHeight: "var(--lh-lead)" };
const bodyStyle: React.CSSProperties = { fontFamily: "var(--body)", fontSize: "var(--step-0)", color: "var(--mid)", lineHeight: "var(--lh-body)" };

const QuarterlyReports = () => {
  const [reports, setReports] = useState<QuarterlyReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<QuarterlyReport | null>(null);
  useScrollReveal();

  useEffect(() => {
    const fetchReports = async () => {
      const { data, error } = await supabase
        .from("quarterly_reports")
        .select("*")
        .eq("is_published", true)
        .order("year", { ascending: false })
        .order("quarter", { ascending: false });

      if (!error && data) {
        setReports(data);
      }
      setLoading(false);
    };

    fetchReports();
  }, []);

  const handleDownload = (report: QuarterlyReport) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  // Check if report is new (published within last 30 days)
  const isNewReport = (publishedDate: string) => {
    const published = new Date(publishedDate);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - published.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--paper)" }}>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navigation />

      <main id="main">
        {/* Hero */}
        <section style={{ position: "relative", overflow: "hidden", isolation: "isolate", padding: "var(--section-y-lg) 0 var(--section-y)", background: "radial-gradient(900px 520px at 88% -8%, rgba(52,211,153,0.12), transparent 60%), var(--paper)", borderBottom: "1px solid var(--rule)" }}>
          <HeroFlow variant="ambient" />
          <div className="w">
            <div className="reveal" style={{ ...eyebrowStyle, marginBottom: "var(--s4)" }}>Research · Quarterly Reports</div>
            <h1 className="reveal reveal-delay-1 h-hero" style={{ maxWidth: 880, marginBottom: "var(--s5)" }}>
              Quarterly Outbound <em>Reality Reports.</em>
            </h1>
            <p className="reveal reveal-delay-2 measure-lead" style={{ ...leadStyle, marginBottom: "var(--s3)" }}>
              Cross-industry insights. Benchmarks. Trends. Ethical boundaries.
            </p>
            <p className="reveal reveal-delay-3 measure" style={{ ...bodyStyle }}>
              Published every 90 days based on live campaign data.
            </p>
          </div>
        </section>

        {/* 01 — Reports */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper-2)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">01</span>Reports</div>
            <div style={{ minWidth: 0 }}>
              {/* Loading State */}
              {loading ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--s8) 0" }}>
                  <Loader2 className="h-8 w-8 animate-spin" style={{ color: "var(--green)" }} />
                </div>
              ) : reports.length === 0 ? (
                <div className="reveal" style={{ ...bodyStyle, textAlign: "center", padding: "var(--s8) 0" }}>
                  <p>No quarterly reports published yet. Check back soon!</p>
                </div>
              ) : (
                /* Report Cards */
                <div style={{ display: "grid", gap: "var(--s4)" }}>
                  {reports.map((report, idx) => {
                    const isNew = isNewReport(report.published_date);
                    return (
                      <article
                        key={report.id}
                        className={`reveal ${idx % 3 === 1 ? "reveal-delay-1" : idx % 3 === 2 ? "reveal-delay-2" : ""} glass`}
                        style={{ position: "relative", padding: "var(--s5)" }}
                      >
                        {/* New Badge */}
                        {isNew && (
                          <span style={{ position: "absolute", top: "calc(-1 * var(--s2))", left: "var(--s4)", display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 999, background: "var(--green)", color: "var(--paper)", fontFamily: "var(--body)", fontSize: "var(--step--1)", fontWeight: 600, letterSpacing: "var(--track-caps)", textTransform: "uppercase" }}>
                            <Sparkles size={12} />
                            NEW
                          </span>
                        )}

                        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--s5)", alignItems: "center", justifyContent: "space-between" }}>
                          {/* Report Info */}
                          <div style={{ flex: "1 1 300px", minWidth: 0 }}>
                            <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--s3)", marginBottom: "var(--s3)" }}>
                              <FileText size={24} style={{ color: "var(--green)", flexShrink: 0, marginTop: 4 }} strokeWidth={2} />
                              <div style={{ minWidth: 0 }}>
                                <h2 style={{ fontFamily: "var(--display)", fontSize: "var(--step-2)", fontWeight: 400, color: "var(--ink)", marginBottom: "var(--s1)" }}>{report.title}</h2>
                                <p style={{ ...bodyStyle, fontSize: "var(--step--1)", display: "flex", alignItems: "center", gap: 8 }}>
                                  <Calendar size={14} style={{ color: "var(--green)", flexShrink: 0 }} />
                                  Published: {format(new Date(report.published_date), "MMMM d, yyyy")}
                                </p>
                              </div>
                            </div>

                            {report.description && (
                              <p style={{ ...bodyStyle, marginBottom: "var(--s3)" }}>{report.description}</p>
                            )}

                            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--s3)", fontFamily: "var(--body)", fontSize: "var(--step--1)", color: "var(--light)" }}>
                              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <Database size={14} style={{ color: "var(--green)", flexShrink: 0 }} />
                                {report.sample_size_emails?.toLocaleString() || 0} emails, {report.sample_size_replies?.toLocaleString() || 0} replies, {report.sample_size_meetings?.toLocaleString() || 0} meetings
                              </span>
                              {report.page_count && (
                                <>
                                  <span>•</span>
                                  <span>{report.page_count}-page PDF</span>
                                </>
                              )}
                              {report.pdf_file_size && (
                                <>
                                  <span>•</span>
                                  <span>{report.pdf_file_size}</span>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Download Button */}
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <button
                              onClick={() => handleDownload(report)}
                              disabled={!report.pdf_url}
                              className="cta"
                              style={{ fontFamily: "var(--body)", fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "15px 30px", minHeight: 48, display: "inline-flex", alignItems: "center", gap: 10, whiteSpace: "nowrap" }}
                            >
                              <Download size={16} />
                              {report.pdf_url ? "Download Report (Free)" : "Coming Soon"}
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 02 — Subscribe */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">02</span>Subscribe</div>
            <div style={{ minWidth: 0 }}>
              <div className="reveal" style={{ maxWidth: 560 }}>
                <SubscribeWidget variant="inline" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {selectedReport && (
        <EmailGateModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedReport(null);
          }}
          reportTitle={selectedReport.title}
          reportId={selectedReport.id}
          pdfUrl={selectedReport.pdf_url || ""}
        />
      )}

      <BackToTop />
    </div>
  );
};

export default QuarterlyReports;
