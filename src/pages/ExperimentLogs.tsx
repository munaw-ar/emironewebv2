import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Loader2 } from "lucide-react";
import ExperimentCard from "@/components/research/ExperimentCard";
import SubscribeWidget from "@/components/research/SubscribeWidget";
import BackToTop from "@/components/research/BackToTop";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

interface ExperimentLog {
  id: string;
  title: string;
  slug: string;
  industry: string;
  date_published: string;
  hypothesis: string;
  test_setup: string;
  results: string;
  conclusion: string;
  next_test: string | null;
  sample_size: string | null;
}

const ExperimentLogs = () => {
  const [experiments, setExperiments] = useState<ExperimentLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [industryFilter, setIndustryFilter] = useState("all");

  useEffect(() => {
    const fetchExperiments = async () => {
      const { data, error } = await supabase
        .from("experiment_logs")
        .select("*")
        .eq("is_published", true)
        .order("date_published", { ascending: false });

      if (!error && data) {
        setExperiments(data);
      }
      setLoading(false);
    };

    fetchExperiments();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
    },
  };

  // Get unique industries for filter
  const industries = [...new Set(experiments.map(e => e.industry))];

  // Filter experiments
  const filteredExperiments = industryFilter === "all" 
    ? experiments 
    : experiments.filter(e => e.industry === industryFilter);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container-wide pt-28 md:pt-36 pb-12 md:pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Page Header */}
          <motion.div variants={itemVariants} className="max-w-3xl mb-12">
            <h1 className="text-heading-1 font-bold text-foreground mb-4">
              Experiment Logs
            </h1>
            <p className="text-heading-4 text-muted-foreground mb-2">
              Real tests. Real results. Real learning.
            </p>
            <p className="text-body text-muted-foreground">
              We document every hypothesis we test in the field — including the ones that fail spectacularly.
            </p>
          </motion.div>

          {/* Filters */}
          {industries.length > 0 && (
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-10">
              <div className="relative">
                <select
                  value={industryFilter}
                  onChange={(e) => setIndustryFilter(e.target.value)}
                  className="appearance-none bg-card border border-border/30 rounded-lg px-4 py-2 pr-10 text-sm text-foreground cursor-pointer hover:border-primary/50 transition-colors"
                >
                  <option value="all">All Industries</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </motion.div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredExperiments.length === 0 ? (
            <motion.div variants={itemVariants} className="text-center py-20">
              <p className="text-muted-foreground">No experiment logs published yet. Check back soon!</p>
            </motion.div>
          ) : (
            /* Experiment Cards */
            <div className="grid gap-8 mb-16">
              {filteredExperiments.map((exp, index) => (
                <ExperimentCard
                  key={exp.id}
                  date={format(new Date(exp.date_published), "MMM d, yyyy")}
                  industry={exp.industry}
                  title={exp.title}
                  hypothesis={exp.hypothesis}
                  testSetup={exp.test_setup}
                  results={exp.results}
                  conclusion={exp.conclusion}
                  nextTest={exp.next_test || undefined}
                  slug={exp.slug ?? ''}
                  delay={index * 0.1}
                />
              ))}
            </div>
          )}

          {/* Subscribe CTA */}
          <motion.div variants={itemVariants} className="max-w-xl mx-auto">
            <SubscribeWidget variant="inline" />
          </motion.div>
        </motion.div>
      </main>

      <Footer />

      <BackToTop />
    </div>
  );
};

export default ExperimentLogs;
