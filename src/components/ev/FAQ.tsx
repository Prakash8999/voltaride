import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const faqs = [
    {
      question: "What is the real-world range of VoltaRide scooters?",
      answer: "Our scooters offer a real-world range of 100-180 km on a single charge, depending on the model and riding conditions. The Apex Pro delivers up to 180 km, while the Metro offers 100 km.",
    },
    {
      question: "How long does it take to charge?",
      answer: "Fast charging takes 45-70 minutes to reach 80% capacity. A full charge using a standard home charger takes 4-5 hours. You can charge at home using a regular 15A socket.",
    },
    {
      question: "What is the warranty coverage?",
      answer: "All VoltaRide scooters come with an 8-year battery warranty and 3-year vehicle warranty. This covers manufacturing defects and battery degradation beyond normal wear.",
    },
    {
      question: "Are there government subsidies available?",
      answer: "Yes! Under the FAME II scheme, you can avail subsidies up to ₹15,000 depending on your state. Additional state subsidies may also apply. Our team will help you with the paperwork.",
    },
    {
      question: "What are the maintenance costs?",
      answer: "Electric scooters have significantly lower maintenance costs compared to petrol scooters. Expect to spend around ₹2,000-3,000 annually on basic maintenance like tire changes and brake pads.",
    },
    {
      question: "Can I test ride before purchasing?",
      answer: "Absolutely! Book a free test ride at any of our experience centers. You can test ride multiple models to find the perfect fit for your needs.",
    },
    {
      question: "What financing options are available?",
      answer: "We offer flexible EMI plans starting from ₹2,699/month with zero down payment options. We partner with leading banks and NBFCs to provide competitive interest rates.",
    },
    {
      question: "Is it safe to ride in rain?",
      answer: "Yes, all VoltaRide scooters have IP67 water resistance rating, making them safe to ride in heavy rain. The battery and electrical components are fully sealed and protected.",
    },
  ];

  return (
    <section id="faq" className="py-24 relative bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">FAQ</Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Got <span className="gradient-text">Questions?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to the most common questions about VoltaRide electric scooters
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="glass-effect rounded-xl px-6 border-none"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-bold text-lg">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
