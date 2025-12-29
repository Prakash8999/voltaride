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
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { Loader2, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const productData = [
  {
    id: "1",
    name: "AERIX ENDURO",
    colors: ["Red", "White", "Grey", "Peacock Blue", "Black"],
    images: {
      Grey: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_enduro_grey_large.png",
      "Peacock Blue": "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_enduro_blue_large.png",
      White: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_enduro_white_large.png"
    },
  },
  {
    id: "2",
    name: "AERIX GLIDE",
    colors: ["Red", "White", "Grey", "Peacock Blue", "Black"],
    images: {
      Grey: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_glide_grey_large.png",
      "Peacock Blue": "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_glide_blue_large.png",
      White: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_glide_white_large.png"
    },
  },
  {
    id: "3",
    name: "AERIX PRIME",
    colors: ["Orange", "White", "Grey", "Peacock Blue", "Black"],
    images: {
      Orange: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_prime_orange_large.png",
      Grey: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_prime_grey_large.png",
      White: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_prime_white_large.png"
    },
  },
  {
    id: "4",
    name: "AERIX RANGER",
    colors: ["Grey", "White", "Black", "Peacock Blue"],
    images: {
      Grey: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_ranger_grey_large.png",
      White: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_ranger_white_large.png",
      Black: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_range_black_large.png"
    },
  },
  {
    id: "5",
    name: "AERIX URBAN",
    colors: ["Red", "White", "Grey", "Peacock Blue", "Black"],
    images: {
      Grey: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_urban_grey_large.png",
      White: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_urban_white_large.png"
    },
  },
  {
    id: "6",
    name: "AERIX TITAN",
    colors: ["Red", "White", "Grey", "Metallic Gold", "Black"],
    images: {
      White: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_titan_white_large.png",
      "Metallic Gold": "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_titan_gold_large.png"
    },
  },
  {
    id: "7",
    name: "AERIX VOLT",
    colors: ["Black", "White", "Grey"],
    images: {
      Black: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_volt_black_large.png"
    },
  }
];

const getColorHex = (color: string) => {
  const map: Record<string, string> = {
    "Red": "#EF4444",
    "White": "#F9FAFB",
    "Grey": "#4B5563",
    "Peacock Blue": "#06b6d4",
    "Black": "#000000",
    "Orange": "#F97316",
    "Metallic Gold": "#EAB308",
  };
  return map[color] || "#E5E5E5";
};

interface TestRideModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preSelectedModel?: string;
  preSelectedColor?: string;
  isEnquiry?: boolean;
}

export default function TestRideModal({
  open,
  onOpenChange,
  preSelectedModel = "",
  preSelectedColor = "",
  isEnquiry = false,
}: TestRideModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    product: preSelectedModel,
    color: preSelectedColor,
    pincode: "",
    whatsappUpdates: false,
    honeypot: "",
  });

  const [displayImage, setDisplayImage] = useState<string>("");

  useEffect(() => {
    if (preSelectedModel) {
      setFormData((prev) => ({
        ...prev,
        product: preSelectedModel,
        color: preSelectedColor || prev.color
      }));
    }
  }, [preSelectedModel, preSelectedColor]);

  // Update display image and color when product changes
  useEffect(() => {
    const selectedProduct = productData.find(p => p.name === formData.product);
    if (selectedProduct) {
      // Check if current color is valid for this product
      const currentColorImage = selectedProduct.images[formData.color as keyof typeof selectedProduct.images];

      if (currentColorImage) {
        setDisplayImage(currentColorImage);
      } else {
        // Pick the first available image if current color invalid
        const firstImageKey = Object.keys(selectedProduct.images)[0];
        if (firstImageKey) {
          setDisplayImage(selectedProduct.images[firstImageKey as keyof typeof selectedProduct.images]);
          setFormData(prev => ({ ...prev, color: firstImageKey }));
        } else {
          setDisplayImage("");
          setFormData(prev => ({ ...prev, color: "" }));
        }
      }
    } else {
      setDisplayImage("");
      setFormData(prev => ({ ...prev, color: "" }));
    }
  }, [formData.product]);

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
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };

    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
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
        color: formData.color,
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
        color: preSelectedColor,
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

  const currentProduct = productData.find(p => p.name === formData.product);

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-[40px] w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-300">

        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 flex flex-col h-full bg-white">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {isEnquiry ? "Enquire Now" : "Book Test Ride"}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {isEnquiry ? "Get in touch with our team" : "Experience it before you buy it"}
              </p>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-500 hover:text-gray-900 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 md:p-8 overflow-y-auto flex-1">
            <form onSubmit={handleSubmit} className="space-y-5">
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

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-gray-700">Name</Label>
                  <Input
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="bg-gray-50 border-gray-200 focus:bg-white transition-all duration-300 h-11"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700">Phone Number</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">+91</span>
                    <Input
                      type="tel"
                      placeholder="98765 43210"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-all duration-300 h-11"
                      required
                    />
                  </div>
                </div>

                {/* {isEnquiry && (
                  <div className="space-y-2">
                    <Label className="text-gray-700">Email Address</Label>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="bg-gray-50 border-gray-200 focus:bg-white transition-all duration-300 h-11"
                      required
                    />
                  </div>
                )} */}

                <div className="space-y-2">
                  <Label className="text-gray-700">Vehicle Model</Label>
                  <Select
                    value={formData.product}
                    onValueChange={(v) => setFormData({ ...formData, product: v })}
                    required
                  >
                    <SelectTrigger className="bg-gray-50 border-gray-200 focus:bg-white h-11">
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                      {productData.map((p) => (
                        <SelectItem key={p.id} value={p.name}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700">Pincode</Label>
                  <Input
                    placeholder="Enter your city pincode"
                    value={formData.pincode}
                    onChange={(e) =>
                      setFormData({ ...formData, pincode: e.target.value })
                    }
                    className="bg-gray-50 border-gray-200 focus:bg-white transition-all duration-300 h-11"
                    maxLength={6}
                    required
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-medium rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting Request...
                    </>
                  ) : (
                    <>
                      {isEnquiry ? "Submit Enquiry" : "Confirm Test Ride"}
                    </>
                  )}
                </Button>
                <p className="text-xs text-center text-gray-400 mt-4">
                  By clicking submit, you agree to our Terms and Privacy Policy.
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side - Image Visualization (Hidden on Mobile) */}
        <div className="hidden md:flex md:w-1/2 bg-neutral-100 relative items-center justify-center p-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 to-neutral-200" />

          <div className="relative z-10 w-full flex flex-col items-center">
            {displayImage ? (
              <img
                src={displayImage}
                alt={formData.product}
                className="w-full h-auto max-h-[350px] object-contain drop-shadow-2xl transition-all duration-700 ease-out hover:scale-105 rounded-2xl"
              />
            ) : (
              <div className="w-full h-64 flex items-center justify-center text-neutral-400 border-2 border-dashed border-neutral-300 rounded-xl">
                <span className="text-lg font-medium">Select a model to view</span>
              </div>
            )}

            {currentProduct && (
              <div className="mt-8">
                <p className="text-sm font-semibold text-neutral-500 mb-3 text-center uppercase tracking-wider">Available Colors</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {[...currentProduct.colors]
                    .sort((a, b) => {
                      const hasA = !!currentProduct.images[a as keyof typeof currentProduct.images];
                      const hasB = !!currentProduct.images[b as keyof typeof currentProduct.images];
                      if (hasA && !hasB) return -1;
                      if (!hasA && hasB) return 1;
                      return 0;
                    })
                    .map((color) => {
                      const imageUrl = currentProduct.images[color as keyof typeof currentProduct.images];
                      const isSelected = formData.color === color;

                      return (
                        <div key={color} className="group relative">
                          <div
                            className={cn(
                              "w-8 h-8 rounded-full shadow-sm border border-black/10 cursor-pointer transition-all duration-300 hover:scale-110 flex items-center justify-center",
                              isSelected ? "ring-2 ring-primary ring-offset-2 scale-110" : "hover:ring-2 hover:ring-primary/50",
                              imageUrl ? "opacity-100" : "opacity-40 cursor-not-allowed"
                            )}
                            style={{ backgroundColor: getColorHex(color) }}
                            onClick={() => {
                              if (imageUrl) {
                                setDisplayImage(imageUrl);
                                setFormData(prev => ({ ...prev, color }));
                              }
                            }}
                            title={color}
                          >
                            {isSelected && <Check className={cn("w-4 h-4", ["White", "Yellow", "Gold", "Metallic Gold", "Orange"].includes(color) ? "text-black" : "text-white")} />}
                          </div>
                          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            {color}
                          </span>
                        </div>
                      )
                    })}
                </div>
              </div>
            )}
          </div>

          <div className="absolute bottom-6 left-6 z-10">
            <h3 className="text-2xl font-bold text-neutral-900">{currentProduct ? currentProduct.name : "Choose Your Ride"}</h3>
            <p className="text-neutral-500 text-sm mt-1">Experience the future of mobility</p>
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
}
