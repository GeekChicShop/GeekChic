import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";

export default function NoProductsFound({ text }: { text: string }) {
  return (
    <div className="h-[100vh]">
      <div className="text-xl mt-[130px] mb-[40px]">{text}</div>
      <Link to="/products">
        <Button
          text="상품으로 바로가기"
          className="w-[300px] bg-white text-puple border border-puple hover:bg-puple hover:text-white"
        />
      </Link>
    </div>
  );
}
