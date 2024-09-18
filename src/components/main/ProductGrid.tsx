import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import { Product } from "../../types/mainType";
import ProductCard from "../../components/main/ProductCard";

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="flex justify-center">
      {products?.length ? (
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[20px] mb-[100px]">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      ) : (
        <div className="h-[100vh]">
          <div className="text-2xl mt-[130px] mb-[40px]">
            검색하신 상품이 없어요.
          </div>
          <Link to="/products">
            <Button
              text="상품으로 바로가기"
              className="w-[220px] bg-white text-puple border border-puple hover:bg-puple hover:text-white"
            />
          </Link>
        </div>
      )}
    </div>
  );
}
