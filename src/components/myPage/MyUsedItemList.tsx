import { PayProduct } from "../../types/mainType";

export interface UsedItemListType {
  item: PayProduct;
  isCart: boolean;
  onQuantityChange?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
}

const MyUsedItemList = ({ item, isCart }: UsedItemListType) => {
  return (
    <div className={isCart ? "border-b mb-10" : ""}>
      <div key={item.id} className="flex mb-4">
        <img
          src={item.image}
          alt={item.title}
          className="w-20 h-20 object-cover rounded-lg mr-4"
        />
        <div className="w-full flex justify-between ">
          <div>
            <p className="font-semibold">{item.title}</p>
            <p className="font-semibold">{item.description}</p>
            <p className="text-sm text-gray-500">
              {item.options[0]} | {item.quantity}개
            </p>
            <p className="font-bold text-lg">{item.price}원 </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyUsedItemList;
