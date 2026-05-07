import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Smile,
  Clock,
  HelpCircle,
  Forward,
  XCircle,
  Check,
} from "lucide-react";

const HowWeMakeIt = () => {
  const heroRef = useRef(null);
  const rampRef = useRef(null);
  const emailRef = useRef(null);
  const replyRef = useRef(null);
  const visRef = useRef(null);
  const bottomRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const rampInView = useInView(rampRef, { once: true, margin: "-100px" });
  const emailInView = useInView(emailRef, { once: true, margin: "-100px" });
  const replyInView = useInView(replyRef, { once: true, margin: "-100px" });
  const visInView = useInView(visRef, { once: true, margin: "-100px" });
  const bottomInView = useInView(bottomRef, { once: true, margin: "-100px" });

  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        {/* 1. Hero */}
        <section ref={heroRef} className="bg-background pt-28 md:pt-36 pb-20 md:pb-28">
          <div className="max-w-5xl mx-auto px-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-[36px] md:text-[48px] lg:text-[56px] font-bold text-foreground leading-[1.08] tracking-[-0.02em] mb-6 max-w-[840px]"
            >
              How Emir One outbound lands, engages, and converts.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-[17px] md:text-[18px] text-muted-foreground leading-[1.65] mb-10 max-w-[540px]"
            >
              Deliverability, pacing, and intent respected from day one — without burning domains, trust, or reputation.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <button
                onClick={() => navigate("/book")}
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 text-[15px] font-semibold text-primary-foreground bg-primary hover:bg-primary-medium rounded-lg transition-colors duration-200"
              >
                BOOK A REVENUE SPRINT CALL
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <button
                onClick={() => navigate("/research")}
                className="group inline-flex items-center gap-2 px-7 py-4 text-[15px] font-semibold text-primary hover:text-primary-medium transition-colors"
              >
                View Research Benchmarks
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* 2. Deliverability Ramp */}
        <section ref={rampRef} className="py-20 md:py-28 bg-secondary">
          <div className="max-w-5xl mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={rampInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[28px] md:text-[36px] lg:text-[40px] font-semibold text-foreground leading-[1.2] mb-4 max-w-[600px]"
            >
              A deliverability-first ramp (safety over speed).
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={rampInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="text-[17px] text-muted-foreground leading-[1.65] mb-10 max-w-[540px]"
            >
              We start small on purpose, then scale only when inbox placement is proven.
            </motion.p>

            <div className="space-y-4 mb-10 max-w-[600px]">
              {rampSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={rampInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
                  className="flex items-start gap-5 p-4 rounded-lg border border-border bg-background"
                >
                  <span className="text-[13px] font-semibold text-primary mt-0.5 shrink-0 w-16">{step.day}</span>
                  <div>
                    <p className="text-[15px] font-semibold text-foreground">{step.emails}</p>
                    <p className="text-[14px] text-muted-foreground">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0, y: 12 }}
              animate={rampInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.4 }}
              onClick={() => navigate("/book")}
              className="group inline-flex items-center gap-2 text-[15px] font-semibold text-primary hover:text-primary-medium transition-colors"
            >
              Book a Revenue Sprint Call
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </motion.button>
          </div>
        </section>

        {/* 3. Email Design */}
        <section ref={emailRef} className="py-20 md:py-28 bg-background">
          <div className="max-w-5xl mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={emailInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[28px] md:text-[36px] lg:text-[40px] font-semibold text-foreground leading-[1.2] mb-6 max-w-[600px]"
            >
              Every email is written to sound human — because it is.
            </motion.h2>

            <div className="max-w-[540px]">
              <motion.ul
                initial={{ opacity: 0, y: 16 }}
                animate={emailInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="space-y-3 mb-10"
              >
                {[
                  "Conversation-first, not \"conversion copy\"",
                  "4–5 email cadence; each message has a role",
                  "No filler, no pressure, no spam-trigger phrasing",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] md:text-[16px] text-foreground leading-[1.5]">
                    <Check className="w-4 h-4 text-primary mt-1 shrink-0" strokeWidth={2.5} />
                    <span>{item}</span>
                  </li>
                ))}
              </motion.ul>

              {/* Sample cadence card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={emailInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="rounded-lg border border-border bg-secondary overflow-hidden"
              >
                <div className="px-5 py-3 border-b border-border">
                  <p className="text-[13px] text-muted-foreground font-medium">Sample Cadence (Wave 1)</p>
                </div>
                <div className="p-5 space-y-3 text-[14px] text-foreground leading-[1.6]">
                  <p><span className="text-muted-foreground text-[12px] uppercase tracking-wide">Subject:</span>{" "}{"{{Company}}'s outbound challenges"}</p>
                  <p>Hi {"{{FirstName}}"},</p>
                  <p className="text-muted-foreground">How do you currently handle reply qualification and follow-up timing?</p>
                  <p className="text-muted-foreground">{"{{Customer}}"} builds Sharia-aligned outbound infrastructure for companies like {"{{Company}}"}. We focus on permission-based prospecting with transparent metrics.</p>
                  <p className="text-muted-foreground">Does next Tuesday work?</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 4. Reply Handling */}
        <section ref={replyRef} className="py-20 md:py-28 bg-secondary">
          <div className="max-w-5xl mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={replyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[28px] md:text-[36px] lg:text-[40px] font-semibold text-foreground leading-[1.2] mb-4 max-w-[600px]"
            >
              Every reply handled with care — not automation.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={replyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="text-[17px] text-muted-foreground leading-[1.65] mb-10 max-w-[540px]"
            >
              Responses reviewed within 24 hours. No persistence beyond consent.
            </motion.p>

            <div className="space-y-3 mb-10 max-w-[540px]">
              {responseTypes.map((type, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={replyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
                  className="flex items-start gap-4 p-4 rounded-lg border border-border bg-background"
                >
                  <type.icon className="w-5 h-5 text-primary mt-0.5 shrink-0" strokeWidth={2} />
                  <div>
                    <p className="text-[15px] font-semibold text-foreground">{type.label}</p>
                    <p className="text-[14px] text-muted-foreground">{type.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0, y: 12 }}
              animate={replyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.4 }}
              onClick={() => navigate("/book")}
              className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 text-[15px] font-semibold text-primary-foreground bg-primary hover:bg-primary-medium rounded-lg transition-colors duration-200"
            >
              BOOK A REVENUE SPRINT CALL
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </motion.button>
          </div>
        </section>

        {/* 5. Transparency */}
        <section ref={visRef} className="py-20 md:py-28 bg-background">
          <div className="max-w-5xl mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={visInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[28px] md:text-[36px] lg:text-[40px] font-semibold text-foreground leading-[1.2] mb-10 max-w-[600px]"
            >
              Full visibility into what's working — from day one.
            </motion.h2>

            <ul className="space-y-3 mb-10 max-w-[540px]">
              {visibility.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={visInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                  className="flex items-start gap-3 text-[15px] md:text-[16px] text-foreground leading-[1.5]"
                >
                  <Check className="w-4 h-4 text-primary mt-1 shrink-0" strokeWidth={2.5} />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>

            <motion.button
              initial={{ opacity: 0, y: 12 }}
              animate={visInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.4 }}
              onClick={() => navigate("/sharia-aligned")}
              className="group inline-flex items-center gap-2 text-[15px] font-semibold text-primary hover:text-primary-medium transition-colors"
            >
              See the ethics + transparency standard
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </motion.button>
          </div>
        </section>

        {/* 6. Bottom Line */}
        <section ref={bottomRef} className="py-20 md:py-28 bg-secondary">
          <div className="max-w-5xl mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={bottomInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[28px] md:text-[36px] lg:text-[40px] font-semibold text-foreground leading-[1.2] mb-10 max-w-[600px]"
            >
              Outbound works when it's built carefully, operated ethically, reviewed continuously.
            </motion.h2>

            <motion.button
              initial={{ opacity: 0, y: 12 }}
              animate={bottomInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.4 }}
              onClick={() => navigate("/book")}
              className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 text-[15px] font-semibold text-primary-foreground bg-primary hover:bg-primary-medium rounded-lg transition-colors duration-200"
            >
              BOOK A REVENUE SPRINT CALL
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </motion.button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowWeMakeIt;
