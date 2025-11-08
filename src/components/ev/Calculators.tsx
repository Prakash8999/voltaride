import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Calculator, TrendingDown } from "lucide-react";

export default function Calculators() {
  const [loanAmount, setLoanAmount] = useState(120000);
  const [tenure, setTenure] = useState(24);
  const [kmPerDay, setKmPerDay] = useState(30);

  const interestRate = 9.5;
  const monthlyEmi = (loanAmount * (interestRate / 1200) * Math.pow(1 + interestRate / 1200, tenure)) / (Math.pow(1 + interestRate / 1200, tenure) - 1);

  const petrolCostPerKm = 3.5;
  const electricCostPerKm = 0.4;
  const monthlySavings = (kmPerDay * 30 * (petrolCostPerKm - electricCostPerKm));
  const yearlySavings = monthlySavings * 12;

  return (
    <section id="calculators" className="py-24 relative bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">Calculators</Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Plan Your <span className="gradient-text">Investment</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Calculate your EMI and savings to make an informed decision
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {/* EMI Calculator */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="glass-effect border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Calculator className="w-6 h-6 text-primary" />
                  EMI Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Loan Amount: ₹{loanAmount.toLocaleString()}</Label>
                  <Input
                    type="range"
                    min="50000"
                    max="200000"
                    step="10000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tenure: {tenure} months</Label>
                  <Input
                    type="range"
                    min="12"
                    max="48"
                    step="6"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="cursor-pointer"
                  />
                </div>

                <div className="pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-2">Monthly EMI</p>
                  <p className="text-4xl font-bold font-numbers gradient-text">
                    ₹{Math.round(monthlyEmi).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-4">
                    Interest Rate: {interestRate}% p.a.
                  </p>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-background cursor-pointer">
                  Apply for Loan
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Savings Calculator */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="glass-effect border-accent/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <TrendingDown className="w-6 h-6 text-accent" />
                  Savings Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Daily Commute: {kmPerDay} km</Label>
                  <Input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={kmPerDay}
                    onChange={(e) => setKmPerDay(Number(e.target.value))}
                    className="cursor-pointer"
                  />
                </div>

                <div className="space-y-4 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Petrol Cost/km</span>
                    <span className="font-bold">₹{petrolCostPerKm}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Electric Cost/km</span>
                    <span className="font-bold text-accent">₹{electricCostPerKm}</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-border space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Monthly Savings</p>
                    <p className="text-3xl font-bold font-numbers text-accent">
                      ₹{Math.round(monthlySavings).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Yearly Savings</p>
                    <p className="text-2xl font-bold font-numbers gradient-text">
                      ₹{Math.round(yearlySavings).toLocaleString()}
                    </p>
                  </div>
                </div>

                <Button variant="outline" className="w-full cursor-pointer">
                  View Detailed Breakdown
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
