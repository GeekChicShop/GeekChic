import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { loadUserData, uploadUserData } from "../api/firebase";
import { userState, geekChickUser } from "../atoms/userAtom";
import useProduct from "../hook/useProduct";
import Header from "../components/common/Header";
import SearchHeader from "../components/common/SearchHeader";
import HomeSkeleton from "../components/skeleton/HomeSkeleton";
import ImageBanner from "../components/main/ImageBanner";
import AdminActions from "../components/main/AdminActions";
import ProductCountHeader from "../components/main/ProductCountHeader";
import ProductGrid from "../components/main/ProductGrid";

import { UserDataType } from "../types/usedType";
import { Product } from "../types/mainType";

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
      {isLoading ? (
        <HomeSkeleton />
      ) : (
        <div>
          {keyword ? (
            <div>
              {products?.length !== 0 ? (
                <div>
                  <ImageBanner src="/public/img/mainImg.jpg" alt="mainImage" />
                  <ProductCountHeader
                    keyword={keyword}
                    count={products?.length || 0}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div>
              <ImageBanner src="/public/img/mainImg.jpg" alt="mainImage" />
              <div className="flex space-x-[320px] ml-[30px] items-center mt-[30px] mb-[20px]">
                <div className="text-lg font-bold text-left">
                  최근 등록 상품
                </div>
                {user && <AdminActions user={user} />}
              </div>
            </div>
          )}
        </div>
      )}
      <ProductGrid products={products as Product[]} />
    </div>
  );
}
