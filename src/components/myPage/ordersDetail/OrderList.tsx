import OrdersItem from "./OrdersItem";
import { OrderProduct } from "../../../types/mainType";

interface OrderItemsProps {
  items: OrderProduct[];
  ordersId?: string;
}

export default function OrderList({ ordersId, items }: OrderItemsProps) {
  return (
    <ul className="mb-[40px]">
      {items.map((product) => (
        <OrdersItem key={ordersId} product={product} />
      ))}
      <p className="border border-[#D9D9D9] w-[520px] m-auto mt-[40px]"></p>
    </ul>
  );
}
