import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ArrowLeft, Battery, Zap, Shield, Check, MessageSquare } from "lucide-react";
import { useState } from "react";
import DealershipModal from "@/components/DealershipModal";
import image1 from "@/assets/velco.png";
import image2 from "@/assets/loader.png";
import image3 from "@/assets/spimri.png";
import image4 from "@/assets/aurra_pro.png";
import image5 from "@/assets/cruiser.png";
import image6 from "@/assets/shravil.png";
import image7 from "@/assets/ninjaplus.png";
import image8 from "@/assets/gtr.png";
import image9 from "@/assets/ninja_mini.png";
import image10 from "@/assets/ninja_2g.png";
import TestRideModal from "@/components/TestRideModal";


const productData = [
  {
    id: "1",
    name: "E-Velco Pro",
    image_url: image1,
    range_km: "70–110",
    waterproof_motor: "12-inch BLDC Hub Motor (IP67)",
    smart_wireless_controller: "Smart Wireless Controller (IP64)",
    battery_options: [
      "72V 32Ah VRLA",
      "72V 23Ah VRLA",
      "72V 23Ah Li-ion NMC"
    ],
    braking_system: "Front Disc / Rear Disc",
    key_features: [
      "Waterproof throttle",
      "123 gear",
      "Parking mode",
      "Cruise control",
      "USB charging port",
      "Upslope assistant",
      "NFC card lock",
      "Reverse gear",
      "Central locking",
      "Anti-theft alarm",
      "Keyless entry",
      "Regenerative braking",
      "Tubeless tyres",
      "Calling feature",
      "Anti-fire fuse",
      "Bluetooth mode",
      "GPS tracking",
      "Built-in navigation",
      "Proximity unlock",
      "Mobile app connectivity"
    ],
    colors: ["Red", "White", "Grey", "Peacock Blue", "Black"],
    price: 89999,
    monthlyEmi: 3299
  },
  {
    id: "2",
    name: "Electro Vive Loader",
    image_url: image2,
    range_km: "70–110",
    waterproof_motor: "12-inch Mid-Drive Smart Motor (IP67)",
    smart_wireless_controller: "60/72V Smart Wireless (IP64)",
    battery_options: [
      "60V 32Ah VRLA",
      "60V 45Ah VRLA",
      "72V 32Ah VRLA",
      "72V 45Ah VRLA"
    ],
    braking_system: "Front Disc / Rear Drum",
    key_features: [
      "Waterproof throttle",
      "123 gear",
      "Parking mode",
      "Cruise control",
      "USB charging port",
      "Upslope assistant",
      "Reverse gear",
      "Central locking",
      "Anti-theft alarm",
      "Keyless entry",
      "Regenerative braking",
      "Tubeless tyres"
    ],
    colors: ["Black"],
    price: 94999,
    monthlyEmi: 3499
  },
  {
    id: "3",
    name: "Spimri",
    image_url: image3,
    range_km: "70–110",
    waterproof_motor: "12-inch BLDC Hub Motor (IP67)",
    smart_wireless_controller: "72V Smart Wireless (IP64)",
    battery_options: [
      "72V 32Ah VRLA",
      "72V 26Ah Li-ion NMC",
      "72V 32Ah Li-ion NMC"
    ],
    braking_system: "Front Disc / Rear Drum",
    key_features: [
      "Waterproof throttle",
      "123 gear",
      "Parking mode",
      "Cruise control",
      "USB charging port",
      "Upslope assistant",
      "NFC card lock",
      "Reverse gear",
      "Central locking",
      "Anti-theft",
      "Keyless entry",
      "Regenerative braking",
      "Tubeless tyres",
      "Calling feature",
      "Anti-fire fuse",
      "Bluetooth",
      "GPS tracking",
      "Built-in navigation",
      "Proximity unlock",
      "Mobile app connectivity"
    ],
    colors: ["Red", "White", "Dark Grey", "Peacock Blue", "Green"],
    price: 79999,
    monthlyEmi: 2999
  },
  {
    id: "4",
    name: "Aurra Pro",
    image_url: image4,
    range_km: "70–110",
    waterproof_motor: "12-inch BLDC Hub Motor (IP67)",
    smart_wireless_controller: "Smart Wireless Controller (IP64)",
    battery_options: [
      "72V 32Ah VRLA",
      "72V 32Ah Li-ion NMC"
    ],
    braking_system: "Front Disc / Rear Drum",
    key_features: [
      "Waterproof throttle",
      "123 gear",
      "Parking mode",
      "Cruise control",
      "USB charging",
      "Upslope assistant",
      "NFC lock",
      "Reverse gear",
      "Central locking",
      "Anti-theft alarm",
      "Keyless entry",
      "Regenerative braking",
      "Tubeless tyres",
      "Calling feature",
      "Anti-fire fuse",
      "Bluetooth",
      "GPS tracking",
      "Navigation",
      "Proximity unlock",
      "Mobile app connectivity"
    ],
    colors: ["Ferrari Red", "White", "Black", "Cyan Blue", "Metallic Gold"],
    price: 84999,
    monthlyEmi: 3199
  },
  {
    id: "5",
    name: "Cruiser",
    image_url: image5,
    range_km: "70–110",
    waterproof_motor: "10-inch BLDC Hub Motor (IP67)",
    smart_wireless_controller: "Smart Wireless Controller (IP64)",
    battery_options: [
      "60V 32Ah VRLA",
      "60V 45Ah VRLA",
      "60V 25Ah Li-ion NMC",
      "60V 30Ah Li-ion NMC"
    ],
    braking_system: "Front Disc / Rear Drum",
    key_features: [
      "Waterproof throttle",
      "123 gear",
      "Parking mode",
      "Cruise control",
      "USB charging",
      "Upslope assistant",
      "NFC lock",
      "Reverse gear",
      "Central locking",
      "Anti-theft alarm",
      "Keyless entry",
      "Regenerative braking",
      "Tubeless tyres",
      "Calling feature",
      "Anti-fire fuse",
      "Bluetooth",
      "GPS tracking",
      "Navigation",
      "Proximity unlock",
      "Mobile app connectivity"
    ],
    colors: ["Ferrari Red", "Chameleon", "White", "Grey", "Black"],
    price: 74999,
    monthlyEmi: 2799
  },
  {
    id: "6",
    name: "Shravil",
    image_url: image6,
    range_km: "70–110",
    waterproof_motor: "12-inch BLDC Hub Motor (IP67)",
    smart_wireless_controller: "60/72V Smart Wireless (IP64)",
    battery_options: [
      "72V 32Ah VRLA",
      "60V 45Ah VRLA"
    ],
    braking_system: "Front Disc / Rear Drum",
    key_features: [
      "Waterproof throttle",
      "123 gear",
      "Parking mode",
      "Cruise control",
      "USB charging",
      "Upslope assistant",
      "NFC lock",
      "Reverse gear",
      "Central locking",
      "Anti-theft alarm",
      "Keyless entry",
      "Regenerative braking",
      "Tubeless tyres",
      "Calling feature",
      "Anti-fire fuse",
      "Bluetooth",
      "GPS tracking",
      "Navigation",
      "Proximity unlock",
      "Mobile app connectivity"
    ],
    colors: ["Red", "White", "Grey", "Black", "Peacock Blue"],
    price: 69999,
    monthlyEmi: 2599
  },
  {
    id: "7",
    name: "Ninja Plus+",
    image_url: image7,
    range_km: "50–75",
    waterproof_motor: "10-inch BLDC Hub Motor (IP67)",
    smart_wireless_controller: "Smart Wireless Controller (IP64)",
    battery_options: [
      "48V 32Ah VRLA",
      "60V 32Ah VRLA"
    ],
    braking_system: "Front Drum / Rear Drum",
    key_features: [
      "Waterproof throttle",
      "123 gear",
      "Parking mode",
      "Cruise control",
      "USB charging",
      "Upslope assistant",
      "NFC lock",
      "Reverse gear",
      "Central locking",
      "Anti-theft alarm",
      "Keyless entry",
      "Regenerative braking",
      "Tubeless tyres",
      "Calling feature",
      "Anti-fire fuse",
      "Bluetooth",
      "GPS tracking",
      "Navigation",
      "Proximity unlock",
      "Mobile app connectivity"
    ],
    colors: ["Red", "White", "Grey", "Peacock Blue", "Black"],
    price: 64999,
    monthlyEmi: 2399
  },
  {
    id: "8",
    name: "GTR+",
    image_url: image8,
    range_km: "70–110",
    waterproof_motor: "10-inch BLDC Hub Motor (IP67)",
    smart_wireless_controller: "Smart Wireless Controller (IP64)",
    battery_options: [
      "60V 32Ah VRLA",
      "60V 45Ah VRLA",
      "60V 25Ah Li-ion NMC",
      "60V 30Ah Li-ion NMC"
    ],
    braking_system: "Front Disc / Rear Drum",
    key_features: [
      "Waterproof throttle",
      "123 gear",
      "Parking mode",
      "Cruise control",
      "USB charging",
      "Upslope assistant",
      "NFC lock",
      "Reverse gear",
      "Central locking",
      "Anti-theft alarm",
      "Keyless entry",
      "Regenerative braking",
      "Tubeless tyres",
      "Calling feature",
      "Anti-fire fuse",
      "Bluetooth",
      "GPS tracking",
      "Navigation",
      "Proximity unlock",
      "Mobile app connectivity"
    ],
    colors: ["Red", "Black", "White", "Grey", "Peacock Blue"],
    price: 59999,
    monthlyEmi: 2199
  },
  {
    id: "9",
    name: "Ninja Mini",
    image_url: image9,
    range_km: "70–110",
    waterproof_motor: "10-inch BLDC Hub Motor (IP67)",
    smart_wireless_controller: "Smart Wireless Controller (IP64)",
    battery_options: [
      "48V 32Ah VRLA",
      "60V 32Ah VRLA"
    ],
    braking_system: "Front Drum / Rear Drum",
    key_features: [
      "Waterproof throttle",
      "123 gear",
      "Cruise control",
      "USB charging",
      "Reverse gear",
      "Central locking",
      "Anti-theft alarm",
      "Keyless entry",
      "Regenerative braking",
      "Tubeless tyres",
      "Calling feature",
      "Anti-fire fuse",
      "Bluetooth",
      "GPS tracking",
      "Navigation",
      "Proximity unlock",
      "Mobile app connectivity"
    ],
    colors: ["Ferrari Red", "White", "Peacock Blue", "Grey", "Black"],
    price: 54999,
    monthlyEmi: 1999
  },
  {
    id: "10",
    name: "Ninja 2G",
    image_url: image10,
    range_km: "70–110",
    waterproof_motor: "10-inch BLDC Hub Motor (IP67)",
    smart_wireless_controller: "Smart Wireless Controller (IP64)",
    battery_options: [
      "48V 32Ah VRLA",
      "60V 32Ah VRLA"
    ],
    braking_system: "Front Drum / Rear Drum",
    key_features: [
      "Waterproof throttle",
      "123 gear",
      "Cruise control",
      "USB charging",
      "Fast charging",
      "Reverse gear",
      "Central locking",
      "Anti-theft alarm",
      "Keyless entry",
      "Regenerative braking",
      "Tubeless tyres",
      "Calling feature",
      "Anti-fire fuse",
      "Bluetooth",
      "GPS tracking",
      "Navigation",
      "Proximity unlock",
      "Mobile app connectivity"
    ],
    colors: ["Red", "White", "Grey", "Peacock Blue", "Black"],
    price: 49999,
    monthlyEmi: 1799
  }
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dealershipOpen, setDealershipOpen] = useState(false);
  const [testRideOpen, setTestRideOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>("");

  const handleEnquiryClick = (modelName: string) => {
    setSelectedModel(modelName);
    setEnquiryOpen(true);
  };



  const product = productData.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </div>
    );
  }

  if (!selectedColor && product.colors.length > 0) {
    setSelectedColor(product.colors[0]);
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
      />

      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Button variant="ghost" onClick={() => navigate("/")} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Button>
          </motion.div>

          {/* Product Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{product.name}</h1>
            <div className="flex flex-wrap gap-4 items-center">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                Range: {product.range_km} km
              </Badge>
              <p className="text-2xl font-bold">₹{(product.price / 1000).toFixed(0)}k</p>
              <p className="text-muted-foreground">or ₹{product.monthlyEmi}/month</p>

                <Button
                  size="default"
                  className="gap-2 w-fit text-lg px-6 rounded-lg py-2"
                  onClick={() => handleEnquiryClick(product.name)}
                >
                  <MessageSquare className="h-3 w-3" />
                  Enquire
                </Button>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="overflow-hidden">
                <div className="">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Card>

              {/* Color Selection */}
              <div className="mt-6">
                <h3 className="font-semibold mb-3">Available Colors</h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all ${selectedColor === color
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                        }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {/* Specifications */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-2xl font-bold mb-4">Specifications</h2>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Battery className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Motor</p>
                        <p className="text-sm text-muted-foreground">{product.waterproof_motor}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Zap className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Controller</p>
                        <p className="text-sm text-muted-foreground">{product.smart_wireless_controller}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Braking System</p>
                        <p className="text-sm text-muted-foreground">{product.braking_system}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Battery Options */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">Battery Options</h3>
                  <div className="space-y-2">
                    {product.battery_options.map((battery, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm">{battery}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Key Features */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Key Features</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {product.key_features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
            
              
                    {/* <Button size="lg" className="flex-1 py-2 text-xl" onClick={() => handleEnquiryClick(product.name)}
                >
                  Book Test Ride
                </Button> */}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <TestRideModal
        open={enquiryOpen}
        onOpenChange={setEnquiryOpen}
        preSelectedModel={selectedModel}
        isEnquiry={true}
      />

    </div>
  );
}
