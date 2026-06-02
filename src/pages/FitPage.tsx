import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Check, X } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const bodyStyle: React.CSSProperties = { fontFamily: "var(--body)", fontSize: "var(--step-0)", color: "var(--mid)", lineHeight: "var(--lh-body)" };
const leadStyle: React.CSSProperties = { fontFamily: "var(--body)", fontSize: "var(--step-1)", color: "var(--mid)", lineHeight: "var(--lh-lead)" };

const FitPage = () => {
  const navigate = useNavigate();
  useScrollReveal();

  const goodFit = [
    "You have a clear offer and defined ICP",
    "You're closing $5k+ deals",
    "You're willing to protect deliverability over speed",
    "You value your reputation",
    "You can respond to qualified leads promptly",
  ];

  const notFit = [
    "You want mass automation without targeting",
    "You don't have a defined ICP",
    "You need instant volume at any cost",
    "You require pressure tactics to close",
    "You can't commit to responding to leads",
  ];

  const checklist = [
    "ICP clarity — can you describe your ideal buyer in one sentence?",
    "Pipeline goal — do you know how many conversations you need per month?",
    "Calendar availability — can you take calls within 48 hours of booking?",
    "Domain access — do you have a domain available for sending?",
    "CRM access — can you provide access to track outcomes?",
  ];

  const nextSteps = [
    { step: "01", title: "We review your application", description: "Understanding your offer, market, and goals." },
    { step: "02", title: "We clarify fit", description: "A short conversation to confirm alignment." },
    { step: "03", title: "Strategy call", description: "Deep-dive into your outbound opportunity." },
    { step: "04", title: "Sprint starts", description: "Infrastructure built, campaigns deployed." },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--paper)" }}>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navigation />
      <main id="main">
        {/* Hero */}
        <section style={{ padding: "var(--section-y-lg) 0 var(--section-y)", background: "radial-gradient(900px 520px at 88% -8%, rgba(52,211,153,0.12), transparent 60%), var(--paper)", borderBottom: "1px solid var(--rule)" }}>
          <div className="w">
            <h1 className="reveal h-hero" style={{ maxWidth: 880, marginBottom: "var(--s5)" }}>
              Check if Emir One is a <em>fit.</em>
            </h1>
            <p className="reveal reveal-delay-1 measure-lead" style={{ ...leadStyle, marginBottom: "var(--s6)" }}>
              If you're closing $5k+ deals and want controlled outbound, this is designed for you.
            </p>
            <div className="reveal reveal-delay-2" style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
              <button
                onClick={() => {
                  const el = document.getElementById("readiness");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-ghost"
                style={{ fontFamily: "var(--body)", fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", padding: "15px 28px", minHeight: 48 }}
              >
                Check If We're a Fit
              </button>
              <button
                onClick={() => navigate("/research")}
                className="link-wipe"
                style={{ fontFamily: "var(--body)", fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", color: "var(--green)", background: "transparent", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, minHeight: 48 }}
              >
                View Research Benchmarks
                <ArrowRight size={16} style={{ color: "var(--green)" }} />
              </button>
            </div>
          </div>
        </section>

        {/* 01 — Good Fit */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper-2)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">01</span>Good Fit</div>
            <div>
              <h2 className="reveal h-section" style={{ marginBottom: "var(--s6)" }}>
                Good <em>fit.</em>
              </h2>
              <ul className="reveal reveal-delay-1" style={{ display: "grid", gap: "var(--s3)", maxWidth: "var(--measure)" }}>
                {goodFit.map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, minWidth: 0, ...bodyStyle, color: "var(--ink)" }}>
                    <Check className="w-4 h-4 shrink-0" style={{ color: "var(--green)", marginTop: 4 }} strokeWidth={2.5} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 02 — Not a Fit */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">02</span>Not a Fit</div>
            <div>
              <h2 className="reveal h-section" style={{ marginBottom: "var(--s6)" }}>
                Not a <em>fit.</em>
              </h2>
              <ul className="reveal reveal-delay-1" style={{ display: "grid", gap: "var(--s3)", maxWidth: "var(--measure)" }}>
                {notFit.map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, minWidth: 0, ...bodyStyle }}>
                    <X className="w-4 h-4 shrink-0" style={{ color: "var(--light)", marginTop: 4 }} strokeWidth={2} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 03 — Readiness Checklist */}
        <section id="readiness" style={{ padding: "var(--section-y) 0", background: "var(--paper-2)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">03</span>Readiness</div>
            <div>
              <h2 className="reveal h-section" style={{ marginBottom: "var(--s4)" }}>
                Readiness checklist <em>(5 minutes).</em>
              </h2>
              <p className="reveal reveal-delay-1 measure" style={{ ...bodyStyle, marginBottom: "var(--s6)" }}>
                If you can check most of these, you're ready.
              </p>
              <ul className="reveal reveal-delay-2" style={{ display: "grid", gap: "var(--s3)", maxWidth: "var(--measure)", marginBottom: "var(--s7)" }}>
                {checklist.map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, minWidth: 0, ...bodyStyle, color: "var(--ink)" }}>
                    <span style={{ width: 16, height: 16, marginTop: 4, flexShrink: 0, borderRadius: 4, border: "1px solid var(--rule)" }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <button
                className="reveal reveal-delay-3 cta"
                onClick={() => navigate("/book")}
                style={{ fontFamily: "var(--body)", fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "15px 30px", minHeight: 48, display: "inline-flex", alignItems: "center", gap: 10 }}
              >
                BOOK A REVENUE SPRINT CALL <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* 04 — What Happens Next */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">04</span>Next</div>
            <div>
              <h2 className="reveal h-section" style={{ marginBottom: "var(--s6)" }}>
                What happens after you <em>apply.</em>
              </h2>
              <div style={{ display: "grid", gap: "var(--s5)", maxWidth: "var(--measure)" }}>
                {nextSteps.map((s, i) => (
                  <div key={i} className={`reveal${i > 0 ? ` reveal-delay-${Math.min(i, 3)}` : ""}`} style={{ display: "flex", alignItems: "flex-start", gap: 20, minWidth: 0 }}>
                    <span style={{ fontFamily: "var(--body)", fontSize: "var(--step--1)", fontWeight: 600, color: "var(--green)", marginTop: 2, flexShrink: 0 }}>{s.step}</span>
                    <div style={{ minWidth: 0 }}>
                      <h3 style={{ fontFamily: "var(--display)", fontSize: "var(--step-1)", fontWeight: 400, color: "var(--ink)", marginBottom: "var(--s1)" }}>{s.title}</h3>
                      <p style={bodyStyle}>{s.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FitPage;
