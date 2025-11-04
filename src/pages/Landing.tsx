import { motion } from "framer-motion";
import Header from "@/components/ev/Header";
import Hero from "@/components/ev/Hero";
import ProductGrid from "@/components/ev/ProductGrid";
import Features from "@/components/ev/Features";
import Calculators from "@/components/ev/Calculators";
import Comparison from "@/components/ev/Comparison";
import Testimonials from "@/components/ev/Testimonials";
import ServiceMap from "@/components/ev/ServiceMap";
import Roadmap from "@/components/ev/Roadmap";
import FAQ from "@/components/ev/FAQ";
import Newsletter from "@/components/ev/Newsletter";
import Footer from "@/components/ev/Footer";
import InterestModal, { InterestModalRef } from "@/components/ev/InterestModal";
import { useRef } from "react";

export default function Landing() {
  const interestModalRef = useRef<InterestModalRef>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onBookTestRide={() => interestModalRef.current?.open()} />
      <main>
        <Hero onReserveNow={() => interestModalRef.current?.open()} />
        <ProductGrid />
        <Features />
        <Calculators />
        <Comparison />
        <Testimonials />
        <ServiceMap />
        <Roadmap />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
      <InterestModal ref={interestModalRef} />
    </div>
  );
}