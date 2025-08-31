import Link from "next/link";

type Product = {
  id: string;
  name: string;
  price: number;
  images: { url: string }[];
};

export default function ProductItem({ product }: { product: Product }) {
  const imageUrl = product.images.length > 0 ? product.images[0].url : "/placeholder.png";

  return (
    <div className="w-full max-w-[260px] h-[320px] rounded-lg shadow-md relative overflow-hidden flex flex-col bg-white">
      {/* Badge giảm giá */}
      <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
        Giảm 10%
      </div>

      {/* Badge trả góp */}
      <div className="absolute top-2 right-2 bg-blue-100 text-blue-600 text-[10px] font-semibold px-2 py-0.5 rounded">
        Trả góp 0%
      </div>

      {/* Ảnh sản phẩm */}
      <div className="flex justify-center items-center h-[140px] mt-4">
        <img src={imageUrl} alt={product.name} className="max-h-[120px] object-contain" />
      </div>

      {/* Nội dung */}
      <div className="flex flex-col justify-between flex-1 p-3">
        <p className="text-gray-700 font-medium text-xs mt-2 text-center line-clamp-2">
          {product.name}
        </p>

        <div className="mt-2 text-center">
          <p className="text-red-600 font-bold text-base leading-none">
            {Number(product.price).toLocaleString()}₫
          </p>
          <p className="text-gray-400 line-through text-xs leading-none">
            {(Number(product.price) * 1.1).toLocaleString()}₫
          </p>
        </div>

        <div className="flex items-center justify-between w-full mt-2">
          <div className="text-yellow-500 text-xs font-medium flex items-center gap-1">
            ★ 4.9
          </div>
          <Link href={`/admin/products/${product.id}/edit`} className="text-blue-500 text-xs hover:underline">
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}
