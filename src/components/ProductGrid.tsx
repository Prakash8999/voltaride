import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Battery, Zap, ArrowRight, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TestRideModal from "@/components/TestRideModal";

// Mock data - replacing Convex query
const mockModels = [
  // {
  //   _id: "1",
  //   name: "Ninja Mini",
  //   tagline: "BLDC Hub Motor (IP67)",
  //   price: "45,000",
  //   monthlyEmi: "1,777",
  //   image: "https://i.ibb.co/nsFF1mZN/ninja-mini.png",
  //   range: 90,
  //   topSpeed: 45,
  // },
  // {
  //   _id: "2",
  //   name: "Ninja 2G",
  //   tagline: "Smart Wireless Controller (IP64)",
  //   price: "47,500",
  //   monthlyEmi: "1,999",
  //   image: "https://i.ibb.co/84N622kS/ninja-2g.png",
  //   range: 90,
  //   topSpeed: 45,
  // },
  // {
  //   _id: "3",
  //   name: "Ninja Plus+",
  //   tagline: "BLDC Hub Motor (IP67)",
  //   price: "48,000",
  //   monthlyEmi: "2,199",
  //   image: "https://i.ibb.co/jvj50j7N/ninjaplus.png",
  //   range: 62,
  //   topSpeed: 40,
  // },
  {
    _id: "4",
    name: "GTR+",
    tagline: "Smart Wireless Controller (IP64)",
    price: "50,000",
    monthlyEmi: "2,399",
    image: "https://i.ibb.co/DD9W8yNQ/gtr.png",
    range: 90,
    topSpeed: 45,
  },
  {
    _id: "5",
    name: "Cruiser",
    tagline: "BLDC Hub Motor (IP67)",
    price: "56,000",
    monthlyEmi: "2,599",
    image: "https://i.ibb.co/FkDgWfCg/cruiser.png",
    range: 90,
    topSpeed: 45,
  },
  {
    _id: "6",
    name: "Sharvil",
    tagline: "Smart Wireless Controller (IP64)",
    price: "60,000",
    monthlyEmi: "2,799",
    image: "https://i.ibb.co/twnXPwFD/shravil.png",
    range: 90,
    topSpeed: 45,
  },
  {
    _id: "7",
    name: "Spimri",
    tagline: "BLDC Hub Motor (IP67)",
    price: "65,000",
    monthlyEmi: "2,999",
    image: "https://i.ibb.co/RkwzC5zx/spimri.png",
    range: 90,
    topSpeed: 45,
  },
  {
    _id: "8",
    name: "E-Velco Pro",
    tagline: "BLDC Hub Motor (IP67)",
    price: "64,000",
    monthlyEmi: "3,199",
    image: "https://i.ibb.co/RkVZSKVG/velco.png",
    range: 90,
    topSpeed: 45,
  },
  {
    _id: "9",
    name: "Aurra Pro",
    tagline: "Smart Wireless Controller (IP64)",
    price: "70,000",
    monthlyEmi: "3,299",
    image: "https://i.ibb.co/7dYJmTsy/aurra-pro.png",
    range: 90,
    topSpeed: 45,
  },
  {
    _id: "10",
    name: "Aerix Loader",
    tagline: "Smart Wireless Controller (IP64)",
    price: "75,000",
    monthlyEmi: "3,499",
    image: "https://i.ibb.co/0jMsSWn3/loader.png",
    range: 90,
    topSpeed: 45,
  },
];

export default function ProductGrid() {
  const models = mockModels;
  const navigate = useNavigate();
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [showMonthly, setShowMonthly] = useState<Record<string, boolean>>({});

  const handleEnquiryClick = (modelName: string) => {
    setSelectedModel(modelName);
    setEnquiryOpen(true);
  };

  return (
    <section id="products" className="py-20 bg-muted/80 backdrop-blur-3xl relative z-10 transition-colors">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map((model, i) => (
            <motion.div
              key={model._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="group overflow-hidden backdrop-blur-xl bg-background/50 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 ">
                <div className="relative h-60 w-full flex items-center justify-center bg-white rounded-md overflow-hidden">
                  <img
                    src={model.image}
                    alt={model.name}
                    className="max-h-full pt-3 max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary/90 backdrop-blur-sm">
                      ₹ {model.monthlyEmi}/mo
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4 space-y-3">
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight mb-1">{model.name}</h3>
                    {/* <p className="text-sm text-muted-foreground">{model.tagline}</p> */}
                  </div>

                  {/* Specs Row */}
                  {/* <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Battery className="h-4 w-4 text-primary" />
                      <span className="font-mono font-semibold">{model.range}km</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="h-4 w-4 text-primary" />
                      <span className="font-mono font-semibold">{model.topSpeed}kmph</span>
                    </div>
                  </div> */}

                  {/* Price */}
                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground">Starting at</p>
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-2xl font-bold">{showMonthly[model._id] ? `₹ {model.monthlyEmi}/mo` : `₹ ${model.price}`}</p>

                    </div>
                    <div className="mt-2">
                      <Badge variant="outline">No License Required</Badge>
                    </div>
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