import { motion } from "framer-motion";
import Header from "@/components/ev/Header";
import Hero from "@/components/ev/Hero";
import ProductGrid from "@/components/ev/ProductGrid";
import Features from "@/components/ev/Features";
import Calculators from "@/components/ev/Calculators";
import Comparison from "@/components/ev/Comparison";
import Testimonials from "@/components/ev/Testimonials";
import ServiceMap from "@/components/ev/ServiceMap";
import FAQ from "@/components/ev/FAQ";
import Newsletter from "@/components/ev/Newsletter";
import Footer from "@/components/ev/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <ProductGrid />
        <Features />
        <Calculators />
        <Comparison />
        <Testimonials />
        <ServiceMap />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}