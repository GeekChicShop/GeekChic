import { OrderProduct } from "../../../types/mainType";

export default function OrdersItem({ product }: { product: OrderProduct }) {
  return (
    <div className="flex mb-4 ml-[40px] w-[550px]">
      <img
        src={product.image[0]}
        alt={product.title}
        className="w-[150px] h-[150px] rounded-[5px]"
      />
      <div className="text-left px-4 w-[380px]">
        <p className="text-lg font-bold mb-[5px]">{product.title}</p>
        <p>{product.description}</p>
        <p className="text-[#959595]">
          {product.options} | {product.quantity}개
        </p>
        <p className="mt-[40px] text-right text-lg text-nowrap">
          {Number(product.price) * product.quantity}원
        </p>
      </div>
    </div>
  );
}
