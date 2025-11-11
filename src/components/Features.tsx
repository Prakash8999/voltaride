import { motion } from "framer-motion";
import { Battery, Smartphone, Shield, Gauge, Zap, Leaf } from "lucide-react";
const features = [
  {
    id: 1,
    icon: Shield,
    title: "Smart Wireless Controller (IP64)",
    description:
      "Advanced smart wireless controller engineered for faster response, smoother acceleration, and superior durability with IP64 water resistance.",
    imagePosition: "right",
  },
  {
    id: 2,
    icon: Zap,
    title: "Regenerative Braking System",
    description:
      "Converts braking energy back into battery power, increasing efficiency and extending overall range with smoother braking performance.",
    imagePosition: "left",
  },
  {
    id: 3,
    icon: Smartphone,
    title: "Mobile App Connectivity",
    description:
      "Unlock the scooter, check battery status, track rides, get diagnostics, and manage security features directly from your phone.",
    imagePosition: "right",
  },
  {
    id: 4,
    icon: Gauge,
    title: "GPS Tracking & Anti-Theft Security",
    description:
      "Real-time GPS location, movement alerts, and remote lock system to keep your vehicle safe at all times.",
    imagePosition: "left",
  },
];


const FeatureBlock = ({
  feature,
  index,
}: {
  feature: typeof features[0];
  index: number;
}) => {
  const Icon = feature.icon;
  const isReversed = feature.imagePosition === "left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`grid md:grid-cols-2 gap-12 items-center ${
        isReversed ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Content */}
      <div className={`space-y-6 ${isReversed ? "md:order-2" : ""}`}>
        <div className="inline-flex p-3 rounded-lg glass">
          <Icon className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-3xl md:text-4xl font-bold text-foreground">
          {feature.title}
        </h3>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {feature.description}
        </p>
      </div>

      {/* Visual/Placeholder */}
      <div className={`${isReversed ? "md:order-1" : ""}`}>
        <div className="aspect-[4/3] rounded-2xl glass flex items-center justify-center animate-pulse-glow">
          <Icon className="w-24 h-24 text-primary/30" />
        </div>
      </div>
    </motion.div>
  );
};

const Features = () => {
  return (
    <section id="features" className="section-padding bg-muted/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Technology That <span className="gradient-text">Empowers</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cutting-edge features designed to make every ride safer, smarter, and more enjoyable.
          </p>
        </motion.div>

        <div className="space-y-32">
          {features.map((feature, index) => (
            <FeatureBlock key={feature.id} feature={feature} index={index} />
          ))}
        </div>

        {/* Additional Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 mt-16"
        >
         <div className="glass p-8 rounded-2xl space-y-4">
    <Gauge className="w-10 h-10 text-primary" />
    <h4 className="text-2xl font-bold">Upslope Assistant System</h4>
    <p className="text-muted-foreground">
      Intelligent hill-start assist that prevents rollback on inclines and gives
      smooth power delivery during upward climbs.
    </p>
  </div>
          <div className="glass p-8 rounded-2xl space-y-4">
            <Leaf className="w-10 h-10 text-secondary" />
            <h4 className="text-2xl font-bold">100% Sustainable</h4>
            <p className="text-muted-foreground">
              Zero emissions, recyclable components, and solar-powered service centers. Join the green revolution.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
