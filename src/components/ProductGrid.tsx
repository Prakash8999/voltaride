import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Battery, Clock } from "lucide-react";
import apexPro from "@/assets/apex-pro.jpg";
import surgeX from "@/assets/surge-x.jpg";
import flow from "@/assets/flow.jpg";
import metro from "@/assets/metro.jpg";

const products = [
  {
    id: 1,
    name: "Apex Pro",
    tagline: "Performance Redefined",
    image: apexPro,
    price: "₹1,89,999",
    specs: {
      range: "180 KM",
      speed: "120 KMPH",
      charge: "45 Min",
    },
    featured: true,
  },
  {
    id: 2,
    name: "Surge X",
    tagline: "Power Meets Style",
    image: surgeX,
    price: "₹1,59,999",
    specs: {
      range: "150 KM",
      speed: "110 KMPH",
      charge: "50 Min",
    },
    featured: false,
  },
  {
    id: 3,
    name: "Flow",
    tagline: "Elegance in Motion",
    image: flow,
    price: "₹1,29,999",
    specs: {
      range: "130 KM",
      speed: "90 KMPH",
      charge: "55 Min",
    },
    featured: false,
  },
  {
    id: 4,
    name: "Metro",
    tagline: "Urban Commuter",
    image: metro,
    price: "₹99,999",
    specs: {
      range: "100 KM",
      speed: "75 KMPH",
      charge: "60 Min",
    },
    featured: false,
  },
];

const ProductCard = ({ product, index }: { product: typeof products[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group relative glass rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300"
  >
    {product.featured && (
      <Badge className="absolute top-4 right-4 z-10 bg-primary">Featured</Badge>
    )}

    {/* Image */}
    <div className="aspect-[4/3] overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
    </div>

    {/* Content */}
    <div className="p-6 space-y-4">
      <div>
        <h3 className="text-2xl font-bold text-foreground">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{product.tagline}</p>
      </div>

      {/* Specs Row */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          <span className="font-numeric">{product.specs.range}</span>
        </div>
        <div className="flex items-center gap-2">
          <Battery className="w-4 h-4 text-secondary" />
          <span className="font-numeric">{product.specs.speed}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          <span className="font-numeric">{product.specs.charge}</span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Starting at</p>
          <p className="font-numeric text-2xl font-bold text-foreground">{product.price}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button className="flex-1">Explore</Button>
        <Button variant="outline" className="flex-1">
          Buy Now
        </Button>
      </div>
      <Button variant="ghost" className="w-full">
        Compare
      </Button>
    </div>
  </motion.div>
);

const ProductGrid = () => {
  return (
    <section id="products" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your <span className="gradient-text">Ride</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From urban commuters to performance beasts, find the perfect electric scooter for your lifestyle.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
