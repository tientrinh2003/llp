// app/components/MainNav.tsx
"use client";

import { useState } from 'react';
import { Home, Package, Wrench, Newspaper, Users, Search, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import Link from 'next/link';

const navItems = [
  { icon: Home, label: 'Trang chủ', href: '/' },
  { icon: Package, label: 'Sản phẩm', href: '/products' },
  { icon: Wrench, label: 'Công trình', href: '/projects' },
  { icon: Newspaper, label: 'Tin tức', href: '/news' },
  { icon: Users, label: 'Tuyển dụng', href: '/careers' },
];

const MainNav = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <nav className="bg-primary h-[100px] flex items-center justify-between px-8">
      <div className="text-[100px] font-bold text-white font-stencil">
        llp
      </div>

      <div className="relative flex-grow max-w-xl mx-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
        
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Nhập sản phẩm bạn đang tìm..."
          // THAY ĐỔI: bg-[#fffbe9] -> bg-accent
          // THAY ĐỔI: placeholder:text-gray-500 -> placeholder:text-muted-foreground
          // THAY ĐỔI: focus-visible:ring-[#facc15] -> focus-visible:ring-ring (ring đã được định nghĩa trong globals.css)
          className="h-12 pl-12 pr-12 rounded-full bg-accent placeholder:text-muted-foreground border-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring"
        />
        
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm('')} 
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex items-center space-x-8">
        {navItems.map((item) => (
          <li key={item.label}>
             {/* THAY ĐỔI: text-white -> text-primary-foreground */}
            <Link href={item.href} className="flex items-center gap-2 text-primary-foreground hover:text-foreground/80 transition-colors">
              <item.icon size={20} />
              {/* THAY ĐỔI: text-[#454545B2] -> text-muted-foreground */}
              <span className="font-medium text-muted-foreground">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MainNav;