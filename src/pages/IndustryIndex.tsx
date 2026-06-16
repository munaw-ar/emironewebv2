import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import HeroFlow from "@/components/sections/HeroFlow";
import Footer from "@/components/layout/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { supabase } from "@/integrations/supabase/client";
import { splitMetric } from "@/lib/metric";

interface IndustryResearch {
  id: string;
  title: string;
  industry_name: string;
  slug: string;
  open_rate_range: string | null;
  reply_rate_range: string | null;
  sample_size: string | null;
  is_published: boolean;
}

const eyebrowStyle: React.CSSProperties = { fontFamily: "var(--body)", fontSize: "var(--step--1)", fontWeight: 600, letterSpacing: "var(--track-caps)", textTransform: "uppercase", color: "var(--green)" };
const leadStyle: React.CSSProperties = { fontFamily: "var(--body)", fontSize: "var(--step-1)", color: "var(--mid)", lineHeight: "var(--lh-lead)" };
const bodyStyle: React.CSSProperties = { fontFamily: "var(--body)", fontSize: "var(--step-0)", color: "var(--mid)", lineHeight: "var(--lh-body)" };

const IndustryIndex = () => {
  const [industries, setIndustries] = useState<IndustryResearch[]>([]);
  const [loading, setLoading] = useState(true);
  useScrollReveal();

  useEffect(() => {
    const fetchIndustries = async () => {
      const { data, error } = await supabase
        .from("industry_research")
        .select("id, title, industry_name, slug, open_rate_range, reply_rate_range, sample_size, is_published")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setIndustries(data.map(r => ({ ...r, is_published: r.is_published ?? false })));
      }
      setLoading(false);
    };

    fetchIndustries();
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--paper)" }}>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navigation />
      <main id="main">
        {/* Hero */}
        <section style={{ position: "relative", overflow: "hidden", isolation: "isolate", padding: "var(--section-y-lg) 0 var(--section-y)", background: "radial-gradient(900px 520px at 88% -8%, rgba(52,211,153,0.12), transparent 60%), var(--paper)", borderBottom: "1px solid var(--rule)" }}>
          <HeroFlow variant="ambient" />
          <div className="w">
            <div className="reveal" style={{ ...eyebrowStyle, marginBottom: "var(--s4)" }}>Research · By Industry</div>
            <h1 className="reveal reveal-delay-1 h-hero" style={{ maxWidth: 880, marginBottom: "var(--s5)" }}>
              Industry <em>Research.</em>
            </h1>
            <p className="reveal reveal-delay-2 measure-lead" style={{ ...leadStyle }}>
              Cold email benchmarks and messaging insights by industry vertical. Each report is based on real campaign data with clearly stated sample sizes and limitations.
            </p>
          </div>
        </section>

        {/* 01 — Reports */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper-2)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">01</span>Reports</div>
            <div>
              {/* Loading State */}
              {loading ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--section-y) 0" }}>
                  <Loader2 className="h-8 w-8 animate-spin" style={{ color: "var(--green)" }} />
                </div>
              ) : industries.length === 0 ? (
                <div className="reveal glass" style={{ padding: "var(--s5)", textAlign: "center" }}>
                  <p style={bodyStyle}>No industry research published yet. Check back soon!</p>
                </div>
              ) : (
                /* Industry Cards */
                <div className="grid-2">
                  {industries.map((industry, i) => (
                    <div key={industry.id} className={`reveal${i % 3 === 1 ? " reveal-delay-1" : i % 3 === 2 ? " reveal-delay-2" : ""}`}>
                      <Link
                        to={`/research/industry/${industry.slug}`}
                        className="glass"
                        style={{ display: "flex", flexDirection: "column", height: "100%", minWidth: 0, padding: "var(--s5)", textDecoration: "none" }}
                      >
                        <h3 style={{ fontFamily: "var(--display)", fontSize: "var(--step-1)", fontWeight: 400, color: "var(--ink)", marginBottom: "var(--s2)" }}>{industry.title}</h3>
                        <p style={{ ...eyebrowStyle, color: "var(--mid)", marginBottom: "var(--s4)" }}>{industry.industry_name}</p>
                        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "var(--s3)", marginTop: "auto", paddingTop: "var(--s4)", borderTop: "1px solid var(--rule)" }}>
                          <div style={{ display: "flex", gap: "var(--s5)", minWidth: 0 }}>
                            {[industry.open_rate_range, industry.reply_rate_range].map((raw, j) => {
                              const { value, unit } = splitMetric(raw);
                              return (
                                <div key={j} style={{ minWidth: 0 }}>
                                  <p className="tnum" style={{ fontFamily: "var(--display)", fontSize: "var(--step-2)", fontWeight: 400, color: "var(--ink)", lineHeight: 1.05, letterSpacing: "-0.01em", overflowWrap: "normal" }}>
                                    {value}
                                  </p>
                                  <p style={{ fontFamily: "var(--body)", fontSize: "var(--step--1)", color: "var(--light)", marginTop: "var(--s2)", textTransform: "capitalize", overflowWrap: "normal" }}>{unit || (j === 0 ? "Open rate" : "Reply rate")}</p>
                                </div>
                              );
                            })}
                          </div>
                          <ArrowRight size={18} style={{ color: "var(--green)", flexShrink: 0 }} />
                        </div>
                        {industry.sample_size && (
                          <p style={{ fontFamily: "var(--body)", fontSize: "var(--step--1)", color: "var(--light)", marginTop: "var(--s3)" }}>{industry.sample_size}</p>
                        )}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default IndustryIndex;
