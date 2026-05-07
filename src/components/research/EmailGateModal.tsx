import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface EmailGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportTitle: string;
  reportId?: string;
  pdfUrl?: string;
}

const EmailGateModal = ({ isOpen, onClose, reportTitle, reportId, pdfUrl }: EmailGateModalProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Client-side rate limiting (5 second cooldown)
    const now = Date.now();
    if (now - lastSubmitTime < 5000) {
      toast.error("Please wait a moment before trying again.");
      return;
    }

    setIsSubmitting(true);
    setLastSubmitTime(now);

    try {
      // Use the rate-limited edge function
      const { data, error } = await supabase.functions.invoke('subscribe-newsletter', {
        body: { 
          email: email.trim(), 
          source: `quarterly_report_download_${reportId || 'unknown'}`
        }
      });

      if (error) throw error;
      
      if (data?.error) {
        if (data.error.includes('Too many requests')) {
          toast.error("Too many attempts. Please try again later.");
        } else {
          toast.error(data.error);
        }
        return;
      }

      // Log analytics via edge function if we have a reportId
      if (reportId) {
        await supabase.functions.invoke('log-analytics', {
          body: {
            content_type: "quarterly_report",
            content_id: reportId,
            event_type: "download",
            metadata: { report_title: reportTitle }
          }
        });
      }

      setIsSubmitted(true);

      // Trigger download after short delay
      setTimeout(() => {
        if (pdfUrl) {
          window.open(pdfUrl, "_blank");
        }
        setTimeout(() => {
          onClose();
          setIsSubmitted(false);
          setEmail("");
        }, 1500);
      }, 1000);

    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/60 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          >
            <div className="bg-background rounded-xl border border-border/20 p-8 shadow-2xl">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircle size={48} className="text-[#2ECC71] mx-auto mb-4" />
                  <h3 className="text-heading-4 font-semibold text-foreground mb-2">
                    Download Starting...
                  </h3>
                  <p className="text-body-sm text-muted-foreground">
                    Your download should begin automatically.
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-accent/20 p-2.5 rounded-lg">
                      <Download size={24} className="text-accent" />
                    </div>
                    <h3 className="text-heading-4 font-semibold text-foreground">
                      Download Report
                    </h3>
                  </div>

                  <p className="text-body text-muted-foreground mb-2 font-medium">
                    {reportTitle}
                  </p>
                  <p className="text-body-sm text-muted-foreground mb-6">
                    Enter your email to download the report:
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full"
                      disabled={isSubmitting}
                      maxLength={255}
                    />
                    <Button 
                      type="submit" 
                      variant="hero" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Processing...
                        </>
                      ) : (
                        "Download Report"
                      )}
                    </Button>
                  </form>

                  <p className="text-xs text-muted-foreground/60 text-center mt-4">
                    Your email will only receive quarterly report updates (4x/year max).
                    <br />
                    No spam. Unsubscribe anytime.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EmailGateModal;
