import { motion } from "framer-motion";
import Navigation from "@/components/layout/Navigation";

const TermsOfService = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Content */}
      <motion.main
        className="container-wide pt-28 md:pt-36 pb-16 md:pb-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="max-w-3xl mx-auto" variants={itemVariants}>
          <motion.h1 
            className="text-heading-1 font-bold mb-4"
            variants={itemVariants}
          >
            Terms of Service
          </motion.h1>
          
          <motion.p 
            className="text-muted-foreground mb-12"
            variants={itemVariants}
          >
            <strong>Last updated:</strong> 15 DECEMBER 2025
          </motion.p>

          <motion.div 
            className="prose prose-lg max-w-none"
            variants={itemVariants}
          >
            <p className="text-body mb-12">
              These Terms of Service govern your use of <strong>emirone.com</strong> and any services provided by Emir One ("we", "us", or "our").
              <br /><br />
              By accessing this website or submitting an application, you agree to these Terms.
            </p>

            {/* Section 1 */}
            <motion.section className="mb-12" variants={itemVariants}>
              <h2 className="text-heading-3 font-semibold mb-4">1. Services Overview</h2>
              <p className="text-body mb-4">
                Emir One provides consulting and implementation services related to outbound email systems for B2B businesses.
              </p>
              <p className="text-body text-muted-foreground">
                All services are provided on a <strong>best-effort basis</strong>, not as guarantees of specific outcomes.
              </p>
            </motion.section>

            {/* Section 2 */}
            <motion.section className="mb-12" variants={itemVariants}>
              <h2 className="text-heading-3 font-semibold mb-4">2. No Guarantees or Earnings Claims</h2>
              <p className="text-body mb-4">We do <strong>not</strong> guarantee:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-body text-muted-foreground">
                <li>Revenue outcomes</li>
                <li>Meeting volume</li>
                <li>Sales results</li>
                <li>Business growth</li>
              </ul>
              <p className="text-body text-muted-foreground">
                Results depend on many factors outside our control, including your market, offer, execution, and external conditions.
              </p>
              <p className="text-body text-muted-foreground mt-4">
                Any examples discussed are illustrative only.
              </p>
            </motion.section>

            {/* Section 3 */}
            <motion.section className="mb-12" variants={itemVariants}>
              <h2 className="text-heading-3 font-semibold mb-4">3. Application and Acceptance</h2>
              <p className="text-body mb-4">
                Submitting an application does <strong>not</strong> guarantee acceptance as a client.
              </p>
              <p className="text-body mb-4">We reserve the right to:</p>
              <ul className="list-disc pl-6 space-y-2 text-body text-muted-foreground">
                <li>Accept or decline applicants</li>
                <li>Limit client capacity</li>
                <li>Discontinue discussions at our discretion</li>
              </ul>
            </motion.section>

            {/* Section 4 */}
            <motion.section className="mb-12" variants={itemVariants}>
              <h2 className="text-heading-3 font-semibold mb-4">4. Client Responsibilities</h2>
              <p className="text-body mb-4">You agree to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-body text-muted-foreground">
                <li>Provide accurate information</li>
                <li>Operate lawfully and ethically</li>
                <li>Comply with applicable marketing, privacy, and anti-spam laws</li>
                <li>Maintain responsibility for final messaging approvals</li>
              </ul>
              <p className="text-body text-muted-foreground">
                You remain responsible for your business decisions and outcomes.
              </p>
            </motion.section>

            {/* Section 5 */}
            <motion.section className="mb-12" variants={itemVariants}>
              <h2 className="text-heading-3 font-semibold mb-4">5. Intellectual Property</h2>
              <p className="text-body mb-4">All content on this website, including:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-body text-muted-foreground">
                <li>Text</li>
                <li>Frameworks</li>
                <li>Processes</li>
                <li>Visuals</li>
              </ul>
              <p className="text-body text-muted-foreground">
                is owned by Emir One and may not be copied, reproduced, or distributed without written permission.
              </p>
            </motion.section>

            {/* Section 6 */}
            <motion.section className="mb-12" variants={itemVariants}>
              <h2 className="text-heading-3 font-semibold mb-4">6. Confidentiality</h2>
              <p className="text-body text-muted-foreground">
                Any non-public information shared during discussions or engagements is treated as confidential unless disclosure is required by law.
              </p>
            </motion.section>

            {/* Section 7 */}
            <motion.section className="mb-12" variants={itemVariants}>
              <h2 className="text-heading-3 font-semibold mb-4">7. Limitation of Liability</h2>
              <p className="text-body mb-4">To the maximum extent permitted by law:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-body text-muted-foreground">
                <li>We are not liable for indirect, incidental, or consequential losses</li>
                <li>Our liability is limited to the amount paid for services (if any)</li>
              </ul>
              <p className="text-body text-muted-foreground">
                You use this website and our services at your own risk.
              </p>
            </motion.section>

            {/* Section 8 */}
            <motion.section className="mb-12" variants={itemVariants}>
              <h2 className="text-heading-3 font-semibold mb-4">8. Indemnification</h2>
              <p className="text-body mb-4">
                You agree to indemnify and hold harmless Emir One from any claims arising from:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body text-muted-foreground">
                <li>Your use of the website</li>
                <li>Your business activities</li>
                <li>Your breach of these Terms</li>
              </ul>
            </motion.section>

            {/* Section 9 */}
            <motion.section className="mb-12" variants={itemVariants}>
              <h2 className="text-heading-3 font-semibold mb-4">9. Termination</h2>
              <p className="text-body text-muted-foreground">
                We may suspend or terminate access to the website or services at any time if these Terms are breached.
              </p>
            </motion.section>

            {/* Section 10 */}
            <motion.section className="mb-12" variants={itemVariants}>
              <h2 className="text-heading-3 font-semibold mb-4">10. Governing Law</h2>
              <p className="text-body text-muted-foreground">
                These Terms are governed by the laws of <strong>Australia</strong>, without regard to conflict-of-law principles.
              </p>
            </motion.section>

            {/* Section 11 */}
            <motion.section className="mb-12" variants={itemVariants}>
              <h2 className="text-heading-3 font-semibold mb-4">11. Changes to Terms</h2>
              <p className="text-body text-muted-foreground">
                We may update these Terms periodically. Continued use of the website constitutes acceptance of the updated Terms.
              </p>
            </motion.section>

            {/* Section 12 */}
            <motion.section className="mb-12" variants={itemVariants}>
              <h2 className="text-heading-3 font-semibold mb-4">12. Contact</h2>
              <p className="text-body mb-4">For questions regarding these Terms:</p>
              <div className="bg-secondary/50 rounded-lg p-6 space-y-2">
                <p className="text-body">
                  <strong>Email:</strong>{" "}
                  <a href="mailto:hello@emirone.com" className="text-primary hover:underline">
                    hello@emirone.com
                  </a>
                </p>
                <p className="text-body">
                  <strong>Website:</strong>{" "}
                  <a href="https://emirone.com" className="text-primary hover:underline">
                    https://emirone.com
                  </a>
                </p>
              </div>
            </motion.section>
          </motion.div>
        </motion.div>
      </motion.main>

      {/* Footer */}
      <footer className="bg-foreground text-primary-foreground py-8">
        <div className="container-wide text-center">
          <p className="text-body-sm text-primary-foreground/60">
            © 2025 Emir One. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TermsOfService;
