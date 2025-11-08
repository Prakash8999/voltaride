import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Clock, Shield, ArrowRight, GitCompare } from "lucide-react";

export default function ProductGrid() {
  const models = [
    {
      name: "Apex Pro",
      tagline: "Ultimate Performance",
      price: 149999,
      emi: 4999,
      image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80",
      range: 180,
      topSpeed: 120,
      acceleration: "2.9s",
      charging: 45,
      featured: true,
    },
    {
      name: "Surge X",
      tagline: "Power Meets Style",
      price: 129999,
      emi: 4299,
      image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&q=80",
      range: 150,
      topSpeed: 100,
      acceleration: "3.5s",
      charging: 50,
      featured: true,
    },
    {
      name: "Flow",
      tagline: "Everyday Elegance",
      price: 99999,
      emi: 3299,
      image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80",
      range: 120,
      topSpeed: 80,
      acceleration: "4.2s",
      charging: 60,
      featured: false,
    },
    {
      name: "Metro",
      tagline: "City Commuter",
      price: 79999,
      emi: 2699,
      image: "https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800&q=80",
      range: 100,
      topSpeed: 65,
      acceleration: "5.0s",
      charging: 70,
      featured: false,
    },
  ];

  return (
    <section id="products" className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Our Models</Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Choose Your <span className="gradient-text">Perfect Ride</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From city commutes to highway adventures, we have the perfect electric scooter for every journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {models.map((model, i) => (
            <motion.div
              key={model.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative glass-effect rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              {model.featured && (
                <Badge className="absolute top-4 right-4 z-10 bg-accent text-background">
                  Popular
                </Badge>
              )}
              
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={model.image}
                  alt={model.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold mb-1">{model.name}</h3>
                  <p className="text-sm text-muted-foreground">{model.tagline}</p>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-2 py-4 border-y border-border">
                  <div className="text-center">
                    <Zap className="w-4 h-4 mx-auto mb-1 text-primary" />
                    <p className="text-sm font-bold font-numbers">{model.range}km</p>
                    <p className="text-xs text-muted-foreground">Range</p>
                  </div>
                  <div className="text-center">
                    <Zap className="w-4 h-4 mx-auto mb-1 text-accent" />
                    <p className="text-sm font-bold font-numbers">{model.topSpeed}km/h</p>
                    <p className="text-xs text-muted-foreground">Top Speed</p>
                  </div>
                  <div className="text-center">
                    <Clock className="w-4 h-4 mx-auto mb-1 text-destructive" />
                    <p className="text-sm font-bold font-numbers">{model.charging}min</p>
                    <p className="text-xs text-muted-foreground">Charge</p>
                  </div>
                </div>

                {/* Price */}
                <div>
                  <p className="text-sm text-muted-foreground">Starting from</p>
                  <p className="text-2xl font-bold font-numbers gradient-text">
                    ₹{model.emi.toLocaleString()}<span className="text-sm">/mo</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    or ₹{model.price.toLocaleString()} upfront
                  </p>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-background cursor-pointer">
                    Explore
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="cursor-pointer">
                      Buy Now
                    </Button>
                    <Button variant="outline" size="sm" className="cursor-pointer">
                      <GitCompare className="w-4 h-4 mr-1" />
                      Compare
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
