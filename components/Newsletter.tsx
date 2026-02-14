import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      toast.success("Successfully subscribed to our newsletter!");
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section className="">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden"
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-30" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Stay <span className="gradient-text">Connected</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Get the latest updates on new models, exclusive offers, and EV insights delivered to your inbox.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-12 bg-background/50"
                  required
                />
              </div>
              <Button type="submit" size="lg" className="sm:w-auto">
                {isSubscribed ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Subscribed
                  </>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span>Exclusive Launch Updates</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span>Special Offers</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span>EV Tips & Tricks</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
