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
  nextTest?: string;
  slug?: string;
  delay?: number;
}

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--body)",
  fontSize: "var(--step--1)",
  fontWeight: 600,
  letterSpacing: "var(--track-caps)",
  textTransform: "uppercase",
  color: "var(--green)",
  marginBottom: "var(--s1)",
};

const valueStyle: React.CSSProperties = {
  fontFamily: "var(--body)",
  fontSize: "var(--step-0)",
  color: "var(--ink)",
  lineHeight: "var(--lh-body)",
};

const badgeStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "4px 12px",
  borderRadius: 999,
  fontFamily: "var(--body)",
  fontSize: "var(--step--1)",
  fontWeight: 500,
  border: "1px solid var(--rule)",
};

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
  const delayClass = delay >= 0.18 ? "reveal-delay-2" : delay >= 0.09 ? "reveal-delay-1" : "";

  return (
    <article
      className={`reveal glass ${delayClass}`}
      style={{ padding: "var(--s5)", minWidth: 0 }}
    >
      {/* Badges */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: "var(--s4)" }}>
        <span style={{ ...badgeStyle, background: "var(--green-wash)", color: "var(--green)" }}>
          <Calendar size={12} style={{ color: "var(--green)" }} />
          {date}
        </span>
        <span style={{ ...badgeStyle, background: "var(--paper-2)", color: "var(--mid)" }}>
          <Tag size={12} style={{ color: "var(--green)" }} />
          {industry}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "var(--display)",
          fontSize: "var(--step-2)",
          fontWeight: 400,
          color: "var(--ink)",
          lineHeight: "var(--lh-sub)",
          marginBottom: "var(--s5)",
        }}
      >
        {title}
      </h3>

      {/* Sections */}
      <div style={{ display: "grid", gap: "var(--s4)" }}>
        <div>
          <p style={labelStyle}>Hypothesis</p>
          <p style={valueStyle}>{hypothesis}</p>
        </div>

        <div>
          <p style={labelStyle}>Test Setup</p>
          <p style={valueStyle}>{testSetup}</p>
        </div>

        <div>
          <p style={labelStyle}>Results</p>
          <p style={valueStyle}>{results}</p>
        </div>

        <div>
          <p style={labelStyle}>Conclusion</p>
          <p style={valueStyle}>{conclusion}</p>
        </div>

        <div>
          <p style={labelStyle}>What We'll Test Next</p>
          <p style={valueStyle}>{nextTest}</p>
        </div>
      </div>

      {/* Link */}
      <Link
        to={slug}
        className="link-wipe"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          marginTop: "var(--s5)",
          fontFamily: "var(--body)",
          fontSize: "var(--step-0)",
          fontWeight: 600,
          color: "var(--green)",
        }}
      >
        Read Full Report
        <ArrowRight size={16} />
      </Link>
    </article>
  );
};

export default ExperimentCard;
