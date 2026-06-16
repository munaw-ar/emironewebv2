import type { CSSProperties, ReactNode } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import HeroFlow from "@/components/sections/HeroFlow";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { sanitizeHtml } from "@/lib/sanitize";

const eyebrowStyle: CSSProperties = { fontFamily: "var(--body)", fontSize: "var(--step--1)", fontWeight: 600, letterSpacing: "var(--track-caps)", textTransform: "uppercase", color: "var(--green)" };
const leadStyle: CSSProperties = { fontFamily: "var(--body)", fontSize: "var(--step-1)", color: "var(--mid)", lineHeight: "var(--lh-lead)" };
const bodyStyle: CSSProperties = { fontFamily: "var(--body)", fontSize: "var(--step-0)", color: "var(--mid)", lineHeight: "var(--lh-body)" };
const listStyle: CSSProperties = { ...bodyStyle, paddingLeft: "1.4em", display: "grid", gap: "var(--s2)", listStyleType: "disc" };
const subHeadStyle: CSSProperties = { fontFamily: "var(--body)", fontSize: "var(--step-0)", fontWeight: 600, color: "var(--ink)", margin: "var(--s4) 0 var(--s3)" };

export type ContentBlock =
  | { kind: "lead" | "p" | "h3"; text: string }
  | { kind: "ul"; items: string[] };

export interface ContentSection {
  heading: string;
  blocks: ContentBlock[];
}

export interface ContentPageProps {
  eyebrow: string;
  /** Plain ReactNode headline, OR pass titleHtml for an <em>-accented string. */
  title?: ReactNode;
  titleHtml?: string;
  lastUpdated?: string;
  intro?: string[];
  sections: ContentSection[];
  /** Prefix section headings with 01., 02., … (used for legal pages). */
  numbered?: boolean;
}

function Block({ block }: { block: ContentBlock }) {
  if (block.kind === "ul") {
    return (
      <ul className="measure" style={{ ...listStyle, marginBottom: "var(--s4)" }}>
        {block.items.map((it, i) => <li key={i}>{it}</li>)}
      </ul>
    );
  }
  if (block.kind === "h3") {
    return <h3 style={subHeadStyle}>{block.text}</h3>;
  }
  if (block.kind === "lead") {
    return <p className="measure-lead" style={{ ...leadStyle, marginBottom: "var(--s4)" }}>{block.text}</p>;
  }
  return <p className="measure" style={{ ...bodyStyle, marginBottom: "var(--s4)" }}>{block.text}</p>;
}

export default function ContentPage({ eyebrow, title, titleHtml, lastUpdated, intro, sections, numbered }: ContentPageProps) {
  useScrollReveal();

  return (
    <div style={{ minHeight: "100vh", background: "var(--paper)" }}>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navigation />

      <main id="main">
        {/* Hero */}
        <section style={{ position: "relative", overflow: "hidden", isolation: "isolate", padding: "var(--section-y-lg) 0 var(--section-y)", background: "radial-gradient(900px 520px at 88% -8%, rgba(52,211,153,0.12), transparent 60%), var(--paper)", borderBottom: "1px solid var(--rule)" }}>
          <HeroFlow variant="ambient" />
          <div className="w">
            <div className="reveal" style={{ ...eyebrowStyle, marginBottom: "var(--s4)" }}>{eyebrow}</div>
            {titleHtml ? (
              <h1 className="reveal reveal-delay-1 h-hero" style={{ maxWidth: 880, marginBottom: "var(--s4)" }} dangerouslySetInnerHTML={{ __html: sanitizeHtml(titleHtml) }} />
            ) : (
              <h1 className="reveal reveal-delay-1 h-hero" style={{ maxWidth: 880, marginBottom: "var(--s4)" }}>{title}</h1>
            )}
            {lastUpdated && (
              <p className="reveal reveal-delay-2" style={{ ...bodyStyle, fontSize: "var(--step--1)", color: "var(--light)", marginBottom: "var(--s5)" }}>
                <strong>Last updated:</strong> {lastUpdated}
              </p>
            )}
            {intro?.map((p, i) => (
              <p key={i} className={`reveal reveal-delay-${Math.min(i + 2, 3)} measure-lead`} style={{ ...leadStyle, marginBottom: "var(--s4)" }}>{p}</p>
            ))}
          </div>
        </section>

        {sections.map((sec, i) => (
          <section key={i} style={{ padding: "var(--section-y) 0", background: i % 2 === 0 ? "var(--paper-2)" : "var(--paper)" }}>
            <div className="w section-grid">
              <div className="section-eyebrow"><span className="sec-num">{String(i + 1).padStart(2, "0")}</span>{sec.heading}</div>
              <div>
                <h2 className="reveal h-section" style={{ marginBottom: "var(--s4)" }}>{numbered ? `${i + 1}. ${sec.heading}` : sec.heading}</h2>
                {sec.blocks.map((b, j) => (
                  <div key={j} className={j === 0 ? "reveal" : "reveal reveal-delay-1"}>
                    <Block block={b} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>

      <Footer />
    </div>
  );
}
