import { motion } from "framer-motion";

interface StatCardProps {
  metric: string;
  label: string;
  sampleSize: string;
  delay?: number;
}

const StatCard = ({ metric, label, sampleSize, delay = 0 }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ 
        duration: 0.4, 
        delay: Math.min(delay, 0.15), // Limit delay for faster perceived load
        ease: [0.25, 0.1, 0.25, 1] 
      }}
      className="bg-card rounded-lg border border-border/20 p-4 sm:p-6 transition-shadow duration-200 hover:shadow-md"
      style={{
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
      }}
    >
      <p className="font-mono text-2xl sm:text-4xl md:text-5xl font-bold text-foreground mb-1 sm:mb-2">
        {metric}
      </p>
      <p className="text-sm sm:text-base text-foreground mb-0.5 sm:mb-1">{label}</p>
      <p className="text-xs sm:text-sm italic text-muted-foreground/60">{sampleSize}</p>
    </motion.div>
  );
};

export default StatCard;
