import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useState } from "react";

export default function ServiceMap() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const cities = [
    "Bangalore",
    "Chennai",
    "Delhi NCR",
    "Hyderabad",
    "Kolkata",
    "Mumbai",
    "Pune",
    "Patna",
    "Jaipur",
  ];

  return (
    <section id="service-map" className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Come on over. Meet us</Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Select <span className="gradient-text">City</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            ELECTRO VIVE Stores. Because nothing beats a one on one with the S1.
          </p>
          <p className="text-sm text-muted-foreground mt-2">More about ELECTRO VIVE Stores</p>
        </motion.div>

        {selectedCity ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="glass-effect rounded-3xl p-12 space-y-6">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <MapPin className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-3xl font-bold gradient-text">Coming Soon to {selectedCity}!</h3>
              <p className="text-lg text-muted-foreground">
                We're expanding our network. Stay tuned for updates on our {selectedCity} location.
              </p>
              <Button
                onClick={() => setSelectedCity(null)}
                variant="outline"
                className="cursor-pointer"
              >
                ← Back to Cities
              </Button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {cities.map((city, i) => (
              <motion.div
                key={city}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Button
                  onClick={() => setSelectedCity(city)}
                  variant="outline"
                  className="w-full h-20 text-lg font-bold hover:bg-primary/10 hover:border-primary transition-all cursor-pointer"
                >
                  {city}
                </Button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}