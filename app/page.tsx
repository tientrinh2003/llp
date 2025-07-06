// app/page.tsx
import Header from '@/components/Header';
import MainNav from '@/components/MainNav';
import ProductCarousel from '@/components/ProductCarousel';
import Sidebar from '@/components/Sidebar';

export default function HomePage() {
  return (
    <>
    <div className='py-16 bg-background relative overflow-hidden sm:px-12 lg:px-32 xl:px-30'>
      {/* 1. Header */}
      <Header />
      
      {/* 2. Product Carousel */}
      <ProductCarousel />
      </div>
      {/* 3. MainNav - Nằm ngay dưới Carousel */}
      <MainNav />

      {/* 4. Khu vực nội dung chính ở dưới cùng */}
      <div className="flex">
        <Sidebar />
        
        {/* Phần nội dung trống bên phải Sidebar */}
        <div className="flex-1 bg-white">
            {/* Để đảm bảo khu vực này có chiều cao, bạn có thể thêm class
                ví dụ: min-h-[500px] hoặc để nó tự giãn theo nội dung sau này */}
        </div>
      </div>
    </>
  );
}