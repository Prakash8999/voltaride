import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export default function InterestModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    product: "",
    pincode: "",
    whatsappUpdates: false,
  });

  useEffect(() => {
    // Check if user has already submitted
    const alreadySubmitted = localStorage.getItem("electro-vive-interest-submitted");
    if (alreadySubmitted === "true") {
      return;
    }

    // Track scroll activity
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      if (!hasScrolled) {
        setHasScrolled(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Show modal after 1 minute of scrolling
    if (hasScrolled) {
      scrollTimeout = setTimeout(() => {
        setIsOpen(true);
      }, 60000); // 60 seconds
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [hasScrolled]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form
    if (!formData.name || !formData.phone || !formData.product || !formData.pincode) {
      toast.error("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    try {
      // Store submission in localStorage
      localStorage.setItem("electro-vive-interest-submitted", "true");
      
      // Here you would typically send data to backend
      // await submitInterest(formData);
      
      toast.success("Thank you for your interest! We'll contact you soon.");
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-text">
            Are you interested in getting an ELECTRO VIVE Product?
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product">Product interested in *</Label>
            <Select
              value={formData.product}
              onValueChange={(value) => setFormData({ ...formData, product: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select speed category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="speed-25">Speed 25 km/h Max (Low-Speed EV)</SelectItem>
                <SelectItem value="speed-45">Speed 45 km/h Max (High-Speed EV)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pincode">Pincode *</Label>
            <Input
              id="pincode"
              placeholder="Enter your pincode"
              value={formData.pincode}
              onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="whatsapp"
              checked={formData.whatsappUpdates}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, whatsappUpdates: checked as boolean })
              }
            />
            <Label htmlFor="whatsapp" className="cursor-pointer font-normal">
              Get updates on WhatsApp
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-background"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Proceed"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
