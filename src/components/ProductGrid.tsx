import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef, MouseEvent } from "react";
import TestRideModal from "@/components/TestRideModal";

const mockModels = [
  {
    _id: "4",
    name: "GTR+",
    tagline: "Smart Wireless Controller (IP64)",
    price: "50,000",
    monthlyEmi: "2,399",
    images: ["https://i.ibb.co/DD9W8yNQ/gtr.png", "https://i.ibb.co/DD9W8yNQ/gtr.png", "https://i.ibb.co/DD9W8yNQ/gtr.png"],
    range: 90,
    topSpeed: 45,
  },
  {
    _id: "5",
    name: "Cruiser",
    tagline: "BLDC Hub Motor (IP67)",
    price: "56,000",
    monthlyEmi: "2,599",
    images: ["https://i.ibb.co/FkDgWfCg/cruiser.png", "https://i.ibb.co/FkDgWfCg/cruiser.png", "https://i.ibb.co/FkDgWfCg/cruiser.png"],
    range: 90,
    topSpeed: 45,
  },
  {
    _id: "6",
    name: "Sharvil",
    tagline: "Smart Wireless Controller (IP64)",
    price: "60,000",
    monthlyEmi: "2,799",
    images: ["https://i.ibb.co/twnXPwFD/shravil.png"],
    range: 90,
    topSpeed: 45,
  },
  {
    _id: "7",
    name: "Spimri",
    tagline: "BLDC Hub Motor (IP67)",
    price: "65,000",
    monthlyEmi: "2,999",
    images: ["https://i.ibb.co/RkwzC5zx/spimri.png"],
    range: 90,
    topSpeed: 45,
  },
  {
    _id: "8",
    name: "E-Velco Pro",
    tagline: "BLDC Hub Motor (IP67)",
    price: "64,000",
    monthlyEmi: "3,199",
    images: ["https://i.ibb.co/RkVZSKVG/velco.png", "https://i.ibb.co/RkVZSKVG/velco.png", "https://i.ibb.co/RkVZSKVG/velco.png"],
    range: 90,
    topSpeed: 45,
  },
  {
    _id: "9",
    name: "Aurra Pro",
    tagline: "Smart Wireless Controller (IP64)",
    price: "70,000",
    monthlyEmi: "3,299",
    images: ["https://i.ibb.co/7dYJmTsy/aurra-pro.png", "https://i.ibb.co/7dYJmTsy/aurra-pro.png", "https://i.ibb.co/7dYJmTsy/aurra-pro.png"],
    range: 90,
    topSpeed: 45,
  },
  {
    _id: "10",
    name: "Aerix Loader",
    tagline: "Smart Wireless Controller (IP64)",
    price: "75,000",
    monthlyEmi: "3,499",
    images: ["https://i.ibb.co/0jMsSWn3/loader.png", "https://i.ibb.co/0jMsSWn3/loader.png", "https://i.ibb.co/0jMsSWn3/loader.png"],
    range: 90,
    topSpeed: 45,
  },
];

const ProductCard = ({ model, onEnquireClick }: { model: typeof mockModels[0], onEnquireClick: (name: string) => void }) => {
  const navigate = useNavigate();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Drag scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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
    const walk = (x - startX) * 2; // Scroll-fast multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col h-full"
    >
      <div className="relative flex flex-col h-full bg-white rounded-[2.5rem] p-3 shadow-sm hover:shadow-xl transition-all duration-500 ease-out border border-transparent hover:border-black/5">

        {/* Image Container - Product Frame */}
        <div className="relative w-full aspect-[4/3] bg-[#F4F4F5] rounded-[2rem] overflow-hidden duration-500 ease-out">

          {/* Monthly EMI Badge */}
          <div className="absolute top-3 right-3 z-10">
            <Badge variant="secondary" className="backdrop-blur-md bg-white/60 hover:bg-white/90 text-foreground font-medium shadow-sm rounded-full px-3 py-1 border-0">
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
              <div key={idx} className="min-w-full h-full flex items-center justify-center snap-center p-8 pointer-events-none select-none">
                <img
                  src={img}
                  alt={`${model.name} view ${idx + 1}`}
                  className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-105"
                  draggable={false}
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
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeImageIndex
                    ? "w-6 bg-primary"
                    : "w-1.5 bg-black/10 hover:bg-black/20"
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
          <div className="flex items-center justify-between gap-4">
            {/* Price section aligned left */}
            <div className="flex flex-col">
              <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Starting at</p>
              <span className="text-lg font-bold text-foreground">₹ {model.price}</span>
            </div>

            {/* Actions aligned right */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="h-10 px-4 text-sm font-semibold hover:bg-black/5 rounded-xl text-muted-foreground hover:text-foreground transition-colors duration-500 ease-out"
                onClick={() => onEnquireClick(model.name)}
              >
                Enquire
              </Button>
              <Button
                className="h-10 px-6 font-semibold shadow-md shadow-primary/20 rounded-xl text-sm"
                onClick={() => navigate(`/product/${model._id}`)}
              >
                Explore
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ProductGrid() {
  const models = mockModels;
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>("");

  const handleEnquiryClick = (modelName: string) => {
    setSelectedModel(modelName);
    setEnquiryOpen(true);
  };

  return (
    <section id="products" className="py-24 bg-[#F8F9FA] relative z-10 text-foreground">
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
      </div>

      <TestRideModal
        open={enquiryOpen}
        onOpenChange={setEnquiryOpen}
        preSelectedModel={selectedModel}
        isEnquiry={true}
      />
    </section>
  );
}