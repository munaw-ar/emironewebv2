import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLenis } from "@/App";
import { ArrowRight, Smile, Clock, HelpCircle, Forward, XCircle, Check, Server, Target, PenLine, MessageSquare, CalendarCheck } from "lucide-react";
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

const triggers = [
  "Funding round", "New exec hire", "Project awarded",
  "Expansion / new office", "Stale job post", "Grant or seasonal window",
];

const scoring = [
  { label: "Firmographic fit", weight: 40, note: "size, revenue, tools in use" },
  { label: "Role fit", weight: 30, note: "a decision-maker, not a gatekeeper" },
  { label: "Trigger event", weight: 20, note: "a recent, real reason to reach out" },
  { label: "Engagement", weight: 10, note: "active and reachable right now" },
];

const tiers = [
  { tier: "A", range: "8–10", action: "Hand-written outreach, sent first" },
  { tier: "B", range: "5–7", action: "A considered second batch" },
  { tier: "C", range: "0–4", action: "Held back or nurtured later" },
];

const cadence = [
  { day: "Day 0", role: "First touch — trigger + a useful asset" },
  { day: "Day 1", role: "Specific, low-friction nudge" },
  { day: "Day 4", role: "A fresh angle" },
  { day: "Day 7", role: "Peer proof" },
  { day: "Day 11", role: "A different channel" },
  { day: "Day 14", role: "A gracious break-up", end: true },
];

const sampleEmails = [
  {
    tag: "Manufacturing",
    subject: "ductwork lead times",
    body: "Hi {First}, saw {Company} picked up the {project} fit-out. When a fabricator runs three weeks out on ducting, it's usually your install crews standing around that hurts, not the steel.\n\nWe're a {region} sheet-metal shop that holds shorter lead times on HVAC ducting because we keep capacity for trade accounts, not one-off retail work.\n\nWorth me sending our current lead times and a capacity sheet? No obligation either way.",
  },
  {
    tag: "AI / Deep Tech",
    subject: "ml capacity",
    body: "Hi {First}, saw {Company}'s work on {their domain}. The part that usually stalls isn't the build — it's getting ML into production inside a client's existing architecture.\n\nWe're a Singapore lab that supplies research-grade ML capacity to teams like yours, under your name, so you can take on the agentic work without hiring a research team.\n\nWant a short note on how we'd approach {their case}? No call needed.",
  },
  {
    tag: "Social Impact",
    subject: "education csr",
    body: "Hi {First}, saw {Bank}'s CSR focus on education this year. We're a Dhaka youth-led organization that has taken full responsibility of a school and runs a recurring book and supplies drive, with a Diana Legacy Award and grassroots field records behind the work.\n\nCould I send a one-page partnership note showing how a {Bank} sponsorship would translate into verifiable classroom outcomes? No commitment either way.",
  },
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

const flowNodes = [
  { icon: Server, label: "Infrastructure", target: "hwmi-infra" },
  { icon: Target, label: "The List", target: "hwmi-list" },
  { icon: PenLine, label: "The Copy", target: "hwmi-copy" },
  { icon: MessageSquare, label: "The Replies", target: "hwmi-replies" },
  { icon: CalendarCheck, label: "Calls booked", end: true },
];

const eyebrowStyle: React.CSSProperties = { fontFamily: "var(--body)", fontSize: "var(--step--1)", fontWeight: 600, letterSpacing: "var(--track-caps)", textTransform: "uppercase", color: "var(--green)" };
const leadStyle: React.CSSProperties = { fontFamily: "var(--body)", fontSize: "var(--step-1)", color: "var(--mid)", lineHeight: "var(--lh-lead)" };
const bodyStyle: React.CSSProperties = { fontFamily: "var(--body)", fontSize: "var(--step-0)", color: "var(--mid)", lineHeight: "var(--lh-body)" };
const stageTitle: React.CSSProperties = { fontFamily: "var(--display)", fontSize: "var(--step-3)", fontWeight: 400, color: "var(--ink)", lineHeight: 1.12, letterSpacing: "-0.01em" };

function PrimaryCta({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="cta" style={{ fontFamily: "var(--body)", fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "15px 30px", minHeight: 48, display: "inline-flex", alignItems: "center", gap: 10 }}>
      {label} <ArrowRight size={16} />
    </button>
  );
}

function GhostCta({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="btn-ghost" style={{ fontFamily: "var(--body)", fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", padding: "14px 26px", minHeight: 48, display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
      {label} <ArrowRight size={15} />
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

function ProofChip({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 600, letterSpacing: "0.02em", color: "var(--green)", border: "1px solid var(--mint)", background: "rgba(52,211,153,0.08)", borderRadius: 20, padding: "6px 11px" }}>
      {children}
    </span>
  );
}

/** A pipeline stage: numbered node on a continuous vertical spine + content.
 *  The node fills in once it's the current/passed stage; the line below fills
 *  once the next stage has been reached — a scroll progress indicator. */
function Stage({ id, num, index, active, eyebrow, title, first, last, children }: { id: string; num: string; index: number; active: number; eyebrow: string; title: React.ReactNode; first?: boolean; last?: boolean; children: React.ReactNode }) {
  const reached = active >= 0 && index <= active;
  const lineFilled = active >= 0 && index < active;
  return (
    <div className="pipe-stage" id={id}>
      <div className="pipe-rail">
        <span className="pipe-line" style={{ top: first ? 22 : 0, bottom: last ? "calc(100% - 22px)" : 0, background: lineFilled ? "var(--green)" : "var(--rule)" }} />
        <span className="pipe-node tnum" style={reached ? { background: "var(--green)", color: "#fff" } : undefined}>{num}</span>
      </div>
      <div style={{ paddingBottom: last ? 0 : "var(--section-y)" }}>
        <div className="reveal" style={{ ...eyebrowStyle, marginBottom: "var(--s3)" }}>{eyebrow}</div>
        <h2 className="reveal reveal-delay-1" style={{ ...stageTitle, marginBottom: "var(--s4)" }}>{title}</h2>
        {children}
      </div>
    </div>
  );
}

function SampleEmailCard() {
  const [active, setActive] = useState(0);
  const email = sampleEmails[active];
  return (
    <div className="reveal reveal-delay-1 glass" style={{ overflow: "hidden", maxWidth: 580 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, padding: "12px 14px", borderBottom: "1px solid var(--rule)", background: "var(--paper-2)" }}>
        {sampleEmails.map((s, i) => (
          <button
            key={s.tag}
            onClick={() => setActive(i)}
            style={{
              fontFamily: "var(--mono)", fontSize: 10.5, fontWeight: 600, letterSpacing: "0.04em",
              padding: "6px 10px", borderRadius: 20, cursor: "pointer",
              border: `1px solid ${i === active ? "var(--green)" : "var(--rule)"}`,
              background: i === active ? "var(--green)" : "transparent",
              color: i === active ? "#fff" : "var(--mid)",
            }}
          >
            {s.tag}
          </button>
        ))}
      </div>
      <div style={{ padding: "var(--s5)" }}>
        <p style={{ fontFamily: "var(--mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--mid)", marginBottom: "var(--s3)" }}>
          Subject: <span style={{ color: "var(--ink)" }}>{email.subject}</span>
        </p>
        <p style={{ fontFamily: "var(--body)", fontSize: 14, color: "var(--ink)", lineHeight: 1.65, whiteSpace: "pre-line" }}>{email.body}</p>
      </div>
    </div>
  );
}

const HowWeMakeIt = () => {
  const navigate = useNavigate();
  const lenis = useLenis();
  const stickyRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);
  useScrollReveal();

  const bookCall = () => navigate("/book");
  const scoreDomain = () => navigate("/");

  // Track which stage is currently under the sticky bar so the overview + spine
  // read as a live progress indicator as the visitor scrolls.
  useEffect(() => {
    const ids = ["hwmi-infra", "hwmi-list", "hwmi-copy", "hwmi-replies"];
    const compute = () => {
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-h"), 10) || 60;
      const desktop = window.matchMedia("(min-width: 1024px)").matches;
      const inset = navH + 16 + (desktop ? (stickyRef.current?.offsetHeight || 0) : 0);
      let cur = -1;
      ids.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= inset) cur = i;
      });
      setActive((prev) => (prev === cur ? prev : cur));
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  // Scroll a flow-overview node to its stage. The site's global
  // `[id] { scroll-margin-top }` already encodes the nav offset and both Lenis
  // and native smooth scroll honor it — so no extra offset here.
  const scrollToStage = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { duration: 1.0 });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--paper)" }}>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navigation />
      <main id="main">
        {/* Hero — unchanged */}
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
              <PrimaryCta label="Book a revenue sprint call" onClick={bookCall} />
              <TextLink label="View research benchmarks" onClick={() => navigate("/research")} />
            </div>
          </div>
        </section>

        {/* The system — sticky overview that tracks scroll + the pipeline */}
        <section style={{ background: "var(--paper)" }}>
          <div className="w" style={{ paddingTop: "var(--section-y)", paddingBottom: "var(--s6)" }}>
            <div className="reveal" style={{ ...eyebrowStyle, marginBottom: "var(--s3)" }}>The System</div>
            <h2 className="reveal reveal-delay-1 h-section" style={{ marginBottom: "var(--s4)", maxWidth: 820 }}>
              One connected system — <em>built end to end.</em>
            </h2>
            <p className="reveal reveal-delay-2 measure-lead" style={{ ...leadStyle }}>
              Most agencies start at the copy and rent everything underneath it. We start at the infrastructure — and you own all of it.
            </p>
          </div>

          {/* sticky overview bar — locks under the nav and tracks the active stage */}
          <div className="hwmi-sticky" ref={stickyRef}>
            <div className="w" style={{ paddingTop: 14, paddingBottom: 14 }}>
              <div className="reveal" style={{ display: "flex", alignItems: "stretch", gap: 10, flexWrap: "wrap" }}>
                {flowNodes.map((n, i) => {
                  const isCurrent = i === active;
                  const isPassed = active >= 0 && i < active && !n.end;
                  const lit = !n.end && (isCurrent || isPassed);
                  const boxStyle: React.CSSProperties = {
                    flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                    textAlign: "center", padding: "13px 8px", borderRadius: 14,
                    border: `1px solid ${n.end || lit ? "var(--green)" : "var(--rule)"}`,
                    background: n.end ? "var(--green)" : isCurrent ? "rgba(13,92,56,0.10)" : isPassed ? "rgba(13,92,56,0.05)" : "var(--paper-2)",
                    boxShadow: isCurrent ? "0 4px 16px rgba(13,92,56,0.12)" : "none",
                    minWidth: 0,
                  };
                  const inner = (
                    <>
                      <n.icon size={20} strokeWidth={1.75} style={{ color: n.end ? "#fff" : "var(--green)" }} />
                      <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, fontWeight: 600, letterSpacing: "0.03em", color: n.end ? "#fff" : lit ? "var(--green)" : "var(--ink)" }}>{n.label}</span>
                    </>
                  );
                  return (
                    <div key={n.label} style={{ display: "flex", alignItems: "center", gap: 10, flex: "1 1 150px" }}>
                      {n.end ? (
                        <button onClick={bookCall} className="flow-node end" aria-label="Book a revenue sprint call" style={{ ...boxStyle, font: "inherit", cursor: "pointer" }}>{inner}</button>
                      ) : (
                        <button onClick={() => scrollToStage(n.target!)} className="flow-node" aria-current={isCurrent ? "step" : undefined} aria-label={`Jump to ${n.label}`} style={{ ...boxStyle, font: "inherit", cursor: "pointer" }}>{inner}</button>
                      )}
                      {i < flowNodes.length - 1 && (
                        <span aria-hidden className="flow-arrow" style={{ flexShrink: 0, color: "var(--mint)", fontSize: 16, fontWeight: 700 }}>→</span>
                      )}
                    </div>
                  );
                })}
              </div>
              <div aria-hidden style={{ marginTop: 12, height: 2, borderRadius: 2, background: "var(--rule)", overflow: "hidden" }}>
                <div className="flow-sweep" style={{ width: "100%", height: "100%" }} />
              </div>
            </div>
          </div>

          {/* the pipeline — four stages on one continuous spine */}
          <div className="w" style={{ paddingTop: "var(--s7)", paddingBottom: "var(--section-y)" }}>

            {/* 01 — Infrastructure */}
            <Stage id="hwmi-infra" num="01" index={0} active={active} first eyebrow="The Infrastructure" title={<>We build on ground <em>you own.</em></>}>
              <p className="reveal reveal-delay-1 measure" style={{ ...bodyStyle, marginBottom: "var(--s4)" }}>
                Dedicated sending domains — never your brand domain. SPF, DKIM and DMARC hardened to a 10/10 MXToolbox score. Secondary domains for resilience. And a 21-day monitored warm-up before a single cold email goes out.
              </p>
              <p className="reveal reveal-delay-1 measure" style={{ ...bodyStyle, marginBottom: "var(--s5)", color: "var(--ink)" }}>
                We've watched outbound reporting vanish overnight when it was built on rented domains. So you own the domains and the infrastructure from day one — it's an asset, not a rental.
              </p>

              <div style={{ marginBottom: "var(--s5)" }}>
                {rampSteps.map((step, i) => (
                  <div key={i} className="reveal glass" style={{ display: "flex", alignItems: "center", gap: "var(--s4)", padding: "var(--s4) var(--s5)", marginBottom: "var(--s2)" }}>
                    <span className="tnum" style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 600, letterSpacing: "0.04em", color: "var(--green)", flexShrink: 0, width: 72 }}>{step.day}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontFamily: "var(--display)", fontSize: "var(--step-1)", fontWeight: 400, color: "var(--ink)", lineHeight: 1.2 }}>{step.emails}</p>
                      <p style={{ ...bodyStyle, fontSize: "var(--step--1)", marginTop: 2 }}>{step.desc}</p>
                    </div>
                    <span className="tnum" style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--light)", flexShrink: 0 }}>0{i + 1}</span>
                  </div>
                ))}
              </div>

              <div className="reveal" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: "var(--s5)" }}>
                <ProofChip>10 / 10 MXToolbox</ProofChip>
                <ProofChip>21-day warm-up</ProofChip>
                <ProofChip>SPF · DKIM · DMARC</ProofChip>
              </div>

              <div className="reveal" style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "center" }}>
                <GhostCta label="Score your domain free" onClick={scoreDomain} />
                <TextLink label="Why you should own your infrastructure" onClick={() => navigate("/research/industry/sheet-metal-outbound")} />
              </div>
            </Stage>

            {/* 02 — The List */}
            <Stage id="hwmi-list" num="02" index={1} active={active} eyebrow="The List · the engine" title={<>We don't buy lists. <em>We build them from signals.</em></>}>
              <p className="reveal reveal-delay-1 measure" style={{ ...bodyStyle, marginBottom: "var(--s5)" }}>
                Every send starts from a real event — a trigger that means now is the moment. Then every prospect is scored on weighted signals and tiered, so the best-fit accounts get hand-written outreach and the rest never cost us an afternoon.
              </p>

              <p className="reveal" style={{ ...eyebrowStyle, color: "var(--mid)", marginBottom: "var(--s3)" }}>Triggers we watch for</p>
              <div className="reveal" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: "var(--s6)" }}>
                {triggers.map((t) => (
                  <span key={t} style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 500, color: "var(--green)", border: "1px solid var(--mint)", background: "rgba(52,211,153,0.06)", borderRadius: 20, padding: "8px 13px" }}>{t}</span>
                ))}
              </div>

              <div className="reveal glass" style={{ padding: "var(--s5)", marginBottom: "var(--s5)", maxWidth: 620 }}>
                <p style={{ fontFamily: "var(--mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--mid)", marginBottom: "var(--s4)" }}>The scoring model</p>
                <div style={{ display: "grid", gap: "var(--s3)" }}>
                  {scoring.map((s) => (
                    <div key={s.label}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, marginBottom: 5 }}>
                        <span style={{ fontFamily: "var(--body)", fontSize: "var(--step--1)", fontWeight: 600, color: "var(--ink)" }}>{s.label} <span style={{ fontWeight: 400, color: "var(--light)" }}>· {s.note}</span></span>
                        <span className="tnum" style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 600, color: "var(--green)", flexShrink: 0 }}>{s.weight}%</span>
                      </div>
                      <div style={{ height: 8, borderRadius: 4, background: "var(--rule)", overflow: "hidden" }}>
                        <div style={{ width: `${s.weight}%`, height: "100%", borderRadius: 4, background: "var(--green)" }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--s3)", marginTop: "var(--s5)", paddingTop: "var(--s4)", borderTop: "1px solid var(--rule)" }}>
                  {tiers.map((t) => (
                    <div key={t.tier} style={{ flex: "1 1 150px", minWidth: 0 }}>
                      <p style={{ fontFamily: "var(--display)", fontSize: "var(--step-1)", color: "var(--ink)" }}><span style={{ color: "var(--green)" }}>{t.tier}</span> <span className="tnum" style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--light)" }}>{t.range}</span></p>
                      <p style={{ ...bodyStyle, fontSize: "var(--step--1)", marginTop: 2 }}>{t.action}</p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="reveal measure" style={{ ...bodyStyle, fontSize: "var(--step--1)", marginBottom: "var(--s5)" }}>
                Then the list is verified and hand-curated — role inboxes like <span style={{ fontFamily: "var(--mono)", fontSize: 12 }}>info@</span> and <span style={{ fontFamily: "var(--mono)", fontSize: 12 }}>sales@</span> are removed entirely. Signal-led outreach replies well above the spray-and-pray baseline. Our published figures are modeled or recalled, and we label them as such — so read them yourself.
              </p>

              <div className="reveal" style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "center" }}>
                <TextLink label="Manufacturing · shutdown-window triggers" onClick={() => navigate("/research/industry/sheet-metal-outbound")} />
                <TextLink label="Social Impact · CSR-cycle triggers" onClick={() => navigate("/research/industry/amplitude-funder-outreach")} />
              </div>
            </Stage>

            {/* 03 — The Copy */}
            <Stage id="hwmi-copy" num="03" index={2} active={active} eyebrow="The Copy" title={<>Written by a human, <em>for one human.</em></>}>
              <p className="reveal reveal-delay-1 measure" style={{ ...bodyStyle, marginBottom: "var(--s5)" }}>
                Trigger + offer. We open with what we actually saw, then lead with something useful — a teardown, a one-pager, a capacity sheet — never a call ask in the first email. Up to six touches over about 14 days, each with a job, ending in a gracious break-up. No filler, no pressure, no spam-trigger phrasing.
              </p>

              {/* cadence timeline */}
              <div className="reveal" style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: "var(--s6)" }}>
                {cadence.map((c) => (
                  <div key={c.day} style={{ flex: "1 1 130px", minWidth: 0, borderTop: `2px solid ${c.end ? "var(--green)" : "var(--rule)"}`, paddingTop: "var(--s2)" }}>
                    <p className="tnum" style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 600, color: c.end ? "var(--green)" : "var(--ink)" }}>{c.day}</p>
                    <p style={{ ...bodyStyle, fontSize: "var(--step--1)", marginTop: 3 }}>{c.role}</p>
                  </div>
                ))}
              </div>

              <SampleEmailCard />

              <p className="reveal measure" style={{ ...bodyStyle, fontSize: "var(--step--1)", margin: "var(--s5) 0" }}>
                Every email passes a five-question human test before it sends. If it reads like it could have gone to 200 people, it doesn't go to anyone.
              </p>

              <div className="reveal">
                <TextLink label="Read the messages that actually worked" onClick={() => navigate("/research/industry/sheet-metal-outbound#what-worked")} />
              </div>
            </Stage>

            {/* 04 — The Replies */}
            <Stage id="hwmi-replies" num="04" index={3} active={active} last eyebrow="The Replies" title={<>Every reply handled like it matters — <em>because it does.</em></>}>
              <p className="reveal reveal-delay-1 measure" style={{ ...bodyStyle, marginBottom: "var(--s5)" }}>
                Reviewed within 24 hours, by a person, never an auto-responder. We don't persist beyond consent — if someone's out, they're out, across every domain.
              </p>

              <div style={{ display: "grid", gap: "var(--s3)", marginBottom: "var(--s5)" }}>
                {responseTypes.map((type, i) => (
                  <div key={i} className="reveal glass" style={{ display: "flex", alignItems: "flex-start", gap: "var(--s4)", padding: "var(--s4)" }}>
                    <type.icon className="w-5 h-5 shrink-0" style={{ color: "var(--green)", marginTop: 2 }} strokeWidth={2} />
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontFamily: "var(--display)", fontSize: "var(--step-1)", fontWeight: 400, color: "var(--ink)" }}>{type.label}</p>
                      <p style={bodyStyle}>{type.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="reveal measure" style={{ ...bodyStyle, marginBottom: "var(--s5)", fontStyle: "italic", color: "var(--ink)" }}>
                When you reply to us, you'll feel exactly this.
              </p>
              <div className="reveal"><PrimaryCta label="Book a revenue sprint call" onClick={bookCall} /></div>
            </Stage>

          </div>
        </section>

        {/* Proof & transparency */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper-2)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">05</span>Proof</div>
            <div>
              <h2 className="reveal h-section" style={{ marginBottom: "var(--s4)" }}>
                Don't take our word for it — <em>read the research.</em>
              </h2>
              <p className="reveal reveal-delay-1 measure" style={{ ...leadStyle, marginBottom: "var(--s5)" }}>
                Full visibility from day one, and every claim on this page backed by a published case study or experiment.
              </p>
              <ul className="reveal reveal-delay-1" style={{ display: "grid", gap: "var(--s3)", maxWidth: "var(--measure)", marginBottom: "var(--s6)" }}>
                {visibility.map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, ...bodyStyle, color: "var(--ink)" }}>
                    <Check className="w-4 h-4 shrink-0" style={{ color: "var(--green)", marginTop: 4 }} strokeWidth={2.5} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="reveal" style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "center" }}>
                <GhostCta label="Explore the research & case studies" onClick={() => navigate("/research")} />
                <TextLink label="See the ethics + transparency standard" onClick={() => navigate("/sharia-aligned")} />
              </div>
            </div>
          </div>
        </section>

        {/* Final close */}
        <section style={{ padding: "var(--section-y-lg) 0", background: "radial-gradient(700px 380px at 50% 0%, rgba(52,211,153,0.14), transparent 62%), var(--paper)", borderTop: "1px solid var(--rule)" }}>
          <div className="w" style={{ maxWidth: 820 }}>
            <h2 className="reveal h-cta" style={{ marginBottom: "var(--s5)" }}>
              Built carefully, operated ethically, <em>reviewed continuously.</em>
            </h2>
            <p className="reveal reveal-delay-1 measure-lead" style={{ ...leadStyle, marginBottom: "var(--s6)" }}>
              If that's the kind of outbound you want running under your name, let's talk. No pressure — same as everything above.
            </p>
            <div className="reveal reveal-delay-2" style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
              <PrimaryCta label="Book a revenue sprint call" onClick={bookCall} />
              <TextLink label="Or just score your domain free" onClick={scoreDomain} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowWeMakeIt;
