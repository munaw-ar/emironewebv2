// Auto-scrolling capability ticker — the "scrolling" signature from
// ColdIQ / Social Square, adapted to Emir One's real capabilities.
const ITEMS = [
  "SPF · DKIM · DMARC hardened",
  "21-day monitored warm-up",
  "Secondary domains only",
  "MXToolbox-verified",
  "Sharia-aligned",
  "Consent-first outreach",
  "ICP-scored lists",
  "No spray-and-pray",
  "Reviewed within 24 hours",
  "You own the domains",
];

export default function Marquee() {
  // duplicated track for a seamless -50% loop
  const track = [...ITEMS, ...ITEMS];
  return (
    <section aria-label="What we handle" style={{ background: "var(--paper-2)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)", padding: "var(--s5) 0" }}>
      <div className="marquee">
        <div className="marquee-track">
          {track.map((item, i) => (
            <span key={i} className="marquee-item">
              <span aria-hidden="true" style={{ color: "var(--green)", marginRight: 28 }}>✦</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
