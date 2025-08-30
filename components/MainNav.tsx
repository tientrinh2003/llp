"use client";

import { useEffect, useState } from "react";
import {
  Home,
  Package,
  Wrench,
  Newspaper,
  Users,
  Search,
  X,
  ShoppingCart,
  Menu,
  LogIn,
  LogOut,
  User,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

const navItems = [
  { icon: Home, label: "Trang chủ", href: "/" },
  { icon: Package, label: "Sản phẩm", href: "/products" },
  { icon: Wrench, label: "Công trình", href: "/projects" },
  { icon: Newspaper, label: "Tin tức", href: "/news" },
  { icon: Users, label: "Tuyển dụng", href: "/careers" },
];

const MainNav = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/sign-in" });
  };

  return (
    <nav className="bg-primary h-[100px] flex items-center justify-between px-4 md:px-8 relative">
      {/* Logo + Search */}
      <div className="flex items-center gap-4 flex-grow min-w-0">
        {/* Logo */}
        <div className="text-[40px] md:text-[90px] text-white font-stencil flex-shrink-0">
          llp
        </div>

        {/* Search + Cart */}
        <div className="flex items-center gap-2 md:gap-4 flex-grow min-w-0">
          <div className="relative flex-grow min-w-0">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={20}
            />

            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Nhập sản phẩm bạn đang tìm..."
              className="h-10 md:h-12 pl-12 pr-12 rounded-full bg-accent placeholder:text-muted-foreground border-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring w-full"
            />

            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
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
            className="rounded-full bg-white/30 text-primary-foreground hover:bg-white/50 flex-shrink-0"
          >
            <ShoppingCart size={24} />
          </Button>
        </div>
      </div>

      {/* Navigation Links (Desktop) */}
      <ul className="hidden lg:flex items-center space-x-4 md:space-x-8 ml-4 md:ml-8">
        {navItems.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="flex items-center gap-2 text-primary-foreground hover:text-foreground/80 transition-colors"
            >
              <item.icon size={20} />
              <span className="font-medium text-muted-foreground">
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Đăng nhập/Đăng xuất/Avatar */}
      <div className="ml-2 md:ml-6 flex items-center gap-2">
        {status === "loading" ? (
          <span className="text-white">...</span>
        ) : session?.user ? (
          <>
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || "User"}
                width={32}
                height={32}
                className="rounded-full"
              />
            ) : (
              <User size={28} className="text-white" />
            )}
            <span className="hidden sm:inline text-white font-medium truncate max-w-[120px]">
              {session.user.name ||
                session.user.username ||
                session.user.email}
            </span>
            <Button
              variant="ghost"
              className="text-white flex gap-2 items-center"
              onClick={handleSignOut}
            >
              <LogOut size={20} />
              <span className="hidden sm:inline">Đăng xuất</span>
            </Button>
          </>
        ) : (
          <Link href="/sign-in">
            <Button
              variant="ghost"
              className="text-white flex gap-2 items-center"
            >
              <LogIn size={20} />
              <span className="hidden sm:inline">Đăng nhập</span>
            </Button>
          </Link>
        )}
      </div>

      {/* Hamburger Menu Button (Mobile) */}
      <button
        className="lg:hidden ml-2 md:ml-4 text-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-primary shadow-lg md:hidden z-50">
          <ul className="flex flex-col items-start p-4 space-y-4 text-sm">
            {navItems.map((item) => (
              <li key={item.label} className="w-full">
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 text-white hover:text-foreground transition-colors w-full"
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
            <li className="w-full border-t pt-3 mt-3 flex items-center gap-2">
              {session?.user ? (
                <>
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  ) : (
                    <User size={18} className="text-white" />
                  )}
                  <span className="text-white truncate max-w-[100px] text-sm">
                    {session.user.name ||
                      session.user.username ||
                      session.user.email}
                  </span>
                  <Button
                    variant="ghost"
                    className="text-white text-sm p-1"
                    onClick={handleSignOut}
                  >
                    <LogOut size={16} />
                    Đăng xuất
                  </Button>
                </>
              ) : (
                <Link href="/sign-in" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    className="text-white text-sm flex gap-1 items-center p-1"
                  >
                    <LogIn size={16} />
                    Đăng nhập
                  </Button>
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default MainNav;
