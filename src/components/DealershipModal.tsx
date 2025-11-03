import { useState } from "react";
import { X } from "lucide-react";
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
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    businessType: "",
    email: "",
    phone: "",
    lowSpeed: false,
    highSpeed: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.lowSpeed && !formData.highSpeed) {
      toast({
        title: "Selection Required",
        description: "Please select at least one vehicle category",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Application Submitted!",
      description: "We'll contact you within 24-48 hours.",
    });
    
    setFormData({
      fullName: "",
      businessName: "",
      businessType: "",
      email: "",
      phone: "",
      lowSpeed: false,
      highSpeed: false,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="glass rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 glass border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold gradient-text">🚗 Dealership Application Form</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">1️⃣ Basic Information</h3>
            
            <div>
              <Label htmlFor="fullName">Full Name / Owner's Name</Label>
              <Input
                id="fullName"
                placeholder="e.g., Rahul Sharma"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="businessName">Business Name / Shop Name</Label>
              <Input
                id="businessName"
                placeholder="e.g., Sharma Motors"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="businessType">Business Type</Label>
              <Select value={formData.businessType} onValueChange={(value) => setFormData({ ...formData, businessType: value })}>
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
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="e.g., rahulsharma@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
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
            <p className="text-sm text-muted-foreground">Select which EV type(s) you're interested in for dealership:</p>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:border-primary transition-colors">
                <Checkbox
                  id="lowSpeed"
                  checked={formData.lowSpeed}
                  onCheckedChange={(checked) => setFormData({ ...formData, lowSpeed: checked as boolean })}
                />
                <div className="flex-1">
                  <Label htmlFor="lowSpeed" className="font-medium cursor-pointer">
                    Low-Speed EVs (≤ 25 km/h)
                  </Label>
                  <p className="text-sm text-muted-foreground">No license or registration required</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:border-primary transition-colors">
                <Checkbox
                  id="highSpeed"
                  checked={formData.highSpeed}
                  onCheckedChange={(checked) => setFormData({ ...formData, highSpeed: checked as boolean })}
                />
                <div className="flex-1">
                  <Label htmlFor="highSpeed" className="font-medium cursor-pointer">
                    High-Speed EVs (≥ 45 km/h)
                  </Label>
                  <p className="text-sm text-muted-foreground">License and registration required</p>
                </div>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <Button type="submit" size="lg" className="w-full">
              ✅ Apply for Dealership
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DealershipModal;
