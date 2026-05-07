import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SubscribeWidgetProps {
  variant?: "sidebar" | "inline";
  source?: string;
}

const SubscribeWidget = ({ variant = "sidebar", source = "research_page" }: SubscribeWidgetProps) => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Client-side rate limiting (5 second cooldown)
    const now = Date.now();
    if (now - lastSubmitTime < 5000) {
      toast.error("Please wait a moment before subscribing again.");
      return;
    }

    setIsSubmitting(true);
    setLastSubmitTime(now);

    try {
      // Use the rate-limited edge function
      const { data, error } = await supabase.functions.invoke('subscribe-newsletter', {
        body: { email: email.trim(), source }
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

      setIsSubscribed(true);
      setEmail("");
      toast.success("Successfully subscribed!");
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-accent/8 border border-accent/30 rounded-lg p-6"
      >
        <div className="flex items-center gap-3 text-accent">
          <CheckCircle size={24} />
          <div>
            <p className="font-semibold text-foreground">You're subscribed!</p>
            <p className="text-body-sm text-muted-foreground">
              Expect quarterly updates in your inbox.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      className="bg-accent/8 border border-accent/30 rounded-lg p-6"
    >
      <div className="flex items-center gap-2 mb-3">
        <Mail size={20} className="text-accent" />
        <h4 className="font-semibold text-foreground">Get Research Updates</h4>
      </div>
      <p className="text-body-sm text-muted-foreground mb-4">
        New experiments & reports delivered quarterly.
      </p>
      <form onSubmit={handleSubmit} className={variant === "inline" ? "flex gap-2" : "space-y-3"}>
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
          className="bg-background border-border/30"
          maxLength={255}
        />
        <Button 
          type="submit" 
          variant="hero" 
          className={variant === "inline" ? "shrink-0" : "w-full"}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Subscribe"
          )}
        </Button>
      </form>
      <p className="text-xs text-muted-foreground/60 mt-3">
        4 emails/year max. Unsubscribe anytime.
      </p>
    </motion.div>
  );
};

export default SubscribeWidget;
