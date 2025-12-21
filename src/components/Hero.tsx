import { useRef, useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import TestRideModal from "./TestRideModal";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const IMAGES = [
  "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/11.png",
  "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/12.png",
  "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/13.png",
  "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/14.png",
  "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/15.png",
  "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/16.png",
];

const SLIDE_DATA = [
  {
    title: "Pure Performance",
    subtitle: "Instant torque. 0-40 in 3.3s.",
    metric: { value: "3.3s", label: "0-40 km/h" }
  },
  {
    title: "Aerodynamic Design",
    subtitle: "Sculpted for range and stability.",
    metric: { value: "0.29", label: "Drag Coefficient" }
  },
  {
    title: "Smart Connectivity",
    subtitle: "Your scooter, connected to your world.",
    metric: { value: "5G", label: "IoT Enabled" }
  },
  {
    title: "All-Weather Build",
    subtitle: "IP67 rated. Ready for any season.",
    metric: { value: "IP67", label: "Water & Dust Rating" }
  },
  {
    title: "Limitless Range",
    subtitle: "Go further with 120km true range.",
    metric: { value: "125 km", label: "True Range" }
  },
  {
    title: "Future Ready",
    subtitle: "Updates over the air. Always new.",
    metric: { value: "5 Yr", label: "Battery Warranty" }
  }
];

// Linear interpolation for smooth inertia
const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

// Defined & Visible Energy Flow Component
const EnergyFlowLine = ({ active }: { active: boolean }) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      <svg
        className="w-full h-full mobile-adjust-viewbox"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice" // Ensures consistent positioning relative to image center
      >
        <defs>
          <filter id="glow-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.4" />
          </filter>
        </defs>

        {/* Core Electric Line */}
        <motion.path
          d="M 45 58 Q 55 58, 68 72" // Simulates flow from battery (mid-chassis) to rear hub
          fill="transparent"
          stroke="#4FD1C5" // Muted Electric Cyan
          strokeWidth="0.4" // ~4px on desktop, clearly visible
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            active
              ? { pathLength: 1, opacity: 0.6 } // High viz during animation
              : { pathLength: 0, opacity: 0 }
          }
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }} // Fast, torque-like
        />

        {/* Subtle trailing gradient effect using opacity fade */}
      </svg>
    </div>
  );
};

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("E-Velco Pro");
  const [activeIndex, setActiveIndex] = useState(0);

  // Physics state
  const position = useRef({ current: 0, target: 0 });
  const isDragging = useRef(false);
  const startX = useRef(0);
  const animationFrameId = useRef<number>();
  const wheelTimeout = useRef<NodeJS.Timeout>();

  // Configuration
  const DRAG_MULTIPLIER = 2.0;
  const WHEEL_MULTIPLIER = 1.6;
  const EASE = 0.08;

  const getSlideWidth = () => window.innerWidth;

  const goToSlide = useCallback((index: number) => {
    const width = getSlideWidth();
    position.current.target = -(index * width);
  }, []);

  const snapToNearestSlide = useCallback(() => {
    const width = getSlideWidth();
    const maxScroll = -((IMAGES.length - 1) * width);
    let snapTarget = Math.round(position.current.target / width) * width;
    snapTarget = Math.max(maxScroll, Math.min(0, snapTarget));
    position.current.target = snapTarget;
  }, []);

  // Animation Loop
  const animate = useCallback(() => {
    position.current.current = lerp(position.current.current, position.current.target, EASE);

    if (trackRef.current) {
      const x = position.current.current;
      trackRef.current.style.transform = `translate3d(${x}px, 0, 0)`;

      const width = getSlideWidth();
      const newIndex = Math.round(Math.abs(x / width));

      if (newIndex < IMAGES.length) {
        setActiveIndex((prev) => (prev !== newIndex ? newIndex : prev));
      }

      // Parallax
      const images = trackRef.current.querySelectorAll('.hero-image');
      images.forEach((img, index) => {
        const slideX = (index * width) + x;
        const parallaxX = slideX * 0.2;
        (img as HTMLElement).style.transform = `translate3d(${-parallaxX}px, 0, 0) scale(1.05)`;
      });
    }

    animationFrameId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    animationFrameId.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [animate]);

  // Event Handlers
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        const width = getSlideWidth();
        const maxScroll = -((IMAGES.length - 1) * width);
        position.current.target -= e.deltaX * WHEEL_MULTIPLIER;
        position.current.target = Math.max(maxScroll, Math.min(0, position.current.target));
        if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
        wheelTimeout.current = setTimeout(() => { snapToNearestSlide(); }, 150);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      isDragging.current = true;
      startX.current = e.touches[0].clientX;
      if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      const currentX = e.touches[0].clientX;
      const delta = (currentX - startX.current) * DRAG_MULTIPLIER;
      startX.current = currentX;
      const width = getSlideWidth();
      const maxScroll = -((IMAGES.length - 1) * width);
      position.current.target += delta;

      if (position.current.target > 0 || position.current.target < maxScroll) {
        position.current.target -= delta * 0.4;
      } else {
        position.current.target = Math.max(maxScroll, Math.min(0, position.current.target));
      }
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
      snapToNearestSlide();
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [snapToNearestSlide]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-background select-none cursor-grab active:cursor-grabbing"
    >
      {/* The Track */}
      <div
        ref={trackRef}
        className="flex h-full w-[600vw] will-change-transform"
      >
        {IMAGES.map((src, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-screen h-full relative overflow-hidden flex items-center justify-center border-r border-white/5 bg-[#0a0a0a]"
          >
            {/* Hero Image */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img
                src={src}
                alt={SLIDE_DATA[idx].title}
                className="hero-image w-full h-full object-cover will-change-transform scale-105"
                draggable={false}
              />
              {/* Contrast Safety Scrim: Essential for light slides */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/20 z-10 pointer-events-none" />
            </div>

            {/* Energy Flow Line (Active per slide) */}
            <EnergyFlowLine active={activeIndex === idx} />

            {/* Editorial Text Overlay - Top Left */}
            <div className={`absolute top-28 left-0 w-full px-6 sm:px-12 md:px-24 text-left z-20 transition-opacity duration-1000 ${activeIndex === idx ? "opacity-100 delay-300" : "opacity-0"}`}>
              <div className="max-w-xl">
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-[#F2F2F2]">
                  {SLIDE_DATA[idx].title}
                </h2>
                <p className="text-lg md:text-xl font-medium text-[#F2F2F2]/80 tracking-wide mt-3 max-w-lg">
                  {SLIDE_DATA[idx].subtitle}
                </p>

                <div className="flex items-center gap-4 pt-8">
                  <Button
                    size="lg"
                    className="rounded-full px-8 h-12 text-base bg-[#F2F2F2] text-black hover:bg-white transition-all font-semibold shadow-none border-none"
                    onClick={() => {
                      setSelectedModel("E-Velco Pro");
                      setEnquiryOpen(true);
                    }}
                  >
                    Reserve Now
                  </Button>
                  <Button
                    size="lg"
                    variant="link"
                    className="px-0 text-[#F2F2F2] hover:text-white transition-all text-base h-12 decoration-transparent"
                    onClick={() => {
                      const productsSection = document.getElementById('products');
                      if (productsSection) productsSection.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Explore Models &rarr;
                  </Button>
                </div>
              </div>
            </div>

            {/* Performance Metric - Bottom Right */}
            {/* Appears AFTER energy line completes (approx 1.1s delay) */}
            <div className={`absolute bottom-32 right-6 sm:right-12 md:right-24 z-20 text-right transition-all duration-1000 ease-out ${activeIndex === idx ? "opacity-100 translate-y-0 delay-[1100ms]" : "opacity-0 translate-y-8"}`}>
              <div className="flex flex-col items-end">
                <span className="text-4xl md:text-6xl font-normal tracking-tighter text-[#F2F2F2] tabular-nums leading-none">
                  {SLIDE_DATA[idx].metric.value}
                </span>
                <span className="text-sm font-medium tracking-[0.2em] text-[#F2F2F2]/60 uppercase mt-2">
                  {SLIDE_DATA[idx].metric.label}
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Minimal Indicators (Bottom Left) */}
      <div className="absolute bottom-12 left-6 sm:left-12 z-20 flex gap-3">
        {IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`h-2 rounded-full transition-all duration-500 shadow-sm ${idx === activeIndex ? "w-8 bg-[#F2F2F2]" : "w-2 bg-[#F2F2F2]/40 hover:bg-[#F2F2F2]/60"}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      <TestRideModal
        open={enquiryOpen}
        onOpenChange={setEnquiryOpen}
        preSelectedModel={selectedModel}
        isEnquiry={true}
      />
    </section>
  );
};

export default Hero;
