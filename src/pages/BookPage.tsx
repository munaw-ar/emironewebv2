import { useState, useMemo, useRef, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import HeroFlow from "@/components/sections/HeroFlow";
import Footer from "@/components/layout/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { supabase } from "@/integrations/supabase/client";

const CAL_URL = "https://cal.com/munawar-emirone/30min";

const bodyStyle: React.CSSProperties = { fontFamily: "var(--body)", fontSize: "var(--step-0)", color: "var(--mid)", lineHeight: "var(--lh-body)" };
const leadStyle: React.CSSProperties = { fontFamily: "var(--body)", fontSize: "var(--step-1)", color: "var(--mid)", lineHeight: "var(--lh-lead)" };
const labelStyle: React.CSSProperties = { fontFamily: "var(--body)", fontSize: "var(--step--1)", fontWeight: 600, letterSpacing: "0.04em", color: "var(--ink)" };

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px 16px",
  fontSize: 16,
  fontFamily: "var(--body)",
  color: "var(--ink)",
  background: "#fff",
  border: "1px solid var(--rule)",
  borderRadius: 10,
  outline: "none",
};

const callAgenda = [
  "Diagnose your current pipeline",
  "Identify revenue leaks",
  "Outline a 90-day execution plan",
];

const BookPage = () => {
  const [searchParams] = useSearchParams();
  const initialEmail = searchParams.get("email") || localStorage.getItem("booking_email") || "";
  useScrollReveal();

  const [email, setEmail] = useState(initialEmail);
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [phone, setPhone] = useState("");
  const [goal, setGoal] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const leadSubmitted = useRef(false);

  const submitLead = useCallback(async () => {
    if (leadSubmitted.current || !email.trim()) return;
    leadSubmitted.current = true;
    try {
      await supabase.functions.invoke("capture-lead", {
        body: { email: email.trim(), fullName, companyName, website, phone, goal },
      });
    } catch (e) {
      console.error("Lead capture failed:", e);
      leadSubmitted.current = false;
    }
  }, [email, fullName, companyName, website, phone, goal]);

  const handleContinue = useCallback(async () => {
    if (!fullName.trim() || !email.trim()) return;
    await submitLead();
    setShowCalendar(true);
  }, [fullName, email, submitLead]);

  const calEmbedSrc = useMemo(() => {
    const params = new URLSearchParams({
      embed: "true",
      layout: "month_view",
      name: fullName,
      email: email.trim(),
    });
    const notesParts = [
      companyName && `Company: ${companyName}`,
      website && `Website: ${website}`,
      phone && `Phone: ${phone}`,
      goal && `Goal: ${goal}`,
    ].filter(Boolean);
    if (notesParts.length) {
      params.set("notes", notesParts.join(" | "));
    }
    return `${CAL_URL}?${params.toString()}`;
  }, [fullName, email, companyName, website, phone, goal]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--paper)" }}>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navigation />
      <main id="main">
        {/* Hero */}
        <section style={{ position: "relative", overflow: "hidden", isolation: "isolate", padding: "var(--section-y-lg) 0 var(--section-y)", background: "radial-gradient(900px 520px at 88% -8%, rgba(52,211,153,0.12), transparent 60%), var(--paper)", borderBottom: "1px solid var(--rule)" }}>
          <HeroFlow variant="ambient" />
          <div className="w">
            <Link
              to="/"
              className="reveal link-wipe"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--body)", fontSize: "var(--step--1)", color: "var(--green)", marginBottom: "var(--s5)", textDecoration: "none" }}
            >
              <ArrowLeft size={14} />
              Back
            </Link>

            <h1 className="reveal reveal-delay-1 h-hero" style={{ maxWidth: 880, marginBottom: "var(--s5)" }}>
              Private Strategy Call — <em>B2B Revenue Acceleration</em>
            </h1>
            <p className="reveal reveal-delay-2 measure-lead" style={{ ...leadStyle, marginBottom: "var(--s4)" }}>
              This call is for founders and operators who are serious about building a predictable outbound revenue engine.
            </p>
          </div>
        </section>

        {/* 01 — What we'll cover */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper-2)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">01</span>The Call</div>
            <div>
              <h2 className="reveal h-section" style={{ marginBottom: "var(--s5)" }}>
                On this call, <em>we will:</em>
              </h2>
              <ul className="reveal reveal-delay-1" style={{ display: "grid", gap: "var(--s3)", maxWidth: "var(--measure)", marginBottom: "var(--s5)" }}>
                {callAgenda.map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, ...bodyStyle, color: "var(--ink)" }}>
                    <Check className="w-4 h-4 shrink-0" style={{ color: "var(--green)", marginTop: 4 }} strokeWidth={2.5} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="reveal reveal-delay-2 measure" style={bodyStyle}>
                Please complete the details so I can prepare properly.
              </p>
            </div>
          </div>
        </section>

        {/* 02 — Booking */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">02</span>{showCalendar ? "Schedule" : "Your Details"}</div>
            <div style={{ minWidth: 0 }}>
              {!showCalendar ? (
                <>
                  <h2 className="reveal h-section" style={{ marginBottom: "var(--s5)" }}>
                    Tell me <em>about you.</em>
                  </h2>

                  {/* Form fields */}
                  <div className="reveal reveal-delay-1 glass" style={{ padding: "var(--s5)", marginBottom: "var(--s4)" }}>
                    <div style={{ display: "grid", gap: "var(--s3)" }}>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Work Email *"
                        style={inputStyle}
                        autoComplete="email"
                      />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Full Name *"
                        style={inputStyle}
                        autoComplete="name"
                      />
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Company Name"
                        style={inputStyle}
                        autoComplete="organization"
                      />
                      <input
                        type="text"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="Company Website"
                        style={inputStyle}
                        autoComplete="url"
                      />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Best Phone Number"
                        style={inputStyle}
                        autoComplete="tel"
                      />
                      <textarea
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        placeholder="e.g. Generate 20 qualified calls/month, fix low reply rates, launch outbound, etc."
                        rows={3}
                        style={{ ...inputStyle, minHeight: 80, resize: "none" }}
                      />
                      <label style={{ ...labelStyle, color: "var(--mid)", marginTop: "calc(var(--s2) * -1)" }}>
                        Primary Revenue Goal (Next 90 Days)
                      </label>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleContinue}
                    disabled={!fullName.trim() || !email.trim()}
                    className="reveal reveal-delay-2 cta"
                    style={{ fontFamily: "var(--body)", fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "15px 30px", minHeight: 48, display: "inline-flex", alignItems: "center", gap: 10 }}
                  >
                    Continue to Calendar <ArrowRight size={16} />
                  </button>
                </>
              ) : (
                <>
                  <h2 className="reveal h-section" style={{ marginBottom: "var(--s5)" }}>
                    Pick <em>a time.</em>
                  </h2>

                  {/* Cal.com embed */}
                  <iframe
                    src={calEmbedSrc}
                    className="reveal reveal-delay-1"
                    style={{ width: "100%", minHeight: 600, border: "1px solid var(--rule)", borderRadius: 16 }}
                    allow="payment"
                    title="Schedule a call"
                  />

                  {/* Fallback */}
                  <p style={{ fontFamily: "var(--body)", fontSize: "var(--step--1)", color: "var(--light)", textAlign: "center", marginTop: "var(--s4)" }}>
                    Calendar not loading?{" "}
                    <a
                      href={`${CAL_URL}?email=${encodeURIComponent(email.trim())}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-wipe"
                      style={{ color: "var(--green)" }}
                    >
                      Open scheduling page
                    </a>
                  </p>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BookPage;
