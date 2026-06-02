interface StatCardProps {
  metric: string;
  label: string;
  sampleSize: string;
  delay?: number;
}

const StatCard = ({ metric, label, sampleSize, delay = 0 }: StatCardProps) => {
  const delayClass = delay >= 0.18 ? "reveal-delay-2" : delay >= 0.09 ? "reveal-delay-1" : "";

  return (
    <div
      className={`reveal glass ${delayClass}`}
      style={{ padding: "var(--s5)", minWidth: 0 }}
    >
      <p
        className="tnum"
        style={{
          fontFamily: "var(--display)",
          fontSize: "var(--step-3)",
          fontWeight: 400,
          color: "var(--ink)",
          lineHeight: 1.05,
          marginBottom: "var(--s2)",
        }}
      >
        {metric}
      </p>
      <p style={{ fontFamily: "var(--body)", fontSize: "var(--step-0)", color: "var(--ink)", lineHeight: "var(--lh-body)", marginBottom: "var(--s1)" }}>
        {label}
      </p>
      <p style={{ fontFamily: "var(--body)", fontSize: "var(--step--1)", fontStyle: "italic", color: "var(--light)" }}>
        {sampleSize}
      </p>
    </div>
  );
};

export default StatCard;
