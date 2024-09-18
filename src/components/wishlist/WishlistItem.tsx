import closedIcon from "../../assets/icons/close.svg";
import { Product } from "../../types/mainType";

interface WishlistItemProps {
  product: Product; // 개별 제품 데이터
  handleWishlist: (product: Product) => void; // 위시리스트에서 제품 제거 함수
  navigate: (path: string, options?: { state: { product: Product } }) => void; // 라우팅 함수
}

export default function WishlistItem({
  product,
  handleWishlist,
  navigate,
}: WishlistItemProps) {
  return (
    <>
      <button onClick={() => handleWishlist(product)}>
        <img
          src={closedIcon}
          alt="closed"
          className="w-[15px] h-[15px] ml-[500px] brightness-150"
        />
      </button>
      <li
        onClick={() => {
          navigate(`/products/detail/${product.id}`, { state: { product } });
        }}
        className="flex mb-4 w-[550px] hover:brightness-75 cursor-pointer transition"
      >
        <img
          className="w-[150px] h-[150px] rounded-[5px]"
          src={product.image}
          alt={product.title}
        />
        <div className="text-left px-4 w-[380px]">
          <div className="flex gap-[280px] items-start">
            <h3 className="text-xl font-bold mb-[10px]">{product.title}</h3>
          </div>
          <p className="text-xl mb-[55px]">{product.description}</p>
          <p className="text-xl font-bold text-right">{`${product.price}원`}</p>
        </div>
      </li>
      <p className="border border-[#D9D9D9] w-[520px] m-auto mt-[40px] mb-[45px]"></p>
    </>
  );
}
