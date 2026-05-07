import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logoMain from "@/assets/logo-main.png";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    closeMobileMenu();
  }, [closeMobileMenu, location]);

  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          const offset = 80;
          const targetPosition = element.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: targetPosition, behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  // Primary nav links (conversion-ordered)
  const primaryLinks = [
  { label: "How It Works", href: "/", isRoute: true, isAnchor: true, anchor: "#how-it-works" },
  { label: "How We Make It", href: "/how-we-make-it", isRoute: true },
  { label: "Fit", href: "/fit", isRoute: true }];


  // Utility link (visible but secondary)
  const utilityLinks = [
  { label: "Sharia-Aligned", href: "/sharia-aligned", isRoute: true }];


  // Mobile-only footer links
  const mobileFooterLinks = [
  { label: "Privacy Policy", href: "/privacy-policy", isRoute: true },
  { label: "Terms of Service", href: "/terms-of-service", isRoute: true }];


  const isActivePath = (link: {href: string;isAnchor?: boolean;anchor?: string;}) => {
    if (link.isAnchor) {
      return location.pathname === "/" && !location.hash;
    }
    return location.pathname === link.href;
  };

  const handleNavClick = (link: {href: string;isRoute?: boolean;isAnchor?: boolean;anchor?: string;}) => {
    closeMobileMenu();
    if (link.isAnchor) {
      if (location.pathname === "/") {
        const element = document.querySelector(link.anchor!);
        if (element) {
          const offset = 80;
          const targetPosition = element.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: targetPosition, behavior: "smooth" });
        }
      } else {
        navigate("/" + link.anchor);
      }
    } else if (link.isRoute) {
      window.scrollTo({ top: 0, behavior: "instant" });
      navigate(link.href);
    }
  };

  const handleCTAClick = useCallback(() => {
    closeMobileMenu();
    navigate("/book");
  }, [closeMobileMenu, navigate]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"}`
        }>

        <nav className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo - left */}
            <Link
              to="/"
              className="flex h-full items-center px-1 flex-shrink-0 hover:opacity-80 transition-opacity">

              <img src={logoMain} alt="Emir One" className="h-10 md:h-12 w-auto object-contain" />
            </Link>

            {/* Desktop: Centered nav links */}
            <div className="hidden lg:flex items-center gap-6">
              {primaryLinks.map((link) =>
              <button
                key={link.href + link.label}
                onClick={() => handleNavClick(link)}
                className={`text-[14px] font-medium leading-[1.2] transition-colors whitespace-nowrap relative py-1 ${
                isActivePath(link) ?
                "text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-primary after:rounded-full" :
                "text-muted-foreground hover:text-foreground"}`
                }>

                  {link.label}
                </button>
              )}

              {/* Utility link inline, slightly muted */}
              {utilityLinks.map((link) =>
              <button
                key={link.href}
                onClick={() => handleNavClick(link)}
                className={`text-[13px] font-normal leading-[1.2] transition-colors whitespace-nowrap relative py-1 ${
                isActivePath(link) ?
                "text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-primary after:rounded-full" :
                "text-muted-foreground/70 hover:text-muted-foreground"}`
                }>

                  {link.label}
                </button>
              )}
            </div>

            {/* Desktop: Research button - right */}
            <button
              onClick={() => {navigate("/research");window.scrollTo({ top: 0, behavior: "instant" });}}
              className="hidden lg:flex items-center gap-2 px-5 h-11 text-[14px] font-semibold leading-[1.2] text-foreground border border-border/60 rounded-md transition-all duration-300 relative overflow-hidden group hover:border-primary/40 hover:shadow-[0_0_12px_hsl(var(--primary)/0.1)]">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/[0.06] to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out" />
              <span className="relative z-10">Our Research</span>
              <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-primary/60 group-hover:bg-primary transition-colors duration-300 group-hover:shadow-[0_0_6px_hsl(var(--primary)/0.5)]" />
            </button>

            {/* Mobile: CTA + Hamburger */}
            <div className="lg:hidden flex items-center gap-2 ml-auto">
              <button
                onClick={() => {navigate("/research");window.scrollTo({ top: 0, behavior: "instant" });closeMobileMenu();}}
                className="flex items-center gap-1.5 px-3.5 h-9 text-[13px] font-semibold text-foreground border border-border/60 rounded-md transition-all duration-300 relative overflow-hidden group hover:border-primary/40 hover:shadow-[0_0_12px_hsl(var(--primary)/0.1)]">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/[0.06] to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out" />
                <span className="relative z-10">Research</span>
                <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-primary/60 group-hover:bg-primary transition-colors duration-300 group-hover:shadow-[0_0_6px_hsl(var(--primary)/0.5)]" />
              </button>
              {!isMobileMenuOpen &&
              <button
                className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-foreground"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu">

                  <Menu size={24} />
                </button>
              }
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-foreground/50 lg:hidden"
          onClick={closeMobileMenu}>

            <motion.nav
            className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-background"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}>

              <div className="flex flex-col h-full">
                <div className="flex justify-end p-4">
                  <button onClick={closeMobileMenu} className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Close menu">
                    <X size={24} />
                  </button>
                </div>

                <div className="px-6 pb-6 pt-2 flex flex-col flex-1">
                  {/* Primary links */}
                  {primaryLinks.map((link, index) =>
                <motion.button
                  key={link.href + link.label}
                  onClick={() => handleNavClick(link)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`py-4 text-lg font-medium leading-none transition-colors text-left min-h-[56px] border-b border-border/30 ${
                  isActivePath(link) ? "text-primary" : "text-foreground hover:text-primary"}`
                  }>

                      {link.label}
                    </motion.button>
                )}

                  {/* Utility links */}
                  {utilityLinks.map((link, index) =>
                <motion.button
                  key={link.href}
                  onClick={() => handleNavClick(link)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (primaryLinks.length + index) * 0.05 }}
                  className={`py-4 text-base font-normal leading-none transition-colors text-left min-h-[56px] border-b border-border/30 ${
                  isActivePath(link) ? "text-primary" : "text-muted-foreground hover:text-foreground"}`
                  }>

                      {link.label}
                    </motion.button>
                )}

                  {/* Spacer */}
                  <div className="flex-1" />

                  {/* Footer links */}
                  <div className="pt-4 border-t border-border/30 flex flex-col gap-1">
                    {mobileFooterLinks.map((link) =>
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link)}
                    className="py-2 text-sm text-muted-foreground/60 hover:text-muted-foreground transition-colors text-left">

                        {link.label}
                      </button>
                  )}
                  </div>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        }
      </AnimatePresence>
    </>);

};

export default Navigation;