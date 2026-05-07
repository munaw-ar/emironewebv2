import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Download, Calendar, Database, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import EmailGateModal from "@/components/research/EmailGateModal";
import SubscribeWidget from "@/components/research/SubscribeWidget";
import BackToTop from "@/components/research/BackToTop";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

interface QuarterlyReport {
  id: string;
  title: string;
  slug: string;
  quarter: string;
  year: number;
  description: string | null;
  published_date: string;
  page_count: number | null;
  sample_size_emails: number | null;
  sample_size_replies: number | null;
  sample_size_meetings: number | null;
  pdf_url: string | null;
  pdf_file_size: string | null;
  download_count: number | null;
}

const QuarterlyReports = () => {
  const [reports, setReports] = useState<QuarterlyReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<QuarterlyReport | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      const { data, error } = await supabase
        .from("quarterly_reports")
        .select("*")
        .eq("is_published", true)
        .order("year", { ascending: false })
        .order("quarter", { ascending: false });

      if (!error && data) {
        setReports(data);
      }
      setLoading(false);
    };

    fetchReports();
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

  const handleDownload = (report: QuarterlyReport) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  // Check if report is new (published within last 30 days)
  const isNewReport = (publishedDate: string) => {
    const published = new Date(publishedDate);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - published.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  };

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
              Quarterly Outbound Reality Reports
            </h1>
            <p className="text-heading-4 text-muted-foreground mb-2">
              Cross-industry insights. Benchmarks. Trends. Ethical boundaries.
            </p>
            <p className="text-body text-muted-foreground">
              Published every 90 days based on live campaign data.
            </p>
          </motion.div>

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : reports.length === 0 ? (
            <motion.div variants={itemVariants} className="text-center py-20">
              <p className="text-muted-foreground">No quarterly reports published yet. Check back soon!</p>
            </motion.div>
          ) : (
            /* Report Cards */
            <div className="space-y-8 mb-16">
              {reports.map((report) => {
                const isNew = isNewReport(report.published_date);
                return (
                  <motion.article
                    key={report.id}
                    variants={itemVariants}
                    whileHover={{ y: -2 }}
                    className={`relative rounded-2xl border p-8 md:p-10 transition-all duration-300 ${
                      isNew 
                        ? "border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 shadow-lg" 
                        : "border-border/20 bg-card hover:shadow-md"
                    }`}
                  >
                    {/* New Badge */}
                    {isNew && (
                      <span className="absolute -top-3 left-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                        <Sparkles size={12} />
                        NEW
                      </span>
                    )}

                    <div className="grid md:grid-cols-3 gap-8">
                      {/* Report Info */}
                      <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-accent/20 p-2.5 rounded-lg">
                            <FileText size={24} className="text-accent" />
                          </div>
                          <div>
                            <h2 className="text-heading-3 font-bold text-foreground">{report.title}</h2>
                            <p className="text-body-sm text-muted-foreground flex items-center gap-2">
                              <Calendar size={14} />
                              Published: {format(new Date(report.published_date), "MMMM d, yyyy")}
                            </p>
                          </div>
                        </div>

                        {report.description && (
                          <div className="mb-6">
                            <p className="text-body text-muted-foreground">{report.description}</p>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Database size={14} />
                            {report.sample_size_emails?.toLocaleString() || 0} emails, {report.sample_size_replies?.toLocaleString() || 0} replies, {report.sample_size_meetings?.toLocaleString() || 0} meetings
                          </span>
                          {report.page_count && (
                            <>
                              <span>•</span>
                              <span>{report.page_count}-page PDF</span>
                            </>
                          )}
                          {report.pdf_file_size && (
                            <>
                              <span>•</span>
                              <span>{report.pdf_file_size}</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Download Button */}
                      <div className="flex items-center justify-start md:justify-end">
                        <Button
                          variant={isNew ? "hero" : "outline"}
                          size="lg"
                          onClick={() => handleDownload(report)}
                          className="gap-2"
                          disabled={!report.pdf_url}
                        >
                          <Download size={18} />
                          {report.pdf_url ? "Download Report (Free)" : "Coming Soon"}
                        </Button>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}

          {/* Subscribe CTA */}
          <motion.div variants={itemVariants} className="max-w-xl mx-auto">
            <SubscribeWidget variant="inline" />
          </motion.div>
        </motion.div>
      </main>

      <Footer />

      {selectedReport && (
        <EmailGateModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedReport(null);
          }}
          reportTitle={selectedReport.title}
          reportId={selectedReport.id}
          pdfUrl={selectedReport.pdf_url || ""}
        />
      )}

      <BackToTop />
    </div>
  );
};

export default QuarterlyReports;
