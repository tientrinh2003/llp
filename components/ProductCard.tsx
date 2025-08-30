import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function ProductCard() {
  return (
    <Card className="w-full max-w-[260px] h-[320px] rounded-lg shadow-md relative overflow-hidden flex flex-col">
      {/* Badge giảm giá */}
      <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
        Giảm 14%
      </div>

      {/* Badge trả góp */}
      <div className="absolute top-2 right-2 bg-blue-100 text-blue-600 text-[10px] font-semibold px-2 py-0.5 rounded">
        Trả góp 0%
      </div>

      <CardContent className="flex flex-col items-center justify-between h-full p-3">
        {/* Ảnh sản phẩm */}
        <div className="flex justify-center items-center h-[120px]">
          <Image
            src="/iphone16.png"
            alt="iPhone 16 Pro Max"
            width={100}
            height={100}
            className="object-contain"
          />
        </div>

        {/* Tên sản phẩm */}
        <p className="text-gray-700 font-medium text-xs mt-2 text-center line-clamp-2">
          iPhone 16 Pro Max 256GB | Chính hãng VN/A
        </p>

        {/* Giá */}
        <div className="mt-2 text-center">
          <p className="text-red-600 font-bold text-base leading-none">
            29.990.000₫
          </p>
          <p className="text-gray-400 line-through text-xs leading-none">
            34.990.000₫
          </p>
        </div>

        {/* Rating + Yêu thích */}
        <div className="flex items-center justify-between w-full mt-2">
          <div className="flex items-center text-yellow-500 text-xs font-medium">
            <Star className="w-3 h-3 fill-yellow-500" /> 4.9
          </div>
          <button className="text-blue-500 text-xs hover:underline">
            Yêu thích
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
