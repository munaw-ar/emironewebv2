import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Loader2 } from "lucide-react";
import SubscribeWidget from "@/components/research/SubscribeWidget";
import BackToTop from "@/components/research/BackToTop";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { sanitizeHtml } from "@/lib/sanitize";
import Navigation from "@/components/layout/Navigation";

interface MethodologyData {
  id: string;
  content: string;
  last_updated: string | null;
  updated_by: string | null;
}

const Methodology = () => {
  const [methodology, setMethodology] = useState<MethodologyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMethodology = async () => {
      const { data, error } = await supabase
        .from("methodology_page")
        .select("*")
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        setMethodology(data);
      }
      setLoading(false);
    };

    fetchMethodology();
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container-wide pt-28 md:pt-36 pb-12 md:pb-16">
        <motion.div
          className="max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Page Header */}
          <motion.div variants={itemVariants} className="mb-12">
            <h1 className="text-heading-1 font-bold text-foreground mb-4">
              How We Conduct Research
            </h1>
            <p className="text-heading-4 text-muted-foreground">
              Transparency first. Small samples, real data, clearly stated limitations.
            </p>
            {methodology?.last_updated && (
              <p className="text-sm text-muted-foreground mt-4">
                Last updated: {format(new Date(methodology.last_updated), "MMMM d, yyyy")}
              </p>
            )}
          </motion.div>

          {/* Dynamic Content */}
          {methodology?.content ? (
            <motion.section variants={itemVariants} className="mb-16">
              <div 
                className="prose prose-lg max-w-none text-foreground
                  prose-headings:text-foreground prose-headings:font-bold
                  prose-h2:text-heading-2 prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-heading-3 prose-h3:mt-8 prose-h3:mb-4
                  prose-p:text-muted-foreground prose-p:leading-relaxed
                  prose-ul:text-muted-foreground prose-ol:text-muted-foreground
                  prose-li:my-2
                  prose-strong:text-foreground
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(methodology.content) }}
              />
            </motion.section>
          ) : (
            <motion.section variants={itemVariants} className="mb-16">
              <p className="text-muted-foreground text-center py-12">
                Methodology content is being updated. Check back soon!
              </p>
            </motion.section>
          )}

          {/* Contact */}
          <motion.section variants={itemVariants} className="mb-16">
            <div className="p-8 rounded-xl bg-accent/5 border border-accent/20">
              <div className="flex items-center gap-3 mb-4">
                <Mail size={24} className="text-accent" />
                <h2 className="text-heading-3 font-bold text-foreground">Contact for Questions</h2>
              </div>
              <p className="text-body text-muted-foreground mb-4">
                Have questions about our methodology, want to suggest improvements, or interested in collaborating on research?
              </p>
              <a
                href="mailto:research@emirone.com"
                className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
              >
                research@emirone.com
              </a>
            </div>
          </motion.section>

          {/* Subscribe */}
          <motion.div variants={itemVariants}>
            <SubscribeWidget />
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-primary-foreground py-8">
        <div className="container-wide text-center">
          <p className="text-body-sm text-primary-foreground/60">
            © 2025 Emir One. All rights reserved.
          </p>
        </div>
      </footer>

      <BackToTop />
    </div>
  );
};

export default Methodology;
