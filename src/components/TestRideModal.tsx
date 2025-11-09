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
  });

  React.useEffect(() => {
    if (preSelectedModel) {
      setFormData((prev) => ({ ...prev, product: preSelectedModel }));
    }
  }, [preSelectedModel]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onOpenChange]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    localStorage.setItem("electro-vive-interest-submitted", "true");

    const successMessage = isEnquiry
      ? "Thank you for your enquiry! Our sales team will contact you soon."
      : "Thank you! We'll contact you soon to schedule your test ride.";

    toast.success(successMessage);
    onOpenChange(false);
    setIsSubmitting(false);

    setFormData({
      name: "",
      phone: "",
      email: "",
      product: preSelectedModel,
      pincode: "",
      whatsappUpdates: false,
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="glass rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">

        {/* Sticky Header */}
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

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <p className="text-muted-foreground">
            {isEnquiry
              ? "Fill in your details and our sales team will get back to you"
              : "Are you interested in getting an ElectroVive Product?"}
          </p>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
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
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
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
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
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
            <Label htmlFor="product">Vehicle Model</Label>
            <Select
              value={formData.product}
              onValueChange={(value) =>
                setFormData({ ...formData, product: value })
              }
              required
            >
              <SelectTrigger id="product">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="E-Velco Pro">E-Velco Pro</SelectItem>
                <SelectItem value="Electro Vive Loader">Electro Vive Loader</SelectItem>
                <SelectItem value="Spimri">Spimri</SelectItem>
                <SelectItem value="Aurra Pro">Aurra Pro</SelectItem>
                <SelectItem value="Cruiser">Cruiser</SelectItem>
                <SelectItem value="Shravil">Shravil</SelectItem>
                <SelectItem value="Ninja Plus+">Ninja Plus+</SelectItem>
                <SelectItem value="GTR+">GTR+</SelectItem>
                <SelectItem value="Ninja Mini">Ninja Mini</SelectItem>
                <SelectItem value="Ninja 2G">Ninja 2G</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Pincode */}
          <div className="space-y-2">
            <Label htmlFor="pincode">Pincode</Label>
            <Input
              id="pincode"
              placeholder="Enter your pincode"
              value={formData.pincode}
              onChange={(e) =>
                setFormData({ ...formData, pincode: e.target.value })
              }
              required
            />
          </div>

          {/* WhatsApp Updates */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="whatsapp"
              checked={formData.whatsappUpdates}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  whatsappUpdates: checked as boolean,
                })
              }
            />
            <Label htmlFor="whatsapp" className="cursor-pointer">
              Get updates on WhatsApp
            </Label>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isSubmitting}
          >
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
    </div>
  );
}
