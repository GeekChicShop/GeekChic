import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useProducts, addNewProduct } from "../api/firebase";
import { Product, AddProduct } from "../types/mainType";

interface AddProductVariables {
  product: AddProduct;
  file: string[];
}

export default function useProduct(searchKeyword: string) {
  const { search } = useProducts();

  const queryClient = useQueryClient();
  const productsQuery = useQuery<Product[], Error>({
    queryKey: searchKeyword ? ["products", searchKeyword] : ["products"],
    queryFn: () => search(searchKeyword),
  });

  const addProduct = useMutation<void, Error, AddProductVariables>({
    mutationFn: ({ product, file }) => addNewProduct(product, file),
    onSuccess: async () =>
      await queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  return { productsQuery, addProduct };
}
