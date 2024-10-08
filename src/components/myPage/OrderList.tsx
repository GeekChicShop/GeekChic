import { OrderItemsType } from "../../types/usedType";
import { Link } from "react-router-dom";
import { makeArr } from "../../types/utils";
import { useNavigate } from "react-router-dom";
import MyUsedItemList from "./MyUsedItemList";

interface OrdersProps {
  orders: OrderItemsType;
}

const OrderList = ({ orders }: OrdersProps) => {
  const ordersArr = makeArr(orders);
  const navigate = useNavigate();

  return (
    <div className="p-10 text-left">
      <div className="flex gap-1 text-m mb-4 pb-4 border-b">
        <span className="font-bold">전체</span>
        <p className="text-[#a9a9a9]">{ordersArr.length}</p>
      </div>

      {ordersArr.length == 0 && (
        <div>
          <p>쪽지가 없습니다</p>
          <Link to={"/usedHome"}>중고 제품을 둘러보세요</Link>
        </div>
      )}

      {ordersArr
        .sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          // 최신순으로 정렬 (내림차순)
          return dateB - dateA;
        })
        .map((orders) => {
          return (
            <div key={orders.ordersId} className="mb-4 border-b">
              <div
                className="flex justify-between items-center py-2 mb-2"
                onClick={() => {
                  navigate(`/orders/detail/${orders.ordersId}`, {
                    state: { orders },
                  });
                }}
              >
                <p className="font-bold">{orders.createdAt.split("T")[0]}</p>
                주문 상세보기
              </div>
              {makeArr(orders.items).map((item, idx) => {
                return (
                  <div>
                    <MyUsedItemList key={idx} item={item} isCart={false} />
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
};

export default OrderList;
