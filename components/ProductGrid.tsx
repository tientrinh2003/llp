"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function ProductGrid() {
  const allProducts = Array.from({ length: 100 });
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(allProducts.length / limit);
  const startIndex = (page - 1) * limit;
  const currentProducts = allProducts.slice(startIndex, startIndex + limit);

  return (
    <div className="mx-4 sm:mx-6 my-6">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
        {/* Limit selector */}
        <div className="flex items-center gap-2">
          <span className="text-gray-600 text-sm">Hiển thị:</span>
          <Select
            defaultValue="10"
            onValueChange={(val) => {
              setLimit(Number(val));
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[80px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Page info */}
        <div className="text-sm text-gray-500">
          Trang {page}/{totalPages}
        </div>
      </div>

      {/* Product grid */}
<div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center">
        {currentProducts.map((_, index) => (
          <ProductCard key={index} />
        ))}
      </div>

      {/* Pagination */}
      <div className="w-full flex flex-col sm:flex-row sm:justify-between items-center gap-3 mt-6">
        <div className="text-sm text-gray-500 font-medium">
          {page}/{totalPages}
        </div>
        <div className="flex gap-3 flex-wrap justify-center">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
          >
            Trước
          </Button>
          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          >
            Sau
          </Button>
        </div>
      </div>
    </div>
  );
}
