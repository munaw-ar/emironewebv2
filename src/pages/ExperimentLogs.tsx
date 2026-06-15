import { useState, useEffect } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import ExperimentCard from "@/components/research/ExperimentCard";
import SubscribeWidget from "@/components/research/SubscribeWidget";
import BackToTop from "@/components/research/BackToTop";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import Navigation from "@/components/layout/Navigation";
import HeroFlow from "@/components/sections/HeroFlow";
import Footer from "@/components/layout/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface ExperimentLog {
  id: string;
  title: string;
  slug: string;
  industry: string;
  date_published: string;
  hypothesis: string;
  test_setup: string;
  results: string;
  conclusion: string;
  next_test: string | null;
  sample_size: string | null;
}

const eyebrowStyle: React.CSSProperties = { fontFamily: "var(--body)", fontSize: "var(--step--1)", fontWeight: 600, letterSpacing: "var(--track-caps)", textTransform: "uppercase", color: "var(--green)" };
const leadStyle: React.CSSProperties = { fontFamily: "var(--body)", fontSize: "var(--step-1)", color: "var(--mid)", lineHeight: "var(--lh-lead)" };
const bodyStyle: React.CSSProperties = { fontFamily: "var(--body)", fontSize: "var(--step-0)", color: "var(--mid)", lineHeight: "var(--lh-body)" };

const ExperimentLogs = () => {
  const [experiments, setExperiments] = useState<ExperimentLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [industryFilter, setIndustryFilter] = useState("all");

  useScrollReveal();

  useEffect(() => {
    const fetchExperiments = async () => {
      const { data, error } = await supabase
        .from("experiment_logs")
        .select("*")
        .eq("is_published", true)
        .order("date_published", { ascending: false });

      if (!error && data) {
        setExperiments(data);
      }
      setLoading(false);
    };

    fetchExperiments();
  }, []);

  // Get unique industries for filter
  const industries = [...new Set(experiments.map(e => e.industry))];

  // Filter experiments
  const filteredExperiments = industryFilter === "all"
    ? experiments
    : experiments.filter(e => e.industry === industryFilter);

  return (
    <div style={{ minHeight: "100vh", background: "var(--paper)" }}>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navigation />

      <main id="main">
        {/* Hero */}
        <section style={{ position: "relative", overflow: "hidden", isolation: "isolate", padding: "var(--section-y-lg) 0 var(--section-y)", background: "radial-gradient(900px 520px at 88% -8%, rgba(52,211,153,0.12), transparent 60%), var(--paper)", borderBottom: "1px solid var(--rule)" }}>
          <HeroFlow variant="ambient" />
          <div className="w">
            <div className="reveal" style={{ ...eyebrowStyle, marginBottom: "var(--s4)" }}>Research · Experiment Logs</div>
            <h1 className="reveal reveal-delay-1 h-hero" style={{ maxWidth: 880, marginBottom: "var(--s5)" }}>
              Real tests. Real results. <em>Real learning.</em>
            </h1>
            <p className="reveal reveal-delay-2 measure-lead" style={{ ...leadStyle }}>
              We document every hypothesis we test in the field — including the ones that fail spectacularly.
            </p>
          </div>
        </section>

        {/* 01 — Logs */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper-2)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">01</span>Logs</div>
            <div style={{ minWidth: 0 }}>
              {/* Filters */}
              {industries.length > 0 && (
                <div className="reveal" style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: "var(--s6)" }}>
                  <div style={{ position: "relative" }}>
                    <select
                      value={industryFilter}
                      onChange={(e) => setIndustryFilter(e.target.value)}
                      style={{
                        appearance: "none",
                        background: "var(--paper)",
                        border: "1px solid var(--rule)",
                        borderRadius: 8,
                        padding: "10px 40px 10px 16px",
                        fontFamily: "var(--body)",
                        fontSize: "var(--step--1)",
                        color: "var(--ink)",
                        cursor: "pointer",
                      }}
                    >
                      <option value="all">All Industries</option>
                      {industries.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "var(--green)", pointerEvents: "none" }} />
                  </div>
                </div>
              )}

              {/* Loading State */}
              {loading ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--s8) 0" }}>
                  <Loader2 className="h-8 w-8 animate-spin" style={{ color: "var(--green)" }} />
                </div>
              ) : filteredExperiments.length === 0 ? (
                <div className="reveal" style={{ textAlign: "center", padding: "var(--s8) 0" }}>
                  <p style={bodyStyle}>No experiment logs published yet. Check back soon!</p>
                </div>
              ) : (
                /* Experiment Cards */
                <div style={{ display: "grid", gap: "var(--s5)" }}>
                  {filteredExperiments.map((exp, index) => (
                    <ExperimentCard
                      key={exp.id}
                      date={format(new Date(exp.date_published), "MMM d, yyyy")}
                      industry={exp.industry}
                      title={exp.title}
                      hypothesis={exp.hypothesis}
                      testSetup={exp.test_setup}
                      results={exp.results}
                      conclusion={exp.conclusion}
                      nextTest={exp.next_test || undefined}
                      slug={exp.slug ?? ''}
                      delay={index * 0.1}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 02 — Subscribe */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">02</span>Subscribe</div>
            <div className="reveal" style={{ minWidth: 0, maxWidth: 640 }}>
              <SubscribeWidget variant="inline" />
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <BackToTop />
    </div>
  );
};

export default ExperimentLogs;
