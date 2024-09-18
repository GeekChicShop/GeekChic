interface PaymentMethodProps {
  paymentMethod: string;
}

export default function PaymentMethod({ paymentMethod }: PaymentMethodProps) {
  return (
    <div className="text-left ml-[40px] mt-[40px]">
      <h2 className="text-xl font-bold">결제 방법</h2>
      <p className="text-left ml-[40px] mt-[10px]">{paymentMethod}</p>
      <p className="border border-[#D9D9D9] w-[520px] m-auto mb-[50px]"></p>
    </div>
  );
}
