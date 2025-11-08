import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Calendar } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface HeaderProps {
  onBookTestRide?: () => void;
}

export default function Header({ onBookTestRide }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const submitDealerInquiry = useMutation(api.bookings.submitDealerInquiry);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Products", href: "#products" },
    { label: "Features", href: "#features" },
    { label: "Technology", href: "#technology" },
    { label: "About", href: "#about" },
  ];

  const handleDealershipSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      businessName: formData.get("businessName") as string,
      businessType: formData.get("businessType") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      city: formData.get("city") as string,
      lowSpeedEV: formData.get("lowSpeedEV") === "on",
      highSpeedEV: formData.get("highSpeedEV") === "on",
    };

    const message = `Business: ${data.businessName} | Type: ${data.businessType} | Low-Speed: ${data.lowSpeedEV ? "Yes" : "No"} | High-Speed: ${data.highSpeedEV ? "Yes" : "No"}`;

    try {
      await submitDealerInquiry({
        name: data.name,
        email: data.email,
        phone: data.phone,
        city: data.city,
        message,
      });
      toast.success("Application submitted successfully! We'll contact you soon.");
      setIsDialogOpen(false);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-effect shadow-lg" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold text-background">E</span>
            </div>
            <span className="text-xl font-bold gradient-text">ELECTRO VIVE</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center space-x-4">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="cursor-pointer">
                  Apply for Dealership
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl gradient-text">🚗 Dealership Application Form</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleDealershipSubmit} className="space-y-6 mt-4">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold">1️⃣ Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name / Owner's Name</Label>
                        <Input id="name" name="name" placeholder="e.g., Rahul Sharma" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="businessName">Business Name / Shop Name</Label>
                        <Input id="businessName" name="businessName" placeholder="e.g., Sharma Motors" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessType">Business Type</Label>
                      <Select name="businessType" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ev-showroom">EV Showroom</SelectItem>
                          <SelectItem value="multi-brand">Multi-brand Showroom</SelectItem>
                          <SelectItem value="service-center">Service Center</SelectItem>
                          <SelectItem value="new-business">New Business</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" name="email" type="email" placeholder="rahulsharma@gmail.com" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" name="city" placeholder="e.g., Patna" required />
                    </div>
                  </div>

                  {/* Vehicle Category Selection */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold">2️⃣ Vehicle Category Selection</h3>
                    <p className="text-sm text-muted-foreground">Select which EV type(s) you're interested in for dealership:</p>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <Checkbox id="lowSpeedEV" name="lowSpeedEV" />
                        <div className="space-y-1">
                          <Label htmlFor="lowSpeedEV" className="cursor-pointer font-medium">
                            Low-Speed EVs (≤ 25 km/h)
                          </Label>
                          <p className="text-xs text-muted-foreground">No license or registration required</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Checkbox id="highSpeedEV" name="highSpeedEV" />
                        <div className="space-y-1">
                          <Label htmlFor="highSpeedEV" className="cursor-pointer font-medium">
                            High-Speed EVs (≥ 45 km/h)
                          </Label>
                          <p className="text-xs text-muted-foreground">License and registration required</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="pt-4">
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-background" disabled={isLoading}>
                      {isLoading ? "Submitting..." : "✅ Apply for Dealership"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
            <Button 
              size="sm" 
              className="bg-primary hover:bg-primary/90 text-background cursor-pointer"
              onClick={onBookTestRide}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Test Ride
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="cursor-pointer">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-card">
              <nav className="flex flex-col space-y-6 mt-8">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-6 border-t border-border space-y-3">
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full cursor-pointer">
                        Apply for Dealership
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-background cursor-pointer"
                    onClick={onBookTestRide}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Test Ride
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}