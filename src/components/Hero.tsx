import { Zap, Battery, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import ScooterViewer3D from "./ScooterViewer3D";

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
                <Zap className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                180 KM Real-World Range on Single Charge
              </li>
              <li className="flex items-start">
                <Battery className="w-5 h-5 text-secondary mr-3 mt-1 flex-shrink-0" />
                0-40 KMPH in Just 2.9 Seconds
              </li>
              <li className="flex items-start">
                <Clock className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                45-Minute Fast Charging
              </li>
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8">
                Reserve Now
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
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
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative lg:pl-8"
          >
            <div className="aspect-square rounded-2xl overflow-hidden glass animate-pulse-glow">
              <ScooterViewer3D />
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Drag to rotate • Auto-rotates when idle
            </p>

            {/* Floating Spec Cards */}
            <div className="absolute -bottom-8 left-0 right-0 grid grid-cols-2 gap-4">
              <SpecCard icon={Zap} label="Range" value="180 KM" />
              <SpecCard icon={Battery} label="Top Speed" value="120 KMPH" />
              <SpecCard icon={Shield} label="Warranty" value="8 Year" />
              <SpecCard icon={Clock} label="Charge Time" value="45 Min" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
