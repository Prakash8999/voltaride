import { useEffect, useState } from "react";
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

interface InterestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InterestModal = ({ isOpen, onClose }: InterestModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    product: "",
    pincode: "",
    whatsapp: false,
    honeypot: "",
  });

  // ------------ VALIDATION ------------
  const validate = () => {
    if (formData.name.trim().length < 2) {
      toast({ title: "Invalid Name", description: "Please enter your full name." });
      return false;
    }

    if (!/^[\+]?[1-9][\d]{9,14}$/.test(formData.phone)) {
      toast({ title: "Invalid Phone Number", description: "Enter a valid phone number." });
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast({ title: "Invalid Email", description: "Please enter a valid email address." });
      return false;
    }

    if (!formData.product) {
      toast({ title: "Select Product", description: "Please choose a vehicle category." });
      return false;
    }

    if (!/^\d{5,6}$/.test(formData.pincode)) {
      toast({ title: "Invalid Pincode", description: "Please enter a valid pincode." });
      return false;
    }

    return true;
  };

  // ------------ FORM SUBMIT ------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const payload = {
        type: "interest",
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        product: formData.product,
        pincode: formData.pincode,
        whatsapp: formData.whatsapp,
        honeypot: formData.honeypot,
      };

      const res = await fetch(`${import.meta.env.VITE_EMAIL_API}/api/email/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        toast({ title: "Failed", description: data.message || "Unable to submit." });
        setLoading(false);
        return;
      }

      toast({
        title: "Thank you for your interest!",
        description: "We have emailed you the confirmation.",
      });

      localStorage.setItem("electro-vive-interest-submitted", "true");

      setFormData({
        name: "",
        phone: "",
        email: "",
        product: "",
        pincode: "",
        whatsapp: false,
        honeypot: "",
      });

      onClose();
    } catch (err) {
      toast({ title: "Error", description: "Something went wrong. Try again." });
    } finally {
      setLoading(false);
    }
  };

  // ESC close and body scroll lock with position preservation
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
      <div className="glass rounded-2xl w-full max-w-md">
        <div className="glass border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            Are you interested in getting an ElectroVive Product?
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Honeypot */}
          <input
            type="text"
            value={formData.honeypot}
            onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
            className="hidden"
            autoComplete="off"
            tabIndex={-1}
          />

          {/* Name */}
          <div>
            <Label>Name</Label>
            <Input
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          {/* Phone */}
          <div>
            <Label>Phone Number</Label>
            <Input
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          {/* Email */}
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          {/* Product */}
          <div>
            <Label>Product interested in</Label>
            <Select
              value={formData.product}
              onValueChange={(value) => setFormData({ ...formData, product: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select speed category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="25-max">25 km/h Max</SelectItem>
                <SelectItem value="45-max">45 km/h Max</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Pincode */}
          <div>
            <Label>Pincode</Label>
            <Input
              placeholder="Enter your pincode"
              value={formData.pincode}
              onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
              required
            />
          </div>

          {/* WhatsApp */}
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={formData.whatsapp}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, whatsapp: checked as boolean })
              }
            />
            <Label className="cursor-pointer">Get updates on WhatsApp</Label>
          </div>

          {/* Submit */}
          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Proceed"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default InterestModal;
