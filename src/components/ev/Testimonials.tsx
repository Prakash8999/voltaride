import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Testimonials() {
  const testimonials = useQuery(api.testimonials.list);

  const defaultTestimonials = [
    {
      name: "Rajesh Kumar",
      role: "Software Engineer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
      quote: "Best decision I made! The range is incredible and I'm saving ₹3000 monthly on fuel.",
      rating: 5,
      stats: { kmDriven: 12000, monthsOwned: 8 },
    },
    {
      name: "Priya Sharma",
      role: "Marketing Manager",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
      quote: "Smooth, silent, and stylish. My daily commute has never been more enjoyable!",
      rating: 5,
      stats: { kmDriven: 8500, monthsOwned: 6 },
    },
    {
      name: "Amit Patel",
      role: "Business Owner",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
      quote: "Zero maintenance hassles and the acceleration is mind-blowing. Highly recommended!",
      rating: 5,
      stats: { kmDriven: 15000, monthsOwned: 12 },
    },
  ];

  const displayTestimonials = testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <section id="testimonials" className="py-24 relative bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">Testimonials</Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            What Our <span className="gradient-text">Riders Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who made the switch to electric
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayTestimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="glass-effect h-full hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6 space-y-4">
                  <Quote className="w-10 h-10 text-primary/30" />
                  
                  <p className="text-foreground/90 italic">"{testimonial.quote}"</p>

                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-border">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>

                  {testimonial.stats && (
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                      <div>
                        <p className="text-2xl font-bold font-numbers text-primary">
                          {testimonial.stats.kmDriven.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">km driven</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold font-numbers text-accent">
                          {testimonial.stats.monthsOwned}
                        </p>
                        <p className="text-xs text-muted-foreground">months owned</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
