import { Zap, Battery, Clock, Shield, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import ScooterViewer3D from "./ScooterViewer3D";
import TestRideModal from "./TestRideModal";
import { useState } from "react";
import image1 from "@/assets/hero.png";

const SpecCard = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="glass p-4 rounded-lg hover:bg-card/50 transition-colors"
  >
    <Icon className="w-6 h-6 text-primary mb-2" />
    <div className="font-numeric text-2xl font-bold text-foreground">{value}</div>
    <div className="text-xs text-muted-foreground">{label}</div>
  </motion.div>
);



const Hero = () => {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
    const [selectedModel, setSelectedModel] = useState<string>("");
  
    const handleEnquiryClick = (modelName: string) => {
      setSelectedModel(modelName);
      setEnquiryOpen(true);
    };
  
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />

      <div className="w-full px-8 md:px-12 lg:px-16 xl:px-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center max-w-[1600px] mx-auto">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 lg:pr-8"
          >
            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary" className="px-4 py-2">
                <Zap className="w-4 h-4 mr-2" />
                100% Electric
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                0% Emissions
              </Badge>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              The Future of
              <span className="block gradient-text">Electric Mobility</span>
            </h1>

            {/* Bullets */}
          <ul className="space-y-3 text-lg text-muted-foreground">
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
    Regenerative Braking System that recovers energy and extends range
  </li>
  <li className="flex items-start">
  <Shield className="w-5 h-5 text-secondary mr-3 mt-1 flex-shrink-0" />
  No License Required — Ride Freely Without Any Paperwork
</li>

</ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8"
               onClick={() => handleEnquiryClick("E-Velco Pro")}
              >
                Reserve Now
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" 
              onClick={() => window.location.href = "#products"}
              >
                Explore Models
              </Button>
              
            </div>

            {/* Price */}
            <p className="text-sm text-muted-foreground">
              Starting at{" "}
              <span className="font-numeric text-2xl font-bold text-foreground">
                ₹3,999
              </span>
              /month
            </p>
          </motion.div>

          {/* Right - 3D Viewer */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden glass animate-pulse-glow">
              {/* <ScooterViewer3D /> */}
              <img
                src={image1}
                alt="ElectroVive Scooter"
                className="w-full h-full object-cover"
              />
            </div>
              
            {/* Floating Spec Cards positioned at 4 edges of the image */}
            <div className="pointer-events-none">

              {/* TOP LEFT */}
              <div className="absolute -top-4 -left-4">
                <SpecCard icon={Zap} label="Range" value="110 KM" />
              </div>

              {/* TOP RIGHT */}
              <div className="absolute -top-4 -right-4">
                <SpecCard icon={Clock} label="Charge Time" value="45 Min" />
              </div>

              {/* BOTTOM LEFT */}
              <div className="absolute -bottom-4 -left-4">
                <SpecCard icon={Shield} label="Warranty" value="3 Year" />
              </div>

              {/* BOTTOM RIGHT */}
              <div className="absolute -bottom-4 -right-4">
                <SpecCard icon={Gauge} label="No License Required" value="Ride Free" />
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
