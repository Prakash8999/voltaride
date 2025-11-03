import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is the real-world range of ElectroVive scooters?",
    answer:
      "Our scooters offer 180 KM real-world range on a single charge under normal riding conditions. Range may vary based on riding style, terrain, weather, and load.",
  },
  {
    question: "How long does it take to charge the battery?",
    answer:
      "Standard charging takes 4-5 hours for a full charge. With our fast charger, you can get 80% charge in just 45 minutes.",
  },
  {
    question: "What warranty do you offer?",
    answer:
      "We offer an industry-leading 8-year/80,000 km warranty on the battery pack and 3 years on the vehicle. Extended warranty options are also available.",
  },
  {
    question: "Are there any government subsidies available?",
    answer:
      "Yes! Under the FAME II scheme, you can avail up to ₹15,000 subsidy. State-specific subsidies may also apply. Our team will help you with all documentation.",
  },
  {
    question: "How do I book a test ride?",
    answer:
      "Simply click the 'Book Test Ride' button, select your nearest dealer, choose a convenient time slot, and we'll confirm your booking within 24 hours.",
  },
  {
    question: "What are the financing options?",
    answer:
      "We partner with leading banks and NBFCs to offer flexible financing starting at ₹3,999/month. Zero down payment and instant approval available for eligible customers.",
  },
];

const FAQ = () => {
  return (
    <section className="section-padding">
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about ElectroVive electric scooters
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass rounded-lg px-6 border-border"
              >
                <AccordionTrigger className="text-left hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
