import { motion } from "framer-motion";
import Navigation from "@/components/layout/Navigation";

const PrivacyPolicy = () => {
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
            Privacy Policy
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
            <p className="text-body mb-8">
              Emir One ("we", "us", or "our") is committed to protecting your privacy and handling personal information in a transparent and lawful manner.
            </p>
            <p className="text-body mb-12">
              This Privacy Policy explains how we collect, use, store, and protect personal information when you visit <strong>emirone.com</strong> or engage with our services.
            </p>

            {/* Section 1 */}
            <motion.section className="mb-12" variants={itemVariants}>
              <h2 className="text-heading-3 font-semibold mb-4">1. Information We Collect</h2>
              <p className="text-body mb-4">
                We collect personal information only where it is reasonably necessary to operate our business.
              </p>
              
              <h3 className="text-body font-semibold mb-3">Information you may provide:</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-body text-muted-foreground">
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Business name and website</li>
                <li>Information submitted via application or contact forms</li>
              </ul>

              <h3 className="text-body font-semibold mb-3">Information collected automatically:</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-body text-muted-foreground">
                <li>IP address</li>
                <li>Browser type and device information</li>
                <li>Pages visited and time spent on site</li>
                <li>Referral source</li>
              </ul>

              <p className="text-body text-muted-foreground">
                We do <strong>not</strong> intentionally collect sensitive personal information.
              </p>
            </motion.section>

            {/* Section 2 */}
            <motion.section className="mb-12" variants={itemVariants}>
              <h2 className="text-heading-3 font-semibold mb-4">2. How We Use Your Information</h2>
              <p className="text-body mb-4">We use your information to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-body text-muted-foreground">
                <li>Review and respond to applications or inquiries</li>
                <li>Assess business fit for our services</li>
                <li>Communicate regarding our services</li>
                <li>Improve website performance and user experience</li>
                <li>Meet legal and compliance obligations</li>
              </ul>
              <p className="text-body text-muted-foreground">
                We do <strong>not</strong> sell, rent, or trade personal information.
              </p>
            </motion.section>

            {/* Section 3 */}
            <motion.section className="mb-12" variants={itemVariants}>
              <h2 className="text-heading-3 font-semibold mb-4">3. Legal Basis for Processing</h2>
              <p className="text-body mb-4">Where applicable, we process personal information based on:</p>
              <ul className="list-disc pl-6 space-y-2 text-body text-muted-foreground">
                <li>Your consent</li>
                <li>Legitimate business interests</li>
                <li>Contractual necessity</li>
                <li>Legal obligations</li>
              </ul>
            </motion.section>

            {/* Section 4 */}
            <motion.section className="mb-12" variants={itemVariants}>
              <h2 className="text-heading-3 font-semibold mb-4">4. Data Storage and Security</h2>
              <p className="text-body mb-4">
                We take reasonable technical and organisational steps to protect personal information from:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-body text-muted-foreground">
                <li>Unauthorised access</li>
                <li>Disclosure</li>
                <li>Misuse</li>
                <li>Loss</li>
              </ul>
              <p className="text-body text-muted-foreground">
                However, no internet transmission is completely secure. You acknowledge this risk.
              </p>
            </motion.section>

            {/* Section 5 */}
            <motion.section className="mb-12" variants={itemVariants}>
              <h2 className="text-heading-3 font-semibold mb-4">5. Third-Party Services</h2>
              <p className="text-body mb-4">We may use trusted third-party providers for:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-body text-muted-foreground">
                <li>Website analytics</li>
                <li>Form processing</li>
                <li>Scheduling tools</li>
                <li>Email communications</li>
              </ul>
              <p className="text-body text-muted-foreground">
                These providers access information only as required to perform their services and are obligated to maintain confidentiality.
              </p>
            </motion.section>

            {/* Section 6 */}
            <motion.section className="mb-12" variants={itemVariants}>
              <h2 className="text-heading-3 font-semibold mb-4">6. Cookies and Analytics</h2>
              <p className="text-body mb-4">We may use cookies or similar technologies to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-body text-muted-foreground">
                <li>Understand site usage</li>
                <li>Improve performance</li>
                <li>Maintain functionality</li>
              </ul>
              <p className="text-body text-muted-foreground">
                You can disable cookies through your browser settings.
              </p>
            </motion.section>

            {/* Section 7 */}
            <motion.section className="mb-12" variants={itemVariants}>
              <h2 className="text-heading-3 font-semibold mb-4">7. Data Retention</h2>
              <p className="text-body mb-4">
                We retain personal information only as long as reasonably necessary for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body text-muted-foreground">
                <li>Business operations</li>
                <li>Legal compliance</li>
                <li>Dispute resolution</li>
              </ul>
            </motion.section>

            {/* Section 8 */}
            <motion.section className="mb-12" variants={itemVariants}>
              <h2 className="text-heading-3 font-semibold mb-4">8. Your Rights</h2>
              <p className="text-body mb-4">Depending on your jurisdiction, you may have the right to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-body text-muted-foreground">
                <li>Access your personal information</li>
                <li>Request correction or deletion</li>
                <li>Withdraw consent</li>
                <li>Lodge a complaint with a regulatory authority</li>
              </ul>
              <p className="text-body text-muted-foreground">
                Requests can be made by contacting us directly.
              </p>
            </motion.section>

            {/* Section 9 */}
            <motion.section className="mb-12" variants={itemVariants}>
              <h2 className="text-heading-3 font-semibold mb-4">9. International Data Transfers</h2>
              <p className="text-body text-muted-foreground">
                Your information may be processed or stored outside your country of residence. By using our site, you consent to this transfer.
              </p>
            </motion.section>

            {/* Section 10 */}
            <motion.section className="mb-12" variants={itemVariants}>
              <h2 className="text-heading-3 font-semibold mb-4">10. Changes to This Policy</h2>
              <p className="text-body text-muted-foreground">
                We may update this Privacy Policy from time to time. The current version will always be posted on this page.
              </p>
            </motion.section>

            {/* Section 11 */}
            <motion.section className="mb-12" variants={itemVariants}>
              <h2 className="text-heading-3 font-semibold mb-4">11. Contact</h2>
              <p className="text-body mb-4">For privacy-related questions or requests:</p>
              <div className="bg-secondary/50 rounded-lg p-6 space-y-2">
                <p className="text-body">
                  <strong>Email:</strong>{" "}
                  <a href="mailto:hello@emirone.com" className="text-primary hover:underline">
                    hello@emirone.com
                  </a>
                </p>
                <p className="text-body">
                  <strong>Business Name:</strong> Emir One
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

export default PrivacyPolicy;
