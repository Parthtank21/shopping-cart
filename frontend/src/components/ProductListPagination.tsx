"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ProductListPagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem onClick={() => onPageChange(currentPage - 1)}>
          <PaginationPrevious />
        </PaginationItem>
        {Array(totalPages)
          .fill(0)
          .map((item: unknown, idx: number) => {
            return (
              <PaginationItem key={idx} onClick={() => onPageChange(idx + 1)}>
                <PaginationLink isActive={currentPage === idx + 1}>
                  {idx + 1}
                </PaginationLink>
              </PaginationItem>
            );
          })}
        <PaginationItem onClick={() => onPageChange(currentPage + 1)}>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ProductListPagination;
