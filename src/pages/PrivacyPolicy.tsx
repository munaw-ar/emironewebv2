import Navigation from "@/components/layout/Navigation";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const leadStyle: React.CSSProperties = { fontFamily: "var(--body)", fontSize: "var(--step-1)", color: "var(--mid)", lineHeight: "var(--lh-lead)" };
const bodyStyle: React.CSSProperties = { fontFamily: "var(--body)", fontSize: "var(--step-0)", color: "var(--mid)", lineHeight: "var(--lh-body)" };
const listStyle: React.CSSProperties = { ...bodyStyle, paddingLeft: "1.4em", display: "grid", gap: "var(--s2)", listStyleType: "disc" };

const PrivacyPolicy = () => {
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
              Privacy <em>Policy.</em>
            </h1>
            <p className="reveal reveal-delay-1" style={{ ...bodyStyle, color: "var(--light)", marginBottom: "var(--s5)" }}>
              <strong>Last updated:</strong> 15 DECEMBER 2025
            </p>
            <p className="reveal reveal-delay-2 measure-lead" style={{ ...leadStyle, marginBottom: "var(--s4)" }}>
              Emir One ("we", "us", or "our") is committed to protecting your privacy and handling personal information in a transparent and lawful manner.
            </p>
            <p className="reveal reveal-delay-3 measure-lead" style={{ ...leadStyle }}>
              This Privacy Policy explains how we collect, use, store, and protect personal information when you visit <strong>emirone.com</strong> or engage with our services.
            </p>
          </div>
        </section>

        {/* 01 — Information We Collect */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper-2)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">01</span>Information We Collect</div>
            <div>
              <h2 className="reveal h-section" style={{ marginBottom: "var(--s4)" }}>1. Information We Collect</h2>
              <p className="reveal measure" style={{ ...bodyStyle, marginBottom: "var(--s4)" }}>
                We collect personal information only where it is reasonably necessary to operate our business.
              </p>

              <h3 style={{ fontFamily: "var(--body)", fontSize: "var(--step-0)", fontWeight: 600, color: "var(--ink)", marginBottom: "var(--s3)" }}>Information you may provide:</h3>
              <ul className="measure" style={{ ...listStyle, marginBottom: "var(--s5)" }}>
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Business name and website</li>
                <li>Information submitted via application or contact forms</li>
              </ul>

              <h3 style={{ fontFamily: "var(--body)", fontSize: "var(--step-0)", fontWeight: 600, color: "var(--ink)", marginBottom: "var(--s3)" }}>Information collected automatically:</h3>
              <ul className="measure" style={{ ...listStyle, marginBottom: "var(--s5)" }}>
                <li>IP address</li>
                <li>Browser type and device information</li>
                <li>Pages visited and time spent on site</li>
                <li>Referral source</li>
              </ul>

              <p className="measure" style={bodyStyle}>
                We do <strong>not</strong> intentionally collect sensitive personal information.
              </p>
            </div>
          </div>
        </section>

        {/* 02 — How We Use Your Information */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">02</span>How We Use Your Information</div>
            <div>
              <h2 className="reveal h-section" style={{ marginBottom: "var(--s4)" }}>2. How We Use Your Information</h2>
              <p className="reveal measure" style={{ ...bodyStyle, marginBottom: "var(--s4)" }}>We use your information to:</p>
              <ul className="measure" style={{ ...listStyle, marginBottom: "var(--s5)" }}>
                <li>Review and respond to applications or inquiries</li>
                <li>Assess business fit for our services</li>
                <li>Communicate regarding our services</li>
                <li>Improve website performance and user experience</li>
                <li>Meet legal and compliance obligations</li>
              </ul>
              <p className="measure" style={bodyStyle}>
                We do <strong>not</strong> sell, rent, or trade personal information.
              </p>
            </div>
          </div>
        </section>

        {/* 03 — Legal Basis for Processing */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper-2)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">03</span>Legal Basis</div>
            <div>
              <h2 className="reveal h-section" style={{ marginBottom: "var(--s4)" }}>3. Legal Basis for Processing</h2>
              <p className="reveal measure" style={{ ...bodyStyle, marginBottom: "var(--s4)" }}>Where applicable, we process personal information based on:</p>
              <ul className="measure" style={listStyle}>
                <li>Your consent</li>
                <li>Legitimate business interests</li>
                <li>Contractual necessity</li>
                <li>Legal obligations</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 04 — Data Storage and Security */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">04</span>Storage &amp; Security</div>
            <div>
              <h2 className="reveal h-section" style={{ marginBottom: "var(--s4)" }}>4. Data Storage and Security</h2>
              <p className="reveal measure" style={{ ...bodyStyle, marginBottom: "var(--s4)" }}>
                We take reasonable technical and organisational steps to protect personal information from:
              </p>
              <ul className="measure" style={{ ...listStyle, marginBottom: "var(--s5)" }}>
                <li>Unauthorised access</li>
                <li>Disclosure</li>
                <li>Misuse</li>
                <li>Loss</li>
              </ul>
              <p className="measure" style={bodyStyle}>
                However, no internet transmission is completely secure. You acknowledge this risk.
              </p>
            </div>
          </div>
        </section>

        {/* 05 — Third-Party Services */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper-2)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">05</span>Third-Party Services</div>
            <div>
              <h2 className="reveal h-section" style={{ marginBottom: "var(--s4)" }}>5. Third-Party Services</h2>
              <p className="reveal measure" style={{ ...bodyStyle, marginBottom: "var(--s4)" }}>We may use trusted third-party providers for:</p>
              <ul className="measure" style={{ ...listStyle, marginBottom: "var(--s5)" }}>
                <li>Website analytics</li>
                <li>Form processing</li>
                <li>Scheduling tools</li>
                <li>Email communications</li>
              </ul>
              <p className="measure" style={bodyStyle}>
                These providers access information only as required to perform their services and are obligated to maintain confidentiality.
              </p>
            </div>
          </div>
        </section>

        {/* 06 — Cookies and Analytics */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">06</span>Cookies &amp; Analytics</div>
            <div>
              <h2 className="reveal h-section" style={{ marginBottom: "var(--s4)" }}>6. Cookies and Analytics</h2>
              <p className="reveal measure" style={{ ...bodyStyle, marginBottom: "var(--s4)" }}>We may use cookies or similar technologies to:</p>
              <ul className="measure" style={{ ...listStyle, marginBottom: "var(--s5)" }}>
                <li>Understand site usage</li>
                <li>Improve performance</li>
                <li>Maintain functionality</li>
              </ul>
              <p className="measure" style={bodyStyle}>
                You can disable cookies through your browser settings.
              </p>
            </div>
          </div>
        </section>

        {/* 07 — Data Retention */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper-2)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">07</span>Data Retention</div>
            <div>
              <h2 className="reveal h-section" style={{ marginBottom: "var(--s4)" }}>7. Data Retention</h2>
              <p className="reveal measure" style={{ ...bodyStyle, marginBottom: "var(--s4)" }}>
                We retain personal information only as long as reasonably necessary for:
              </p>
              <ul className="measure" style={listStyle}>
                <li>Business operations</li>
                <li>Legal compliance</li>
                <li>Dispute resolution</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 08 — Your Rights */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">08</span>Your Rights</div>
            <div>
              <h2 className="reveal h-section" style={{ marginBottom: "var(--s4)" }}>8. Your Rights</h2>
              <p className="reveal measure" style={{ ...bodyStyle, marginBottom: "var(--s4)" }}>Depending on your jurisdiction, you may have the right to:</p>
              <ul className="measure" style={{ ...listStyle, marginBottom: "var(--s5)" }}>
                <li>Access your personal information</li>
                <li>Request correction or deletion</li>
                <li>Withdraw consent</li>
                <li>Lodge a complaint with a regulatory authority</li>
              </ul>
              <p className="measure" style={bodyStyle}>
                Requests can be made by contacting us directly.
              </p>
            </div>
          </div>
        </section>

        {/* 09 — International Data Transfers */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper-2)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">09</span>International Transfers</div>
            <div>
              <h2 className="reveal h-section" style={{ marginBottom: "var(--s4)" }}>9. International Data Transfers</h2>
              <p className="reveal measure" style={bodyStyle}>
                Your information may be processed or stored outside your country of residence. By using our site, you consent to this transfer.
              </p>
            </div>
          </div>
        </section>

        {/* 10 — Changes to This Policy */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">10</span>Changes</div>
            <div>
              <h2 className="reveal h-section" style={{ marginBottom: "var(--s4)" }}>10. Changes to This Policy</h2>
              <p className="reveal measure" style={bodyStyle}>
                We may update this Privacy Policy from time to time. The current version will always be posted on this page.
              </p>
            </div>
          </div>
        </section>

        {/* 11 — Contact */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--paper-2)" }}>
          <div className="w section-grid">
            <div className="section-eyebrow"><span className="sec-num">11</span>Contact</div>
            <div>
              <h2 className="reveal h-section" style={{ marginBottom: "var(--s4)" }}>11. Contact</h2>
              <p className="reveal measure" style={{ ...bodyStyle, marginBottom: "var(--s4)" }}>For privacy-related questions or requests:</p>
              <div className="reveal reveal-delay-1 glass" style={{ padding: "var(--s5)", display: "grid", gap: "var(--s2)", minWidth: 0 }}>
                <p style={bodyStyle}>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:hello@emirone.com" className="link-wipe" style={{ color: "var(--green)" }}>
                    hello@emirone.com
                  </a>
                </p>
                <p style={bodyStyle}>
                  <strong>Business Name:</strong> Emir One
                </p>
                <p style={bodyStyle}>
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

      {/* Footer */}
      <footer style={{ background: "var(--ink)", padding: "var(--s7) 0" }}>
        <div className="w" style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "var(--body)", fontSize: "var(--step--1)", color: "rgba(255,255,255,0.6)" }}>
            © 2025 Emir One. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
