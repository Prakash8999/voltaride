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
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";

interface TestRideModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preSelectedModel?: string;
  isEnquiry?: boolean;
}

export default function TestRideModal({
  open,
  onOpenChange,
  preSelectedModel = "",
  isEnquiry = false,
}: TestRideModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    product: preSelectedModel,
    pincode: "",
    whatsappUpdates: false,
    honeypot: "", // anti-bot hidden field
  });

  const validateForm = () => {
    if (formData.name.trim().length < 2) {
      toast.error("Please enter a valid name.");
      return false;
    }

    if (!/^[\+]?[1-9][\d]{9,14}$/.test(formData.phone)) {
      toast.error("Enter a valid phone number.");
      return false;
    }

    if (isEnquiry && formData.email.trim() !== "") {
      if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        toast.error("Enter a valid email.");
        return false;
      }
    }

    if (!formData.product) {
      toast.error("Please select a vehicle model.");
      return false;
    }

    if (!/^\d{5,6}$/.test(formData.pincode)) {
      toast.error("Enter a valid pincode.");
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (preSelectedModel) {
      setFormData((prev) => ({ ...prev, product: preSelectedModel }));
    }
  }, [preSelectedModel]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };

    if (open) {
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
      if (open) {
        const scrollY = document.body.style.top;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    };
  }, [open, onOpenChange]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const payload = {
        type: "testride",
        name: formData.name,
        phone: formData.phone,
        email: formData.email || undefined,
        product: formData.product,
        pincode: formData.pincode,
        whatsappUpdates: formData.whatsappUpdates,
        isEnquiry,
        honeypot: formData.honeypot,
      };

      const res = await fetch(`${import.meta.env.VITE_EMAIL_API}/api/email/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Something went wrong.");
        return;
      }

      toast.success(
        isEnquiry
          ? "Thank you! Our team will contact you soon."
          : "Your test ride request has been submitted!"
      );

      localStorage.setItem("aerixenergy-interest-submitted", "true");

      onOpenChange(false);

      setFormData({
        name: "",
        phone: "",
        email: "",
        product: preSelectedModel,
        pincode: "",
        whatsappUpdates: false,
        honeypot: "",
      });
    } catch (err) {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm overflow-hidden">
      <div className="glass rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="sticky top-0 glass border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold gradient-text">
            {isEnquiry ? "Enquire Now" : "Book Your Test Ride"}
          </h2>
          <button
            onClick={() => onOpenChange(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <input
            type="text"
            value={formData.honeypot}
            onChange={(e) =>
              setFormData({ ...formData, honeypot: e.target.value })
            }
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <p className="text-muted-foreground">
            {isEnquiry
              ? "Fill in your details and our sales team will get back to you"
              : "Are you interested in getting an Aerix Energy Product?"}
          </p>

          {/* Name */}
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              placeholder="Your full name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
          </div>

          {/* Email (only for enquiry) */}
          {isEnquiry && (
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
          )}

          {/* Model Select */}
          <div className="space-y-2">
            <Label>Vehicle Model</Label>
            <Select
              value={formData.product}
              onValueChange={(v) => setFormData({ ...formData, product: v })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AERIX ENDURO">AERIX ENDURO</SelectItem>
                <SelectItem value="AERIX GLIDE">AERIX GLIDE</SelectItem>
                <SelectItem value="AERIX PRIME">AERIX PRIME</SelectItem>
                <SelectItem value="AERIX RANGER">AERIX RANGER</SelectItem>
                <SelectItem value="AERIX URBAN">AERIX URBAN</SelectItem>
                <SelectItem value="AERIX TITAN">AERIX TITAN</SelectItem>
                <SelectItem value="AERIX VOLT">AERIX VOLT</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Pincode */}
          <div className="space-y-2">
            <Label>Pincode</Label>
            <Input
              placeholder="Enter your pincode"
              value={formData.pincode}
              onChange={(e) =>
                setFormData({ ...formData, pincode: e.target.value })
              }
              required
            />
          </div>

          {/* WhatsApp */}
          <div className="flex items-center gap-2">
            <Checkbox
              checked={formData.whatsappUpdates}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  whatsappUpdates: checked as boolean,
                })
              }
            />
            <Label className="cursor-pointer">Get updates on WhatsApp</Label>
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? (
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
    </div>,
    document.body
  );
}
