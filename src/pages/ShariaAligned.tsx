import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Shield, Heart, Eye, Users, Check } from "lucide-react";

const ShariaAligned = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const pillarsRef = useRef(null);
  const pillarsInView = useInView(pillarsRef, { once: true, margin: "-100px" });
  const islamicRef = useRef(null);
  const islamicInView = useInView(islamicRef, { once: true, margin: "-100px" });
  const outcomesRef = useRef(null);
  const outcomesInView = useInView(outcomesRef, { once: true, margin: "-100px" });
  const fitRef = useRef(null);
  const fitInView = useInView(fitRef, { once: true, margin: "-100px" });
  const navigate = useNavigate();

  const pillars = [
    {
      icon: Shield,
      title: "No deception",
      practice: "Truthful subject lines, clear identity, clear purpose",
      benefit: "Lower reputational risk; fewer complaint/brand damage events",
    },
    {
      icon: Heart,
      title: "No manipulation",
      practice: "No pressure, no dark patterns, no manufactured urgency",
      benefit: "Sustainable relationships; prospects remember you positively",
    },
    {
      icon: Users,
      title: "Quality over volume",
      practice: "Signal-based targeting, manual verification, reasonable limits",
      benefit: "Higher conversion rates; lower spam complaints",
    },
    {
      icon: Eye,
      title: "Full transparency",
      practice: "Full message approval, complete data access, real-time visibility",
      benefit: "Full control; no surprises; you own everything",
    },
  ];

  const islamicPrinciples = [
    {
      arabic: "لا ضرر ولا ضرار",
      transliteration: "La darar wa la dirar",
      meaning: "No harm and no reciprocating harm",
      practice: "We design systems that protect your reputation and the recipient's inbox.",
    },
    {
      arabic: "المسلم من سلم الناس من لسانه ويده",
      transliteration: "Al-Muslim man salima al-nasu min lisanihi wa yadihi",
      meaning: "A Muslim is one from whose tongue and hand people are safe",
      practice: "Every message we send should leave the recipient better informed, not annoyed.",
    },
    {
      arabic: "الصدق في المعاملة",
      transliteration: "As-sidq fil-mu'amala",
      meaning: "Truthfulness in dealings",
      practice: "We never misrepresent capabilities, create false urgency, or use deceptive tactics.",
    },
  ];

  const outcomes = [
    "Your reputation is protected",
    "No tactics you'd be embarrassed by",
    "Sustainable, long-term relationships",
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
              What "Sharia-aligned" means in outbound.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-[17px] md:text-[18px] text-muted-foreground leading-[1.65] mb-10 max-w-[540px]"
            >
              Honesty, fairness, and respect for all parties — operationalized in every campaign decision.
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
                REQUEST A SYSTEM REVIEW
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <button
                onClick={() => navigate("/fit")}
                className="inline-flex items-center justify-center px-7 py-4 text-[15px] font-semibold text-foreground bg-transparent border border-border hover:bg-secondary rounded-lg transition-colors duration-200"
              >
                Check If We're a Fit
              </button>
            </motion.div>
          </div>
        </section>

        {/* 2. Four Pillars */}
        <section ref={pillarsRef} className="py-20 md:py-28 bg-secondary">
          <div className="max-w-5xl mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={pillarsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[28px] md:text-[36px] lg:text-[40px] font-semibold text-foreground leading-[1.2] mb-12 max-w-[600px]"
            >
              Four pillars. Concrete practices. Tangible buyer outcomes.
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[680px]">
              {pillars.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={pillarsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                  className="p-6 rounded-lg border border-border bg-background"
                >
                  <p.icon className="w-5 h-5 text-primary mb-4" strokeWidth={2} />
                  <h3 className="text-[17px] font-semibold text-foreground mb-2">{p.title}</h3>
                  <p className="text-[14px] text-muted-foreground leading-[1.5] mb-3">{p.practice}</p>
                  <p className="text-[13px] text-primary font-medium leading-[1.5]">↳ {p.benefit}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Islamic Ethics */}
        <section ref={islamicRef} className="py-20 md:py-28 bg-background">
          <div className="max-w-5xl mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={islamicInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[28px] md:text-[36px] lg:text-[40px] font-semibold text-foreground leading-[1.2] mb-12 max-w-[600px]"
            >
              Rooted in Islamic business ethics.
            </motion.h2>

            <div className="space-y-6 max-w-[600px]">
              {islamicPrinciples.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={islamicInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                  className="p-6 rounded-lg border border-border bg-secondary"
                >
                  <p className="text-[22px] md:text-[26px] text-foreground mb-2 text-right font-medium" dir="rtl">
                    {p.arabic}
                  </p>
                  <p className="text-[13px] text-muted-foreground italic mb-3">
                    "{p.transliteration}" — {p.meaning}
                  </p>
                  <p className="text-[15px] text-muted-foreground leading-[1.6]">
                    <span className="font-semibold text-foreground">In practice:</span> {p.practice}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. What This Means For You */}
        <section ref={outcomesRef} className="py-20 md:py-28 bg-secondary">
          <div className="max-w-5xl mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={outcomesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[28px] md:text-[36px] lg:text-[40px] font-semibold text-foreground leading-[1.2] mb-10 max-w-[600px]"
            >
              What this means for you.
            </motion.h2>

            <ul className="space-y-4 max-w-[540px]">
              {outcomes.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={outcomesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                  className="flex items-start gap-3 text-[15px] md:text-[16px] text-foreground leading-[1.5]"
                >
                  <Check className="w-4 h-4 text-primary mt-1 shrink-0" strokeWidth={2.5} />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5. Fit Gate */}
        <section ref={fitRef} className="py-20 md:py-28 bg-background">
          <div className="max-w-5xl mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={fitInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[28px] md:text-[36px] lg:text-[40px] font-semibold text-foreground leading-[1.2] mb-6 max-w-[600px]"
            >
              Is this right for you?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={fitInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="text-[17px] text-muted-foreground leading-[1.65] mb-4 max-w-[540px]"
            >
              Yes if: you want long-term deliverability + brand safety.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={fitInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-[15px] text-muted-foreground leading-[1.6] mb-10 max-w-[540px]"
            >
              No if: you want shortcuts, mass blasting, or pressure tactics.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 12 }}
              animate={fitInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.4 }}
              onClick={() => navigate("/book")}
              className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 text-[15px] font-semibold text-primary-foreground bg-primary hover:bg-primary-medium rounded-lg transition-colors duration-200"
            >
              REQUEST A SYSTEM REVIEW
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </motion.button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ShariaAligned;
