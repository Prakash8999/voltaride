import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const cities = [
  "Bangalore",
  "Chennai",
  "Delhi NCR",
  "Hyderabad",
  "Kolkata",
  "Mumbai",
  "Pune",
];

const CitySelector = () => {
  const { toast } = useToast();

  const handleCityClick = (city: string) => {
    toast({
      title: "Coming Soon!",
      description: `ElectroVive Store in ${city} is launching soon.`,
    });
  };

  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Visit Our <span className="gradient-text">Stores</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            Come on over. Meet us in Select City ElectroVive Stores.
          </p>
          <p className="text-sm text-muted-foreground">
            Because nothing beats a one-on-one with our electric scooters.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {cities.map((city, index) => (
            <motion.button
              key={city}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleCityClick(city)}
              className="glass p-6 rounded-xl hover:bg-primary/10 hover:border-primary transition-all group text-center"
            >
              <MapPin className="w-6 h-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-medium">{city}</span>
            </motion.button>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          More about ElectroVive Electric Stores
        </motion.p>
      </div>
    </section>
  );
};

export default CitySelector;
