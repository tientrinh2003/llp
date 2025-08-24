// app/page.tsx
import ProductCarousel from "@/components/ProductCarousel";
import ProductGrid from "@/components/ProductGrid";
import Header from "@/components/Header";

export default function HomePage() {
  return (
    <>
      <div className="bg-background relative">
        <Header />
        <ProductCarousel />
      </div>
      <div
        className="my-3 mx-6 h-[62px] flex items-center justify-center 
                bg-gradient-to-r from-primary via-ring to-primary"
      >
        <p className="text-[24px] text-white">Thông tin khuyến mãi</p>
      </div>
      <div className="flex items-center gap-4 mx-6 my-4 text-gray-400">
        <span className="flex-1 w-5 h-[1px] bg-gray-300"></span>
        <span className="whitespace-nowrap text-[18px]">
          Thiết bị mạng máy tính
        </span>
        <span className="flex-1 h-[1px] bg-gray-300"></span>
      </div>
      <div className="bg-background relative">
        <ProductGrid />
      </div>
    </>
  );
}
