import { Link } from "react-router-dom";
import { User } from "firebase/auth";
import Button from "../../components/ui/Button";

interface AdminUser extends User {
  isAdmin: boolean;
}

export default function AdminActions({ user }: { user: AdminUser }) {
  return (
    user &&
    user.isAdmin && (
      <Link to="products/new">
        <Button
          text="상품 등록"
          padding="py-2"
          className="px-7 border bg-puple text-white border-puple hover:bg-white hover:text-puple"
        />
      </Link>
    )
  );
}
