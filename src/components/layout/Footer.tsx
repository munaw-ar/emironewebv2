import { Link, useNavigate, useLocation } from "react-router-dom";
import logoMain from "@/assets/logo-main.png";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLinkClick = (href: string, isRoute: boolean) => {
    if (isRoute) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      navigate(href);
    } else {
      if (location.pathname === '/') {
        const element = document.querySelector(href);
        if (element) {
          const offset = 80;
          const targetPosition = element.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
      } else {
        navigate('/' + href);
      }
    }
  };

  const quickLinks = [
    { label: "How It Works", href: "#how-it-works", isRoute: false },
    { label: "How We Make It", href: "/how-we-make-it", isRoute: true },
    { label: "Fit", href: "/fit", isRoute: true },
    { label: "Sharia-Aligned", href: "/sharia-aligned", isRoute: true },
    { label: "Research", href: "/research", isRoute: true },
  ];

  return (
    <footer className="bg-foreground text-primary-foreground py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 md:gap-8 mb-10">
          <div>
            <Link to="/" className="block mb-3 hover:opacity-80 transition-opacity">
              <img src={logoMain} alt="Emir One" className="h-10 w-auto object-contain brightness-0 invert" />
            </Link>
            <p className="text-primary-foreground/60 text-[14px] leading-relaxed max-w-[280px]">
              Predictable outbound systems for ethical B2B growth.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-primary-foreground/90 mb-4 text-[13px] uppercase tracking-wider">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleLinkClick(link.href, link.isRoute)}
                  className="text-[14px] text-primary-foreground/60 hover:text-primary-foreground transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="font-semibold text-primary-foreground/90 mb-4 text-[13px] uppercase tracking-wider">Legal</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/privacy-policy" className="text-[14px] text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-[14px] text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Terms of Service
              </Link>
            </nav>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-foreground/10">
          <p className="text-center text-[13px] text-primary-foreground/40">
            © 2025 Emir One. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
