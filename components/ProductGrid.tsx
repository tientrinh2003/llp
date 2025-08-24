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
  const allProducts = Array.from({ length: 100 }); // giả sử có 100 sản phẩm
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(allProducts.length / limit);

  const startIndex = (page - 1) * limit;
  const currentProducts = allProducts.slice(startIndex, startIndex + limit);

  return (
    <div className="mx-6 my-6">
      <div className="flex items-center justify-between mb-4">
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

        {/* Thông tin trang */}
        <div className="text-sm text-gray-500">
          Trang {page}/{totalPages}
        </div>
      </div>

      {/* Grid sản phẩm (responsive bằng auto-fit) */}
      <div className="grid gap-4 justify-center grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        {currentProducts.map((_, index) => (
          <div key={index} className="flex justify-center">
            <ProductCard />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="w-full flex flex-col items-center gap-2 mt-6">
      <div className="text-sm text-gray-500 font-medium">
          {page}/{totalPages}
        </div>
      <div className="flex justify-center items-center gap-4">
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
