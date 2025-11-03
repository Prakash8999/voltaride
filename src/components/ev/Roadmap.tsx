import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Glasses, Battery } from "lucide-react";
import { toast } from "sonner";

export default function Roadmap() {
  const roadmapItems = [
    {
      year: "2026",
      title: "AI Assistant",
      icon: Mic,
      features: [
        "Voice booking",
        "Predictive maintenance alerts",
        "Personalized ride modes",
      ],
    },
    {
      year: "2026",
      title: "AR Showroom",
      icon: Glasses,
      features: [
        "View in your space",
        "Virtual test rides",
        "360° showroom tours",
      ],
    },
    {
      year: "2027",
      title: "Battery Swap Network",
      icon: Battery,
      features: [
        "2-minute swaps",
        "1000+ stations",
        "Pay-per-swap plans",
      ],
    },
  ];

  const handleNotifyMe = (title: string) => {
    toast.success(`You'll be notified when ${title} launches!`);
  };

  return (
    <section className="py-24 relative bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">Future Roadmap</Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            The Road <span className="gradient-text">Ahead</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Exciting innovations coming to transform your electric mobility experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {roadmapItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Card className="glass-effect h-full hover:scale-105 transition-transform duration-300">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-primary/20 text-primary border-primary/30 text-lg px-4 py-1">
                      {item.year}
                    </Badge>
                    <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-accent" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold">{item.title}</h3>

                  <ul className="space-y-3">
                    {item.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleNotifyMe(item.title)}
                    variant="outline"
                    className="w-full cursor-pointer hover:bg-primary/10 hover:border-primary"
                  >
                    Notify Me
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
