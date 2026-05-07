import { memo } from "react";
import { motion, useInView } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { ArrowRight, FileText, FlaskConical, BookOpen, TestTube, Download, Check } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import SubscribeWidget from "@/components/research/SubscribeWidget";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { useLatestQuarterlyReport, useFeaturedResearch, useIncrementDownloadCount, isNewContent, formatNumber } from "@/hooks/useResearchData";

const ResearchCard = memo(({ research, isNew }: { research: any; isNew: boolean }) => (
  <Link
    to={`/research/industry/${research.slug}`}
    className="relative block p-5 rounded-lg border border-border bg-background hover:bg-secondary transition-colors group"
  >
    {isNew && (
      <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded">
        NEW
      </span>
    )}
    <div className="flex items-center gap-2 mb-2">
      <span className="text-[12px] font-medium text-primary">{research.industry_name}</span>
      <span className="text-[12px] text-muted-foreground">· {research.quarter}</span>
    </div>
    <h3 className="text-[15px] font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
      {research.title}
    </h3>
    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border">
      <div>
        <p className="text-[16px] font-bold text-foreground">{research.open_rate_range || "N/A"}</p>
        <p className="text-[11px] text-muted-foreground">Open Rate</p>
      </div>
      <div>
        <p className="text-[16px] font-bold text-foreground">{research.reply_rate_range || "N/A"}</p>
        <p className="text-[11px] text-muted-foreground">Reply Rate</p>
      </div>
    </div>
  </Link>
));
ResearchCard.displayName = "ResearchCard";

const ResearchCardSkeleton = () => (
  <div className="p-5 rounded-lg border border-border bg-background">
    <Skeleton className="h-4 w-3/4 mb-2" />
    <Skeleton className="h-4 w-1/2 mb-3" />
    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border">
      <Skeleton className="h-5 w-14" />
      <Skeleton className="h-5 w-14" />
    </div>
  </div>
);

const ResearchHub = () => {
  const { data: latestReport, isLoading: isLoadingReport } = useLatestQuarterlyReport();
  const { data: featuredResearch, isLoading: isLoadingResearch } = useFeaturedResearch();
  const incrementDownload = useIncrementDownloadCount();
  const navigate = useNavigate();

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const catRef = useRef(null);
  const catInView = useInView(catRef, { once: true, margin: "-100px" });
  const bridgeRef = useRef(null);
  const bridgeInView = useInView(bridgeRef, { once: true, margin: "-100px" });

  const tabs = [
    { label: "Industry Research", href: "/research/industry", icon: FileText, desc: "Cold email benchmarks by industry" },
    { label: "Experiment Logs", href: "/research/experiments", icon: FlaskConical, desc: "Real tests, real results" },
    { label: "Quarterly Reports", href: "/research/reports", icon: BookOpen, desc: "Cross-industry insights" },
    { label: "Methodology", href: "/research/methodology", icon: TestTube, desc: "How we research" },
  ];

  const bridgeBullets = [
    "Targeting refinements based on ICP response data",
    "Message patterns that generate qualified replies",
    "Pacing rules derived from deliverability experiments",
    "Objection insights from real prospect responses",
  ];

  const handleDownload = async () => {
    if (!latestReport?.pdf_url) return;
    incrementDownload.mutate(latestReport.id);
    window.open(latestReport.pdf_url, "_blank");
  };

  const isReportNew = latestReport ? isNewContent(latestReport.published_date, 30) : false;

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
              Emir One GTM Research Lab
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-[17px] md:text-[18px] text-muted-foreground leading-[1.65] mb-10 max-w-[540px]"
            >
              Real outbound experiments. Real data. Real ethical constraints.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              {isLoadingReport ? (
                <Skeleton className="h-[52px] w-60" />
              ) : (
                <button
                  onClick={handleDownload}
                  disabled={!latestReport?.pdf_url}
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 text-[15px] font-semibold text-primary-foreground bg-primary hover:bg-primary-medium rounded-lg transition-colors duration-200 disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  {latestReport
                    ? `Download ${latestReport.quarter} ${latestReport.year} Report`
                    : "Download Latest Report"}
                  {isReportNew && (
                    <span className="text-[10px] bg-primary-foreground/20 px-1.5 py-0.5 rounded uppercase font-bold">NEW</span>
                  )}
                </button>
              )}
              <Link
                to={featuredResearch?.[0]?.slug ? `/research/industry/${featuredResearch[0].slug}` : "/research/industry"}
                className="group inline-flex items-center gap-2 px-7 py-4 text-[15px] font-semibold text-primary hover:text-primary-medium transition-colors"
              >
                View Latest Research
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>

            {latestReport?.page_count && latestReport?.sample_size_emails && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="text-[13px] text-muted-foreground mt-4"
              >
                {latestReport.page_count} pages · {formatNumber(latestReport.sample_size_emails)} emails analyzed
              </motion.p>
            )}
          </div>
        </section>

        {/* 2. Featured Benchmark */}
        <section className="py-20 md:py-28 bg-secondary">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-[28px] md:text-[36px] lg:text-[40px] font-semibold text-foreground leading-[1.2] mb-10 max-w-[600px]">
              Featured industry research
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              {isLoadingResearch
                ? Array.from({ length: 3 }).map((_, i) => <ResearchCardSkeleton key={i} />)
                : featuredResearch && featuredResearch.length > 0
                  ? featuredResearch.map((r) => (
                      <ResearchCard key={r.id} research={r} isNew={isNewContent(r.last_updated, 14)} />
                    ))
                  : (
                    <div className="col-span-full p-8 rounded-lg border border-border bg-background text-center">
                      <p className="text-muted-foreground">Research coming soon — we're analyzing cold email data across industries.</p>
                    </div>
                  )}
            </div>

            <Link
              to="/research/industry"
              className="group inline-flex items-center gap-2 text-[15px] font-semibold text-primary hover:text-primary-medium transition-colors"
            >
              View All Industry Research
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>

        {/* 3. What We Publish (categories) */}
        <section ref={catRef} className="py-20 md:py-28 bg-background">
          <div className="max-w-5xl mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={catInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[28px] md:text-[36px] lg:text-[40px] font-semibold text-foreground leading-[1.2] mb-10 max-w-[600px]"
            >
              What we publish
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {tabs.map((tab, i) => (
                <motion.div
                  key={tab.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={catInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                >
                  <Link
                    to={tab.href}
                    className="block p-5 rounded-lg border border-border hover:bg-secondary transition-colors group"
                  >
                    <tab.icon className="w-5 h-5 text-primary mb-3" strokeWidth={2} />
                    <h3 className="text-[15px] font-semibold text-foreground mb-1">{tab.label}</h3>
                    <p className="text-[13px] text-muted-foreground leading-[1.5]">{tab.desc}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Research → Execution bridge */}
        <section ref={bridgeRef} className="py-20 md:py-28 bg-secondary">
          <div className="max-w-5xl mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={bridgeInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[28px] md:text-[36px] lg:text-[40px] font-semibold text-foreground leading-[1.2] mb-10 max-w-[600px]"
            >
              Research that directly informs execution.
            </motion.h2>

            <ul className="space-y-3 mb-10 max-w-[540px]">
              {bridgeBullets.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={bridgeInView ? { opacity: 1, y: 0 } : {}}
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
              animate={bridgeInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.4 }}
              onClick={() => navigate("/book")}
              className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 text-[15px] font-semibold text-primary-foreground bg-primary hover:bg-primary-medium rounded-lg transition-colors duration-200"
            >
              BOOK A REVENUE SPRINT CALL
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </motion.button>
          </div>
        </section>

        {/* 5. Lead Capture */}
        <section className="py-20 md:py-28 bg-background">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-[28px] md:text-[36px] lg:text-[40px] font-semibold text-foreground leading-[1.2] mb-4 max-w-[600px]">
              Get research updates.
            </h2>
            <p className="text-[15px] text-muted-foreground leading-[1.6] mb-8 max-w-[540px]">
              4 emails/year max. Unsubscribe anytime.
            </p>
            <div className="max-w-[440px]">
              <SubscribeWidget variant="inline" source="research-hub" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ResearchHub;
