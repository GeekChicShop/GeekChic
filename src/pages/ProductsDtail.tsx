import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  addWishlistItem,
  getWishlistItems,
  setWishlistItems,
  addOrUpdateToCart,
} from "../api/firebase";

import ImageCard from "../components/productDetail/ImageCard";
import PurchaseOptions from "../components/productDetail/PurchaseOptions";
import Comment from "../components/productDetail/Comment";
import CommentCard from "../components/productDetail/CommentCard";
import ProductDetailSkeleton from "../components/skeleton/ProductDetailSkeleton";

import { ProductComments } from "../types/mainType";
import { userState, wishlistState } from "../atoms/userAtom";

export default function ProductsDtail() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const wishlist = useRecoilValue(wishlistState);
  const setWishlist = useSetRecoilState(wishlistState);

  const { product } = location.state as { product: ProductComments };
  const { description, image, price, options, productQuantity } = product;

  const [selected, setSelected] = useState<string>(options && options[0]);
  const [selectedQuantity, setselectedQuantity] = useState<string>(
    productQuantity && productQuantity[0]
  );
  const [isLoading, setIsLoading] = useState(true);
  const isInWishlist = wishlist.some((item) => item.id === product.id);
  const id = user?.uid;

  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      await new Promise((time) => setTimeout(time, 500));
      setIsLoading(false);
    };
    fetchProductDetails();
  }, [product]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
    setselectedQuantity(e.target.value);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleClickPayment = async () => {
    if (user) {
      const selectedProduct = [
        {
          ...product,
          options: [selected],
          productQuantity: [selectedQuantity],
          quantity: 1,
        },
      ];
      navigate(`/payment/${id}`, {
        state: { payProduct: selectedProduct, user },
      });
    } else {
      alert("로그인이 필요합니다!");
      navigate("/api/login");
    }
  };
  const handleClickCarts = async () => {
    if (user) {
      const selectedProduct = {
        ...product,
        options: selected,
        productQuantity: selectedQuantity,
        quantity: 1,
      };
      addOrUpdateToCart(id as string, selectedProduct);
      alert(`장바구니에 추가가 되었습니다!`);
    } else {
      alert("로그인이 필요합니다!");
      navigate("/api/login");
    }
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
    } else {
      alert("로그인이 필요합니다!");
      navigate("/api/login");
    }
  };

  return (
    <div className="container w-[600px]">
      {isLoading ? (
        <ProductDetailSkeleton />
      ) : (
        <>
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
            productQuantity={productQuantity}
            handleSelect={handleSelect}
            handleWishlist={handleWishlist}
            handleClickCarts={handleClickCarts}
            handleClickPayment={handleClickPayment}
            isInWishlist={isInWishlist}
          />
          <Comment key={product.id} product={product} />
          <CommentCard />
        </>
      )}
    </div>
  );
}
