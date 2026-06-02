import { useState } from "react";
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
      <div className="reveal glass" style={{ padding: "var(--s5)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <CheckCircle size={24} style={{ color: "var(--green)", flexShrink: 0 }} />
          <div style={{ minWidth: 0 }}>
            <p style={{ fontFamily: "var(--body)", fontWeight: 600, color: "var(--ink)" }}>You're subscribed!</p>
            <p style={{ fontFamily: "var(--body)", fontSize: "var(--step--1)", color: "var(--mid)" }}>
              Expect quarterly updates in your inbox.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reveal glass" style={{ padding: "var(--s5)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "var(--s3)" }}>
        <Mail size={20} style={{ color: "var(--green)" }} />
        <h4 style={{ fontFamily: "var(--display)", fontSize: "var(--step-1)", fontWeight: 400, color: "var(--ink)" }}>Get Research Updates</h4>
      </div>
      <p style={{ fontFamily: "var(--body)", fontSize: "var(--step--1)", color: "var(--mid)", lineHeight: "var(--lh-body)", marginBottom: "var(--s4)" }}>
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
      <p style={{ fontFamily: "var(--body)", fontSize: "var(--step--1)", color: "var(--light)", marginTop: "var(--s3)" }}>
        4 emails/year max. Unsubscribe anytime.
      </p>
    </div>
  );
};

export default SubscribeWidget;
