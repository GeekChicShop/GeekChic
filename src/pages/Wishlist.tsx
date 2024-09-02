import React, { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

import { wishlistState, userState } from "../atoms/userAtom";
import { getWishlistItems, setWishlistItems } from "../api/firebase";
import { Product } from "../types/mainType";
import Button from "../components/ui/button";

import closedIcon from "../assets/icons/close.svg";

export default function Wishlist() {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useRecoilState(wishlistState);

  useEffect(() => {
    if (user) {
      getWishlistItems(user.uid).then(setWishlist);
    }
  }, [user, setWishlist]);

  const handleWishlist = (products: Product) => {
    const isInWishlist = wishlist.some((item) => item.id === products.id);
    if (user) {
      if (isInWishlist) {
        const updatedWishlist = wishlist.filter(
          (item) => item.id !== products.id
        );
        setWishlist(updatedWishlist);
        setWishlistItems(user.uid, updatedWishlist);
      }
    }
  };

  return (
    <div className="container w-[600px]">
      <div className="p-11 mb-[10px]">
        <h1 className="text-3xl font-bold text-left">관심물품</h1>
      </div>
      {wishlist?.length !== 0 ? (
        <>
          <div className="flex text-lg gap-1 text-left px-11 mb-[10px]">
            <p>전체</p>
            <p className="text-[#a9a9a9]">{wishlist.length}</p>
          </div>
          <ul className="px-11 py-2 pb-4">
            {wishlist.map((product: Product) => (
              <>
                <button onClick={() => handleWishlist(product)}>
                  <img
                    src={closedIcon}
                    alt="closed"
                    className="w-[15px] h-[15px] ml-[500px] brightness-150"
                  />
                </button>
                <li
                  onClick={() => {
                    navigate(`/products/detail/${product.id}`, {
                      state: { product },
                    });
                  }}
                  className="flex mb-4 w-[550px] hover:hover:brightness-75 cursor-pointer"
                  key={product.id}
                >
                  <img
                    className="w-[150px] h-[150px] rounded-[5px]"
                    src={product.image}
                    alt={product.title}
                  />
                  <div className="text-left px-4 w-[380px]">
                    <div className="flex gap-[280px] items-start">
                      <h3 className="text-xl font-bold mb-[10px]">
                        {product.title}
                      </h3>
                    </div>
                    <p className="text-xl mb-[55px]">{product.description}</p>
                    <p className="text-xl font-bold text-right">{`${product.price}원`}</p>
                  </div>
                </li>
                <p className="border border-[#D9D9D9] w-[520px] m-auto mt-[40px] mb-[45px]"></p>
              </>
            ))}
          </ul>
        </>
      ) : (
        <div className="h-[100vh]">
          <div className="text-2xl mt-[130px] mb-[40px]">
            관심있는 상품을 저장해보세요.
          </div>
          <Button
            text="상품으로 바로가기"
            className="w-[220px] border bg-white text-puple border-puple hover:bg-puple hover:text-white"
          />
        </div>
      )}
    </div>
  );
}
