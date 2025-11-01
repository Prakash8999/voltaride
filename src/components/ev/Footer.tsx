import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const footerLinks = {
    Products: ["Apex Pro", "Surge X", "Flow", "Metro", "Compare Models"],
    Company: ["About Us", "Careers", "Press Kit", "Contact", "Blog"],
    Support: ["FAQ", "Service Centers", "Warranty", "User Manual", "Safety Tips"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Refund Policy"],
  };

  return (
    <footer className="bg-secondary/30 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-background">V</span>
              </div>
              <span className="text-xl font-bold gradient-text">VoltaRide</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Leading the electric revolution with cutting-edge technology and sustainable mobility solutions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-background/50 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-background/50 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-background/50 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-background/50 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-bold mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-6 py-8 border-t border-border">
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Call Us</p>
              <p className="font-bold">1800-123-4567</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-accent" />
            <div>
              <p className="text-sm text-muted-foreground">Email Us</p>
              <p className="font-bold">support@voltaride.com</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-destructive" />
            <div>
              <p className="text-sm text-muted-foreground">Visit Us</p>
              <p className="font-bold">Mumbai, India</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2024 VoltaRide. All rights reserved. | Made with ⚡ in India</p>
        </div>
      </div>
    </footer>
  );
}
