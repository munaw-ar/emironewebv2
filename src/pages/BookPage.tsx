import { useState, useMemo, useRef, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";

const CAL_URL = "https://cal.com/munawar-emirone/30min";

const BookPage = () => {
  const [searchParams] = useSearchParams();
  const initialEmail = searchParams.get("email") || localStorage.getItem("booking_email") || "";

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

  const inputClass =
    "w-full px-4 py-3.5 text-[16px] rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-24 md:pt-32 pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </Link>

          <h1 className="text-[28px] md:text-[36px] font-bold text-foreground tracking-[-0.02em] mb-3">
            Private Strategy Call — B2B Revenue Acceleration
          </h1>
          <div className="text-[15px] text-muted-foreground mb-8 max-w-[520px] leading-relaxed space-y-3">
            <p>
              This call is for founders and operators who are serious about building a predictable outbound revenue engine.
            </p>
            <p>On this call, we will:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Diagnose your current pipeline</li>
              <li>Identify revenue leaks</li>
              <li>Outline a 90-day execution plan</li>
            </ul>
            <p>Please complete the details so I can prepare properly.</p>
          </div>

          {!showCalendar ? (
            <>
              {/* Form fields */}
              <div className="grid gap-3 mb-6">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Work Email *"
                  className={inputClass}
                  autoComplete="email"
                />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name *"
                  className={inputClass}
                  autoComplete="name"
                />
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Company Name"
                  className={inputClass}
                  autoComplete="organization"
                />
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="Company Website"
                  className={inputClass}
                  autoComplete="url"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Best Phone Number"
                  className={inputClass}
                  autoComplete="tel"
                />
                <textarea
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="e.g. Generate 20 qualified calls/month, fix low reply rates, launch outbound, etc."
                  rows={3}
                  className={`${inputClass} min-h-[80px] resize-none`}
                />
                <label className="text-[13px] text-muted-foreground -mt-2">
                  Primary Revenue Goal (Next 90 Days)
                </label>
              </div>

              <button
                type="button"
                onClick={handleContinue}
                disabled={!fullName.trim() || !email.trim()}
                className="primary-cta group w-full disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span className="primary-cta__text">Continue to Calendar</span>
                <ArrowRight className="primary-cta__icon w-5 h-5 transition-transform duration-250 group-hover:translate-x-1" strokeWidth={2.5} />
              </button>
            </>
          ) : (
            <>
              {/* Cal.com embed */}
              <iframe
                src={calEmbedSrc}
                className="w-full min-h-[600px] rounded-lg border-0"
                allow="payment"
                title="Schedule a call"
              />

              {/* Fallback */}
              <p className="text-[13px] text-muted-foreground/60 text-center mt-4">
                Calendar not loading?{" "}
                <a
                  href={`${CAL_URL}?email=${encodeURIComponent(email.trim())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground transition-colors"
                >
                  Open scheduling page
                </a>
              </p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookPage;
