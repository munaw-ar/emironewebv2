import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Check, X } from "lucide-react";

const FitPage = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const goodRef = useRef(null);
  const goodInView = useInView(goodRef, { once: true, margin: "-100px" });
  const notRef = useRef(null);
  const notInView = useInView(notRef, { once: true, margin: "-100px" });
  const checklistRef = useRef(null);
  const checklistInView = useInView(checklistRef, { once: true, margin: "-100px" });
  const nextRef = useRef(null);
  const nextInView = useInView(nextRef, { once: true, margin: "-100px" });
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        {/* Hero */}
        <section ref={heroRef} className="bg-background pt-28 md:pt-36 pb-20 md:pb-28">
          <div className="max-w-5xl mx-auto px-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-[36px] md:text-[48px] lg:text-[56px] font-bold text-foreground leading-[1.08] tracking-[-0.02em] mb-6 max-w-[840px]"
            >
              Check if Emir One is a fit.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-[17px] md:text-[18px] text-muted-foreground leading-[1.65] mb-10 max-w-[540px]"
            >
              If you're closing $5k+ deals and want controlled outbound, this is designed for you.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <button
                onClick={() => {
                  const el = document.getElementById("readiness");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center px-7 py-4 text-[15px] font-semibold text-foreground bg-transparent border border-border hover:bg-secondary rounded-lg transition-colors duration-200"
              >
                Check If We're a Fit
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

        {/* Good Fit */}
        <section ref={goodRef} className="py-20 md:py-28 bg-secondary">
          <div className="max-w-5xl mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={goodInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[28px] md:text-[36px] lg:text-[40px] font-semibold text-foreground leading-[1.2] mb-10 max-w-[600px]"
            >
              Good fit.
            </motion.h2>
            <ul className="space-y-4 max-w-[540px]">
              {goodFit.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={goodInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                  className="flex items-start gap-3 text-[15px] md:text-[16px] text-foreground leading-[1.5]"
                >
                  <Check className="w-4 h-4 text-primary mt-1 shrink-0" strokeWidth={2.5} />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* Not a Fit */}
        <section ref={notRef} className="py-20 md:py-28 bg-background">
          <div className="max-w-5xl mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={notInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[28px] md:text-[36px] lg:text-[40px] font-semibold text-foreground leading-[1.2] mb-10 max-w-[600px]"
            >
              Not a fit.
            </motion.h2>
            <ul className="space-y-4 max-w-[540px]">
              {notFit.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={notInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                  className="flex items-start gap-3 text-[15px] md:text-[16px] text-muted-foreground leading-[1.5]"
                >
                  <X className="w-4 h-4 text-muted-foreground/60 mt-1 shrink-0" strokeWidth={2} />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* Readiness Checklist */}
        <section ref={checklistRef} id="readiness" className="py-20 md:py-28 bg-secondary">
          <div className="max-w-5xl mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={checklistInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[28px] md:text-[36px] lg:text-[40px] font-semibold text-foreground leading-[1.2] mb-4 max-w-[600px]"
            >
              Readiness checklist (5 minutes).
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={checklistInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="text-[15px] text-muted-foreground leading-[1.6] mb-10 max-w-[540px]"
            >
              If you can check most of these, you're ready.
            </motion.p>
            <ul className="space-y-4 mb-12 max-w-[540px]">
              {checklist.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={checklistInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
                  className="flex items-start gap-3 text-[15px] md:text-[16px] text-foreground leading-[1.5]"
                >
                  <div className="w-4 h-4 mt-1 shrink-0 rounded border border-border" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>

            <motion.button
              initial={{ opacity: 0, y: 12 }}
              animate={checklistInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.4 }}
              onClick={() => navigate("/book")}
              className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 text-[15px] font-semibold text-primary-foreground bg-primary hover:bg-primary-medium rounded-lg transition-colors duration-200"
            >
              BOOK A REVENUE SPRINT CALL
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </motion.button>
          </div>
        </section>

        {/* What Happens Next */}
        <section ref={nextRef} className="py-20 md:py-28 bg-background">
          <div className="max-w-5xl mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={nextInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[28px] md:text-[36px] lg:text-[40px] font-semibold text-foreground leading-[1.2] mb-12 max-w-[600px]"
            >
              What happens after you apply.
            </motion.h2>
            <div className="space-y-8 max-w-[600px]">
              {nextSteps.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={nextInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                  className="flex items-start gap-5"
                >
                  <span className="text-[14px] font-semibold text-primary mt-0.5 shrink-0">{s.step}</span>
                  <div>
                    <h3 className="text-[17px] font-semibold text-foreground mb-1">{s.title}</h3>
                    <p className="text-[15px] text-muted-foreground leading-[1.6]">{s.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FitPage;
