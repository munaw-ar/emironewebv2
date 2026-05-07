import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";

interface IndustryResearch {
  id: string;
  title: string;
  industry_name: string;
  slug: string;
  open_rate_range: string | null;
  reply_rate_range: string | null;
  sample_size: string | null;
  is_published: boolean;
}

const IndustryIndex = () => {
  const [industries, setIndustries] = useState<IndustryResearch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIndustries = async () => {
      const { data, error } = await supabase
        .from("industry_research")
        .select("id, title, industry_name, slug, open_rate_range, reply_rate_range, sample_size, is_published")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setIndustries(data.map(r => ({ ...r, is_published: r.is_published ?? false })));
      }
      setLoading(false);
    };

    fetchIndustries();
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
              Industry Research
            </h1>
            <p className="text-body text-muted-foreground">
              Cold email benchmarks and messaging insights by industry vertical. Each report is based on real campaign data with clearly stated sample sizes and limitations.
            </p>
          </motion.div>

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : industries.length === 0 ? (
            <motion.div variants={itemVariants} className="text-center py-20">
              <p className="text-muted-foreground">No industry research published yet. Check back soon!</p>
            </motion.div>
          ) : (
            /* Industry Cards */
            <div className="grid md:grid-cols-2 gap-6">
              {industries.map((industry) => (
                <motion.div key={industry.id} variants={itemVariants}>
                  <Link
                    to={`/research/industry/${industry.slug}`}
                    className="block h-full p-6 rounded-xl border border-border/20 bg-card hover:shadow-lg hover:-translate-y-1 hover:border-primary/30 transition-all duration-300"
                  >
                    <h3 className="text-heading-4 font-semibold text-foreground mb-2">{industry.title}</h3>
                    <p className="text-body-sm text-muted-foreground mb-4">{industry.industry_name}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-border/20">
                      <div className="flex gap-4">
                        <div>
                          <p className="font-mono text-lg font-bold text-foreground">
                            {industry.open_rate_range || "N/A"}
                          </p>
                          <p className="text-xs text-muted-foreground">Open Rate</p>
                        </div>
                        <div>
                          <p className="font-mono text-lg font-bold text-foreground">
                            {industry.reply_rate_range || "N/A"}
                          </p>
                          <p className="text-xs text-muted-foreground">Reply Rate</p>
                        </div>
                      </div>
                      <ArrowRight size={18} className="text-primary" />
                    </div>
                    {industry.sample_size && (
                      <p className="text-xs text-muted-foreground/60 mt-2">{industry.sample_size}</p>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default IndustryIndex;
