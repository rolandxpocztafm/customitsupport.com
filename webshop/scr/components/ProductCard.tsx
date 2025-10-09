import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  specs: string[];
  badge?: string;
  hashrate?: string;
  power?: string;
}

const ProductCard = ({ name, price, image, specs, badge, hashrate, power }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden bg-secondary h-48">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {badge && (
            <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
              {badge}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="text-xl mb-4">{name}</CardTitle>
        <div className="space-y-2 mb-4">
          {hashrate && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Hashrate:</span>
              <span className="font-semibold text-accent">{hashrate}</span>
            </div>
          )}
          {power && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Power:</span>
              <span className="font-semibold">{power}</span>
            </div>
          )}
          {specs.map((spec, index) => (
            <div key={index} className="text-sm text-muted-foreground">
              • {spec}
            </div>
          ))}
        </div>
        <div className="text-3xl font-bold text-accent">
          €{price.toLocaleString()}
          <span className="text-sm text-muted-foreground ml-2">incl. BTW</span>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button variant="premium" className="w-full">
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
