import { useNavigate } from "react-router-dom";
import { ArrowRight, Shield, Heart, Eye, Users, Check } from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const pillars = [
  { icon: Shield, title: "No deception", practice: "Truthful subject lines, clear identity, clear purpose", benefit: "Lower reputational risk; fewer complaint/brand damage events" },
  { icon: Heart, title: "No manipulation", practice: "No pressure, no dark patterns, no manufactured urgency", benefit: "Sustainable relationships; prospects remember you positively" },
  { icon: Users, title: "Quality over volume", practice: "Signal-based targeting, manual verification, reasonable limits", benefit: "Higher conversion rates; lower spam complaints" },
  { icon: Eye, title: "Full transparency", practice: "Full message approval, complete data access, real-time visibility", benefit: "Full control; no surprises; you own everything" },
];

const islamicPrinciples = [
  { arabic: "لا ضرر ولا ضرار", transliteration: "La darar wa la dirar", meaning: "No harm and no reciprocating harm", practice: "We design systems that protect your reputation and the recipient's inbox." },
  { arabic: "المسلم من سلم الناس من لسانه ويده", transliteration: "Al-Muslim man salima al-nasu min lisanihi wa yadihi", meaning: "A Muslim is one from whose tongue and hand people are safe", practice: "Every message we send should leave the recipient better informed, not annoyed." },
  { arabic: "الصدق في المعاملة", transliteration: "As-sidq fil-mu'amala", meaning: "Truthfulness in dealings", practice: "We never misrepresent capabilities, create false urgency, or use deceptive tactics." },
];

const outcomes = [
  "Your reputation is protected",
  "No tactics you'd be embarrassed by",
  "Sustainable, long-term relationships",
];

const eyebrowStyle: React.CSSProperties = { fontFamily: "var(--body)", fontSize: "var(--step--1)", fontWeight: 600, letterSpacing: "var(--track-caps)", textTransform: "uppercase", color: "var(--green)" };
const leadStyle: React.CSSProperties = { fontFamily: "var(--body)", fontSize: "var(--step-1)", color: "var(--mid)", lineHeight: "var(--lh-lead)" };
const bodyStyle: React.CSSProperties = { fontFamily: "var(--body)", fontSize: "var(--step-0)", color: "var(--mid)", lineHeight: "var(--lh-body)" };

function PrimaryCta({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="cta" style={{ fontFamily: "var(--body)", fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "15px 30px", minHeight: 48, display: "inline-flex", alignItems: "center", gap: 10 }}>
      {label} <ArrowRight size={16} />
    </button>
  );
}

const ShariaAligned = () => {
  const navigate = useNavigate();
  useScrollReveal();

  return (
    <div style={{ minHeight: "100vh", background: "var(--paper)" }}>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navigation />
      <main id="main">
        {/* Hero */}
        <section style={{ padding: "var(--section-y-lg) 0 var(--section-y)", background: "radial-gradient(900px 520px at 88% -8%, rgba(52,211,153,0.12), transparent 60%), var(--paper)", borderBottom: "1px solid var(--rule)" }}>
          <div className="w">
            <div className="reveal" style={{ ...eyebrowStyle, marginBottom: "var(--s4)" }}>Ethics · Sharia-Aligned</div>
            <h1 className="reveal reveal-delay-1 h-hero" style={{ maxWidth: 880, marginBottom: "var(--s5)" }}>
              What “Sharia-aligned” means in <em>outbound.</em>
            </h1>
            <p className="reveal reveal-delay-2 measure-lead" style={{ ...leadStyle, marginBottom: "var(--s6)" }}>
              Honesty, fairness, and respect for all parties — operationalized in every campaign decision.
            </p>
            <div className="reveal reveal-delay-3" style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
              <PrimaryCta label="Request a system review" onClick={() => navigate("/book")} />
              <button onClick={() => navigate("/fit")} className="btn-ghost" style={{ fontFamily: "var(--body)", fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", padding: "15px 28px", minHeight: 48 }}>
                Check if we're a fit
              </button>
            </div>
          </div>
        </section>

        {/* 01 — Four Pillars */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper-2)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">01</span>Four Pillars</div>
            <div>
              <h2 className="reveal h-section" style={{ marginBottom: "var(--s6)" }}>
                Four pillars. Concrete practices. <em>Tangible buyer outcomes.</em>
              </h2>
              <div className="grid-2">
                {pillars.map((p, i) => (
                  <div key={i} className="reveal glass" style={{ padding: "var(--s5)" }}>
                    <p.icon className="w-5 h-5" style={{ color: "var(--green)", marginBottom: "var(--s3)" }} strokeWidth={2} />
                    <h3 style={{ fontFamily: "var(--display)", fontSize: "var(--step-1)", fontWeight: 400, color: "var(--ink)", marginBottom: "var(--s2)" }}>{p.title}</h3>
                    <p style={{ ...bodyStyle, marginBottom: "var(--s2)" }}>{p.practice}</p>
                    <p style={{ fontFamily: "var(--body)", fontSize: "var(--step--1)", color: "var(--green)", fontWeight: 500, lineHeight: 1.5 }}>↳ {p.benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 02 — Islamic Ethics */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">02</span>Islamic Ethics</div>
            <div>
              <h2 className="reveal h-section" style={{ marginBottom: "var(--s6)" }}>
                Rooted in <em>Islamic business ethics.</em>
              </h2>
              <div style={{ display: "grid", gap: "var(--s4)" }}>
                {islamicPrinciples.map((p, i) => (
                  <div key={i} className="reveal glass" style={{ padding: "var(--s5)" }}>
                    <p style={{ fontFamily: "var(--display)", fontSize: "var(--step-2)", color: "var(--ink)", marginBottom: "var(--s2)", textAlign: "right" }} dir="rtl">{p.arabic}</p>
                    <p style={{ fontFamily: "var(--body)", fontSize: "var(--step--1)", color: "var(--mid)", fontStyle: "italic", marginBottom: "var(--s3)" }}>"{p.transliteration}" — {p.meaning}</p>
                    <p style={bodyStyle}><span style={{ fontWeight: 600, color: "var(--ink)" }}>In practice:</span> {p.practice}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 03 — Outcomes */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper-2)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">03</span>For You</div>
            <div>
              <h2 className="reveal h-section" style={{ marginBottom: "var(--s5)" }}>
                What this means <em>for you.</em>
              </h2>
              <ul className="reveal reveal-delay-1" style={{ display: "grid", gap: "var(--s3)", maxWidth: "var(--measure)" }}>
                {outcomes.map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, ...bodyStyle, color: "var(--ink)" }}>
                    <Check className="w-4 h-4 shrink-0" style={{ color: "var(--green)", marginTop: 4 }} strokeWidth={2.5} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 04 — Fit Gate */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">04</span>Fit</div>
            <div>
              <h2 className="reveal h-section" style={{ marginBottom: "var(--s4)" }}>
                Is this <em>right for you?</em>
              </h2>
              <p className="reveal reveal-delay-1 measure" style={{ ...leadStyle, marginBottom: "var(--s3)" }}>
                Yes if: you want long-term deliverability + brand safety.
              </p>
              <p className="reveal reveal-delay-2 measure" style={{ ...bodyStyle, marginBottom: "var(--s6)" }}>
                No if: you want shortcuts, mass blasting, or pressure tactics.
              </p>
              <div className="reveal reveal-delay-3">
                <PrimaryCta label="Request a system review" onClick={() => navigate("/book")} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ShariaAligned;
