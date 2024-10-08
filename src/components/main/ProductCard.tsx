import { useNavigate } from "react-router-dom";
import { Product } from "../../types/mainType";

export default function ProductCard({ product }: { product: Product }) {
  const { image, id } = product;
  const navigate = useNavigate();
  const quantity = product.productQuantity;

  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const korNow = new Date(utc + koreaTimeDiff);

  const productYear = Number(product.createdAt?.split("-")[0]);
  const productMonth = Number(product.createdAt?.split("-")[1]);
  const productDay = Number(product.createdAt?.split("-")[2].split("T")[0]);
  let isNew = false;

  if (productYear === korNow.getFullYear()) {
    if (productMonth - (korNow.getMonth() + 1) === 0) {
      if (korNow.getDate() - productDay <= 3) {
        isNew = true;
      }
    }
  }

  const quantityCount = quantity.reduce((quantity, cur) => {
    return String(Number(quantity) + Number(cur));
  });

  return (
    <div className="relative">
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
        {isNew && (
          <span className="w-6 h-6 bg-[#d65959] rounded-full font-bold text-white absolute -top-2 -left-[5px]">
            N
          </span>
        )}
        <img className="w-[120px] h-[130px]" src={image[0]} alt="img" />
      </li>
    </div>
  );
}
