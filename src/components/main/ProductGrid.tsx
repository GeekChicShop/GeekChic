import ProductCard from "../../components/main/ProductCard";
import NoProductsFound from "./NoProductsFound";
import { Product } from "../../types/mainType";

export default function ProductGrid({ products }: { products: Product[] }) {
  console.log(products);
  return (
    <div className="flex justify-center">
      {products?.length ? (
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[20px] mb-[100px]">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      ) : (
        <NoProductsFound text="검색하신 상품이 없어요." />
      )}
    </div>
  );
}
