interface OrderShippingInfoProps {
  name: string;
  phone: string;
  address: string;
}

export default function OrderShippingInfo({
  name,
  phone,
  address,
}: OrderShippingInfoProps) {
  return (
    <div>
      <div className="text-left ml-[40px] mt-[40px]">
        <h2 className="text-xl font-bold">배송지</h2>
      </div>
      <div className="mt-[30px]">
        <p className="mr-[470px] font-bold mb-[10px]">이름</p>
        <p className="text-left ml-[50px]">{name}</p>
        <p className="border border-[#D9D9D9] w-[520px] m-auto"></p>
        <p className="mr-[450px] font-bold mt-[10px] mb-[10px]">전화번호</p>
        <p className="text-left ml-[50px]">{phone}</p>
        <p className="border border-[#D9D9D9] w-[520px] m-auto"></p>
        <p className="mr-[460px] font-bold mt-[10px] mb-[10px]">배송지</p>
        <p className="text-left ml-[50px]">{address}</p>
        <p className="border border-[#D9D9D9] w-[520px] m-auto "></p>
      </div>
    </div>
  );
}
