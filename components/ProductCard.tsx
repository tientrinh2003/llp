import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function ProductCard() {
  return (
    <Card className="w-full rounded-xl shadow-md relative overflow-hidden">
      {/* Badge Giảm giá */}
      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
        Giảm 14%
      </div>

      {/* Badge Trả góp */}
      <div className="absolute top-2 right-2 bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded">
        Trả góp 0%
      </div>

      {/* Hình sản phẩm */}
      <CardContent className="p-4 flex flex-col items-center">
        <Image
          src="/iphone16.png"
          alt="iPhone 16 Pro Max"
          width={120}
          height={120}
          className="object-contain"
        />

        {/* Tên sản phẩm */}
        <p className="text-gray-700 font-medium text-sm mt-3 text-center line-clamp-2">
          iPhone 16 Pro Max 256GB | Chính hãng VN/A
        </p>

        {/* Giá */}
        <div className="mt-2 text-center">
          <p className="text-red-600 font-bold text-lg">29.990.000₫</p>
          <p className="text-gray-400 line-through text-sm">34.990.000₫</p>
        </div>

        {/* Smember giảm giá */}
        <p className="bg-gray-100 text-gray-600 text-xs mt-2 px-2 py-1 rounded">
          Smember giảm đến 300.000₫
        </p>

        {/* Mô tả thêm */}
        <p className="text-gray-500 text-xs text-center mt-1 line-clamp-2">
          Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng kỳ hạn 3–6...
        </p>

        {/* Rating + Yêu thích */}
        <div className="flex items-center justify-between w-full mt-3">
          <div className="flex items-center text-yellow-500 text-sm font-medium">
            <Star className="w-4 h-4 fill-yellow-500" /> 4.9
          </div>
          <button className="text-blue-500 text-sm hover:underline">
            Yêu thích
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
