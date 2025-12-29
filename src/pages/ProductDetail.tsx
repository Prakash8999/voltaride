import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Zap, Gauge, Lightbulb, Cpu, CircleDot, Battery, Shield, Check } from "lucide-react";
import React, { useState, useEffect, useRef, useCallback } from "react";
import TestRideModal from "@/components/TestRideModal";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

const productData = [
  {
    id: "1",
    name: "AERIX ENDURO",
    motor: "1000W",
    speed: "45-50 km/h",
    colors: ["Red", "White", "Grey", "Peacock Blue", "Black"],
    controller: "32A 12tube",
    wheels: "10 Inch",
    headlights: "LED Headlight",
    meter: "Color Digital Instrument",
    brake: "Front Disc / Rear Drum",
    images: {
      Grey: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_enduro_grey_large.png",
      "Peacock Blue": "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_enduro_blue_large.png",
      White: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_enduro_white_large.png"
    },
    price: "60,000"
  },
  {
    id: "2",
    name: "AERIX GLIDE",
    motor: "1000W",
    speed: "45-50 km/h",
    colors: ["Red", "White", "Grey", "Peacock Blue", "Black"],
    controller: "32A 12TUBE",
    wheels: "10 Inch",
    headlights: "LED Headlight",
    meter: "Color Digital Instrument",
    brake: "Front Disc / Rear Drum",
    images: {
      Grey: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_glide_grey_large.png",
      "Peacock Blue": "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_glide_blue_large.png",
      White: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_glide_white_large.png"
    },
    price: "65,000"
  },
  {
    id: "3",
    name: "AERIX PRIME",
    motor: "1200W",
    speed: "55 km/h",
    colors: ["Orange", "White", "Grey", "Peacock Blue", "Black"],
    controller: "60/72V 38A 15TUBE",
    wheels: "12 Inch",
    headlights: "LED Headlight",
    meter: "Color Digital Instrument",
    brake: "Front Disc / Rear Drum",
    images: {
      Orange: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_prime_orange_large.png",
      Grey: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_prime_grey_large.png",
      White: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_prime_white_large.png"
    },
    price: "90,000"
  },
  {
    id: "4",
    name: "AERIX RANGER",
    motor: "1200W",
    speed: "55 km/h",
    colors: ["Grey", "White", "Black", "Peacock Blue", "Black"],
    controller: "38A 15TUBE",
    wheels: "12 Inch",
    headlights: "LED Headlight",
    meter: "Color Digital Instrument",
    brake: "Front Disc / Rear Drum",
    images: {
      Grey: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_ranger_grey_large.png",
      White: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_ranger_white_large.png",
      Black: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_range_black_large.png"
    },
    price: "1,00,000"
  },
  {
    id: "5",
    name: "AERIX URBAN",
    motor: "1000W",
    speed: "45-50 km/h",
    colors: ["Red", "White", "Grey", "Peacock Blue", "Black"],
    controller: "32A 12TUBE",
    wheels: "10 Inch",
    headlights: "LED Headlight",
    meter: "Color Digital Instrument",
    brake: "Front Disc / Rear Drum",
    images: {
      Grey: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_urban_grey_large.png",
      White: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_urban_white_large.png"
    },
    price: "60,000"
  },
  {
    id: "6",
    name: "AERIX TITAN",
    motor: "1000W",
    speed: "45-50 km/h",
    colors: ["Red", "White", "Grey", "Metallic Gold", "Black"],
    controller: "32A 12TUBE",
    wheels: "10 Inch",
    headlights: "LED Headlight",
    meter: "Color Digital Instrument",
    brake: "Front Disc / Rear Drum",
    images: {
      White: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_titan_white_large.png",
      "Metallic Gold": "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_titan_gold_large.png"
    },
    price: "70,000"
  },
  {
    id: "7",
    name: "AERIX VOLT",
    motor: "1200W",
    speed: "50 km/h",
    colors: ["Black", "White", "Grey"],
    controller: "32A 12TUBE",
    wheels: "14 Inch",
    headlights: "LED Headlight",
    meter: "Color Digital Instrument",
    brake: "Front Disc / Rear Drum",
    images: {
      Black: "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_volt_black_large.png"
    },
    price: "85,000"
  }
];

// Linear interpolation for smooth inertia
const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

// Easing function for premium feel
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>("");

  const product = productData.find(p => p.id === id);

  // Scroll to top on id change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Physics State and Refs for Carousel
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const position = useRef({ current: 0, target: 0 });
  const isDragging = useRef(false);
  const startX = useRef(0);
  const animationFrameId = useRef<number>();
  const wheelTimeout = useRef<NodeJS.Timeout>();
  const initialized = useRef(false);
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const imageElementsRef = useRef<NodeListOf<HTMLImageElement> | null>(null);
  const verticalScroll = useRef(0);

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Configuration
  const DRAG_MULTIPLIER = 2.0;
  const WHEEL_MULTIPLIER = 1.6;
  const EASE = 0.08;

  // Prepare carousel data
  const availableColors = product ? product.colors.filter(c => c in product.images) : [];

  // Create slides using available colors
  const slidesSource = availableColors.length > 0 ? availableColors : [];

  const featureList = [
    { value: product?.motor, label: "Powerful Motor" },
    { value: "Digital", label: "LED Dashboard" },
    { value: product?.speed, label: "Top Speed" },
    { value: product?.wheels, label: "Premium Wheels" },
    { value: "Disc/Drum", label: "Safety Brakes" }
  ];

  const origSlides = slidesSource.map((color, idx) => ({
    image: product?.images[color as keyof typeof product.images],
    title: product?.name || "Product",
    subtitle: `${color} Edition`,
    feature: featureList[idx % featureList.length],
    color: color,
    id: `${color}-${idx}`
  }));

  // Extended slides for infinite loop: [Last, ...Originals, First]
  const slides = [
    origSlides[origSlides.length - 1],
    ...origSlides,
    origSlides[0]
  ];

  // Initialize position
  useEffect(() => {
    if (!initialized.current && slides.length > 2) {
      const width = window.innerWidth;
      position.current.current = -width; // Start at index 1
      position.current.target = -width;
      initialized.current = true;
    }
  }, [slides.length]);

  const getSlideWidth = () => window.innerWidth;

  const goToSlide = useCallback((realIndex: number) => {
    const width = getSlideWidth();
    const extendedIndex = realIndex + 1;
    position.current.target = -(extendedIndex * width);
  }, []);

  const snapToNearestSlide = useCallback(() => {
    const width = getSlideWidth();
    let snapTarget = Math.round(position.current.target / width) * width;
    position.current.target = snapTarget;
  }, []);

  useEffect(() => {
    if (trackRef.current) {
      imageElementsRef.current = trackRef.current.querySelectorAll('.hero-image');
    }
  }, [product, slides]);

  const animate = useCallback(() => {
    // Safety check
    if (!product || slides.length <= 2) return;

    const width = getSlideWidth();
    const isMobileDevice = width < 768;

    // 1. Interpolate Horizontal
    position.current.current = lerp(position.current.current, position.current.target, EASE);

    // 2. Vertical Scroll Physics
    const targetScrollY = window.scrollY;
    verticalScroll.current = lerp(verticalScroll.current, targetScrollY, 0.07);

    // 3. Pinned Hero Interactions
    if (heroWrapperRef.current) {
      heroWrapperRef.current.style.clipPath = `inset(0px 0px 0px 0px)`;
      heroWrapperRef.current.style.transform = `none`;
    }

    // 4. Infinite Loop Warp
    const x = position.current.current;
    const totalRealSlides = origSlides.length;

    if (x >= -0.01) {
      const resetX = -(totalRealSlides * width);
      position.current.current = resetX;
      position.current.target = resetX + (position.current.target - x);
    } else if (x <= -((totalRealSlides + 1) * width) + 0.01) {
      const resetX = -width;
      position.current.current = resetX;
      position.current.target = resetX + (position.current.target - x);
    }

    // Render
    if (trackRef.current) {
      const finalX = position.current.current;
      trackRef.current.style.transform = `translate3d(${finalX}px, 0, 0)`;

      const rawIndex = Math.abs(finalX / width);
      let realIndex = Math.round(rawIndex) - 1;
      if (realIndex < 0) realIndex = totalRealSlides - 1;
      if (realIndex >= totalRealSlides) realIndex = 0;

      if (realIndex !== activeIndex) {
        setActiveIndex(realIndex);
        if (origSlides[realIndex]) {
          setSelectedColor(origSlides[realIndex].color);
        }
      }

      // Parallax & Scale
      let images = imageElementsRef.current;
      if (!images && trackRef.current) {
        images = trackRef.current.querySelectorAll('.hero-image');
        imageElementsRef.current = images as NodeListOf<HTMLImageElement>;
      }

      if (images) {
        const scrollProgress = Math.min(Math.max(verticalScroll.current / window.innerHeight, 0), 1);
        const scrollScaleInfo = 1.12 - (scrollProgress * 0.04);
        const scaleVal = Math.max(1.08, scrollScaleInfo);
        const parallaxY = scrollProgress * 25;

        images.forEach((img, index) => {
          const slideX = (index * width) + finalX;
          const normalizedOffset = slideX / width;

          if (isMobileDevice) {
            const cropShift = normalizedOffset * 35;
            // Mobile: Fixed scale to prevent uneven zooming sensation during scroll
            img.style.transform = `translateX(${-cropShift}%) translateY(${parallaxY}px) scale(1.15)`;
            img.style.objectPosition = `50% 50%`;
          } else {
            const parallaxX = slideX * 0.25;
            img.style.transform = `translate3d(${-parallaxX}px, ${parallaxY}px, 0) scale(${scaleVal})`;
            const positionX = Math.max(15, Math.min(85, 50 - (normalizedOffset * 25)));
            img.style.objectPosition = `${positionX}% 50%`;
          }
        });
      }
    }

    animationFrameId.current = requestAnimationFrame(animate);

  }, [activeIndex, origSlides, product, slides.length]);

  useEffect(() => {
    animationFrameId.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [animate]);

  // Event Listeners
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


  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Product Not Found</h1>
          <Button onClick={() => navigate("/")} className="rounded-full">Return Home</Button>
        </div>
      </div>
    );
  }

  // Handle case with no images
  if (origSlides.length === 0) {
    // Fallback to simple view if no images
    return (
      <div className="min-h-screen bg-neutral-100 font-sans selection:bg-primary/10">
        <Header forceTransparent={true} />
        <main className="pt-32 pb-12 container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="mt-4">Images coming soon.</p>
          <Button onClick={() => navigate("/")} className="mt-8">Back</Button>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-100 font-sans selection:bg-primary/10">
      <Header forceTransparent={true} />

      {/* FULL SCREEN CAROUSEL SECTION */}
      <section className="relative w-full h-screen z-0">
        <div className="relative h-full w-full overflow-hidden">
          {/* Back Button Overlay */}
          <div className="absolute top-24 left-6 sm:left-12 z-50 pointer-events-none">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-white/80 hover:text-white pointer-events-auto transition-colors"
            >
              <ArrowLeft className="w-5 h-5 shadow-sm" />
              <span className="font-medium shadow-sm text-shadow">Back</span>
            </motion.button>
          </div>

          <div
            ref={heroWrapperRef}
            className="absolute inset-0 will-change-transform origin-center"
            style={{ clipPath: 'inset(0% 0% 0% 0% round 0px)' }}
          >
            <div
              ref={containerRef}
              className="relative h-full w-full overflow-hidden bg-zinc-900 select-none cursor-grab active:cursor-grabbing"
            >
              <div
                ref={trackRef}
                className="flex h-full will-change-transform"
                style={{ width: `${(slides.length) * 100}vw` }}
              >
                {slides.map((slide, idx) => (
                  <div
                    key={idx}
                    className="flex-shrink-0 w-screen h-full relative overflow-hidden flex items-center justify-center border-r border-white/5 bg-[#0a0a0a]"
                  >
                    <div className="absolute inset-0 w-full h-full overflow-hidden">
                      <img
                        src={slide?.image}
                        alt={slide?.title}
                        className="hero-image w-full h-full object-cover will-change-transform scale-105"
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/40 z-10 pointer-events-none" />
                    </div>

                    {/* Content Overlay */}
                    <div className={`absolute bottom-24 md:bottom-auto md:top-1/2 md:-translate-y-1/2 left-0 w-full px-6 sm:px-12 md:px-24 text-left z-20 transition-opacity duration-1000 ${(idx === 0 && activeIndex === origSlides.length - 1) ||
                      (idx === slides.length - 1 && activeIndex === 0) ||
                      (idx === activeIndex + 1)
                      ? "opacity-100 delay-300" : "opacity-0"
                      }`}>
                      <div className="max-w-xl">
                        <Badge className="mb-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border-none px-3 py-1">
                          {slide?.color}
                        </Badge>
                        <h2 className="hidden md:block text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-2">
                          {slide?.title}
                        </h2>
                        <p className="hidden md:block text-xl text-white/80 font-medium mb-8">
                          {slide?.subtitle}
                        </p>

                        <div className="hidden md:flex flex-col sm:flex-row gap-4">
                          <Button
                            size="lg"
                            className="rounded-full px-8 h-12 text-base bg-white text-black hover:bg-gray-200 border-none font-bold"
                            onClick={() => setEnquiryOpen(true)}
                          >
                            Book Test Ride
                          </Button>
                          <Button
                            size="lg"
                            variant="outline"
                            className="rounded-full px-8 h-12 text-base text-white border-white/30 hover:bg-white/10 hover:text-white bg-transparent"
                            onClick={() => {
                              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                          >
                            Learn More
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Metric Overlay */}
                    <div className={`absolute bottom-32 right-6 sm:right-12 md:right-24 z-20 text-right transition-all duration-1000 ease-out ${(idx === 0 && activeIndex === origSlides.length - 1) ||
                      (idx === slides.length - 1 && activeIndex === 0) ||
                      (idx === activeIndex + 1)
                      ? "opacity-100 translate-y-0 delay-500" : "opacity-0 translate-y-8"
                      }`}>
                      <div className="flex flex-col items-end">
                        <span className="text-4xl md:text-6xl font-normal tracking-tighter text-white tabular-nums leading-none">
                          {slide?.feature.value}
                        </span>
                        <span className="text-sm font-medium tracking-[0.2em] text-white/60 uppercase mt-2">
                          {slide?.feature.label}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Dots */}
              <div className="absolute bottom-12 left-6 sm:left-12 z-20 flex gap-3">
                {origSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-500 shadow-sm ${idx === activeIndex % origSlides.length ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
                      }`}
                    aria-label={`Go to color ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Buttons Section - Below Image */}
      <div className="md:hidden px-6 pt-6 pb-8 bg-white space-y-6">
        <div>
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <Badge variant="secondary" className="bg-neutral-100 text-neutral-800 border-none">
              {product.colors.length} Colors
            </Badge>
          </div>
          <p className="text-xl font-bold text-primary mt-1">Starting at ₹{product.price}</p>
        </div>

        <div className="space-y-3">
          <Button
            size="lg"
            className="w-full h-14 text-lg rounded-xl bg-black text-white hover:bg-neutral-800 shadow-lg"
            onClick={() => setEnquiryOpen(true)}
          >
            Book Test Ride
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full h-14 text-lg rounded-xl border-neutral-200 hover:bg-neutral-50"
            onClick={() => {
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Learn More
          </Button>
        </div>
      </div>

      {/* Main Content Below Hero */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 bg-neutral-100 pt-16">

        {/* Key Features Section */}
        <motion.div
          id="features"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Engineered for Excellence
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Premium components and cutting-edge technology for an unparalleled riding experience
            </p>
            <div className="mt-6 inline-flex items-center gap-3 bg-white px-8 py-4 rounded-full shadow-sm border border-gray-100">
              <span className="text-gray-500 font-medium uppercase tracking-wide text-sm">Starting Price</span>
              <span className="text-3xl font-bold text-primary">₹{product.price}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Motor Power */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative p-8 bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 group"
            >
              <div className="absolute -top-5 left-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Powerful Motor</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.motor} motor delivers exceptional acceleration and smooth performance for city commuting and beyond.
                </p>
              </div>
            </motion.div>

            {/* Speed & Performance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative p-8 bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 group"
            >
              <div className="absolute -top-5 left-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Gauge className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Top Speed</h3>
                <p className="text-gray-600 leading-relaxed">
                  Reach speeds up to {product.speed}, perfectly balanced for urban mobility and highway safety standards.
                </p>
              </div>
            </motion.div>

            {/* Safety Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative p-8 bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 group"
            >
              <div className="absolute -top-5 left-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Advanced Braking</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.brake} system ensures precise stopping power and enhanced safety in all riding conditions.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Technical Specifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Technical Specifications</h2>
            <div className="h-px bg-gray-200 flex-1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SpecCard icon={<Cpu />} label="Controller" value={product.controller} />
            <SpecCard icon={<CircleDot />} label="Wheels" value={product.wheels} />
            <SpecCard icon={<Shield />} label="Braking System" value={product.brake} />
            <SpecCard icon={<Lightbulb />} label="Headlights" value={product.headlights} />
            <SpecCard icon={<Gauge />} label="Dashboard" value={product.meter} />
            <SpecCard icon={<Zap />} label="Motor Type" value={product.motor} />
          </div>
        </motion.div >

      </main >

      <TestRideModal
        open={enquiryOpen}
        onOpenChange={setEnquiryOpen}
        preSelectedModel={product.name}
        isEnquiry={true}
      />

      <Footer />
    </div >
  );
}

function SpecCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center gap-5 p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-lg hover:border-primary/10 transition-all duration-300 group">
      <div className="p-4 rounded-xl bg-gray-50 text-gray-500 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
        {React.cloneElement(icon as React.ReactElement, { className: "w-6 h-6" })}
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-1">{label}</p>
        <p className="text-lg font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
