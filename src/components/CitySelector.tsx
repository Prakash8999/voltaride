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
  "Patna",
  "Jaipur",
];

const CitySelector = () => {
  const { toast } = useToast();

  const handleCityClick = (city: string) => {
    toast({
      title: "Coming Soon! 🎉",
      description: `We're excited to announce that our ELECTRO VIVE store in ${city} will be opening soon! Stay tuned for updates on our launch date and exclusive opening offers.`,
    });
  };

  return (
    <section className="">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Come on over. Meet us
          </h2>
          <p className="text-xl md:text-2xl font-semibold mb-2">
            Select City <span className="gradient-text">ELECTRO VIVE</span> Stores.
          </p>
          <p className="text-base text-muted-foreground">
            Because nothing beats a one on one with the S1.
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
          More about ELECTRO VIVE Stores
        </motion.p>
      </div>
    </section>
  );
};

export default CitySelector;
