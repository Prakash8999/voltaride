import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Zap, Gauge, Lightbulb, Cpu, CircleDot, Battery, Shield, Check } from "lucide-react";
import React, { useState, useEffect } from "react";
import TestRideModal from "@/components/TestRideModal";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

const productData = [
  {
    id: "1",
    name: "AERIX ENDURO",
    motor: "1000W",
    speed: "45-50 km/h",
    colors: ["Red", "White", "Grey", "Peacock Blue", "Black"],
    controller: "32A 12tube",
    wheels: "10 Inch",
    headlights: "LED Headlight",
    meter: "Color Digital Instrument",
    brake: "Front Disc / Rear Drum",
    images: {
      Grey: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_enduro_grey_large.png",
      "Peacock Blue": "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_enduro_blue_large.png",
      White: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_enduro_white_large.png"
    },
    price: "60,000"
  },
  {
    id: "2",
    name: "AERIX GLIDE",
    motor: "1000W",
    speed: "45-50 km/h",
    colors: ["Red", "White", "Grey", "Peacock Blue", "Black"],
    controller: "32A 12TUBE",
    wheels: "10 Inch",
    headlights: "LED Headlight",
    meter: "Color Digital Instrument",
    brake: "Front Disc / Rear Drum",
    images: {
      Grey: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_glide_grey_large.png",
      "Peacock Blue": "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_glide_blue_large.png",
      White: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_glide_white_large.png"
    },
    price: "65,000"
  },
  {
    id: "3",
    name: "AERIX PRIME",
    motor: "1200W",
    speed: "55 km/h",
    colors: ["Orange", "White", "Grey", "Peacock Blue", "Black"],
    controller: "60/72V 38A 15TUBE",
    wheels: "12 Inch",
    headlights: "LED Headlight",
    meter: "Color Digital Instrument",
    brake: "Front Disc / Rear Drum",
    images: {
      Orange: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_prime_orange_large.png",
      Grey: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_prime_grey_large.png",
      White: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_prime_white_large.png"
    },
    price: "90,000"
  },
  {
    id: "4",
    name: "AERIX RANGER",
    motor: "1200W",
    speed: "55 km/h",
    colors: ["Grey", "White", "Black", "Peacock Blue", "Black"],
    controller: "38A 15TUBE",
    wheels: "12 Inch",
    headlights: "LED Headlight",
    meter: "Color Digital Instrument",
    brake: "Front Disc / Rear Drum",
    images: {
      Grey: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_ranger_grey_large.png",
      White: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_ranger_white_large.png",
      Black: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_range_black_large.png"
    },
    price: "1,00,000"
  },
  {
    id: "5",
    name: "AERIX URBAN",
    motor: "1000W",
    speed: "45-50 km/h",
    colors: ["Red", "White", "Grey", "Peacock Blue", "Black"],
    controller: "32A 12TUBE",
    wheels: "10 Inch",
    headlights: "LED Headlight",
    meter: "Color Digital Instrument",
    brake: "Front Disc / Rear Drum",
    images: {
      Grey: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_urban_grey_large.png",
      White: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_urban_white_large.png"
    },
    price: "60,000"
  },
  {
    id: "6",
    name: "AERIX TITAN",
    motor: "1000W",
    speed: "45-50 km/h",
    colors: ["Red", "White", "Grey", "Metallic Gold", "Black"],
    controller: "32A 12TUBE",
    wheels: "10 Inch",
    headlights: "LED Headlight",
    meter: "Color Digital Instrument",
    brake: "Front Disc / Rear Drum",
    images: {
      White: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_titan_white_large.png",
      Gold: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_titan_gold_large.png"
    },
    price: "70,000"
  },
  {
    id: "7",
    name: "AERIX VOLT",
    motor: "1200W",
    speed: "50 km/h",
    colors: ["Black", "White", "Grey"],
    controller: "32A 12TUBE",
    wheels: "14 Inch",
    headlights: "LED Headlight",
    meter: "Color Digital Instrument",
    brake: "Front Disc / Rear Drum",
    images: {
      Black: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_volt_black_large.png"
    },
    price: "85,000"
  }
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>("");

  const product = productData.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (product && product.colors.length > 0 && !selectedColor) {
      const defaultColor = product.colors.find(color => color in product.images) || product.colors[0];
      setSelectedColor(defaultColor);
    }
  }, [product, selectedColor]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Product Not Found</h1>
          <Button onClick={() => navigate("/")} className="rounded-full">Return Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100 font-sans selection:bg-primary/10">
      <Header />

      <main className="pt-20 pb-12 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="group px-0 hover:bg-transparent hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Products
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 lg:sticky lg:top-24"
          >
            <div className="relative aspect-[4/3] bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-500 border border-gray-100 group">

              <AnimatePresence mode="wait">
                {product.images[selectedColor as keyof typeof product.images] ? (
                  <motion.div
                    key={selectedColor}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative w-full h-full p-3"
                  >
                    <img
                      src={product.images[selectedColor as keyof typeof product.images]}
                      alt={`${product.name} in ${selectedColor}`}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="not-available"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full flex flex-col items-center justify-center p-8 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mb-6 shadow-lg">
                      <Battery className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Image Not Available</h3>
                    <p className="text-muted-foreground max-w-xs text-base">
                      We don't have a preview for the {selectedColor} color yet, but you can still enquire about it.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Color badges below image */}
            <div className="flex flex-wrap gap-2 justify-center px-4">
              {[...product.colors]
                .sort((a, b) => {
                  const hasImageA = a in product.images;
                  const hasImageB = b in product.images;
                  if (hasImageA && !hasImageB) return -1;
                  if (!hasImageA && hasImageB) return 1;
                  return 0;
                })
                .map((color) => {
                  const hasImage = color in product.images;
                  return (
                    <motion.button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                        selectedColor === color
                          ? "bg-primary text-white shadow-lg shadow-primary/30"
                          : "bg-white text-gray-700 border border-gray-200 hover:border-primary/50 hover:shadow-md",
                        !hasImage && "opacity-50"
                      )}
                    >
                      {color}
                    </motion.button>
                  );
                })}
            </div>
          </motion.div>

          {/* Right Column: Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col h-full"
          >
            <div className="flex items-start justify-between mb-2">
              <Badge variant="secondary" className="bg-primary/5 text-primary hover:bg-primary/10 transition-colors uppercase tracking-wider font-semibold">
                Electric Series
              </Badge>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-4">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div>
                <span className="text-lg text-muted-foreground mr-2">Price</span>
                <span className="text-3xl font-bold">₹ {product.price}</span>
              </div>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Motor</p>
                  <p className="text-lg font-bold text-gray-900">{product.motor}</p>
                </div>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                  <Gauge className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Max Speed</p>
                  <p className="text-lg font-bold text-gray-900">{product.speed}</p>
                </div>
              </div>
            </div>



            {/* Actions */}
            <div className="flex gap-4 pt-4 border-t border-gray-100 mt-4">
              <Button
                size="lg"
                className="flex-1 h-14 text-base font-bold rounded-2xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300"
                onClick={() => setEnquiryOpen(true)}
              >
                Book a Test Ride
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1 h-14 text-base font-bold rounded-2xl border-gray-200 hover:bg-gray-50 hover:text-black hover:border-black/10 transition-all"
                onClick={() => setEnquiryOpen(true)}
              >
                Enquire Now
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Key Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 mb-12"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Engineered for Excellence
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Premium components and cutting-edge technology for an unparalleled riding experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Motor Power */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative p-8 bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 group"
            >
              <div className="absolute -top-5 left-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Powerful Motor</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.motor} motor delivers exceptional acceleration and smooth performance for city commuting and beyond.
                </p>
              </div>
            </motion.div>

            {/* Speed & Performance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative p-8 bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 group"
            >
              <div className="absolute -top-5 left-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Gauge className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Top Speed</h3>
                <p className="text-gray-600 leading-relaxed">
                  Reach speeds up to {product.speed}, perfectly balanced for urban mobility and highway safety standards.
                </p>
              </div>
            </motion.div>

            {/* Safety Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative p-8 bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 group"
            >
              <div className="absolute -top-5 left-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Advanced Braking</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.brake} system ensures precise stopping power and enhanced safety in all riding conditions.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Technical Specifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Technical Specifications</h2>
            <div className="h-px bg-gray-200 flex-1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SpecCard icon={<Cpu />} label="Controller" value={product.controller} />
            <SpecCard icon={<CircleDot />} label="Wheels" value={product.wheels} />
            <SpecCard icon={<Shield />} label="Braking System" value={product.brake} />
            <SpecCard icon={<Lightbulb />} label="Headlights" value={product.headlights} />
            <SpecCard icon={<Gauge />} label="Dashboard" value={product.meter} />
            <SpecCard icon={<Zap />} label="Motor Type" value={product.motor} />
          </div>
        </motion.div >

      </main >

      <TestRideModal
        open={enquiryOpen}
        onOpenChange={setEnquiryOpen}
        preSelectedModel={product.name}
        isEnquiry={true}
      />

      <Footer />
    </div >
  );
}

function SpecCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center gap-5 p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-lg hover:border-primary/10 transition-all duration-300 group">
      <div className="p-4 rounded-xl bg-gray-50 text-gray-500 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
        {React.cloneElement(icon as React.ReactElement, { className: "w-6 h-6" })}
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-1">{label}</p>
        <p className="text-lg font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
