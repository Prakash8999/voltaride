import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const roadmapItems = [
  {
    year: "2026",
    title: "AI Assistant",
    points: [
      "Voice booking",
      "Predictive maintenance alerts",
      "Personalized ride modes",
    ],
  },
  {
    year: "2026",
    title: "AR Showroom",
    points: [
      "View in your space",
      "Virtual test rides",
      "360° showroom tours",
    ],
  },
  {
    year: "2027",
    title: "Battery Swap Network",
    points: [
      "2-minute swaps",
      "1000+ stations",
      "Pay-per-swap plans",
    ],
  },
];

const Roadmap = () => {
  const { toast } = useToast();

  const handleNotify = (title: string) => {
    toast({
      title: "Notification Set!",
      description: `We'll notify you when ${title} launches.`,
    });
  };

  return (
    <section className="section-padding bg-gradient-to-br from-background to-primary/5">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            Future Roadmap
          </h3>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            The Road <span className="gradient-text">Ahead</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Exciting innovations coming to transform your electric mobility experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {roadmapItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="glass p-8 rounded-2xl hover:bg-card/50 transition-all group"
            >
              <Badge variant="secondary" className="mb-4">
                {item.year}
              </Badge>
              <h3 className="text-2xl font-bold mb-6">{item.title}</h3>
              <ul className="space-y-3 mb-6">
                {item.points.map((point, i) => (
                  <li key={i} className="flex items-start text-muted-foreground">
                    <span className="text-primary mr-2">•</span>
                    {point}
                  </li>
                ))}
              </ul>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleNotify(item.title)}
              >
                Notify Me
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
