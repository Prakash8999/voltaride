import { Zap, Shield, Gauge, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useState } from "react";
import TestRideModal from "./TestRideModal";
import image1 from "@/assets/hero.png";

const SpecCard = ({ icon: Icon, label, value }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="glass p-3 sm:p-4 rounded-lg hover:bg-card/50 transition-colors w-32 sm:w-36"
  >
    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary mb-1 sm:mb-2" />
    <div className="font-numeric text-xl sm:text-2xl font-bold text-foreground">
      {value}
    </div>
    <div className="text-[10px] sm:text-xs text-muted-foreground">{label}</div>
  </motion.div>
);

const Hero = () => {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("");

  const handleEnquiryClick = (modelName) => {
    setSelectedModel(modelName);
    setEnquiryOpen(true);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-24 px-4 sm:px-6 lg:px-12">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6 sm:space-y-8"
          >

            {/* BADGES */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <Badge variant="secondary" className="px-3 py-1.5 sm:px-4 sm:py-2 flex items-center text-sm sm:text-base whitespace-nowrap">
                <Zap className="w-4 h-4 mr-2" />
                100% Electric
              </Badge>

              <Badge variant="outline" className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base whitespace-nowrap">
                0% Emissions
              </Badge>
            </div>

            {/* HEADING */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              The Future of
              <span className="block gradient-text">Electric Mobility</span>
            </h1>

            {/* BULLETS */}
            <ul className="space-y-3 sm:space-y-4 text-base sm:text-lg text-muted-foreground">
              <li className="flex items-start">
                <Shield className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                Smart Wireless Controller (IP64) for responsive and reliable performance
              </li>

              <li className="flex items-start">
                <Zap className="w-5 h-5 text-secondary mr-3 mt-1 flex-shrink-0" />
                Waterproof BLDC Hub Motor (IP67) engineered for all-weather efficiency
              </li>

              <li className="flex items-start">
                <Gauge className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                Regenerative Braking System that recovers energy & extends range
              </li>

              <li className="flex items-start">
                <Shield className="w-5 h-5 text-secondary mr-3 mt-1 flex-shrink-0" />
                No License Required — Ride Freely Without Any Paperwork
              </li>
            </ul>

            {/* CTA BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto"
                onClick={() => handleEnquiryClick("E-Velco Pro")}
              >
                Reserve Now
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto"
                onClick={() => (window.location.href = "#products")}
              >
                Explore Models
              </Button>
            </div>

            {/* PRICE */}
            <p className="text-sm text-muted-foreground">
              Starting at{" "}
              <span className="font-numeric text-2xl font-bold text-foreground">
                ₹3,999
              </span>
              /month
            </p>
          </motion.div>

          {/* RIGHT SIDE: IMAGE + SPECS */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="aspect-square w-72 sm:w-96 lg:w-[420px] rounded-2xl overflow-hidden glass">
              <img src={image1} alt="Scooter" className="w-full h-full object-cover" />
            </div>

            {/* FLOATING SPEC CARDS */}
            <div className="pointer-events-none">

              {/* TOP LEFT */}
              <div className="hidden sm:block absolute -top-6 -left-6">
                <SpecCard icon={Zap} label="Range" value="110 KM" />
              </div>

              {/* TOP RIGHT */}
              <div className="hidden sm:block absolute -top-6 -right-6">
                <SpecCard icon={Clock} label="Charge Time" value="45 Min" />
              </div>

              {/* BOTTOM LEFT */}
              <div className="hidden sm:block absolute -bottom-6 -left-6">
                <SpecCard icon={Shield} label="Warranty" value="3 Year" />
              </div>

              {/* BOTTOM RIGHT */}
              <div className="hidden sm:block absolute -bottom-6 -right-6">
                <SpecCard icon={Gauge} label="License" value="Not Required" />
              </div>
            </div>
          </div>

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
};

export default Hero;
