import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, Zap, Shield, Smartphone, Globe, Cloud, BarChart3 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef, MouseEvent, useEffect } from "react";
import Image from "next/image";
import TestRideModal from "@/components/TestRideModal";

const mockModels = [
  {
    _id: "1",
    name: "Aerix Enduro",
    tagline: "Smart Wireless Controller (IP64)",
    price: "50,000",
    monthlyEmi: "2,399",
    images: ["https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_enduro_grey_large.png", "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_enduro_blue_large.png", "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_enduro_white_large.png"],
    range: 90,
    topSpeed: 45,
    color: "Grey"
  },
  {
    _id: "5",
    name: "Aerix Urban",
    tagline: "BLDC Hub Motor (IP67)",
    price: "60,000",
    monthlyEmi: "3,199",
    images: ["https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_urban_grey_large.png", "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_urban_white_large.png"],
    range: 90,
    topSpeed: 45,
    color: "Grey"
  },
  {
    _id: "2",
    name: "Aerix Glide",
    tagline: "BLDC Hub Motor (IP67)",
    price: "65,000",
    monthlyEmi: "2,599",
    images: ["https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_glide_blue_large.png", "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_glide_grey_large.png", "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_glide_white_large.png"],
    range: 90,
    topSpeed: 45,
    color: "Peacock Blue"
  },
  {
    _id: "6",
    name: "Aerix Titan",
    tagline: "Smart Wireless Controller (IP64)",
    price: "70,000",
    monthlyEmi: "3,299",
    images: ["https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_titan_white_large.png", "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_titan_gold_large.png"],
    range: 90,
    topSpeed: 45,
    color: "White"
  },

  {
    _id: "7",
    name: "Aerix Volt",
    tagline: "Smart Wireless Controller (IP64)",
    price: "85,000",
    monthlyEmi: "3,499",
    images: ["https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_volt_black_large.png"],
    range: 90,
    topSpeed: 45,
    color: "Black"
  },
  {
    _id: "3",
    name: "Aerix Prime",
    tagline: "Smart Wireless Controller (IP64)",
    price: "90,000",
    monthlyEmi: "2,799",
    images: ["https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_prime_orange_large.png", "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_prime_grey_large.png", "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_prime_white_large.png"],
    range: 90,
    topSpeed: 45,
    color: "Orange"
  },
  {
    _id: "4",
    name: "Aerix Ranger",
    tagline: "BLDC Hub Motor (IP67)",
    price: "100000",
    monthlyEmi: "2,999",
    images: ["https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_ranger_grey_large.png", "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_ranger_white_large.png", "https://pub-81175f420062419ca38eb19499a88ee5.r2.dev/images/aerix_range_black_large.png"],
    range: 90,
    topSpeed: 45,
    color: "Grey"
  },


];

const ProductCard = ({ model, onEnquireClick }: { model: typeof mockModels[0], onEnquireClick: (name: string, color?: string) => void }) => {
  const router = useRouter();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Drag scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Detect mobile for scroll-trigger focus behavior
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollPosition = scrollContainerRef.current.scrollLeft;
      const width = scrollContainerRef.current.offsetWidth;
      const index = Math.round(scrollPosition / width);
      setActiveImageIndex(index);
    }
  };

  const scrollToImage = (index: number) => {
    if (scrollContainerRef.current) {
      const width = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollTo({
        left: width * index,
        behavior: 'smooth'
      });
      setActiveImageIndex(index);
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e: MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX); // Natural 1:1 scroll
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col h-full"
    >
      <motion.div
        whileInView={isMobile ? "focused" : undefined}
        initial={isMobile ? "default" : undefined}
        variants={isMobile ? {
          default: {
            boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
            borderColor: "transparent"
          },
          focused: {
            boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
            borderColor: "rgba(0,0,0,0.05)",
            transition: { duration: 0.5, ease: "easeOut" }
          }
        } : {}}
        viewport={{ amount: 0.6, margin: "0px" }}
        className="relative flex flex-col h-full bg-white rounded-[2.5rem] p-3 transition-all duration-500 ease-out border shadow-sm hover:shadow-xl hover:border-black/5"
      >

        {/* Image Container - Product Frame */}
        <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden duration-500 ease-out">

          {/* Monthly EMI Badge */}
          <div className="absolute top-5 right-5 z-10">
            <Badge variant="secondary" className="backdrop-blur-md bg-white/70 hover:bg-white/90 text-foreground font-medium shadow-sm rounded-full px-3 py-1 border-0">
              {/* <span className="text-[10px] uppercase text-muted-foreground mr-1">EMI</span> */}
              ₹{model.monthlyEmi}/mo
            </Badge>
          </div>

          {/* Scrollable Image Area */}
          <div
            ref={scrollContainerRef}
            className={`w-full h-full flex overflow-x-auto scrollbar-hide items-center ${isDragging ? 'cursor-grabbing snap-none' : 'cursor-grab snap-x snap-mandatory'}`}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollBehavior: isDragging ? 'auto' : 'smooth'
            }}
          >
            {model.images.map((img, idx) => (
              <div key={idx} className="min-w-full h-full flex items-center justify-center snap-center p-0 md:px-4 md:pt-4 pointer-events-none select-none relative">
                <Image
                  src={img}
                  alt={`${model.name} view ${idx + 1}`}
                  fill
                  className="object-cover rounded-[1.8rem] shadow-sm transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  draggable={false}
                  priority={idx === 0}
                  quality={85}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          {model.images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
              {model.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollToImage(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${idx === activeImageIndex
                    ? "w-6 bg-white"
                    : "w-1.5 bg-gray-300/80 hover:bg-gray-200"
                    }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* content */}
        <div className="flex flex-col flex-1 px-5 pt-5 pb-4">
          {/* Header */}
          <div className="">
            <h3 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              {model.name}
            </h3>
            {/* <p className="text-sm text-muted-foreground line-clamp-1">{model.tagline}</p> */}
          </div>

          {/* Spacer to push actions to bottom */}
          <div className="flex-1" />

          {/* Separation Line */}
          <div className="h-px w-full bg-border/40 my-4" />

          {/* Footer: Price & Actions Inline */}
          <div className="flex items-center justify-between gap-2 md:gap-4">
            {/* Price section aligned left */}
            <div className="flex flex-col shrink-0">
              <p className="text-[9px] md:text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Starting at</p>
              <span className="text-base md:text-lg font-bold text-foreground">₹ {model.price}</span>
            </div>

            {/* Actions aligned right */}
            <div className="flex items-center gap-1.5 md:gap-2 overflow-x-auto">
              <Button
                variant="ghost"
                className="h-9 md:h-10 px-2.5 md:px-4 text-xs md:text-sm font-semibold hover:bg-black/5 rounded-xl text-muted-foreground hover:text-foreground transition-colors duration-500 ease-out"
                onClick={() => onEnquireClick(model.name.toUpperCase(), (model as any).color)}
              >
                Enquire
              </Button>
              <Button
                className="h-9 md:h-10 px-4 md:px-6 text-xs md:text-sm font-semibold shadow-md shadow-primary/20 rounded-xl"
                onClick={() => router.push(`/product/${model._id}`)}
              >
                Explore
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

};


const MagicalCard = ({ title, description, icon: Icon }: { title: string, description: string, icon: any }) => {
  return (
    <div className="magical-card group/card relative h-64 rounded-xl">
      {/* Outer Div / Border layer - using explicit dark hex for visibility safety */}
      <div
        className="absolute inset-0 bg-[#262626] rounded-xl transition-colors duration-300 group-hover/card:bg-[#404040]"
      >
        {/* The Glow Gradient Element - Revealed on Grid Hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(800px circle at var(--x) var(--y), rgba(255,255,255,0.2), transparent 40%)`
          }}
        />
      </div>

      {/* Inner Div / Content Content */}
      <div className="absolute inset-[1px] bg-[#101010] rounded-[11px] flex flex-col justify-end p-6 relative z-10 transition-colors duration-300 overflow-hidden">
        {/* Inner Glow - only on this card's hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at var(--x) var(--y), rgba(255,255,255,0.1), transparent 40%)`
          }}
        />

        <div className="mb-auto relative z-20">
          <div className="p-3 bg-white/5 rounded-lg w-fit backdrop-blur-sm border border-white/10 group-hover/card:bg-white/10 transition-colors">
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>

        <h4 className="text-lg font-bold text-white mb-2 relative z-20 translate-y-2 group-hover/card:translate-y-0 transition-transform duration-300">{title}</h4>
        <p className="text-neutral-400 text-sm relative z-20 opacity-0 group-hover/card:opacity-100 translate-y-4 group-hover/card:translate-y-0 transition-all duration-300 ease-out">
          {description}
        </p>
      </div>
    </div>
  )
}

const MagicalEffectsGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const cards = container.getElementsByClassName("magical-card");
      for (const card of cards) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty("--x", `${x}px`);
        (card as HTMLElement).style.setProperty("--y", `${y}px`);
      }
    };

    // Listen on the window or a large container to ensure smooth tracking even when crossing gaps?
    // Actually tracking on the grid container is standard for this effect unless the gaps are huge.
    container.addEventListener("mousemove", handleMouseMove as any);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove as any);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto group"
    >
      {features.map((item, i) => (
        <MagicalCard key={i} {...item} />
      ))}
    </div>
  );
};

const features = [
  { icon: Zap, title: "Super Fast Charging", description: "Charge up to 80% in just 45 minutes with our hyper-charge technology." },
  { icon: Shield, title: "Advanced Safety", description: "Rated 5-star safety with collision detection and anti-theft tracking." },
  { icon: Smartphone, title: "Smart Connectivity", description: "Seamlessly connect with your phone for navigation and diagnostics." },
  { icon: Globe, title: "Eco-Friendly", description: "Zero emissions, 100% recyclable materials, building a greener future." },
  { icon: Cloud, title: "Cloud Updates", description: "Over-the-air software updates to keep your ride optimized." },
  { icon: BarChart3, title: "Performance Analytics", description: "Track your rides, efficiency, and battery health in real-time." },
];

export default function ProductGrid() {
  const models = mockModels;
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  const handleEnquiryClick = (modelName: string, color?: string) => {
    setSelectedModel(modelName);
    setSelectedColor(color || "");
    setEnquiryOpen(true);
  };

  return (
    <section id="products" className="pt-24 pb-8 bg-[#F8F9FA] relative z-10 text-foreground">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium rounded-full bg-white text-primary shadow-sm border-white/20">
            Our Collection
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Designed for <span className="text-primary">Every Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground/80 max-w-2xl mx-auto">
            Experience the future of mobility with our premium electric scooters.
            Engineered for performance, styled for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
          {models.map((model) => (
            <ProductCard
              key={model._id}
              model={model}
              onEnquireClick={handleEnquiryClick}
            />
          ))}
        </div>

        {/* New Magical Effects Grid Section */}
        {/*  */}
      </div>

      <TestRideModal
        open={enquiryOpen}
        onOpenChange={setEnquiryOpen}
        preSelectedModel={selectedModel}
        preSelectedColor={selectedColor}
        isEnquiry={true}
      />
    </section >
  );
}