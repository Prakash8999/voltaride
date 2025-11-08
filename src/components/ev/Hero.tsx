import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Leaf, Clock, Shield } from "lucide-react";
import ScooterViewer from "./ScooterViewer";

interface HeroProps {
  onReserveNow?: () => void;
}

export default function Hero({ onReserveNow }: HeroProps) {
  const specs = [
    { icon: Zap, label: "180 KM Range", value: "180" },
    { icon: Zap, label: "120 KMPH", value: "120" },
    { icon: Shield, label: "8 Year Warranty", value: "8" },
    { icon: Clock, label: "45 Min Charge", value: "45" },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-accent/20 text-accent border-accent/30 px-4 py-2 text-sm">
                <Leaf className="w-4 h-4 mr-2" />
                100% Electric
              </Badge>
              <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-2 text-sm">
                <Zap className="w-4 h-4 mr-2" />
                0% Emissions
              </Badge>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="gradient-text">The Future</span>
                <br />
                <span className="text-foreground">of Mobility</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-xl">
                Experience the perfect blend of power, range, and sustainability with India's most advanced electric scooters.
              </p>
            </div>

            {/* Key Features */}
            <ul className="space-y-3">
              {[
                "180 km real-world range on single charge",
                "0-40 km/h in just 2.9 seconds",
                "Fast charging in 45 minutes",
              ].map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground/90">{feature}</span>
                </motion.li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
              <Button 
                size="lg" 
                onClick={onReserveNow}
                className="bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer group w-full sm:w-auto shadow-lg shadow-primary/25"
              >
                Reserve Now
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="cursor-pointer w-full sm:w-auto border-2">
                Explore Models
              </Button>
            </div>

            {/* Price */}
            <div className="pt-4">
              <p className="text-xs sm:text-sm text-muted-foreground">Starting from</p>
              <p className="text-2xl sm:text-3xl font-bold font-numbers gradient-text">₹3,999<span className="text-base sm:text-lg">/mo</span></p>
              <p className="text-xs sm:text-sm text-muted-foreground">with zero down payment</p>
            </div>
          </motion.div>

          {/* Right - 3D Viewer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[400px] sm:h-[500px] lg:h-[600px] mt-8 lg:mt-0"
          >
            <ScooterViewer />
            
            {/* Floating Spec Cards */}
            <div className="absolute inset-0 pointer-events-none z-10">
              {specs.map((spec, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className={`absolute glass-effect rounded-lg p-2 sm:p-3 md:p-4 pointer-events-auto ${
                    i === 0 ? "top-4 sm:top-10 left-0" :
                    i === 1 ? "top-4 sm:top-10 right-0" :
                    i === 2 ? "bottom-4 sm:bottom-10 left-0" :
                    "bottom-4 sm:bottom-10 right-0"
                  }`}
                  style={{ animationDelay: `${i * 0.5}s` }}
                >
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <spec.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-lg sm:text-xl md:text-2xl font-bold font-numbers">{spec.value}</p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">{spec.label.split(' ').slice(1).join(' ')}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}