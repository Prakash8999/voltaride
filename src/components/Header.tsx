import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import DealershipModal from "./DealershipModal";
import InterestModal from "./InterestModal";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dealershipModalOpen, setDealershipModalOpen] = useState(false);
  const [interestModalOpen, setInterestModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Use absolute root-hash links so that navigating from a nested route like /contact
  // correctly leaves the page and goes back to the home sections (/#section) instead
  // of staying on /contact#section.
  const navLinks = [
    { label: "Products", href: "/#products" },
    { label: "Features", href: "/#features" },
    { label: "Contact", href: "/contact" },
    { label: "About", href: "/#about" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold gradient-text">
              Electro Vive
            </a>
            <p className="text-xs text-muted-foreground mt-1">
              A unit of Finactics Consultants Pvt Ltd
            </p>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={() => setDealershipModalOpen(true)}>
              Apply for Dealership
            </Button>
            <Button size="sm" onClick={() => setInterestModalOpen(true)}>Book Test Ride</Button>
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-border"
          >
            <div className="container-custom py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-base font-medium text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 space-y-3">
                <Button variant="ghost" className="w-full" onClick={() => { setDealershipModalOpen(true); setMobileMenuOpen(false); }}>
                  Apply for Dealership
                </Button>
                <Button className="w-full" onClick={() => { setInterestModalOpen(true); setMobileMenuOpen(false); }}>Book Test Ride</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <DealershipModal isOpen={dealershipModalOpen} onClose={() => setDealershipModalOpen(false)} />
      <InterestModal isOpen={interestModalOpen} onClose={() => setInterestModalOpen(false)} />
    </header>
  );
};

export default Header;
