import { useEffect, useState } from "react";
import { Mail, Loader2 } from "lucide-react";
import SubscribeWidget from "@/components/research/SubscribeWidget";
import BackToTop from "@/components/research/BackToTop";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { sanitizeHtml } from "@/lib/sanitize";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface MethodologyData {
  id: string;
  content: string;
  last_updated: string | null;
  updated_by: string | null;
}

const eyebrowStyle: React.CSSProperties = { fontFamily: "var(--body)", fontSize: "var(--step--1)", fontWeight: 600, letterSpacing: "var(--track-caps)", textTransform: "uppercase", color: "var(--green)" };
const leadStyle: React.CSSProperties = { fontFamily: "var(--body)", fontSize: "var(--step-1)", color: "var(--mid)", lineHeight: "var(--lh-lead)" };
const bodyStyle: React.CSSProperties = { fontFamily: "var(--body)", fontSize: "var(--step-0)", color: "var(--mid)", lineHeight: "var(--lh-body)" };

const Methodology = () => {
  const [methodology, setMethodology] = useState<MethodologyData | null>(null);
  const [loading, setLoading] = useState(true);
  useScrollReveal();

  useEffect(() => {
    const fetchMethodology = async () => {
      const { data, error } = await supabase
        .from("methodology_page")
        .select("*")
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        setMethodology(data);
      }
      setLoading(false);
    };

    fetchMethodology();
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--paper)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Loader2 className="h-8 w-8 animate-spin" style={{ color: "var(--green)" }} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--paper)" }}>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navigation />
      <main id="main">
        {/* Hero */}
        <section style={{ padding: "var(--section-y-lg) 0 var(--section-y)", background: "radial-gradient(900px 520px at 88% -8%, rgba(52,211,153,0.12), transparent 60%), var(--paper)", borderBottom: "1px solid var(--rule)" }}>
          <div className="w">
            <div className="reveal" style={{ ...eyebrowStyle, marginBottom: "var(--s4)" }}>Methodology</div>
            <h1 className="reveal reveal-delay-1 h-hero" style={{ maxWidth: 880, marginBottom: "var(--s5)" }}>
              How We Conduct <em>Research</em>
            </h1>
            <p className="reveal reveal-delay-2 measure-lead" style={{ ...leadStyle, marginBottom: "var(--s4)" }}>
              Transparency first. Small samples, real data, clearly stated limitations.
            </p>
            {methodology?.last_updated && (
              <p className="reveal reveal-delay-3" style={{ fontFamily: "var(--body)", fontSize: "var(--step--1)", color: "var(--light)" }}>
                Last updated: {format(new Date(methodology.last_updated), "MMMM d, yyyy")}
              </p>
            )}
          </div>
        </section>

        {/* 01 — How We Work */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper-2)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">01</span>How We Work</div>
            <div>
              {methodology?.content ? (
                <div
                  className="reveal prose prose-lg max-w-none
                    prose-headings:font-bold
                    prose-h2:mt-12 prose-h2:mb-6
                    prose-h3:mt-8 prose-h3:mb-4
                    prose-li:my-2
                    prose-a:no-underline hover:prose-a:underline"
                  style={{
                    fontFamily: "var(--body)",
                    fontSize: "var(--step-0)",
                    color: "var(--mid)",
                    lineHeight: "var(--lh-body)",
                    ["--tw-prose-headings" as string]: "var(--ink)",
                    ["--tw-prose-body" as string]: "var(--mid)",
                    ["--tw-prose-bold" as string]: "var(--ink)",
                    ["--tw-prose-bullets" as string]: "var(--green)",
                    ["--tw-prose-counters" as string]: "var(--green)",
                    ["--tw-prose-links" as string]: "var(--green)",
                  }}
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(methodology.content) }}
                />
              ) : (
                <p className="reveal measure" style={{ ...bodyStyle, textAlign: "center", padding: "var(--s7) 0" }}>
                  Methodology content is being updated. Check back soon!
                </p>
              )}
            </div>
          </div>
        </section>

        {/* 02 — Contact */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">02</span>Contact</div>
            <div>
              <div className="reveal glass" style={{ padding: "var(--s5)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "var(--s4)" }}>
                  <Mail size={24} style={{ color: "var(--green)" }} />
                  <h2 className="h-section" style={{ minWidth: 0 }}>Contact for <em>Questions</em></h2>
                </div>
                <p className="measure" style={{ ...bodyStyle, marginBottom: "var(--s4)" }}>
                  Have questions about our methodology, want to suggest improvements, or interested in collaborating on research?
                </p>
                <a
                  href="mailto:research@emirone.com"
                  className="link-wipe"
                  style={{ fontFamily: "var(--body)", fontWeight: 600, color: "var(--green)" }}
                >
                  research@emirone.com
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 03 — Subscribe */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper-2)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">03</span>Stay Updated</div>
            <div className="reveal">
              <SubscribeWidget />
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <BackToTop />
    </div>
  );
};

export default Methodology;
