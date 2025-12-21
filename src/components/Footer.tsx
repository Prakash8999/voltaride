import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";
import { useState } from "react";
import DealershipModal from "./DealershipModal";
import TestRideModal from "./TestRideModal";
import ServiceCentersModal from "./ServiceCentersModal";
import ContactUsModal from "./ContactUsModal";
import WarrantyModal from "./WarrantyModal";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const [dealershipModalOpen, setDealershipModalOpen] = useState(false);
  const [testRideModalOpen, setTestRideModalOpen] = useState(false);
  const [serviceCentersModalOpen, setServiceCentersModalOpen] = useState(false);
  const [contactUsModalOpen, setContactUsModalOpen] = useState(false);
  const [warrantyModalOpen, setWarrantyModalOpen] = useState(false);
  const navigate = useNavigate();


  const footerSections = [
    {
      title: "Products",
      links: [
        { label: "E-Velco Pro", action: () => navigate("/product/1") },
        { label: "Aerix Energy Loader", action: () => navigate("/product/2") },
        { label: "Spimri", action: () => navigate("/product/3") },
        { label: "Aurra Pro", action: () => navigate("/product/4") },
        { label: "Cruiser", action: () => navigate("/product/5") },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Apply For Dealership", href: "#", action: () => setDealershipModalOpen(true) },
        { label: "Book Test Ride", href: "#", action: () => setTestRideModalOpen(true) },
        { label: "Service Centers", href: "#", action: () => setServiceCentersModalOpen(true) },
        { label: "Contact Us", href: "#", action: () => setContactUsModalOpen(true) },
        { label: "Warranty", href: "#", action: () => setWarrantyModalOpen(true) },
      ],
    },
    // {
    //   title: "Company",
    //   links: [
    //     { label: "About Us", href: "#" },
    //     { label: "Careers", href: "#" },
    //     { label: "Press Kit", href: "#" },
    //     { label: "Blog", href: "#" },
    //     { label: "Investors", href: "#" },
    //   ],
    // },
    // {
    //   title: "Legal",
    //   links: [
    //     { label: "Privacy Policy", href: "#" },
    //     { label: "Terms of Service", href: "#" },
    //     { label: "Cookie Policy", href: "#" },
    //     { label: "Refund Policy", href: "#" },
    //   ],
    // },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <a href="/" className="text-2xl font-bold gradient-text">
              Aerix Energy
            </a>
            <p className="text-xs text-muted-foreground  mb-4">
              A unit of Finactics Consultants Pvt Ltd
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Office Number 205, Regency Plaza,Shanti Nagar, Nr Waldhuni Bridge,Ulhasnagar Mumbai 421004
            </p>
            {/* <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div> */}
          </div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.action) {
                          e.preventDefault();
                          link.action();
                        }
                      }}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Aerix Energy. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">Accepted Payments:</span>
            <div className="flex gap-2">
              {["Visa", "Mastercard", "UPI", "Paytm"].map((payment) => (
                <div
                  key={payment}
                  className="px-3 py-1 rounded bg-muted/50 text-xs font-medium"
                >
                  {payment}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <DealershipModal isOpen={dealershipModalOpen} onClose={() => setDealershipModalOpen(false)} />
      <TestRideModal open={testRideModalOpen} onOpenChange={setTestRideModalOpen} isEnquiry={true} />
      <ServiceCentersModal isOpen={serviceCentersModalOpen} onClose={() => setServiceCentersModalOpen(false)} />
      <ContactUsModal isOpen={contactUsModalOpen} onClose={() => setContactUsModalOpen(false)} />
      <WarrantyModal isOpen={warrantyModalOpen} onClose={() => setWarrantyModalOpen(false)} />
    </footer>
  );
};

export default Footer;
