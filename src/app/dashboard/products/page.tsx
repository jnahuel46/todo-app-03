import { ProductCard } from "@/products/components/ProductCard";
import { products } from "./products";

export default function NamePage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {products.map((item) => {
        return <ProductCard key={item.id}/>;
      })}
    </div>
  );
}
