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

interface InterestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InterestModal = ({ isOpen, onClose }: InterestModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    product: "",
    pincode: "",
    whatsapp: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    localStorage.setItem("electro-vive-interest-submitted", "true");
    
    toast({
      title: "Thank you for your interest!",
      description: "We'll get in touch with you soon.",
    });
    
    setFormData({
      name: "",
      phone: "",
      product: "",
      pincode: "",
      whatsapp: false,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="glass rounded-2xl w-full max-w-md">
        <div className="glass border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Are you interested in getting an ElectroVive Product?</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="product">Product interested in</Label>
            <Select value={formData.product} onValueChange={(value) => setFormData({ ...formData, product: value })} required>
              <SelectTrigger>
                <SelectValue placeholder="Select speed category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="25-max">25 km/h Max</SelectItem>
                <SelectItem value="45-max">45 km/h Max</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="pincode">Pincode</Label>
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
              checked={formData.whatsapp}
              onCheckedChange={(checked) => setFormData({ ...formData, whatsapp: checked as boolean })}
            />
            <Label htmlFor="whatsapp" className="cursor-pointer">
              Get updates on WhatsApp
            </Label>
          </div>

          <Button type="submit" size="lg" className="w-full">
            Proceed
          </Button>
        </form>
      </div>
    </div>
  );
};

export default InterestModal;
