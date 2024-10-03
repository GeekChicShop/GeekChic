import { atom } from "recoil";
import { User } from "firebase/auth";
import { UserDataType } from "../types/usedType";
import { Product } from "../types/mainType";

interface AdminUser extends User {
  isAdmin: boolean;
}

export const userState = atom<AdminUser | null>({
  key: "userState",
  default: null,
  dangerouslyAllowMutability: true,
  effects_UNSTABLE: [
    ({ setSelf, onSet }) => {
      const savedValue = localStorage.getItem("userState");
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newValue) => {
        if (newValue != null) {
          localStorage.setItem("userState", JSON.stringify(newValue));
        } else {
          localStorage.removeItem("userState");
        }
      });
    },
  ],
});

export const wishlistState = atom<Product[]>({
  key: "wishlistState",
  default: [],
});

export const geekChickUser = atom<UserDataType>({
  key: "geekChickUser",
  default: {
    userId: "",
    userEmail: "",
    userName: "",
    nickname: "",
    userAvatar: "",
    address: "",
    phone: "",
    orders: [],
    sales: [],
    carts: [],
    wishlists: [],
  },
  dangerouslyAllowMutability: true,
  effects_UNSTABLE: [
    ({ setSelf, onSet }) => {
      const savedValue = localStorage.getItem("geekChickUser");
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newValue) => {
        if (newValue != null) {
          localStorage.setItem("geekChickUser", JSON.stringify(newValue));
        } else {
          localStorage.removeItem("geekChickUser");
        }
      });
    },
  ],
});
