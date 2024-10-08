import { Link, useNavigate, useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { defaultImage, makeArr } from "../types/utils";
import { loadUserData, logout } from "../api/firebase";

import Layout from "../components/myPage/_Layout";
import MyPageSkeleton from "../components/skeleton/MyPageSkeleton";

const MyPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const {
    data: user,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: () => loadUserData(userId as string),
    retry: 3,
    retryDelay: 1000,
  });

  const onClickLogout = async () => {
    if (confirm("로그아웃 하시겠습니까? ")) {
      await logout();
      navigate("/api/login");
    }
  };
  if (isError) {
    return (
      <div>
        <p>로그인이 필요합니다.</p>
        <p>
          <Link to={"/api/login"}>로그인 페이지로 이동합니다</Link>
        </p>
        <p>
          <Link to={"/"}>아니요, 구경만할래요</Link>
        </p>
      </div>
    );
  }
  if (isPending) {
    return (
      <Layout title="마이페이지">
        <div className="m-16 p-4">
          <MyPageSkeleton />
        </div>
      </Layout>
    );
  }
  if (!user) {
    return (
      <div>
        <p>유저 정보를 불러올 수 없습니다.</p>
        <Link to={"/api/login"}>로그인 페이지로 이동해주세요</Link>
      </div>
    );
  }
  return (
    <Layout title="마이페이지">
      <div className="m-16 p-4">
        {/* 프로필 관리 */}
        <div className="mb-12 border-b-2">
          <div className="flex items-center mb-8 mx-auto">
            <div className="w-16 h-16 bg-gray-200 rounded-full">
              <img
                src={user.userAvatar ?? defaultImage}
                alt={user.userName ?? ""}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="ml-4 text-left">
              <div className="text-lg font-semibold">{user?.userName}</div>
              <div className="text-sm text-gray-500">
                {user?.address ? user.address : "주소를 작성해주세요"}
              </div>
            </div>
          </div>

          <button className="w-full h-[45px] py-2 mb-2 bg-[#8F5BBD] text-white rounded-md">
            <Link to="profile">프로필 관리</Link>
          </button>
          <button
            onClick={onClickLogout}
            className="w-full h-[45px] py-2 mb-12 bg-gray-400 text-white rounded-md"
          >
            로그아웃
          </button>
        </div>

        <div>
          {/* 내 상품 관리 */}
          <div className="space-y-4 pb-12 mb-8 border-b-2">
            <Link
              to="orderlist"
              state={{ user: user }}
              className="flex justify-between items-center p-4 bg-gray-100 rounded-md cursor-pointer"
            >
              <span className="text-lg">주문내역</span>
              <span className="text-lg font-semibold">
                {makeArr(user.orders).length}
              </span>
            </Link>
            <Link
              to="salelist"
              state={{ user }}
              className="flex justify-between items-center p-4 bg-gray-100 rounded-md cursor-pointer"
            >
              <span className="text-lg">판매목록</span>
              <span className="text-lg font-semibold">
                {makeArr(user.sales).length}
              </span>
            </Link>
            <Link
              to="carts"
              className="flex justify-between items-center p-4 bg-gray-100 rounded-md cursor-pointer"
            >
              <span className="text-lg">장바구니</span>
              <span className="text-lg font-semibold">
                {makeArr(user.carts).length}
              </span>
            </Link>
            <Link
              to="messageList"
              state={{ messages: makeArr(user.messages) }}
              className="flex justify-between items-center p-4 bg-gray-100 rounded-md cursor-pointer"
            >
              <span className="text-lg">내 쪽지함</span>
              <span className="text-lg font-semibold">
                {makeArr(user.messages).length}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default MyPage;
