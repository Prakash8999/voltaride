import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface DealershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DealershipModal = ({ isOpen, onClose }: DealershipModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    businessType: "",
    email: "",
    phone: "",
    lowSpeed: false,
    highSpeed: false,
    honeypot: "",
  });

  // Validation
  const validate = () => {
    if (formData.name.trim().length < 2) {
      toast({ title: "Invalid Name", description: "Enter a valid full name" });
      return false;
    }

    if (formData.businessName.trim().length < 2) {
      toast({ title: "Invalid Business Name", description: "Enter a valid business name" });
      return false;
    }

    if (!formData.businessType) {
      toast({ title: "Business Type Required", description: "Select a business type" });
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast({ title: "Invalid Email", description: "Enter a valid email" });
      return false;
    }

    if (!/^[\+]?[1-9][\d]{9,14}$/.test(formData.phone)) {
      toast({ title: "Invalid Phone Number", description: "Enter a valid phone number" });
      return false;
    }

    if (!formData.lowSpeed && !formData.highSpeed) {
      toast({
        title: "Selection Required",
        description: "Select at least one vehicle category",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const payload = {
        type: "dealership",
        name: formData.name,
        businessName: formData.businessName,
        businessType: formData.businessType,
        email: formData.email,
        phone: formData.phone,
        lowSpeed: formData.lowSpeed,
        highSpeed: formData.highSpeed,
        honeypot: formData.honeypot,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_EMAIL_API}/api/email/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        toast({ title: "Failed", description: data.message || "An error occurred" });
        setLoading(false);
        return;
      }

      toast({
        title: "Application Submitted!",
        description: "We’ve sent a confirmation email. Our team will contact you shortly.",
      });

      setFormData({
        name: "",
        businessName: "",
        businessType: "",
        email: "",
        phone: "",
        lowSpeed: false,
        highSpeed: false,
        honeypot: "",
      });

      onClose();
    } catch (error) {
      toast({ title: "Error", description: "Something went wrong. Try again." });
    } finally {
      setLoading(false);
    }
  };

  // ESC key and body scroll lock with position preservation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Store current scroll position and prevent body scroll
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // Restore body scroll and position
      if (isOpen) {
        const scrollY = document.body.style.top;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm overflow-hidden">
      <div className="glass rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 glass border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold gradient-text">🚗 Dealership Application Form</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Honeypot */}
          <input
            type="text"
            value={formData.honeypot}
            onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
            className="hidden"
            autoComplete="off"
            tabIndex={-1}
          />

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">1️⃣ Basic Information</h3>

            <div>
              <Label>Full Name / Owner's Name</Label>
              <Input
                placeholder="e.g., Rahul Sharma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <Label>Business Name / Shop Name</Label>
              <Input
                placeholder="e.g., Sharma Motors"
                value={formData.businessName}
                onChange={(e) =>
                  setFormData({ ...formData, businessName: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label>Business Type</Label>
              <Select
                value={formData.businessType}
                onValueChange={(value) =>
                  setFormData({ ...formData, businessType: value })
                }
                required
              >
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

            <div>
              <Label>Email Address</Label>
              <Input
                type="email"
                placeholder="e.g., rahulsharma@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <Label>Phone Number</Label>
              <Input
                type="tel"
                placeholder="e.g., +91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Vehicle Category */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">2️⃣ Vehicle Category Selection</h3>

            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:border-primary transition-colors">
                <Checkbox
                  checked={formData.lowSpeed}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, lowSpeed: checked as boolean })
                  }
                />
                <div className="flex-1">
                  <Label className="font-medium cursor-pointer">Low-Speed EVs (≤ 25 km/h)</Label>
                  <p className="text-sm text-muted-foreground">
                    No license or registration required
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:border-primary transition-colors">
                <Checkbox
                  checked={formData.highSpeed}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, highSpeed: checked as boolean })
                  }
                />
                <div className="flex-1">
                  <Label className="font-medium cursor-pointer">High-Speed EVs (≥ 45 km/h)</Label>
                  <p className="text-sm text-muted-foreground">
                    License and registration required
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                </>
              ) : (
                "✅ Apply for Dealership"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DealershipModal;
