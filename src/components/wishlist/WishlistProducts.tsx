import { Product } from "../../types/mainType";
import WishlistItem from "./WishlistItem";

interface WishlistProductsProps {
  wishlist: Product[]; // 제품 배열
  handleWishlist: (product: Product) => void; // 위시리스트에서 제품 제거 함수
  navigate: (path: string, options?: { state: { product: Product } }) => void; // 라우팅 함수
}

export default function WishlistProducts({
  wishlist,
  handleWishlist,
  navigate,
}: WishlistProductsProps) {
  return (
    <>
      <div className="flex text-lg gap-1 text-left px-11 mb-[10px]">
        <p>전체</p>
        <p className="text-[#a9a9a9]">{wishlist.length}</p>
      </div>
      <ul className="px-11 py-2 pb-4">
        {wishlist.map((product: Product) => (
          <WishlistItem
            key={product.id}
            product={product}
            handleWishlist={handleWishlist}
            navigate={navigate}
          />
        ))}
      </ul>
    </>
  );
}
