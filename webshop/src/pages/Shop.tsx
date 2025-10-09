import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import asicMinerImg from "@/assets/asic-miner.jpg";
import gpuRigImg from "@/assets/gpu-rig.jpg";
import { useEffect } from "react";

const Shop = () => {
  useEffect(() => {
    document.title = "Shop Crypto Mining Hardware | Custom IT Support";
  }, []);
  const asicMiners = [
    {
      name: "Fluminer L2",
      price: 828,
      image: asicMinerImg,
      specs: ["Ultra-quiet operation", "Home mining optimized", "2-year warranty"],
      hashrate: "1.2 GH/s",
      power: "230 J/GH",
      badge: "Best for LTC/DOGE"
    },
    {
      name: "Fluminer T3",
      price: 1699,
      image: asicMinerImg,
      specs: ["Silent 50 dB operation", "Bitcoin optimized", "2-year warranty"],
      hashrate: "115 TH/s",
      power: "14.78 J/TH",
      badge: "Best for BTC"
    },
  ];

  const gpuRigs = [
    {
      name: "NVIDIA RTX 3080 Rig (6x)",
      price: 4999,
      image: gpuRigImg,
      specs: ["6x RTX 3080 cards", "ETH/ETC optimized", "Open frame design"],
      hashrate: "600 MH/s",
      power: "1200W",
    },
    {
      name: "AMD RX 6800 XT Rig (8x)",
      price: 5499,
      image: gpuRigImg,
      specs: ["8x RX 6800 XT cards", "Multi-algorithm", "Premium cooling"],
      hashrate: "512 MH/s",
      power: "1600W",
      badge: "High Performance"
    },
  ];

  const accessories = [
    {
      name: "2000W 80+ Gold PSU",
      price: 249,
      image: asicMinerImg,
      specs: ["80+ Gold certified", "For ASIC miners", "5-year warranty"],
    },
    {
      name: "8-GPU Mining Frame",
      price: 129,
      image: gpuRigImg,
      specs: ["Aluminum construction", "Professional grade", "Easy assembly"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
        <div className="pt-24 pb-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Crypto Mining Hardware
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Professional-grade ASIC miners, GPU rigs, and accessories with EU support
              </p>
            </div>

            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8">ASIC Miners</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {asicMiners.map((product, index) => (
                  <ProductCard key={index} {...product} />
                ))}
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8">GPU Mining Rigs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {gpuRigs.map((product, index) => (
                  <ProductCard key={index} {...product} />
                ))}
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8">Accessories</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {accessories.map((product, index) => (
                  <ProductCard key={index} {...product} />
                ))}
              </div>
            </section>

            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <p className="text-sm text-muted-foreground">
                ⚠️ <strong>MiCA Compliance Notice:</strong> All sales comply with EU Markets in Crypto-Assets regulation. 
                Cryptocurrency mining carries financial risks. Profitability depends on market conditions, network difficulty, 
                and electricity costs. Consult a financial advisor before investing.
              </p>
            </div>
          </div>
        </div>

      <Footer />
    </div>
  );
};

export default Shop;
