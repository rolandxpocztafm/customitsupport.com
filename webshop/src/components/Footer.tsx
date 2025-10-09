import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Custom IT Support</h3>
            <p className="text-muted-foreground text-sm">
              Professional crypto mining hardware and IT solutions for the European Union.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>ASIC Miners</li>
              <li>GPU Mining Rigs</li>
              <li>IT Support</li>
              <li>Custom Solutions</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>About Us</li>
              <li>Shipping Info</li>
              <li>Warranty</li>
              <li>MiCA Compliance</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                support@customitsupport.com
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                +31 20 123 4567
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                Amsterdam, Netherlands
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Custom IT Support. All rights reserved.</p>
          <p className="mt-2">
            Crypto mining involves risk. All sales comply with EU MiCA regulations. Consult a financial advisor before investing.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
