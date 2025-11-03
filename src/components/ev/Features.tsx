import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Battery, Zap, Shield, Leaf, Clock, Smartphone } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Battery,
      title: "Advanced Battery Tech",
      description: "Lithium-ion batteries with 8-year warranty and 180km real-world range",
      color: "text-primary",
    },
    {
      icon: Zap,
      title: "Rapid Charging",
      description: "0-80% charge in just 45 minutes with fast charging support",
      color: "text-accent",
    },
    {
      icon: Shield,
      title: "Smart Safety",
      description: "ABS, CBS, traction control, and geo-fencing for complete peace of mind",
      color: "text-destructive",
    },
    {
      icon: Leaf,
      title: "Zero Emissions",
      description: "100% electric with no tailpipe emissions for a cleaner future",
      color: "text-accent",
    },
    {
      icon: Clock,
      title: "Low Maintenance",
      description: "Fewer moving parts mean lower maintenance costs and hassle-free ownership",
      color: "text-primary",
    },
    {
      icon: Smartphone,
      title: "Connected Experience",
      description: "Smart app integration for remote diagnostics, tracking, and control",
      color: "text-destructive",
    },
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Technology</Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Built for the <span className="gradient-text">Future</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Cutting-edge technology meets sustainable design in every ELECTRO VIVE scooter
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-effect rounded-2xl p-8 hover:scale-105 transition-transform duration-300"
            >
              <div className={`w-14 h-14 rounded-xl bg-background/50 flex items-center justify-center mb-6 ${feature.color}`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
