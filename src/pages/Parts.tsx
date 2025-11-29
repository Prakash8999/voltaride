// import { motion } from "framer-motion";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { ShieldCheck, Zap, Package, Star } from "lucide-react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { useState } from "react";
// import ContactUsModal from "@/components/ContactUsModal";
// import motor from "@/assets/motor.png";
// import controller from "@/assets/wirelesscontroller.png";
// import battery from "@/assets/battery.png";
// import charger from "@/assets/charger.png";
// import nfc from "@/assets/nfc.png";
// import tft from "@/assets/tftdisplay.jpg";
// import tyre from "@/assets/tyres.png";
// import cruise from "@/assets/cruisecontrol.png";
// import chargerport from "@/assets/cover.png";
// const partsData = [
//   {
//     "id": 1,
//     "name": "BLDC Hub Motor (Waterproof IP67)",
//     "info": "High-efficiency 12″ BLDC hub motor with IP67 waterproofing for superior torque and silent performance.",
//     "price": "₹8,999",
//     "warranty_years": 3,
//     "image": motor
//   },
//   {
//     "id": 2,
//     "name": "Smart Wireless Controller (IP64)",
//     "info": "Advanced smart controller with waterproof IP64 rating. Offers smooth throttle response and regenerative braking.",
//     "price": "₹4,499",
//     "warranty_years": 2,
//     "image": controller
//   },
//   {
//     "id": 3,
//     "name": "Lithium-Ion Battery Pack (72V 32AH)",
//     "info": "Long-range NMC battery with intelligent BMS protection for stable performance and fast charging support.",
//     "price": "₹21,999",
//     "warranty_years": 5,
//     "image": battery
//   },
//   {
//     "id": 4,
//     "name": "Waterproof Battery Charger (3A / 5A / 6A / 8A)",
//     "info": "Fast and efficient waterproof charger compatible with all Electro Vive scooter models.",
//     "price": "₹2,999",
//     "warranty_years": 1,
//     "image": charger
//   },
// //   {
// //     "id": 5,
// //     "name": "Regenerative Braking System",
// //     "info": "Smart braking technology that recovers energy during deceleration, improving efficiency and battery life.",
// //     "price": "₹3,499",
// //     "warranty_years": 2,
// //     "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
// //   },
//   {
//     "id": 6,
//     "name": "NFC Smart Key System",
//     "info": "Advanced NFC-based keyless entry system with anti-theft alarm and reverse gear assist.",
//     "price": "₹1,999",
//     "warranty_years": 1,
//     "image": nfc
//   },
//   {
//     "id": 7,
//     "name": "Digital TFT Dashboard",
//     "info": "Full-color display showing speed, range, GPS, and diagnostics — optimized for day and night visibility.",
//     "price": "₹6,499",
//     "warranty_years": 2,
//     "image": tft
//   },
//   {
//     "id": 8,
//     "name": "Tubeless Tyres",
//     "info": "Durable and high-grip tubeless tyres designed for stability and comfort on Indian roads.",
//     "price": "₹1,499",
//     "warranty_years": 1,
//     "image": tyre
//   },
//   {
//     "id": 9,
//     "name": "Cruise Control System",
//     "info": "Smart throttle control system that maintains a steady speed for a relaxed and efficient ride.",
//     "price": "₹2,499",
//     "warranty_years": 1,
//     "image": cruise
//   },
//   {
//     "id": 10,
//     "name": "EV Smart Charger Port with Cover",
//     "info": "Waterproof charging port with LED indicator and secure locking cover for safe connections.",
//     "price": "₹899",
//     "warranty_years": 1,
//     "image": chargerport
//   }
// ];

// const Parts = () => {

//   const [contactUsModalOpen, setContactUsModalOpen] = useState(false);


// 	return (
//     <div className="min-h-screen bg-background">
//       <Header />
      
//       {/* Hero Section */}
//       <section className="relative pt-32 pb-16 overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
//         <div className="container-custom relative">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center max-w-3xl mx-auto"
//           >
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border mb-6">
//               <Package className="w-4 h-4 text-primary" />
//               <span className="text-sm font-medium">Premium EV Parts</span>
//             </div>
//             <h1 className="text-4xl md:text-6xl font-bold mb-6">
//               <span className="gradient-text">Premium Parts</span>
//               <br />
//               for Your Electric Ride
//             </h1>
//             <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
//               Discover our extensive collection of high-quality electric vehicle parts and accessories. 
//               Built for performance, reliability, and longevity.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Parts Grid Section */}
//       <section className="py-16">
//         <div className="container-custom">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {partsData.map((part, index) => (
//               <motion.div
//                 key={part.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//               >
//                 <Card className="h-full group overflow-hidden backdrop-blur-xl bg-background/50 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
//                   <div className="relative w-full h-48 flex items-center justify-center bg-white rounded-md overflow-hidden">
//   <img
//     src={part.image}
//     alt={part.name}
//     className="max-h-full max-w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
//   />
// </div>

//                   <CardHeader className="pb-3">
//                     <CardTitle className="text-lg font-semibold leading-tight">
//                       {part.name}
//                     </CardTitle>
//                   </CardHeader>
                  
//                   <CardContent className="space-y-4">
//                     <p className="text-sm text-muted-foreground leading-relaxed">
//                       {part.info}
//                     </p>
                    
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <span className="text-2xl font-bold text-primary">
//                           {part.price}
//                         </span>
//                       </div>
//                                               {part.warranty_years}Y Warranty

//                     </div>
// {/*                     
//                     <div className="flex gap-2 pt-2">
//                       <Button 
//                         variant="outline" 
//                         size="sm" 
//                         className="flex-1 border-primary/20 hover:bg-primary/5"
//                       >
//                         <Zap className="w-4 h-4 mr-2" />
//                         Quick View
//                       </Button>
//                       <Button 
//                         size="sm" 
//                         className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
//                       >
//                         Add to Cart
//                       </Button>
//                     </div> */}
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10" />
//         <div className="container-custom relative">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center max-w-2xl mx-auto"
//           >
//             <h2 className="text-3xl md:text-4xl font-bold mb-6">
//               Need Help Finding the Right Part?
//             </h2>
//             <p className="text-lg text-muted-foreground mb-8">
//               Our experts are here to help you choose the perfect parts for your electric vehicle. 
//               Get personalized recommendations and technical support.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Button size="lg" className="px-8" onClick={() => setContactUsModalOpen(true)}>
//                 <Package className="w-5 h-5 mr-2" />
//                 Contact Parts Expert
//               </Button>
            
//             </div>
//           </motion.div>
//         </div>
//       </section>
//       <ContactUsModal isOpen={contactUsModalOpen} onClose={() => setContactUsModalOpen(false)} />

//       <Footer />
//     </div>
//   );
// };

// export default Parts;