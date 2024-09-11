import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { loadUserData, uploadUserData } from "../api/firebase";
import { userState, geekChickUser } from "../atoms/userAtom";
import useProduct from "../hook/useProduct";
import Header from "../components/common/Header";
import SearchHeader from "../components/common/SearchHeader";
import ProductCard from "../components/main/ProductCard";
import Button from "../components/ui/Button";
import HomeSkeleton from "../components/skeleton/HomeSkeleton";

import { UserDataType } from "../types/usedType";

export default function Home() {
  const { keyword } = useParams<{ keyword: string }>();
  const user = useRecoilValue(userState);
  const setGeekUser = useSetRecoilState(geekChickUser);
  const searchKeyword = keyword || "";

  const {
    productsQuery: { isLoading, data: products },
  } = useProduct(searchKeyword);

  useEffect(() => {
    const fetchData = async () => {
      // 로그인을 했는지 확인
      if (user) {
        // firebase db에 유저 찾기
        const data = await loadUserData(user.uid);
        setGeekUser(data as UserDataType);

        // firebase db에 유저 없는 경우 유저 데이터 생성
        if (!data && user) {
          const newUser: UserDataType = {
            userId: user.uid,
            userEmail: user.email,
            userName: user.displayName,
            nickname: user.displayName,
            userAvatar: user.photoURL,
            address: "",
            phone: user.phoneNumber,
          };
          await uploadUserData(newUser);
          setGeekUser(newUser);
        }
      }
    };
    fetchData();
  }, [user, setGeekUser]);

  return (
    <div className="h-full min-h-screen">
      <Header />
      <SearchHeader />
      {isLoading && <HomeSkeleton />}
      <div>
        {keyword ? (
          <div>
            {products?.length !== 0 ? (
              <div>
                <div className="w-full h-[300px] mt-[30px]">
                  <img
                    className="object-cover object-center w-[100%] h-[100%]"
                    src="/public/img/mainImg.jpg"
                    alt="mainImage"
                  />
                </div>
                <p className="text-lg font-bold text-left ml-[30px] mt-[30px] mb-[15px] flex">
                  {keyword}
                  <p className="ml-[5px] text-[#BEBEBE]">{products?.length}</p>
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div>
            <div className="w-full h-[300px] mt-[30px]">
              <img
                className="object-cover object-center w-[100%] h-[100%]"
                src="/public/img/mainImg.jpg"
                alt="mainImage"
              />
            </div>
            <div className="flex space-x-[320px] ml-[30px] items-center mt-[30px] mb-[20px]">
              <div className="text-lg font-bold text-left">최근 등록 상품</div>
              {user && user.isAdmin && (
                <Link to="products/new">
                  <Button
                    text="상품 등록"
                    padding="py-2"
                    className="px-7 border bg-puple text-white border-puple hover:bg-white hover:text-puple"
                  />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        {products?.length !== 0 ? (
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[20px] mb-[100px]">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ul>
        ) : (
          <div className="h-[100vh]">
            <div className="text-2xl mt-[130px] mb-[40px]">
              검색하신 상품이 없어요.
            </div>
            <Link to="/products">
              <Button
                text="상품으로 바로가기"
                className="w-[220px] bg-white text-puple border border-puple hover:bg-puple hover:text-white"
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
