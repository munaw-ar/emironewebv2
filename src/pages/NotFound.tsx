import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const NotFound = () => {
  const location = useLocation();
  useScrollReveal();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--paper)" }}>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navigation />
      <main id="main">
        <section
          style={{
            padding: "var(--section-y-lg) 0 var(--section-y)",
            background: "radial-gradient(900px 520px at 88% -8%, rgba(52,211,153,0.12), transparent 60%), var(--paper)",
            borderBottom: "1px solid var(--rule)",
            display: "flex",
            alignItems: "center",
            minHeight: "70vh",
          }}
        >
          <div className="w" style={{ textAlign: "center" }}>
            <h1 className="reveal h-hero" style={{ marginBottom: "var(--s5)" }}>
              404 <em>Page not found</em>
            </h1>
            <p
              className="reveal reveal-delay-1 measure-lead"
              style={{
                fontFamily: "var(--body)",
                fontSize: "var(--step-1)",
                color: "var(--mid)",
                lineHeight: "var(--lh-lead)",
                marginInline: "auto",
                marginBottom: "var(--s6)",
              }}
            >
              Oops! Page not found
            </p>
            <div className="reveal reveal-delay-2" style={{ display: "flex", justifyContent: "center" }}>
              <a
                href="/"
                className="cta"
                style={{
                  fontFamily: "var(--body)",
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "15px 30px",
                  minHeight: 48,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                Return to Home <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
