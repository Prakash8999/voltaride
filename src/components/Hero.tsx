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
    title: "Smooth Electric Performance",
    subtitle: "BLDC hub motor built for effortless city rides.",
    metric: { value: "45 km/h", label: "Top Speed" }
  },
  {
    title: "Aerodynamic Design",
    subtitle: "Sculpted panels for stability and efficiency.",
    metric: { value: "Optimized", label: "Airflow Design" }
  },

  {
    title: "Smart Connectivity",
    subtitle: "Your scooter, connected to your world.",
    metric: { value: "Smart", label: "Connected Tech" }
  },
  {
    title: "All-Weather Build",
    subtitle: "IP67 rated. Ready for any season.",
    metric: { value: "IP67", label: "Water & Dust Rating" }
  },
  {
    title: "Limitless Range",
    subtitle: "Go further with 110km true range.",
    metric: { value: "110 km", label: "True Range" }
  },
  {
    title: "Future Ready",
    subtitle: "Updates over the air. Always new.",
    metric: { value: "3 Yr", label: "Battery Warranty" }
  }
];

// Linear interpolation for smooth inertia
const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

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

  // Snapping with Loop Logic
  const snapToNearestSlide = useCallback(() => {
    const width = getSlideWidth();
    const maxScroll = -((IMAGES.length - 1) * width);

    // Determine where we would snap roughly
    let snapTarget = Math.round(position.current.target / width) * width;

    // Check for loop conditions (overshoot)
    if (position.current.target > width * 0.2) {
      // Pulled past the start significantly -> wrap to end
      snapTarget = maxScroll;
    } else if (position.current.target < maxScroll - width * 0.2) {
      // Pulled past the end significantly -> wrap to start
      snapTarget = 0;
    } else {
      // Normal clamping
      snapTarget = Math.max(maxScroll, Math.min(0, snapTarget));
    }

    position.current.target = snapTarget;
  }, []);

  // Animation Loop
  const animate = useCallback(() => {
    position.current.current = lerp(position.current.current, position.current.target, EASE);

    if (trackRef.current) {
      const x = position.current.current;
      trackRef.current.style.transform = `translate3d(${x}px, 0, 0)`;

      const width = getSlideWidth();
      let newIndex = Math.round(Math.abs(x / width));

      // Clamp index for state safety, though logic should keep it valid
      newIndex = Math.max(0, Math.min(IMAGES.length - 1, newIndex));

      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
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
  }, [activeIndex]);

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
        position.current.target -= e.deltaX * WHEEL_MULTIPLIER;

        if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
        wheelTimeout.current = setTimeout(() => { snapToNearestSlide(); }, 150);
      }
    };

    // Unified Drag Handlers for Mouse & Touch
    const handleDragStart = (clientX: number) => {
      isDragging.current = true;
      startX.current = clientX;
      // Temporarily stop any snap timeout interaction while dragging
      if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
      container.style.cursor = 'grabbing';
    };

    const handleDragMove = (clientX: number) => {
      if (!isDragging.current) return;

      const delta = (clientX - startX.current) * DRAG_MULTIPLIER;
      startX.current = clientX;
      position.current.target += delta;

      // We do NOT clamp aggressively here to allow the "pull past" overshoot 
      // which triggers the loop in snapToNearestSlide
    };

    const handleDragEnd = () => {
      isDragging.current = false;
      snapToNearestSlide();
      container.style.cursor = 'grab';
    };

    // Touch Listeners
    const onTouchStart = (e: TouchEvent) => handleDragStart(e.touches[0].clientX);
    const onTouchMove = (e: TouchEvent) => handleDragMove(e.touches[0].clientX);
    const onTouchEnd = () => handleDragEnd();

    // Mouse Listeners
    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault(); // Prevent text selection
      handleDragStart(e.clientX);
    };
    const onMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      handleDragMove(e.clientX);
    };
    const onMouseUp = () => handleDragEnd();
    const onMouseLeave = () => {
      if (isDragging.current) handleDragEnd();
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    container.addEventListener("touchend", onTouchEnd);

    container.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mouseleave", onMouseLeave);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      container.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mouseleave", onMouseLeave);
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
              {/* Contrast Safety Scrim */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/20 z-10 pointer-events-none" />
            </div>

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
            {/* Fade in naturally without energy line delay now */}
            <div className={`absolute bottom-32 right-6 sm:right-12 md:right-24 z-20 text-right transition-all duration-1000 ease-out ${activeIndex === idx ? "opacity-100 translate-y-0 delay-500" : "opacity-0 translate-y-8"}`}>
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
