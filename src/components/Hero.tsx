import { useRef, useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import TestRideModal from "./TestRideModal";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const ORIG_IMAGES = [
  "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/16.png", // 5
  "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/12.png", // 1
  "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/11.png", // 0
  "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/13.png", // 2
  "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/15.png", // 4
  "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/14.png", // 3
];

const MOBILE_IMAGE_MAP: Record<string, string> = {
  "16.png": "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/16_small.jpeg",
  "12.png": "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/12_small.jpeg",
  "13.png": "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/13_small.jpeg",
  "15.png": "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/15_small.jpeg",
  "14.png": "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/14_small.jpeg"
};

const getMobileSrc = (desktopSrc: string) => {
  const filename = desktopSrc.split('/').pop();
  if (!filename) return desktopSrc;
  return MOBILE_IMAGE_MAP[filename] || desktopSrc;
};

const ORIG_DATA = [
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

// Create extended arrays for infinite loop: [Last, ...Originals, First]
const IMAGES = [
  ORIG_IMAGES[ORIG_IMAGES.length - 1],
  ...ORIG_IMAGES,
  ORIG_IMAGES[0]
];

const SLIDE_DATA = [
  ORIG_DATA[ORIG_DATA.length - 1],
  ...ORIG_DATA,
  ORIG_DATA[0]
];

// Linear interpolation for smooth inertia
const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

// Easing function for premium feel
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("E-Velco Pro");
  const [activeIndex, setActiveIndex] = useState(0); // This tracks the "Real" index (0-5)

  // Physics state
  // Initial position is -100vw (showing the first real slide, index 1 in the extended array)
  const position = useRef({ current: 0, target: 0 });
  const isDragging = useRef(false);
  const startX = useRef(0);
  const animationFrameId = useRef<number>();
  const wheelTimeout = useRef<NodeJS.Timeout>();
  const initialized = useRef(false);
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const imageElementsRef = useRef<NodeListOf<HTMLImageElement> | null>(null);
  const frameSkipCounter = useRef(0);
  const verticalScroll = useRef(0);

  // Configuration
  const DRAG_MULTIPLIER = 2.0;
  const WHEEL_MULTIPLIER = 1.6;
  const EASE = 0.08;

  // Initialize position on mount to account for window width
  useEffect(() => {
    if (!initialized.current) {
      const width = window.innerWidth;
      position.current.current = -width; // Start at index 1
      position.current.target = -width;
      initialized.current = true;
    }
  }, []);

  const getSlideWidth = () => window.innerWidth;

  const goToSlide = useCallback((realIndex: number) => {
    const width = getSlideWidth();
    // Map real index (0-5) to extended index (1-6)
    const extendedIndex = realIndex + 1;
    position.current.target = -(extendedIndex * width);
  }, []);

  // Snapping logic
  const snapToNearestSlide = useCallback(() => {
    const width = getSlideWidth();
    // We snap to any index in the extended array
    let snapTarget = Math.round(position.current.target / width) * width;
    position.current.target = snapTarget;
  }, []);

  useEffect(() => {
    if (trackRef.current) {
      imageElementsRef.current = trackRef.current.querySelectorAll('.hero-image');
    }
  }, []);

  // Animation Loop
  const animate = useCallback(() => {
    const width = getSlideWidth();
    const isMobile = width < 768;

    // Mobile optimization: Skip every other frame for image effects (reduces to ~30fps)
    // But always update carousel position for smooth dragging
    frameSkipCounter.current++;
    const shouldUpdateImages = !isMobile || (frameSkipCounter.current % 2 === 0);

    // 1. Interpolate Horizontal (ALWAYS update for smooth carousel)
    position.current.current = lerp(position.current.current, position.current.target, EASE);

    // 2. Vertical Scroll Physics
    const targetScrollY = window.scrollY;
    verticalScroll.current = lerp(verticalScroll.current, targetScrollY, 0.07);

    // 3. Pinned Hero Interactions
    const scrollRange = window.innerHeight;
    const rawProgress = Math.min(Math.max(verticalScroll.current / scrollRange, 0), 1);
    const progress = easeOutCubic(rawProgress);

    // Visual Transformations - STRICTLY VERTICAL ONLY
    // "Hero remains 100vw wide at all times." - No horizontal insets.
    // "No rounded corners introduced on the sides." - No border radius.
    // "Remove all left and right cropping."

    if (heroWrapperRef.current) {
      // Ensure full width availability without reducing frame size
      heroWrapperRef.current.style.clipPath = `inset(0px 0px 0px 0px)`;
      // User requested "Removal" of wrapper scale. 
      heroWrapperRef.current.style.transform = `none`;
    }

    // 4. Infinite Loop Jumping logic (Warp)
    const x = position.current.current;
    const totalRealSlides = ORIG_IMAGES.length; // 6

    if (x >= -0.01) { // Reached absolute start (Fake Last)
      const resetX = -(totalRealSlides * width);
      position.current.current = resetX;
      position.current.target = resetX + (position.current.target - x);
    } else if (x <= -((totalRealSlides + 1) * width) + 0.01) { // Reached absolute end (Fake First)
      const resetX = -width;
      position.current.current = resetX;
      position.current.target = resetX + (position.current.target - x);
    }

    // Rerender styling
    if (trackRef.current) {
      const finalX = position.current.current;
      trackRef.current.style.transform = `translate3d(${finalX}px, 0, 0)`;

      const rawIndex = Math.abs(finalX / width);
      let realIndex = Math.round(rawIndex) - 1;

      if (realIndex < 0) realIndex = totalRealSlides - 1;
      if (realIndex >= totalRealSlides) realIndex = 0;

      if (realIndex !== activeIndex) {
        setActiveIndex(realIndex);
      }

      // Parallax & Image Scale
      if (shouldUpdateImages) {
        let images = imageElementsRef.current;
        if (!images && trackRef.current) {
          images = trackRef.current.querySelectorAll('.hero-image');
          imageElementsRef.current = images as NodeListOf<HTMLImageElement>;
        }

        if (images) {
          const scrollProgress = Math.min(Math.max(verticalScroll.current / window.innerHeight, 0), 1);

          // Scroll-driven Image Scale
          // Slightly increased base scale to ensure edges don't show during parallax
          // 1.12 -> 1.08
          const scrollScaleInfo = 1.12 - (scrollProgress * 0.04);
          const scaleVal = Math.max(1.08, scrollScaleInfo);

          // Vertical Parallax using transform 
          // Capped at 25px to stay strictly within the top overflow buffer provided by scale (buffer > 28px at 700h)
          const parallaxY = scrollProgress * 25;

          images.forEach((img, index) => {
            const slideX = (index * width) + finalX;
            const normalizedOffset = slideX / width;

            if (isMobile) {
              const cropShift = normalizedOffset * 35;
              // Mobile: Combine horizontal crop shift + scale + vertical parallax
              // Slightly higher scale for mobile crop safety
              img.style.transform = `translateX(${-cropShift}%) translateY(${parallaxY}px) scale(${scaleVal + 0.05})`;
              img.style.objectPosition = `50% 50%`;
            } else {
              const parallaxX = slideX * 0.25;
              // Desktop: Horizontal parallax + vertical parallax + scale
              img.style.transform = `translate3d(${-parallaxX}px, ${parallaxY}px, 0) scale(${scaleVal})`;

              const positionX = Math.max(15, Math.min(85, 50 - (normalizedOffset * 25)));
              img.style.objectPosition = `${positionX}% 50%`;
            }
          });
        }
      }
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

    const handleDragStart = (clientX: number) => {
      isDragging.current = true;
      startX.current = clientX;
      if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
      container.style.cursor = 'grabbing';
    };

    const handleDragMove = (clientX: number) => {
      if (!isDragging.current) return;
      const delta = (clientX - startX.current) * DRAG_MULTIPLIER;
      startX.current = clientX;
      position.current.target += delta;
    };

    const handleDragEnd = () => {
      isDragging.current = false;
      snapToNearestSlide();
      container.style.cursor = 'grab';
    };

    const onTouchStart = (e: TouchEvent) => handleDragStart(e.touches[0].clientX);
    const onTouchMove = (e: TouchEvent) => handleDragMove(e.touches[0].clientX);
    const onTouchEnd = () => handleDragEnd();
    const onMouseDown = (e: MouseEvent) => { e.preventDefault(); handleDragStart(e.clientX); };
    const onMouseMove = (e: MouseEvent) => { e.preventDefault(); handleDragMove(e.clientX); };
    const onMouseUp = () => handleDragEnd();
    const onMouseLeave = () => { if (isDragging.current) handleDragEnd(); };

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
    <section className="relative w-full z-0" style={{ height: '200vh', marginBottom: '-100vh' }}>
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        <div
          ref={heroWrapperRef}
          className="absolute inset-0 will-change-transform origin-center"
          style={{ clipPath: 'inset(0% 0% 0% 0% round 0px)' }}
        >
          <div
            ref={containerRef}
            className="relative h-full w-full overflow-hidden bg-background select-none cursor-grab active:cursor-grabbing"
          >
            <div
              ref={trackRef}
              className="flex h-full will-change-transform"
              // Width = (Originals + 2) * 100vw
              style={{ width: `${(IMAGES.length) * 100}vw` }}
            >
              {IMAGES.map((src, idx) => {
                return (
                  <div
                    key={idx}
                    className="flex-shrink-0 w-screen h-full relative overflow-hidden flex items-center justify-center border-r border-white/5 bg-[#0a0a0a]"
                  >
                    <div className="absolute inset-0 w-full h-full overflow-hidden">
                      <picture className="absolute inset-0 w-full h-full">
                        <source media="(max-width: 768px)" srcSet={getMobileSrc(src)} />
                        <img
                          src={src}
                          alt={SLIDE_DATA[idx].title}
                          className="hero-image w-full h-full object-cover will-change-transform scale-105"
                          draggable={false}
                        />
                      </picture>
                      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/20 z-10 pointer-events-none" />
                    </div>

                    <div className={`absolute top-28 left-0 w-full px-6 sm:px-12 md:px-24 text-left z-20 transition-opacity duration-1000 ${(idx === 0 && activeIndex === ORIG_IMAGES.length - 1) ||
                      (idx === IMAGES.length - 1 && activeIndex === 0) ||
                      (idx === activeIndex + 1)
                      ? "opacity-100 delay-300" : "opacity-0"
                      }`}>
                      <div className="max-w-xl">
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-[#F2F2F2]">
                          {SLIDE_DATA[idx].title}
                        </h2>
                        <p className="hidden md:block text-lg md:text-xl font-medium text-[#F2F2F2]/80 tracking-wide mt-3 max-w-lg">
                          {SLIDE_DATA[idx].subtitle}
                        </p>

                        <div className="hidden md:flex items-center gap-4 pt-8">
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

                    {/* Desktop Metric */}
                    <div className={`hidden md:block absolute bottom-32 right-24 z-20 text-right transition-all duration-1000 ease-out ${(idx === 0 && activeIndex === ORIG_IMAGES.length - 1) ||
                      (idx === IMAGES.length - 1 && activeIndex === 0) ||
                      (idx === activeIndex + 1)
                      ? "opacity-100 translate-y-0 delay-500" : "opacity-0 translate-y-8"}`}>
                      <div className="flex flex-col items-end">
                        <span className="text-6xl font-normal tracking-tighter text-[#F2F2F2] tabular-nums leading-none">
                          {SLIDE_DATA[idx].metric.value}
                        </span>
                        <span className="text-sm font-medium tracking-[0.2em] text-[#F2F2F2]/60 uppercase mt-2">
                          {SLIDE_DATA[idx].metric.label}
                        </span>
                      </div>
                    </div>

                    {/* Mobile Metric & CTA Combined */}
                    <div className={`md:hidden absolute bottom-24 left-6 right-6 z-20 flex justify-between items-start transition-all duration-1000 ease-out ${(idx === 0 && activeIndex === ORIG_IMAGES.length - 1) ||
                      (idx === IMAGES.length - 1 && activeIndex === 0) ||
                      (idx === activeIndex + 1)
                      ? "opacity-100 translate-y-0 delay-500" : "opacity-0 translate-y-8"}`}>

                      <Button
                        size="sm"
                        className="rounded-full h-10 px-6 text-sm bg-[#F2F2F2] text-black hover:bg-white transition-all font-semibold shadow-none border-none mt-1"
                        onClick={() => {
                          setSelectedModel("E-Velco Pro");
                          setEnquiryOpen(true);
                        }}
                      >
                        Reserve Now
                      </Button>

                      <div className="flex flex-col items-end text-right">
                        <span className="text-4xl font-normal tracking-tighter text-[#F2F2F2] tabular-nums leading-none">
                          {SLIDE_DATA[idx].metric.value}
                        </span>
                        <span className="text-sm font-medium tracking-[0.2em] text-[#F2F2F2]/60 uppercase mt-2">
                          {(() => {
                            const label = SLIDE_DATA[idx].metric.label;
                            if (label === "Water & Dust Rating") return <>Water &<br />Dust Rating</>;
                            if (label === "Battery Warranty") return <>Battery<br />Warranty</>;
                            // Fallback for other long labels
                            if (label.length > 15) {
                              const parts = label.split(" ");
                              const last = parts.pop();
                              return <>{parts.join(" ")}<br />{last}</>;
                            }
                            return label;
                          })()}
                        </span>
                      </div>
                    </div>

                  </div>
                )
              })}
            </div>

            <div className="absolute bottom-12 left-6 sm:left-12 z-20 flex gap-3">
              {ORIG_IMAGES.map((_, idx) => (
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
