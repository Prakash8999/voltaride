import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import DealershipModal from "./DealershipModal";
import InterestModal from "./InterestModal";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dealershipModalOpen, setDealershipModalOpen] = useState(false);
  const [interestModalOpen, setInterestModalOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // On Home page, keep transparent until Hero is covered (approx 100vh - header height)
      // On other pages, use standard shallow threshold
      const isHome = location.pathname === "/";
      const threshold = isHome ? (window.innerHeight - 80) : 20;
      setIsScrolled(window.scrollY > threshold);
    };

    handleScroll(); // Initial check
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const navLinks = [
    { label: "Products", href: "/#products" },
    { label: "Features", href: "/#features" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent ${isScrolled
        ? "bg-white/80 backdrop-blur-md border-white/10 py-3 shadow-none"
        : "bg-transparent py-6"
        }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <img
              src="/logo.jpg"
              alt="Aerix Energy"
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className={`transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-90 text-white'}`}>
              <span className={`text-xl font-bold tracking-tight ${isScrolled ? 'text-foreground' : 'text-white'}`}>
                Aerix
              </span>
            </div>
          </a>

          {/* Minimal Desktop Nav (Hidden initially or subtle) */}
          <nav className={`hidden lg:flex items-center gap-8 ${isScrolled ? 'text-muted-foreground' : 'text-white/80'}`}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-4">
            {/* Primary CTA Only */}
            <Button
              size="sm"
              onClick={() => setInterestModalOpen(true)}
              className={`rounded-full px-6 font-medium transition-all duration-300 ${isScrolled
                ? ""
                : "bg-white text-black hover:bg-white/90"
                }`}
            >
              Book Test Ride
            </Button>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden">
              <button
                className={`p-2 transition-colors ${isScrolled ? 'text-foreground' : 'text-white'}`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-6"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-2xl font-medium text-foreground/80 hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <hr className="border-border/50" />
              <Button
                size="lg"
                className="w-full text-lg py-6"
                onClick={() => { setInterestModalOpen(true); setMobileMenuOpen(false); }}
              >
                Book Test Ride
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full text-lg py-6"
                onClick={() => { setDealershipModalOpen(true); setMobileMenuOpen(false); }}
              >
                Become a Dealer
              </Button>
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
