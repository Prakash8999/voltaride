import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

export default function Comparison() {
  const features = [
    { feature: "Fuel Cost (per km)", electric: "₹0.40", petrol: "₹3.50" },
    { feature: "Maintenance Cost", electric: "Low", petrol: "High" },
    { feature: "Emissions", electric: "Zero", petrol: "High CO₂" },
    { feature: "Noise Level", electric: "Silent", petrol: "Loud" },
    { feature: "Acceleration", electric: "Instant", petrol: "Gradual" },
    { feature: "Service Frequency", electric: "6 months", petrol: "3 months" },
    { feature: "Engine Life", electric: "15+ years", petrol: "8-10 years" },
    { feature: "Govt. Subsidies", electric: "Available", petrol: "None" },
  ];

  return (
    <section id="comparison" className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Comparison</Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Electric vs <span className="gradient-text">Petrol</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See why electric is the smarter choice for your daily commute
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass-effect rounded-2xl overflow-hidden"
        >
          <div className="grid grid-cols-3 bg-secondary/30 p-6 font-bold">
            <div className="text-muted-foreground">Feature</div>
            <div className="text-center text-primary">Electric</div>
            <div className="text-center text-muted-foreground">Petrol</div>
          </div>

          {features.map((item, i) => (
            <motion.div
              key={item.feature}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="grid grid-cols-3 p-6 border-t border-border hover:bg-secondary/10 transition-colors"
            >
              <div className="text-foreground">{item.feature}</div>
              <div className="text-center font-bold text-primary">{item.electric}</div>
              <div className="text-center text-muted-foreground">{item.petrol}</div>
            </motion.div>
          ))}

          <div className="p-8 bg-primary/10 text-center">
            <p className="text-lg font-bold gradient-text">
              Save up to ₹50,000 annually by switching to electric!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
