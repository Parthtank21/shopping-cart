"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/apis/product-apis";
import { IProduct } from "@/interfaces/product.interface";
import ProductListPagination from "@/components/ProductListPagination";

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;

  const { data, isPending, isError } = useQuery({
    queryKey: ["getAllProducts", currentPage],
    queryFn: () => getAllProducts(currentPage, limit),
  });

  const totalProducts = data?.pagination!.totalProducts || 0;
  const totalPages = Math.ceil(totalProducts / limit);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Something went wrong</span>;
  }

  return (
    <>
      <div className="mb-5">
        <h1 className="text-3xl font-bold mb-2">Products</h1>
        <p>List of all available products.</p>
      </div>
      <div className="flex flex-wrap gap-5 mb-5">
        {data.data.length === 0
          ? "No products Available"
          : data.data.map((product: IProduct) => {
              return <ProductCard key={product._id} product={product} />;
            })}
      </div>
      <div>
        <ProductListPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default Page;
