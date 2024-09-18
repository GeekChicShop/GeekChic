interface OrderTotalProps {
  totalPrice: number;
  shippingCost: number;
}

export default function OrderTotal({
  totalPrice,
  shippingCost,
}: OrderTotalProps) {
  return (
    <div>
      <div className="flex justify-end mr-[40px] gap-2">
        <p className="text-[#959595]">상품 합</p>
        <p>{totalPrice}원</p>
      </div>
      <div className="flex justify-end mr-[40px] gap-2">
        <p className="text-[#959595]">배송 비용</p>
        <p>{shippingCost}원</p>
      </div>
      <div className="text-right mr-[40px] text-xl font-bold mt-[10px]">
        <p>{totalPrice + shippingCost}원</p>
      </div>
      <p className="border border-[#D9D9D9] w-[520px] m-auto mt-[40px]"></p>
    </div>
  );
}
