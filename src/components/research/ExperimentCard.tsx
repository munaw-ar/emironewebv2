import { motion } from "framer-motion";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { Link } from "react-router-dom";

interface ExperimentCardProps {
  date: string;
  industry: string;
  title: string;
  hypothesis: string;
  testSetup: string;
  results: string;
  conclusion: string;
  nextTest: string;
  slug?: string;
  delay?: number;
}

const ExperimentCard = ({
  date,
  industry,
  title,
  hypothesis,
  testSetup,
  results,
  conclusion,
  nextTest,
  slug = "#",
  delay = 0,
}: ExperimentCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.4, 0.25, 1] }}
      whileHover={{ y: -2, boxShadow: "0 8px 30px -10px hsl(var(--primary) / 0.1)" }}
      className="bg-card rounded-xl border border-border/15 p-8 transition-all duration-300"
    >
      {/* Badges */}
      <div className="flex flex-wrap gap-3 mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-medium">
          <Calendar size={12} />
          {date}
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
          <Tag size={12} />
          {industry}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-heading-3 font-semibold text-foreground mb-6">{title}</h3>

      {/* Sections */}
      <div className="space-y-5">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground/60 mb-1">Hypothesis</p>
          <p className="text-body text-foreground">{hypothesis}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground/60 mb-1">Test Setup</p>
          <p className="text-body text-foreground">{testSetup}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground/60 mb-1">Results</p>
          <p className="text-body text-foreground">{results}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground/60 mb-1">Conclusion</p>
          <p className="text-body text-foreground">{conclusion}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground/60 mb-1">What We'll Test Next</p>
          <p className="text-body text-foreground">{nextTest}</p>
        </div>
      </div>

      {/* Link */}
      <Link
        to={slug}
        className="inline-flex items-center gap-2 mt-6 text-primary font-medium hover:gap-3 transition-all duration-300"
      >
        Read Full Report
        <ArrowRight size={16} />
      </Link>
    </motion.article>
  );
};

export default ExperimentCard;
