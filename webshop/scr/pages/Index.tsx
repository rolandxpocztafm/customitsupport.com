import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Truck, Headphones, Award, Zap, Check } from "lucide-react";
import heroImage from "@/assets/hero-mining.jpg";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "Custom IT Support | Professional Crypto Mining Hardware EU";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

        {/* Hero Section */}
        <section 
          className="relative pt-24 pb-32 overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(17, 24, 39, 0.9), rgba(17, 24, 39, 0.85)), url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                Professional{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Crypto Mining
                </span>{" "}
                Hardware
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Premium ASIC miners and GPU rigs with 2-year warranty, fast EU shipping, and dedicated technical support. 
                MiCA compliant solutions for Bitcoin, Ethereum, and altcoin mining.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/shop">
                  <Button variant="hero" size="lg" className="text-lg">
                    Browse Products
                  </Button>
                </Link>
                <Link to="/calculator">
                  <Button variant="outline" size="lg" className="text-lg">
                    Calculate Profitability
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap gap-6 mt-8 text-sm">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-accent" />
                  <span>2-Year Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-accent" />
                  <span>3-5 Day EU Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-accent" />
                  <span>MiCA Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Why Choose Custom IT Support?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We provide complete mining solutions with unmatched support and reliability
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={Shield}
                title="2-Year Warranty"
                description="Extended warranty coverage on all miners for complete peace of mind"
              />
              <FeatureCard
                icon={Truck}
                title="Fast EU Shipping"
                description="Delivery within 3-5 business days across the European Union"
              />
              <FeatureCard
                icon={Headphones}
                title="Technical Support"
                description="Dedicated support for setup, optimization, and troubleshooting"
              />
              <FeatureCard
                icon={Award}
                title="MiCA Compliant"
                description="Full compliance with EU Markets in Crypto-Assets regulation"
              />
              <FeatureCard
                icon={Zap}
                title="High Efficiency"
                description="Energy-efficient miners optimized for profitability"
              />
              <FeatureCard
                icon={Check}
                title="Quality Guaranteed"
                description="Professional-grade hardware tested and verified"
              />
            </div>
          </div>
        </section>

        {/* Products Preview Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Featured Mining Hardware</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Professional ASIC miners and GPU rigs for Bitcoin, Litecoin, Ethereum, and more
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-card border border-border rounded-lg p-8 text-center hover:shadow-[0_10px_40px_hsl(220_25%_5%/0.5)] transition-all">
                <div className="text-5xl font-bold text-accent mb-2">115 TH/s</div>
                <div className="text-muted-foreground mb-4">Fluminer T3</div>
                <div className="text-sm text-muted-foreground">Bitcoin Mining</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-8 text-center hover:shadow-[0_10px_40px_hsl(220_25%_5%/0.5)] transition-all">
                <div className="text-5xl font-bold text-accent mb-2">1.2 GH/s</div>
                <div className="text-muted-foreground mb-4">Fluminer L2</div>
                <div className="text-sm text-muted-foreground">Litecoin/Dogecoin</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-8 text-center hover:shadow-[0_10px_40px_hsl(220_25%_5%/0.5)] transition-all">
                <div className="text-5xl font-bold text-accent mb-2">600 MH/s</div>
                <div className="text-muted-foreground mb-4">RTX 3080 Rig</div>
                <div className="text-sm text-muted-foreground">Ethereum/Altcoins</div>
              </div>
            </div>
            <div className="text-center">
              <Link to="/shop">
                <Button variant="premium" size="lg">
                  View All Products
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-accent">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Ready to Start Mining?</h2>
            <p className="text-xl mb-8 text-foreground/90 max-w-2xl mx-auto">
              Calculate your potential returns and find the perfect mining hardware for your needs
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/calculator">
                <Button variant="outline" size="lg" className="bg-background text-foreground border-background hover:bg-background/90">
                  Try Calculator
                </Button>
              </Link>
              <Link to="/shop">
                <Button variant="outline" size="lg" className="bg-background text-foreground border-background hover:bg-background/90">
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
        </section>

      <Footer />
    </div>
  );
};

export default Index;
