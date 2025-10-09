import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Calculator as CalcIcon } from "lucide-react";

const Calculator = () => {
  useEffect(() => {
    document.title = "Mining Profitability Calculator | Custom IT Support";
  }, []);
  const [hashrate, setHashrate] = useState("");
  const [power, setPower] = useState("");
  const [electricityCost, setElectricityCost] = useState("0.15");
  const [coinPrice, setCoinPrice] = useState("50000");
  const [results, setResults] = useState<any>(null);

  const calculateProfitability = () => {
    const hashrateNum = parseFloat(hashrate);
    const powerNum = parseFloat(power);
    const electricityCostNum = parseFloat(electricityCost);
    const coinPriceNum = parseFloat(coinPrice);

    if (!hashrateNum || !powerNum || !electricityCostNum || !coinPriceNum) {
      return;
    }

    // Simplified calculation for demonstration
    const dailyRevenue = (hashrateNum * 0.00001 * coinPriceNum);
    const dailyElectricityCost = (powerNum / 1000) * 24 * electricityCostNum;
    const dailyProfit = dailyRevenue - dailyElectricityCost;
    const monthlyRevenue = dailyRevenue * 30;
    const monthlyElectricityCost = dailyElectricityCost * 30;
    const monthlyProfit = dailyProfit * 30;
    
    // Calculate ROI based on an assumed hardware cost
    const estimatedHardwareCost = 1500;
    const roiMonths = monthlyProfit > 0 ? estimatedHardwareCost / monthlyProfit : 0;

    setResults({
      monthlyRevenue: monthlyRevenue.toFixed(2),
      monthlyElectricityCost: monthlyElectricityCost.toFixed(2),
      monthlyProfit: monthlyProfit.toFixed(2),
      roiMonths: roiMonths.toFixed(1),
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
        <div className="pt-24 pb-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <CalcIcon className="w-8 h-8 text-foreground" />
              </div>
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Mining Profitability Calculator
              </h1>
              <p className="text-xl text-muted-foreground">
                Estimate your crypto mining returns and ROI
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Enter Your Mining Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="hashrate">Hashrate (TH/s for BTC, GH/s for LTC)</Label>
                    <Input
                      id="hashrate"
                      type="number"
                      placeholder="115"
                      value={hashrate}
                      onChange={(e) => setHashrate(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="power">Power Consumption (W)</Label>
                    <Input
                      id="power"
                      type="number"
                      placeholder="1700"
                      value={power}
                      onChange={(e) => setPower(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="electricity">Electricity Cost (€/kWh)</Label>
                    <Input
                      id="electricity"
                      type="number"
                      step="0.01"
                      placeholder="0.15"
                      value={electricityCost}
                      onChange={(e) => setElectricityCost(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="coinPrice">Coin Price (€)</Label>
                    <Input
                      id="coinPrice"
                      type="number"
                      placeholder="50000"
                      value={coinPrice}
                      onChange={(e) => setCoinPrice(e.target.value)}
                    />
                  </div>
                </div>

                <Button 
                  variant="premium" 
                  className="w-full" 
                  size="lg"
                  onClick={calculateProfitability}
                >
                  <CalcIcon className="w-4 h-4" />
                  Calculate Profitability
                </Button>

                {results && (
                  <div className="mt-8 space-y-4">
                    <h3 className="text-2xl font-bold text-center mb-6">Estimated Results</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-secondary rounded-lg p-6 text-center">
                        <div className="text-sm text-muted-foreground mb-2">Monthly Revenue</div>
                        <div className="text-3xl font-bold text-accent">€{results.monthlyRevenue}</div>
                      </div>
                      <div className="bg-secondary rounded-lg p-6 text-center">
                        <div className="text-sm text-muted-foreground mb-2">Monthly Electricity Cost</div>
                        <div className="text-3xl font-bold text-destructive">€{results.monthlyElectricityCost}</div>
                      </div>
                      <div className="bg-secondary rounded-lg p-6 text-center">
                        <div className="text-sm text-muted-foreground mb-2">Monthly Profit</div>
                        <div className="text-3xl font-bold text-primary">€{results.monthlyProfit}</div>
                      </div>
                      <div className="bg-secondary rounded-lg p-6 text-center">
                        <div className="text-sm text-muted-foreground mb-2">ROI Period</div>
                        <div className="text-3xl font-bold">{results.roiMonths} months</div>
                      </div>
                    </div>
                    <div className="bg-muted border border-border rounded-lg p-4 text-sm text-muted-foreground text-center">
                      ⚠️ These are estimates based on current conditions. Actual results vary due to network difficulty, 
                      market volatility, and other factors. Not financial advice.
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="mt-12 bg-card border border-border rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">How to Use This Calculator</h3>
              <div className="space-y-3 text-muted-foreground">
                <p><strong>Hashrate:</strong> The mining speed of your hardware (TH/s for Bitcoin, GH/s for Litecoin/Dogecoin, MH/s for Ethereum)</p>
                <p><strong>Power Consumption:</strong> How much electricity your miner uses in Watts</p>
                <p><strong>Electricity Cost:</strong> Your local electricity rate per kilowatt-hour (kWh)</p>
                <p><strong>Coin Price:</strong> Current market price of the cryptocurrency you're mining</p>
              </div>
            </div>
          </div>
        </div>

      <Footer />
    </div>
  );
};

export default Calculator;
