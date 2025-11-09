import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import Features from "@/components/Features";
import EMICalculator from "@/components/EMICalculator";
import Roadmap from "@/components/Roadmap";
import CitySelector from "@/components/CitySelector";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import InterestModal from "@/components/InterestModal";
import ComparisonMatrix from "@/components/ComparisonMatrix";

const Index = () => {
  const [showInterestModal, setShowInterestModal] = useState(false);

  useEffect(() => {
    const hasSubmitted = localStorage.getItem("electro-vive-interest-submitted") === "true";
    
    if (!hasSubmitted) {
      const timer = setTimeout(() => {
        setShowInterestModal(true);
      }, 60000); // 1 minute

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ProductGrid />
        <ComparisonMatrix />
        <Features />
        <EMICalculator />
        <Roadmap />
        <CitySelector />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
      <InterestModal 
        isOpen={showInterestModal} 
        onClose={() => setShowInterestModal(false)} 
      />
    </div>
  );
};

export default Index;
