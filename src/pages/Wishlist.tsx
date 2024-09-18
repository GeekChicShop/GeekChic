import { useState, useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

import { wishlistState, userState } from "../atoms/userAtom";
import { getWishlistItems, setWishlistItems } from "../api/firebase";
import { Product } from "../types/mainType";
import WishlistProducts from "../components/\bwishlist/WishlistProducts";

import WishlistSkeleton from "../components/skeleton/WishlistSkeleton";
import NoProductsFound from "../components/main/NoProductsFound";

export default function Wishlist() {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useRecoilState(wishlistState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getWishlistItems(user.uid).then((items) => {
        setWishlist(items);
        setIsLoading(false);
      });
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
      {isLoading ? (
        <WishlistSkeleton />
      ) : wishlist?.length !== 0 ? (
        <WishlistProducts
          wishlist={wishlist}
          handleWishlist={handleWishlist}
          navigate={navigate}
        />
      ) : (
        <NoProductsFound text="관심있는 상품을 저장해보세요." />
      )}
    </div>
  );
}
