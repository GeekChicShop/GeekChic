import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  addWishlistItem,
  getWishlistItems,
  setWishlistItems,
  addOrUpdateToCart,
} from "../api/firebase";

import Comment from "../components/main/Comment";
import CommentCard from "../components/main/CommentCard";
import { userState, wishlistState } from "../atoms/userAtom";
import { ProductComments } from "../types/mainType";
import Button from "../components/ui/button";

import HeartIcon from "../assets/icons/heart.svg";
import HeartFullIcon from "../assets/icons/heart_full.svg";
import Chevron_left from "../assets/icons/chevron_left.svg";

export default function ProductsDtail() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const wishlist = useRecoilValue(wishlistState);
  const setWishlist = useSetRecoilState(wishlistState);

  const { product } = location.state as { product: ProductComments };
  const { description, image, price, options } = product;

  const [selected, setSelected] = useState<string>(options && options[0]);
  const isInWishlist = wishlist.some((item) => item.id === product.id);
  const id = user?.uid;

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleClickPayment = async () => {
    const selectedProduct = [{ ...product, options: [selected], quantity: 1 }];
    navigate(`/payment/${id}`, {
      state: { payProduct: selectedProduct, user },
    });
  };
  const handleClickCarts = async () => {
    const selectedProduct = { ...product, options: selected, quantity: 1 };
    addOrUpdateToCart(id as string, selectedProduct);
    alert(`장바구니에 추가가 되었습니다!`);
  };

  const handleWishlist = async () => {
    if (user) {
      if (isInWishlist) {
        const updatedWishlist = wishlist.filter(
          (item) => item.id !== product.id
        );
        setWishlist(updatedWishlist);
        setWishlistItems(user.uid, updatedWishlist);
      } else {
        await addWishlistItem(user.uid, product);
        const updatedWishlist = await getWishlistItems(user.uid);
        setWishlist(updatedWishlist);
      }
    }
  };

  return (
    <div className="container w-[600px]">
      <img
        src={Chevron_left}
        alt="이전 페이지로"
        className="w-10 h-10 cursor-pointer "
        onClick={handleBack}
      />
      <img className="w-[598px] h-[550px]" src={image} alt={description} />
      <div className="flex m-[30px] gap-[20px]">
        <div className="w-[100px] h-[100px] bg-[#BEBEBE]"></div>
        <div className="w-[100px] h-[100px] bg-[#BEBEBE]"></div>
      </div>
      <div className="flex gap-[460px] text-lg text-left ml-[30px] mt-[25px]">
        <p className="">구매가</p>
        <div className="cursor-pointer" onClick={handleWishlist}>
          <img
            className="w-[30px] h-[30px]"
            src={isInWishlist ? HeartFullIcon : HeartIcon}
            alt="likeButton"
          />
        </div>
      </div>
      <p className="text-2xl font-bold text-left ml-[30px]">{`${price}원`}</p>
      <h1 className="text-lg text-left ml-[30px] mt-[15px]">{description}</h1>
      <div className="w-full flex flex-col">
        <select
          className="p-3 m-7 border-2 border-brand rounded-md outline-none bg-[#EEE]"
          id="select"
          onChange={handleSelect}
          value={selected}
        >
          {options &&
            options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
        </select>
      </div>
      <p className="border border-[#D9D9D9] w-[550px] m-auto"></p>
      <div className="flex justify-center gap-[50px] mt-[30px]">
        <Button
          text="장바구니 담기"
          onClick={handleClickCarts}
          className="w-[250px] bg-red text-white border border-red hover:bg-white hover:text-red"
        />{" "}
        <Button
          text="바로구매"
          onClick={handleClickPayment}
          className="w-[250px] bg-puple text-white border border-puple hover:bg-white hover:text-puple"
        />
      </div>
      <Comment key={product.id} product={product} />
      <CommentCard />
    </div>
  );
}
