import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const leadStyle: React.CSSProperties = { fontFamily: "var(--body)", fontSize: "var(--step-1)", color: "var(--mid)", lineHeight: "var(--lh-lead)" };
const bodyStyle: React.CSSProperties = { fontFamily: "var(--body)", fontSize: "var(--step-0)", color: "var(--mid)", lineHeight: "var(--lh-body)" };
const listStyle: React.CSSProperties = { ...bodyStyle, listStyle: "disc", paddingLeft: "var(--s5)", display: "grid", gap: "var(--s1)", marginBottom: "var(--s3)" };

const TermsOfService = () => {
  useScrollReveal();

  return (
    <div style={{ minHeight: "100vh", background: "var(--paper)" }}>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navigation />
      <main id="main">
        {/* Hero */}
        <section style={{ padding: "var(--section-y-lg) 0 var(--section-y)", background: "radial-gradient(900px 520px at 88% -8%, rgba(52,211,153,0.12), transparent 60%), var(--paper)", borderBottom: "1px solid var(--rule)" }}>
          <div className="w">
            <h1 className="reveal h-hero" style={{ maxWidth: 880, marginBottom: "var(--s4)" }}>
              Terms of <em>Service.</em>
            </h1>
            <p className="reveal reveal-delay-1" style={{ fontFamily: "var(--body)", fontSize: "var(--step-0)", color: "var(--light)", marginBottom: "var(--s5)" }}>
              <strong>Last updated:</strong> 15 DECEMBER 2025
            </p>
            <p className="reveal reveal-delay-2 measure-lead" style={leadStyle}>
              These Terms of Service govern your use of <strong>emirone.com</strong> and any services provided by Emir One ("we", "us", or "our").
              <br /><br />
              By accessing this website or submitting an application, you agree to these Terms.
            </p>
          </div>
        </section>

        {/* 01 — Services Overview */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper-2)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">01</span>Services Overview</div>
            <div>
              <h2 className="reveal h-section" style={{ marginBottom: "var(--s5)" }}>
                1. <em>Services Overview.</em>
              </h2>
              <p className="reveal reveal-delay-1 measure" style={{ ...bodyStyle, marginBottom: "var(--s3)" }}>
                Emir One provides consulting and implementation services related to outbound email systems for B2B businesses.
              </p>
              <p className="reveal reveal-delay-2 measure" style={bodyStyle}>
                All services are provided on a <strong>best-effort basis</strong>, not as guarantees of specific outcomes.
              </p>
            </div>
          </div>
        </section>

        {/* 02 — No Guarantees */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">02</span>No Guarantees</div>
            <div>
              <h2 className="reveal h-section" style={{ marginBottom: "var(--s5)" }}>
                2. No Guarantees or <em>Earnings Claims.</em>
              </h2>
              <p className="reveal reveal-delay-1 measure" style={{ ...bodyStyle, marginBottom: "var(--s3)" }}>We do <strong>not</strong> guarantee:</p>
              <ul className="reveal reveal-delay-1 measure" style={listStyle}>
                <li>Revenue outcomes</li>
                <li>Meeting volume</li>
                <li>Sales results</li>
                <li>Business growth</li>
              </ul>
              <p className="reveal reveal-delay-2 measure" style={{ ...bodyStyle, marginBottom: "var(--s3)" }}>
                Results depend on many factors outside our control, including your market, offer, execution, and external conditions.
              </p>
              <p className="reveal reveal-delay-2 measure" style={bodyStyle}>
                Any examples discussed are illustrative only.
              </p>
            </div>
          </div>
        </section>

        {/* 03 — Application and Acceptance */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper-2)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">03</span>Application</div>
            <div>
              <h2 className="reveal h-section" style={{ marginBottom: "var(--s5)" }}>
                3. Application and <em>Acceptance.</em>
              </h2>
              <p className="reveal reveal-delay-1 measure" style={{ ...bodyStyle, marginBottom: "var(--s3)" }}>
                Submitting an application does <strong>not</strong> guarantee acceptance as a client.
              </p>
              <p className="reveal reveal-delay-2 measure" style={{ ...bodyStyle, marginBottom: "var(--s3)" }}>We reserve the right to:</p>
              <ul className="reveal reveal-delay-2 measure" style={{ ...listStyle, marginBottom: 0 }}>
                <li>Accept or decline applicants</li>
                <li>Limit client capacity</li>
                <li>Discontinue discussions at our discretion</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 04 — Client Responsibilities */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">04</span>Responsibilities</div>
            <div>
              <h2 className="reveal h-section" style={{ marginBottom: "var(--s5)" }}>
                4. Client <em>Responsibilities.</em>
              </h2>
              <p className="reveal reveal-delay-1 measure" style={{ ...bodyStyle, marginBottom: "var(--s3)" }}>You agree to:</p>
              <ul className="reveal reveal-delay-1 measure" style={listStyle}>
                <li>Provide accurate information</li>
                <li>Operate lawfully and ethically</li>
                <li>Comply with applicable marketing, privacy, and anti-spam laws</li>
                <li>Maintain responsibility for final messaging approvals</li>
              </ul>
              <p className="reveal reveal-delay-2 measure" style={bodyStyle}>
                You remain responsible for your business decisions and outcomes.
              </p>
            </div>
          </div>
        </section>

        {/* 05 — Intellectual Property */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper-2)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">05</span>IP</div>
            <div>
              <h2 className="reveal h-section" style={{ marginBottom: "var(--s5)" }}>
                5. Intellectual <em>Property.</em>
              </h2>
              <p className="reveal reveal-delay-1 measure" style={{ ...bodyStyle, marginBottom: "var(--s3)" }}>All content on this website, including:</p>
              <ul className="reveal reveal-delay-1 measure" style={listStyle}>
                <li>Text</li>
                <li>Frameworks</li>
                <li>Processes</li>
                <li>Visuals</li>
              </ul>
              <p className="reveal reveal-delay-2 measure" style={bodyStyle}>
                is owned by Emir One and may not be copied, reproduced, or distributed without written permission.
              </p>
            </div>
          </div>
        </section>

        {/* 06 — Confidentiality */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">06</span>Confidentiality</div>
            <div>
              <h2 className="reveal h-section" style={{ marginBottom: "var(--s5)" }}>
                6. <em>Confidentiality.</em>
              </h2>
              <p className="reveal reveal-delay-1 measure" style={bodyStyle}>
                Any non-public information shared during discussions or engagements is treated as confidential unless disclosure is required by law.
              </p>
            </div>
          </div>
        </section>

        {/* 07 — Limitation of Liability */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper-2)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">07</span>Liability</div>
            <div>
              <h2 className="reveal h-section" style={{ marginBottom: "var(--s5)" }}>
                7. Limitation of <em>Liability.</em>
              </h2>
              <p className="reveal reveal-delay-1 measure" style={{ ...bodyStyle, marginBottom: "var(--s3)" }}>To the maximum extent permitted by law:</p>
              <ul className="reveal reveal-delay-1 measure" style={listStyle}>
                <li>We are not liable for indirect, incidental, or consequential losses</li>
                <li>Our liability is limited to the amount paid for services (if any)</li>
              </ul>
              <p className="reveal reveal-delay-2 measure" style={bodyStyle}>
                You use this website and our services at your own risk.
              </p>
            </div>
          </div>
        </section>

        {/* 08 — Indemnification */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">08</span>Indemnification</div>
            <div>
              <h2 className="reveal h-section" style={{ marginBottom: "var(--s5)" }}>
                8. <em>Indemnification.</em>
              </h2>
              <p className="reveal reveal-delay-1 measure" style={{ ...bodyStyle, marginBottom: "var(--s3)" }}>
                You agree to indemnify and hold harmless Emir One from any claims arising from:
              </p>
              <ul className="reveal reveal-delay-1 measure" style={{ ...listStyle, marginBottom: 0 }}>
                <li>Your use of the website</li>
                <li>Your business activities</li>
                <li>Your breach of these Terms</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 09 — Termination */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper-2)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">09</span>Termination</div>
            <div>
              <h2 className="reveal h-section" style={{ marginBottom: "var(--s5)" }}>
                9. <em>Termination.</em>
              </h2>
              <p className="reveal reveal-delay-1 measure" style={bodyStyle}>
                We may suspend or terminate access to the website or services at any time if these Terms are breached.
              </p>
            </div>
          </div>
        </section>

        {/* 10 — Governing Law */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">10</span>Governing Law</div>
            <div>
              <h2 className="reveal h-section" style={{ marginBottom: "var(--s5)" }}>
                10. Governing <em>Law.</em>
              </h2>
              <p className="reveal reveal-delay-1 measure" style={bodyStyle}>
                These Terms are governed by the laws of <strong>Australia</strong>, without regard to conflict-of-law principles.
              </p>
            </div>
          </div>
        </section>

        {/* 11 — Changes to Terms */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper-2)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">11</span>Changes</div>
            <div>
              <h2 className="reveal h-section" style={{ marginBottom: "var(--s5)" }}>
                11. Changes to <em>Terms.</em>
              </h2>
              <p className="reveal reveal-delay-1 measure" style={bodyStyle}>
                We may update these Terms periodically. Continued use of the website constitutes acceptance of the updated Terms.
              </p>
            </div>
          </div>
        </section>

        {/* 12 — Contact */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">12</span>Contact</div>
            <div>
              <h2 className="reveal h-section" style={{ marginBottom: "var(--s5)" }}>
                12. <em>Contact.</em>
              </h2>
              <p className="reveal reveal-delay-1 measure" style={{ ...bodyStyle, marginBottom: "var(--s4)" }}>For questions regarding these Terms:</p>
              <div className="reveal reveal-delay-2 glass" style={{ padding: "var(--s5)", display: "grid", gap: "var(--s2)", maxWidth: "var(--measure)" }}>
                <p style={{ ...bodyStyle, color: "var(--ink)" }}>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:hello@emirone.com" className="link-wipe" style={{ color: "var(--green)" }}>
                    hello@emirone.com
                  </a>
                </p>
                <p style={{ ...bodyStyle, color: "var(--ink)" }}>
                  <strong>Website:</strong>{" "}
                  <a href="https://emirone.com" className="link-wipe" style={{ color: "var(--green)" }}>
                    https://emirone.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
