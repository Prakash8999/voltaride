import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(150000);
  const [tenure, setTenure] = useState(36);
  const [interestRate] = useState(9.5);

  // EMI Calculation
  const monthlyRate = interestRate / 12 / 100;
  const emi =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
    (Math.pow(1 + monthlyRate, tenure) - 1);
  const totalAmount = emi * tenure;
  const totalInterest = totalAmount - loanAmount;

  const chartData = {
    labels: ["Principal", "Interest"],
    datasets: [
      {
        data: [loanAmount, totalInterest],
        backgroundColor: ["hsl(192, 100%, 50%)", "hsl(82, 100%, 67%)"],
        borderColor: ["hsl(192, 100%, 40%)", "hsl(82, 100%, 57%)"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <section className=" bg-muted/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Affordable <span className="gradient-text">Ownership</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calculate your monthly EMI and own your dream electric scooter today.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Calculator */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="glass p-8 space-y-8">
              <div className="flex items-center gap-3">
                <Calculator className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-bold">EMI Calculator</h3>
              </div>

              {/* Loan Amount */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Loan Amount</label>
                  <span className="font-numeric text-lg font-bold">
                    ₹{loanAmount.toLocaleString("en-IN")}
                  </span>
                </div>
                <Slider
                  value={[loanAmount]}
                  onValueChange={(value) => setLoanAmount(value[0])}
                  min={50000}
                  max={200000}
                  step={5000}
                  className="w-full"
                />
              </div>

              {/* Tenure */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Tenure (Months)</label>
                  <span className="font-numeric text-lg font-bold">{tenure}</span>
                </div>
                <Slider
                  value={[tenure]}
                  onValueChange={(value) => setTenure(value[0])}
                  min={12}
                  max={60}
                  step={6}
                  className="w-full"
                />
              </div>

              {/* Interest Rate */}
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Interest Rate</label>
                <span className="font-numeric text-lg font-bold">{interestRate}%</span>
              </div>

              {/* Results */}
              <div className="pt-6 border-t border-border space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Monthly EMI</span>
                  <span className="font-numeric text-3xl font-bold text-primary">
                    ₹{Math.round(emi).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Interest</span>
                  <span className="font-numeric font-medium">
                    ₹{Math.round(totalInterest).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Amount</span>
                  <span className="font-numeric font-medium">
                    ₹{Math.round(totalAmount).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <Button className="w-full" size="lg">
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
            </Card>
          </motion.div>

          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="glass p-8 h-full flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-8 text-center">
                Payment Breakdown
              </h3>
              <div className="max-w-sm mx-auto">
                <Doughnut
                  data={chartData}
                  options={{
                    plugins: {
                      legend: {
                        position: "bottom",
                        labels: {
                          color: "hsl(210, 40%, 98%)",
                          font: {
                            size: 14,
                          },
                        },
                      },
                    },
                  }}
                />
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EMICalculator;
