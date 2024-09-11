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
import ImageCard from "../components/productDetail/ImageCard";
import PurchaseOptions from "../components/productDetail/PurchaseOptions";

import { ProductComments } from "../types/mainType";
import { userState, wishlistState } from "../atoms/userAtom";

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
      <ImageCard
        image={image}
        description={description}
        handleBack={handleBack}
      />
      <PurchaseOptions
        price={price}
        description={description}
        options={options}
        selected={selected}
        handleSelect={handleSelect}
        handleWishlist={handleWishlist}
        handleClickCarts={handleClickCarts}
        handleClickPayment={handleClickPayment}
        isInWishlist={isInWishlist}
      />
      <Comment key={product.id} product={product} />
      <CommentCard />
    </div>
  );
}
