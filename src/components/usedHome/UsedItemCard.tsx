import React from "react";
import { Link } from "react-router-dom";
import { UsedItemType } from "../../types/usedType";

interface UsedItemCardProps {
  item: UsedItemType;
}

const UsedItemCard = ({ item }: UsedItemCardProps) => {
  return (
    <Link
      to={`/usedHome/detail/${item.id}`}
      className=" p-3 rounded-md  cursor-pointer"
    >
      {item.imageArr ? (
        <img
          src={item.imageArr[0]}
          alt={item.itemName}
          className="w-full h-48 object-cover rounded-md mb-2"
        />
      ) : (
        <img
          src="/"
          className="w-full h-48 object-cover rounded-md mb-2 border"
        />
      )}

      <h2 className="text-lg font-bold pl-2">{item.itemName}</h2>
      <p className="text-gray-500 pl-2">{item.price.toLocaleString()}원</p>
    </Link>
  );
};

export default UsedItemCard;
