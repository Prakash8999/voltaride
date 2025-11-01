import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Wrench } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";

export default function ServiceMap() {
  const serviceCenters = useQuery(api.serviceCenters.list);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const defaultCenters = [
    {
      name: "VoltaRide Service Center - Mumbai",
      state: "Maharashtra",
      city: "Mumbai",
      address: "123 Andheri West, Mumbai - 400053",
      phone: "+91 98765 43210",
      services: ["Repairs", "Battery Service", "Accessories"],
    },
    {
      name: "VoltaRide Service Center - Delhi",
      state: "Delhi",
      city: "New Delhi",
      address: "456 Connaught Place, New Delhi - 110001",
      phone: "+91 98765 43211",
      services: ["Repairs", "Battery Service", "Test Rides"],
    },
    {
      name: "VoltaRide Service Center - Bangalore",
      state: "Karnataka",
      city: "Bangalore",
      address: "789 Koramangala, Bangalore - 560034",
      phone: "+91 98765 43212",
      services: ["Repairs", "Accessories", "Test Rides"],
    },
  ];

  const displayCenters = serviceCenters && serviceCenters.length > 0 ? serviceCenters : defaultCenters;
  const filteredCenters = selectedState
    ? displayCenters.filter((c) => c.state === selectedState)
    : displayCenters;

  const states = Array.from(new Set(displayCenters.map((c) => c.state)));

  return (
    <section id="service-map" className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Service Network</Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            We're <span className="gradient-text">Everywhere</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find a service center near you with our expanding network across India
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <Button
            variant={selectedState === null ? "default" : "outline"}
            onClick={() => setSelectedState(null)}
            className="cursor-pointer"
          >
            All States
          </Button>
          {states.map((state) => (
            <Button
              key={state}
              variant={selectedState === state ? "default" : "outline"}
              onClick={() => setSelectedState(state)}
              className="cursor-pointer"
            >
              {state}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCenters.map((center, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-effect rounded-2xl p-6 space-y-4 hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{center.name}</h3>
                  <p className="text-sm text-muted-foreground">{center.city}, {center.state}</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">{center.address}</p>

              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-accent" />
                <a href={`tel:${center.phone}`} className="text-accent hover:underline cursor-pointer">
                  {center.phone}
                </a>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                {center.services.map((service) => (
                  <Badge key={service} variant="outline" className="text-xs">
                    <Wrench className="w-3 h-3 mr-1" />
                    {service}
                  </Badge>
                ))}
              </div>

              <Button variant="outline" className="w-full cursor-pointer">
                Get Directions
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
