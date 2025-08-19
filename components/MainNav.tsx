"use client";

import { useState } from 'react';
import { Home, Package, Wrench, Newspaper, Users, Search, X, ShoppingCart, Menu } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-primary h-[100px] flex items-center justify-between px-8 relative">
      {/* Logo + Search */}
      <div className="flex items-center gap-6 flex-grow">
        {/* Logo */}
        <div className="text-[90px] text-white font-stencil">
          llp
        </div>

        {/* Search + Cart */}
        <div className="flex items-center gap-4 flex-grow">
          <div className="relative flex-grow">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={20}
            />

            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Nhập sản phẩm bạn đang tìm..."
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

          {/* Shopping Cart Button */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/30 text-primary-foreground hover:bg-white/50"
          >
            <ShoppingCart size={24} />
          </Button>
        </div>
      </div>

      {/* Navigation Links (Desktop) */}
      <ul className="hidden lg:flex items-center space-x-8 ml-8">
        {navItems.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="flex items-center gap-2 text-primary-foreground hover:text-foreground/80 transition-colors"
            >
              <item.icon size={20} />
              <span className="font-medium text-muted-foreground">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Hamburger Menu Button (Mobile) */}
      <button
        className="lg:hidden ml-4 text-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-primary shadow-lg md:hidden z-50">
          <ul className="flex flex-col items-start p-4 space-y-4">
            {navItems.map((item) => (
              <li key={item.label} className="w-full">
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 text-white hover:text-foreground transition-colors w-full"
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default MainNav;
