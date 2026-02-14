"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import Features from "@/components/Features";
import Roadmap from "@/components/Roadmap";
import CitySelector from "@/components/CitySelector";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import InterestModal from "@/components/InterestModal";

export default function HomePage() {
    const [showInterestModal, setShowInterestModal] = useState(false);

    useEffect(() => {
        const hasSubmitted = localStorage.getItem("aerix-energy-interest-submitted") === "true";

        if (!hasSubmitted) {
            const timer = setTimeout(() => {
                setShowInterestModal(true);
            }, 10000); // 10 seconds

            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <div className="min-h-screen bg-[#F8F9FA]">
            <Header />
            <main>
                <Hero />
                <ProductGrid />
                <Features />
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
}
