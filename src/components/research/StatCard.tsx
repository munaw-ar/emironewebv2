import { splitMetric } from "@/lib/metric";

interface StatCardProps {
  metric: string;
  label: string;
  sampleSize: string;
  delay?: number;
}

const StatCard = ({ metric, label, sampleSize, delay = 0 }: StatCardProps) => {
  const delayClass = delay >= 0.18 ? "reveal-delay-2" : delay >= 0.09 ? "reveal-delay-1" : "";
  const { value, unit } = splitMetric(metric);

  return (
    <div
      className={`reveal glass ${delayClass}`}
      style={{ padding: "var(--s5)", minWidth: 0, display: "flex", flexDirection: "column", height: "100%" }}
    >
      {/* value + descriptor share a baseline so the descriptor never wraps mid-word */}
      <p
        className="tnum"
        style={{
          display: "flex",
          alignItems: "baseline",
          flexWrap: "wrap",
          columnGap: "0.4em",
          rowGap: 2,
          lineHeight: 1.05,
          marginBottom: "var(--s3)",
          overflowWrap: "normal",
        }}
      >
        <span
          style={{
            fontFamily: "var(--display)",
            fontSize: "var(--step-3)",
            fontWeight: 400,
            color: "var(--ink)",
            letterSpacing: "-0.01em",
          }}
        >
          {value}
        </span>
        {unit && (
          <span
            style={{
              fontFamily: "var(--body)",
              fontSize: "var(--step-0)",
              fontWeight: 500,
              color: "var(--green)",
              whiteSpace: "nowrap",
            }}
          >
            {unit}
          </span>
        )}
      </p>
      <p style={{ fontFamily: "var(--body)", fontSize: "var(--step--1)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--mid)" }}>
        {label}
      </p>
      {sampleSize && (
        <p style={{ fontFamily: "var(--body)", fontSize: "var(--step--1)", fontStyle: "italic", color: "var(--light)", marginTop: "auto", paddingTop: "var(--s3)" }}>
          {sampleSize}
        </p>
      )}
    </div>
  );
};

export default StatCard;
