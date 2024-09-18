import { useLocation, Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { userState } from "../atoms/userAtom";
import { GetOrderDetails } from "../types/mainType";
import OrderList from "../components/myPage/ordersDetail/OrderList";
import OrderTotal from "../components/myPage/ordersDetail/OrderTotal";
import OrderShippingInfo from "../components/myPage/ordersDetail/OrderShippingInfo";
import PaymentMethod from "../components/myPage/ordersDetail/PaymentMethod";

export default function OrdersDetail() {
  const location = useLocation();
  const user = useRecoilValue(userState);
  const userId = user?.uid;

  const { orders } = location.state as { orders: GetOrderDetails };
  const items = orders.items;
  const shippingCost = 3000;
  const totalPrice: number =
    items?.reduce(
      (prev, current) => prev + parseInt(current.price) * current.quantity,
      0
    ) || 0;
  if (orders.paymentMethod === "creditcard") {
    orders.paymentMethod = "카드결제";
  } else if (orders.paymentMethod === "cash") {
    orders.paymentMethod = "계좌이체";
  } else if (orders.paymentMethod === "pay") {
    orders.paymentMethod = "페이결제";
  }

  return (
    <div className="container w-[600px]">
      <div className="flex justify-center mt-[80px] mb-[10px]">
        <h1 className="text-3xl font-bold text-left mb-[40px]">
          주문 내역 상세
        </h1>
      </div>
      <OrderList items={items} />
      <OrderTotal totalPrice={totalPrice} shippingCost={shippingCost} />
      <OrderShippingInfo
        name={orders.name}
        phone={orders.phone}
        address={orders.address}
      />
      <PaymentMethod paymentMethod={orders.paymentMethod} />
      <Link to={`/my/${userId}`}>
        <button className="w-[550px] py-3 bg-[#8F5BBD] text-[#fff] border border-[#8F5BBD] rounded-md hover:bg-[#fff] hover:text-[#8F5BBD] duration-200">
          마이페이지로 가기
        </button>
      </Link>
    </div>
  );
}
