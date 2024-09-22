import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getProducts } from "../api/firebase";
import Header from "../components/common/Header";
import SearchHeader from "../components/common/SearchHeader";
import ProductSkeleton from "../components/skeleton/ProductSkeleton";

import { Product } from "../types/mainType";
import FilterBar from "../components/products/FilterBar";
import ProductGrid from "../components/main/ProductGrid";

interface Filter {
  text: string;
  name: string;
}

export default function Products() {
  const filters: Filter[] = [
    { text: "전체", name: "all" },
    { text: "아우터", name: "outer" },
    { text: "상의", name: "top" },
    { text: "하의", name: "bottom" },
    { text: "신발", name: "shose" },
    { text: "모자", name: "cap" },
  ];
  const [filter, setFilter] = useState<Filter>(filters[0]);
  const {
    isLoading,
    error,
    data: products,
  } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  const filtered: Product[] = getFilteredItems(products || [], filter.name);

  function getFilteredItems(products: Product[], filter: string): Product[] {
    if (filter === "all") {
      return products;
    }
    return products.filter((product) => product.category === filter);
  }

  if (error)
    return (
      <div>
        <p>데이터를 가져오는 동안 문제가 발생했습니다</p>
        <p className="cursor-pointer" onClick={() => window.location.reload()}>
          geekchic 상품 페이지 새로고침
        </p>
      </div>
    );

  return (
    <div className="h-full min-h-screen">
      <Header />
      <SearchHeader />
      {isLoading ? (
        <ProductSkeleton />
      ) : (
        <>
          <FilterBar
            filters={filters}
            selectedFilter={filter}
            onFilterSelect={setFilter}
          />
          <ProductGrid products={filtered} />
        </>
      )}
    </div>
  );
}
