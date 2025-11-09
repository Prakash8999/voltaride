import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Battery, Zap, ArrowRight, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import image1 from "@/assets/apex-pro.jpg";
import image2 from "@/assets/flow.jpg";
import image3 from "@/assets/apex-pro.jpg";
import image4 from "@/assets/apex-pro.jpg";
import image5 from "@/assets/apex-pro.jpg";
import image6 from "@/assets/apex-pro.jpg";
import image7 from "@/assets/apex-pro.jpg";
import image8 from "@/assets/apex-pro.jpg";
import image9 from "@/assets/apex-pro.jpg";
import image10 from "@/assets/apex-pro.jpg";
import TestRideModal from "@/components/TestRideModal";

// Mock data - replacing Convex query
const mockModels = [
  {
    _id: "1",
    name: "E-Velco Pro",
    tagline: "BLDC Hub Motor (IP67)",
    price: 89999,
    monthlyEmi: 3299,
    image: image1,
    range: 90,
    topSpeed: 45,
  },
  {
    _id: "2",
    name: "Electro Vive Loader",
    tagline: "Smart Wireless Controller (IP64)",
    price: 94999,
    monthlyEmi: 3499,
    image: image2,
    range: 90,
    topSpeed: 45,
  },
  {
    _id: "3",
    name: "Spimri",
    tagline: "BLDC Hub Motor (IP67)",
    price: 79999,
    monthlyEmi: 2999,
    image: image3,
    range: 90,
    topSpeed: 45,
  },
  {
    _id: "4",
    name: "Aurra Pro",
    tagline: "Smart Wireless Controller (IP64)",
    price: 84999,
    monthlyEmi: 3199,
    image: image4,
    range: 90,
    topSpeed: 45,
  },
  {
    _id: "5",
    name: "Cruiser",
    tagline: "BLDC Hub Motor (IP67)",
    price: 74999,
    monthlyEmi: 2799,
    image: image5,
    range: 90,
    topSpeed: 45,
  },
  {
    _id: "6",
    name: "Shravil",
    tagline: "Smart Wireless Controller (IP64)",
    price: 69999,
    monthlyEmi: 2599,
    image: image6,
    range: 90,
    topSpeed: 45,
  },
  {
    _id: "7",
    name: "Ninja Plus+",
    tagline: "BLDC Hub Motor (IP67)",
    price: 64999,
    monthlyEmi: 2399,
    image: image7,
    range: 62,
    topSpeed: 40,
  },
  {
    _id: "8",
    name: "GTR+",
    tagline: "Smart Wireless Controller (IP64)",
    price: 59999,
    monthlyEmi: 2199,
    image: image8,
    range: 90,
    topSpeed: 45,
  },
  {
    _id: "9",
    name: "Ninja Mini",
    tagline: "BLDC Hub Motor (IP67)",
    price: 54999,
    monthlyEmi: 1999,
    image: image9,
    range: 90,
    topSpeed: 45,
  },
  {
    _id: "10",
    name: "Ninja 2G",
    tagline: "Smart Wireless Controller (IP64)",
    price: 49999,
    monthlyEmi: 1799,
    image: image10,
    range: 90,
    topSpeed: 45,
  },
];

export default function ProductGrid() {
  const models = mockModels;
  const navigate = useNavigate();
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>("");

  const handleEnquiryClick = (modelName: string) => {
    setSelectedModel(modelName);
    setEnquiryOpen(true);
  };

  return (
    <section id="products" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">Our Models</Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Choose Your Perfect <span className="text-primary">Ride</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From urban commuters to performance beasts, find the perfect electric scooter for your lifestyle
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {models.map((model, i) => (
            <motion.div
              key={model._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="group overflow-hidden backdrop-blur-xl bg-background/50 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
                <div className="relative aspect-[4/3] overflow-hidden -m-px">
                  <img
                    src={model.image}
                    alt={model.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary/90 backdrop-blur-sm">
                      ₹{model.monthlyEmi}/mo
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4 space-y-3">
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight mb-1">{model.name}</h3>
                    <p className="text-sm text-muted-foreground">{model.tagline}</p>
                  </div>

                  {/* Specs Row */}
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Battery className="h-4 w-4 text-primary" />
                      <span className="font-mono font-semibold">{model.range}km</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="h-4 w-4 text-primary" />
                      <span className="font-mono font-semibold">{model.topSpeed}kmph</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground">Starting at</p>
                    <p className="text-2xl font-bold">₹{(model.price / 1000).toFixed(0)}k</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 gap-2" 
                      size="sm"
                      onClick={() => navigate(`/product/${model._id}`)}
                    >
                      Explore
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2"
                      onClick={() => handleEnquiryClick(model.name)}
                    >
                      <MessageSquare className="h-3 w-3" />
                      Enquire
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <TestRideModal 
        open={enquiryOpen} 
        onOpenChange={setEnquiryOpen}
        preSelectedModel={selectedModel}
        isEnquiry={true}
      />
    </section>
  );
}