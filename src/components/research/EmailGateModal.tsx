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
        if (pdfUrl && /^https?:\/\//i.test(pdfUrl)) {
          window.open(pdfUrl, "_blank", "noopener,noreferrer");
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
            className="fixed inset-0 z-50"
            style={{ background: "rgba(17,24,39,0.6)" }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          >
            <div className="glass" style={{ position: "relative", padding: "var(--s6)" }}>
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4"
                style={{ color: "var(--light)", background: "transparent", border: "none", cursor: "pointer", transition: "color var(--dur-micro) var(--ease-micro)" }}
              >
                <X size={20} />
              </button>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                  style={{ paddingTop: "var(--s5)", paddingBottom: "var(--s5)" }}
                >
                  <CheckCircle size={48} className="mx-auto" style={{ color: "var(--green)", marginBottom: "var(--s3)" }} />
                  <h3 style={{ fontFamily: "var(--display)", fontSize: "var(--step-2)", fontWeight: 400, color: "var(--ink)", marginBottom: "var(--s2)" }}>
                    Download Starting...
                  </h3>
                  <p style={{ fontFamily: "var(--body)", fontSize: "var(--step--1)", color: "var(--mid)" }}>
                    Your download should begin automatically.
                  </p>
                </motion.div>
              ) : (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "var(--s5)" }}>
                    <div style={{ background: "var(--green-wash)", padding: 10, borderRadius: 10, display: "inline-flex" }}>
                      <Download size={24} style={{ color: "var(--green)" }} />
                    </div>
                    <h3 style={{ fontFamily: "var(--display)", fontSize: "var(--step-2)", fontWeight: 400, color: "var(--ink)" }}>
                      Download Report
                    </h3>
                  </div>

                  <p style={{ fontFamily: "var(--body)", fontSize: "var(--step-0)", fontWeight: 600, color: "var(--ink)", marginBottom: "var(--s2)" }}>
                    {reportTitle}
                  </p>
                  <p style={{ fontFamily: "var(--body)", fontSize: "var(--step--1)", color: "var(--mid)", marginBottom: "var(--s5)" }}>
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

                  <p className="text-center" style={{ fontFamily: "var(--body)", fontSize: "var(--step--1)", color: "var(--light)", marginTop: "var(--s3)" }}>
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
