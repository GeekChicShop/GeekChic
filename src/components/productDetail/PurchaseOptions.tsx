import Button from "../../components/ui/Button";
import HeartIcon from "../../assets/icons/heart.svg";
import HeartFullIcon from "../../assets/icons/heart_full.svg";

interface PurchaseOptionsProps {
  price: string;
  description: string;
  options: string[];
  selected: string;
  selectedQuantity: string;
  productQuantity: string[];
  isInWishlist: boolean;
  handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleWishlist: () => void;
  handleClickCarts: () => void;
  handleClickPayment: () => void;
}

export default function PurchaseOptions({
  price,
  description,
  options,
  selected,
  selectedQuantity,
  productQuantity,
  handleSelect,
  handleWishlist,
  handleClickCarts,
  handleClickPayment,
  isInWishlist,
}: PurchaseOptionsProps) {
  return (
    <div>
      <div className="flex gap-[460px] text-lg text-left ml-[30px] mt-[25px]">
        <p>구매가</p>
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
          value={`${selected}, ${selectedQuantity}`}
        >
          {options &&
            options.map((option, index) => (
              <option
                key={index}
                value={`${option}, ${productQuantity[index]}`}
              >
                {option} {`| 수량 ${productQuantity[index]}개 남음`}
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
        />
        <Button
          text="바로구매"
          onClick={handleClickPayment}
          className="w-[250px] bg-puple text-white border border-puple hover:bg-white hover:text-puple"
        />
      </div>
    </div>
  );
}
