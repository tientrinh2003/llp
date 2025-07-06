// app/components/Sidebar.tsx
import { Search, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Sidebar = () => {
  return (
    // Đảm bảo màu nền và bố cục đúng
    <aside className="w-20 bg-[#e4c590] h-screen flex-col items-center py-8 space-y-6 sticky top-0 hidden md:flex">
      {/* Nút bấm có nền tròn, trắng mờ và icon màu trắng */}
      <Button variant="ghost" size="icon" className="rounded-full bg-white/30 text-white hover:bg-white/50">
        <Search size={24} />
      </Button>
      <Button variant="ghost" size="icon" className="rounded-full bg-white/30 text-white hover:bg-white/50">
        <Globe size={24} />
      </Button>
    </aside>
  );
};

export default Sidebar;