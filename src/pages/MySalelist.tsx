import Layout from "../components/myPage/_Layout";
import { UserDataType } from "../types/usedType";
import { Link, useLocation } from "react-router-dom";
import { makeArr } from "../types/utils";

interface StateProps {
  user: UserDataType;
}

const MySalelist = () => {
  const location = useLocation();
  const { user }: StateProps = location.state || {};
  const sales = makeArr(user.sales);

  return (
    <Layout title="판매목록">
      <div className="text-left">
        <div className=" text-m text-gray-600 m-8 mb-4 pb-4 border-b">
          <span className="font-bold">전체 {sales.length}</span>
        </div>
        <div className="p-8 pt-4 grid grid-cols-2 gap-4 mb-24">
          {sales.length === 0 ? (
            <div>
              판매중인 상품이 없습니다.
              <p>
                <Link to="/usedHome">중고 홈 구경하기</Link>
              </p>
            </div>
          ) : (
            sales.map((sale, idx) => {
              const isSoldout = sale.quantity < 1;
              return (
                <div className="relative" key={idx}>
                  {isSoldout && (
                    <p className="text-red-500 text-xl font-bold absolute top-0 left-0">
                      품절
                    </p>
                  )}
                  <Link
                    to={`/usedHome/detail/${sale.id}`}
                    className={`p-3 z-1 rounded-md cursor-pointer ${
                      isSoldout && "opacity-50"
                    } `}
                  >
                    <img
                      src={sale.imageArr[0]}
                      alt={sale.itemName}
                      className="w-full h-48 object-cover rounded-md mb-2"
                    />
                    <h2 className="text-lg font-bold">{sale.itemName}</h2>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-500 ">
                        재고 수량 : {sale.quantity}개
                      </p>
                      <p className="text-gray-500 ">
                        판매 수량 : {sale.salesQuantity}개
                      </p>
                    </div>
                    {/* <p className="text-gray-500 px-1 text-right">
                  {calculateDaysAgo(sale.createdAt)}
                </p> */}
                    <p className="text-gray-500 ">{sale.price}원</p>
                  </Link>
                </div>
              );
            })
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MySalelist;
