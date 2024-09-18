import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";

export default function NoProductsFound() {
  return (
    <div className="h-[100vh]">
      <div className="text-2xl mt-[130px] mb-[40px]">
        검색하신 상품이 없어요.
      </div>
      <Link to="/products">
        <Button
          text="상품으로 바로가기"
          className="w-[220px] bg-white text-puple border border-puple hover:bg-puple hover:text-white"
        />
      </Link>
    </div>
  );
}
