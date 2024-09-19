import { useLocation, useParams } from "react-router-dom";
import Layout from "../components/myPage/_Layout";
import OrderList from "../components/myPage/OrderList";
import { UserDataType } from "../types/usedType";
import MyCart from "../components/myPage/myCart/MyCart";
import { OrderItemsType } from "../types/usedType";

interface StateProps {
  user: UserDataType;
}

const MyList = () => {
  const { list } = useParams();
  const location = useLocation();
  const { user }: StateProps = location.state || {};

  return (
    <Layout title={list == "carts" ? "장바구니" : "주문내역"}>
      <div className="p-4">
        <h1>
          {list == "carts" ? (
            <MyCart />
          ) : (
            <OrderList orders={user.orders as OrderItemsType} />
          )}
        </h1>
      </div>
    </Layout>
  );
};

export default MyList;
