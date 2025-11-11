import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";

export default function ComparisonMatrix() {
  const comparisonData = [
    { feature: "Range (km)", eVelcoPro: "70-110", electroViveLoader: "70-110", spimri: "70-110", aurraPro: "70-110", cruiser: "70-110", shravil: "70-110", ninjaPlus: "50-75", gtrPlus: "70-110", ninjaMini: "70-110", ninja2G: "70-110" },
    { feature: "Waterproof Motor (IP67)", eVelcoPro: true, electroViveLoader: true, spimri: true, aurraPro: true, cruiser: true, shravil: true, ninjaPlus: true, gtrPlus: true, ninjaMini: true, ninja2G: true },
    { feature: "Smart Controller (IP64)", eVelcoPro: true, electroViveLoader: true, spimri: true, aurraPro: true, cruiser: true, shravil: true, ninjaPlus: true, gtrPlus: true, ninjaMini: true, ninja2G: true },
    { feature: "Front Disc Brake", eVelcoPro: true, electroViveLoader: true, spimri: true, aurraPro: true, cruiser: true, shravil: true, ninjaPlus: false, gtrPlus: true, ninjaMini: false, ninja2G: false },
    { feature: "Rear Disc Brake", eVelcoPro: true, electroViveLoader: false, spimri: false, aurraPro: false, cruiser: false, shravil: false, ninjaPlus: false, gtrPlus: false, ninjaMini: false, ninja2G: false },
    { feature: "Cruise Control", eVelcoPro: true, electroViveLoader: true, spimri: true, aurraPro: true, cruiser: true, shravil: true, ninjaPlus: true, gtrPlus: true, ninjaMini: true, ninja2G: true },
    { feature: "NFC Lock", eVelcoPro: true, electroViveLoader: true, spimri: true, aurraPro: true, cruiser: true, shravil: true, ninjaPlus: true, gtrPlus: true, ninjaMini: true, ninja2G: true },
    { feature: "Reverse Gear", eVelcoPro: true, electroViveLoader: true, spimri: true, aurraPro: true, cruiser: true, shravil: true, ninjaPlus: true, gtrPlus: true, ninjaMini: true, ninja2G: true },
    { feature: "Anti-Theft Alarm", eVelcoPro: true, electroViveLoader: true, spimri: true, aurraPro: true, cruiser: true, shravil: true, ninjaPlus: true, gtrPlus: true, ninjaMini: true, ninja2G: true },
    { feature: "Keyless Entry", eVelcoPro: true, electroViveLoader: true, spimri: true, aurraPro: true, cruiser: true, shravil: true, ninjaPlus: true, gtrPlus: true, ninjaMini: true, ninja2G: true },
    { feature: "Regenerative Braking", eVelcoPro: true, electroViveLoader: true, spimri: true, aurraPro: true, cruiser: true, shravil: true, ninjaPlus: true, gtrPlus: true, ninjaMini: true, ninja2G: true },
    { feature: "Calling Feature", eVelcoPro: true, electroViveLoader: true, spimri: true, aurraPro: true, cruiser: true, shravil: true, ninjaPlus: true, gtrPlus: true, ninjaMini: true, ninja2G: true },
    { feature: "Bluetooth Mode", eVelcoPro: true, electroViveLoader: true, spimri: true, aurraPro: true, cruiser: true, shravil: true, ninjaPlus: true, gtrPlus: true, ninjaMini: true, ninja2G: true },
    { feature: "GPS Tracking", eVelcoPro: true, electroViveLoader: true, spimri: true, aurraPro: true, cruiser: true, shravil: true, ninjaPlus: true, gtrPlus: true, ninjaMini: true, ninja2G: true },
    { feature: "Navigation", eVelcoPro: true, electroViveLoader: true, spimri: true, aurraPro: true, cruiser: true, shravil: true, ninjaPlus: true, gtrPlus: true, ninjaMini: true, ninja2G: true },
    { feature: "USB Charging", eVelcoPro: true, electroViveLoader: true, spimri: true, aurraPro: true, cruiser: true, shravil: true, ninjaPlus: true, gtrPlus: true, ninjaMini: true, ninja2G: true },
    { feature: "Anti-Fire Fuse", eVelcoPro: true, electroViveLoader: true, spimri: true, aurraPro: true, cruiser: true, shravil: true, ninjaPlus: true, gtrPlus: true, ninjaMini: true, ninja2G: true },
    { feature: "Tubeless Tyres", eVelcoPro: true, electroViveLoader: true, spimri: true, aurraPro: true, cruiser: true, shravil: true, ninjaPlus: true, gtrPlus: true, ninjaMini: true, ninja2G: true },
    { feature: "Proximity Unlock", eVelcoPro: true, electroViveLoader: true, spimri: true, aurraPro: true, cruiser: true, shravil: true, ninjaPlus: true, gtrPlus: true, ninjaMini: true, ninja2G: true },
    { feature: "App Connectivity", eVelcoPro: true, electroViveLoader: true, spimri: true, aurraPro: true, cruiser: true, shravil: true, ninjaPlus: true, gtrPlus: true, ninjaMini: true, ninja2G: true },
  ];

  const models = [
    { name: "E-Velco Pro", key: "eVelcoPro" },
    { name: "Electro Vive Loader", key: "electroViveLoader" },
    { name: "Spimri", key: "spimri" },
    { name: "Aurra Pro", key: "aurraPro" },
    { name: "Cruiser", key: "cruiser" },
    { name: "Shravil", key: "shravil" },
    { name: "Ninja Plus+", key: "ninjaPlus" },
    { name: "GTR+", key: "gtrPlus" },
    { name: "Ninja Mini", key: "ninjaMini" },
    { name: "Ninja 2G", key: "ninja2G" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const cellVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section id="comparison" className=" bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.1 }}
          className="text-center"
        >
          <Badge variant="secondary" className="mb-4">
            Features Comparison
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Compare All 
               <span className="block gradient-text">ElectroVive Models</span>
  
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find the perfect ElectroVive model with the features you need
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <Card className="overflow-hidden backdrop-blur-xl bg-background/50 border-border/50">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b-2">
                    <TableHead className="w-[200px] font-bold text-foreground sticky left-0 bg-background z-20">
                      Feature
                    </TableHead>
                    {models.map((model) => (
                      <motion.th
                        key={model.key}
                        variants={cellVariants}
                        className="text-center p-3 font-bold text-foreground min-w-[120px]"
                      >
                        <span className="text-sm">{model.name}</span>
                      </motion.th>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparisonData.map((row, rowIndex) => (
                    <motion.tr
                      key={row.feature}
                      variants={rowVariants}
                      className="border-b hover:bg-muted/30 transition-colors"
                    >
                      <TableCell className="font-medium sticky left-0 bg-background z-20 shadow-[2px_0_4px_rgba(0,0,0,0.1)]">
                        {row.feature}
                      </TableCell>
                      {models.map((model) => {
                        const value = row[model.key as keyof typeof row];
                        return (
                          <motion.td
                            key={model.key}
                            variants={cellVariants}
                            className="text-center p-3"
                          >
                            {typeof value === "boolean" ? (
                              value ? (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  whileInView={{ scale: 1 }}
                                  viewport={{ once: true }}
                                  transition={{
                                    delay: rowIndex * 0.05,
                                    type: "spring",
                                    stiffness: 200,
                                  }}
                                  className="flex justify-center"
                                >
                                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                                    <Check className="h-3 w-3 text-primary" />
                                  </div>
                                </motion.div>
                              ) : (
                                <X className="h-3 w-3 text-muted-foreground mx-auto" />
                              )
                            ) : (
                              <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: rowIndex * 0.05 }}
                                className="text-sm"
                              >
                                {value}
                              </motion.span>
                            )}
                          </motion.td>
                        );
                      })}
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8"
          >
            <Button size="lg" className="gap-2">
              Compare All Models
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div> */}
        </motion.div>
      </div>
    </section>
  );
}