import { useNavigate } from "react-router-dom";
import { ArrowRight, Smile, Clock, HelpCircle, Forward, XCircle, Check } from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import HeroFlow from "@/components/sections/HeroFlow";
import Footer from "@/components/layout/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const rampSteps = [
  { day: "Day 1", emails: "10–20/day", desc: "Campaign kickoff + baseline monitoring" },
  { day: "Day 2", emails: "Pause", desc: "Deliverability check and adjustments" },
  { day: "Days 3–7", emails: "30–40/day", desc: "Reputation building and engagement validation" },
  { day: "Days 8–12", emails: "60–80/day", desc: "Early reply patterns and targeting refinement" },
  { day: "Day 14+", emails: "80–200/day", desc: "Campaigns fully active and optimised" },
];

const responseTypes = [
  { icon: Smile, label: "Interested", desc: "We provide context and schedule a conversation." },
  { icon: Clock, label: "Not right now", desc: "We ask for the right time to reconnect." },
  { icon: HelpCircle, label: "More information", desc: "We share tailored material and continue thoughtfully." },
  { icon: Forward, label: "Forwarded internally", desc: "We follow up with the referred decision-maker." },
  { icon: XCircle, label: "Not interested", desc: "We record the reason and disengage respectfully." },
];

const visibility = [
  "Campaigns and lists",
  "Targeting logic and decision rationale",
  "Drafts before they're sent",
  "Engagement and outcomes",
];

const emailPrinciples = [
  'Conversation-first, not "conversion copy"',
  "4–5 email cadence; each message has a role",
  "No filler, no pressure, no spam-trigger phrasing",
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

function TextLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="link-wipe" style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--body)", fontSize: 14, fontWeight: 500, color: "var(--green)", letterSpacing: "0.02em", display: "inline-flex", alignItems: "center", gap: 8, padding: 0 }}>
      {label} <ArrowRight size={15} />
    </button>
  );
}

const HowWeMakeIt = () => {
  const navigate = useNavigate();
  useScrollReveal();

  return (
    <div style={{ minHeight: "100vh", background: "var(--paper)" }}>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navigation />
      <main id="main">
        {/* Hero */}
        <section style={{ position: "relative", overflow: "hidden", isolation: "isolate", padding: "var(--section-y-lg) 0 var(--section-y)", background: "radial-gradient(900px 520px at 88% -8%, rgba(52,211,153,0.12), transparent 60%), var(--paper)", borderBottom: "1px solid var(--rule)" }}>
          <HeroFlow variant="ambient" />
          <div className="w">
            <div className="reveal" style={{ ...eyebrowStyle, marginBottom: "var(--s4)" }}>How We Make It · The Process</div>
            <h1 className="reveal reveal-delay-1 h-hero" style={{ maxWidth: 900, marginBottom: "var(--s5)" }}>
              How Emir One outbound lands, engages, and <em>converts.</em>
            </h1>
            <p className="reveal reveal-delay-2 measure-lead" style={{ ...leadStyle, marginBottom: "var(--s6)" }}>
              Deliverability, pacing, and intent respected from day one — without burning domains, trust, or reputation.
            </p>
            <div className="reveal reveal-delay-3" style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
              <PrimaryCta label="Book a revenue sprint call" onClick={() => navigate("/book")} />
              <TextLink label="View research benchmarks" onClick={() => navigate("/research")} />
            </div>
          </div>
        </section>

        {/* 01 — Deliverability Ramp */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper-2)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">01</span>The Ramp</div>
            <div>
              <h2 className="reveal h-section" style={{ marginBottom: "var(--s4)" }}>
                A deliverability-first ramp <em>(safety over speed).</em>
              </h2>
              <p className="reveal reveal-delay-1 measure" style={{ ...leadStyle, marginBottom: "var(--s6)" }}>
                We start small on purpose, then scale only when inbox placement is proven.
              </p>
              <div style={{ marginBottom: "var(--s6)" }}>
                {rampSteps.map((step, i) => (
                  <div
                    key={i}
                    className="glass ramp-card"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--s5)",
                      padding: "var(--s5)",
                      top: `calc(var(--nav-h) + 24px + ${i * 14}px)`,
                      zIndex: i + 1,
                    }}
                  >
                    <span className="tnum" style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 600, letterSpacing: "0.04em", color: "var(--green)", flexShrink: 0, width: 72 }}>{step.day}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: "var(--display)", fontSize: "var(--step-2)", fontWeight: 400, color: "var(--ink)", lineHeight: 1.2 }}>{step.emails}</p>
                      <p style={{ ...bodyStyle, marginTop: 4 }}>{step.desc}</p>
                    </div>
                    <span className="tnum" style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--light)", flexShrink: 0 }}>0{i + 1}</span>
                  </div>
                ))}
              </div>
              <div className="reveal"><TextLink label="Book a revenue sprint call" onClick={() => navigate("/book")} /></div>
            </div>
          </div>
        </section>

        {/* 02 — Email Design */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">02</span>The Copy</div>
            <div>
              <h2 className="reveal h-section" style={{ marginBottom: "var(--s5)" }}>
                Every email is written to sound human — <em>because it is.</em>
              </h2>
              <ul className="reveal reveal-delay-1" style={{ display: "grid", gap: "var(--s3)", maxWidth: "var(--measure)", marginBottom: "var(--s6)" }}>
                {emailPrinciples.map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, ...bodyStyle, color: "var(--ink)" }}>
                    <Check className="w-4 h-4 shrink-0" style={{ color: "var(--green)", marginTop: 4 }} strokeWidth={2.5} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="reveal reveal-delay-2 glass" style={{ overflow: "hidden", maxWidth: 560 }}>
                <div style={{ padding: "12px 20px", borderBottom: "1px solid var(--rule)" }}>
                  <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--mid)" }}>Sample Cadence (Wave 1)</p>
                </div>
                <div style={{ padding: "var(--s5)", display: "grid", gap: "var(--s3)", fontFamily: "var(--body)", fontSize: 14, color: "var(--ink)", lineHeight: 1.6 }}>
                  <p><span style={{ fontFamily: "var(--mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--mid)" }}>Subject:</span> {"{{Company}}'s outbound challenges"}</p>
                  <p>Hi {"{{FirstName}}"},</p>
                  <p style={{ color: "var(--mid)" }}>How do you currently handle reply qualification and follow-up timing?</p>
                  <p style={{ color: "var(--mid)" }}>{"{{Customer}}"} builds Sharia-aligned outbound infrastructure for companies like {"{{Company}}"}. We focus on permission-based prospecting with transparent metrics.</p>
                  <p style={{ color: "var(--mid)" }}>Does next Tuesday work?</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 03 — Reply Handling */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper-2)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">03</span>The Replies</div>
            <div>
              <h2 className="reveal h-section" style={{ marginBottom: "var(--s4)" }}>
                Every reply handled with care — <em>not automation.</em>
              </h2>
              <p className="reveal reveal-delay-1 measure" style={{ ...leadStyle, marginBottom: "var(--s6)" }}>
                Responses reviewed within 24 hours. No persistence beyond consent.
              </p>
              <div style={{ display: "grid", gap: "var(--s3)", marginBottom: "var(--s6)" }}>
                {responseTypes.map((type, i) => (
                  <div key={i} className="reveal glass" style={{ display: "flex", alignItems: "flex-start", gap: "var(--s4)", padding: "var(--s4)" }}>
                    <type.icon className="w-5 h-5 shrink-0" style={{ color: "var(--green)", marginTop: 2 }} strokeWidth={2} />
                    <div>
                      <p style={{ fontFamily: "var(--display)", fontSize: "var(--step-1)", fontWeight: 400, color: "var(--ink)" }}>{type.label}</p>
                      <p style={bodyStyle}>{type.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="reveal"><PrimaryCta label="Book a revenue sprint call" onClick={() => navigate("/book")} /></div>
            </div>
          </div>
        </section>

        {/* 04 — Transparency */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">04</span>Transparency</div>
            <div>
              <h2 className="reveal h-section" style={{ marginBottom: "var(--s5)" }}>
                Full visibility into what's working — <em>from day one.</em>
              </h2>
              <ul className="reveal reveal-delay-1" style={{ display: "grid", gap: "var(--s3)", maxWidth: "var(--measure)", marginBottom: "var(--s6)" }}>
                {visibility.map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, ...bodyStyle, color: "var(--ink)" }}>
                    <Check className="w-4 h-4 shrink-0" style={{ color: "var(--green)", marginTop: 4 }} strokeWidth={2.5} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="reveal"><TextLink label="See the ethics + transparency standard" onClick={() => navigate("/sharia-aligned")} /></div>
            </div>
          </div>
        </section>

        {/* 05 — Bottom Line */}
        <section style={{ padding: "var(--section-y-lg) 0", background: "radial-gradient(700px 380px at 50% 0%, rgba(52,211,153,0.14), transparent 62%), var(--paper-2)", borderTop: "1px solid var(--rule)" }}>
          <div className="w" style={{ maxWidth: 820 }}>
            <h2 className="reveal h-cta" style={{ marginBottom: "var(--s6)" }}>
              Outbound works when it's built carefully, operated ethically, <em>reviewed continuously.</em>
            </h2>
            <div className="reveal reveal-delay-1"><PrimaryCta label="Book a revenue sprint call" onClick={() => navigate("/book")} /></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowWeMakeIt;
