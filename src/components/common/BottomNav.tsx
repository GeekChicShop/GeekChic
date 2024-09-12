import { useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/userAtom";
import { Link, useLocation } from "react-router-dom";

import HomeIcon from "../../assets/icons/nav_home.svg";
import HomeActIcon from "../../assets/icons/nav_homeActive.svg";
import ItemsIcon from "../../assets/icons/nav_items.svg";
import ItemsActIcon from "../../assets/icons/nav_itemsActive.svg";
import WishIcon from "../../assets/icons/nav_wish.svg";
import WishActIcon from "../../assets/icons/nav_wishActive.svg";
import UsedIcon from "../../assets/icons/nav_used.svg";
import UsedActIcon from "../../assets/icons/nav_usedActive.svg";
import MyIcon from "../../assets/icons/nav_my.svg";
import MyActIcon from "../../assets/icons/nav_myActive.svg";

const BottomNav = () => {
  const location = useLocation();
  const firebaseUser = useRecoilValue(userState);

  // 활성화된 아이콘의 상태를 저장
  const [activeIcon, setActiveIcon] = useState(location.pathname);

  // 각 링크 클릭 시 해당 경로를 활성화된 아이콘으로 설정
  const handleIconClick = (path: string) => {
    setActiveIcon(path);
  };

  return (
    <nav className="fixed bottom-0 mx-auto w-[598px] max-w-[597px] border-t-2 bg-[#fff]">
      <ul className="flex justify-around p-4">
        <Link
          to="/"
          className="text-center cursor-pointer "
          onClick={() => handleIconClick("/")}
        >
          <img
            src={activeIcon === "/" ? HomeActIcon : HomeIcon}
            alt="Home"
            className="w-6 h-6 mx-auto"
          />
          <span className="text-xs">홈</span>
        </Link>
        <Link
          to="/products"
          className="text-center cursor-pointer"
          onClick={() => handleIconClick("/products")}
        >
          <img
            src={activeIcon === "/products" ? ItemsActIcon : ItemsIcon}
            alt="Products"
            className="w-6 h-6 mx-auto"
          />
          <span className="text-xs">상품</span>
        </Link>
        <Link
          to="/wishlist"
          className="text-center cursor-pointer"
          onClick={() => handleIconClick("/wishlist")}
        >
          <img
            src={activeIcon === "/wishlist" ? WishActIcon : WishIcon}
            alt="Wishlist"
            className="w-6 h-6 mx-auto"
          />
          <span className="text-xs">관심물품</span>
        </Link>
        <Link
          to="/usedHome"
          className="text-center cursor-pointer"
          onClick={() => handleIconClick("/usedHome")}
        >
          <img
            src={activeIcon === "/usedHome" ? UsedActIcon : UsedIcon}
            alt="Home"
            className="w-6 h-6 mx-auto"
          />
          <span className="text-xs">중고거래</span>
        </Link>
        <Link
          to={`/my/${firebaseUser && firebaseUser.uid}`}
          className="text-center cursor-pointer"
          onClick={() => handleIconClick(`/my/${firebaseUser?.uid}`)}
        >
          <img
            src={
              activeIcon === `/my/${firebaseUser && firebaseUser.uid}`
                ? MyActIcon
                : MyIcon
            }
            alt="Home"
            className="w-6 h-6 mx-auto"
          />
          <span className="text-xs">마이</span>
        </Link>
      </ul>
    </nav>
  );
};

export default BottomNav;
