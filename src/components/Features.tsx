import { motion } from "framer-motion";
import { Battery, Zap, Shield, Smartphone, Wind, Gauge, ArrowRight } from "lucide-react";

const features = [
  {
    icon: <Battery className="w-8 h-8 text-primary" />,
    title: "150km Range",
    description: "Go further with our advanced Lithium-ion battery technology designed for long commutes.",
    colSpan: "md:col-span-2",
    bgImage: "linear-gradient(to right bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.6)), url('https://images.unsplash.com/photo-1620802051782-726fa6b3308d?auto=format&fit=crop&q=80')"
  },
  {
    icon: <Zap className="w-8 h-8 text-secondary" />,
    title: "Fast Charging",
    description: "0 to 80% in just 40 minutes.",
    colSpan: "md:col-span-1",
    highlight: true
  },
  {
    icon: <Gauge className="w-8 h-8 text-primary" />,
    title: "85 km/h",
    description: "Top speed that keeps you ahead of traffic.",
    colSpan: "md:col-span-1"
  },
  {
    icon: <Smartphone className="w-8 h-8 text-blue-500" />,
    title: "Smart Connect",
    description: "Control your ride with our dedicated app.",
    colSpan: "md:col-span-2",
    hasGradient: true
  },
  {
    icon: <Shield className="w-8 h-8 text-green-500" />,
    title: "Advanced Safety",
    description: "CBS braking system and anti-theft alarm.",
    colSpan: "md:col-span-1"
  },
  {
    icon: <Wind className="w-8 h-8 text-cyan-500" />,
    title: "Aerodynamic",
    description: "Sleek design for maximum efficiency.",
    colSpan: "md:col-span-2"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const Features = () => {
  return (
    <section className="section-padding relative overflow-hidden bg-gray-50/50" id="features">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-gray-900"
          >
            Engineered for the <span className="gradient-text">Future</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Experience the perfect blend of performance, technology, and sustainability in every ride.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className={`
                group relative p-8 rounded-3xl overflow-hidden
                ${feature.colSpan}
                ${feature.highlight ? 'bg-white border-primary/20 shadow-md' : 'bg-white/60'}
                ${feature.hasGradient ? 'bg-gradient-to-br from-white to-gray-50' : ''}
                border border-gray-100 hover:border-primary/20 transition-all duration-300 shadow-sm hover:shadow-lg
              `}
              style={feature.bgImage ? {
                backgroundImage: feature.bgImage,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              } : undefined}
            >
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="mb-6">
                  <div className={`
                    p-3 rounded-2xl w-fit mb-4
                    ${feature.hasGradient || feature.bgImage ? 'bg-white shadow-sm' : 'bg-secondary/10'}
                  `}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>


              </div>

              {/* Hover Gradient Overlay - light version */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
