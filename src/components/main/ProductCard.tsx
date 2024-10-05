import { useNavigate } from "react-router-dom";
import { Product } from "../../types/mainType";

export default function ProductCard({ product }: { product: Product }) {
  const { image, id } = product;
  const navigate = useNavigate();
  const quantity = product.productQuantity;
  const quantityCount = quantity.reduce((quantity, cur) => {
    return String(Number(quantity) + Number(cur));
  });

  return (
    <li
      onClick={() => {
        navigate(`/products/detail/${id}`, {
          state: { product },
        });
      }}
      className={`border rounded-md truncate cursor-pointer hover:hover:brightness-75 transition ${
        Number(quantityCount) <= 0 && "opacity-50"
      }`}
    >
      <img className="w-[120px] h-[130px]" src={image[0]} alt="img" />
    </li>
  );
}
