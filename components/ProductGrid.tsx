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
      {/* Bộ chọn số lượng */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-600 text-sm">Hiển thị:</span>
          <Select
            defaultValue="10"
            onValueChange={(val) => {
              setLimit(Number(val));
              setPage(1); // reset về trang đầu khi đổi limit
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

      {/* Grid sản phẩm */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentProducts.map((_, index) => (
          <ProductCard key={index} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
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
  );
}
