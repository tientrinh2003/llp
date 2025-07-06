// app/components/MainNav.tsx
import { Home, Package, Wrench, Newspaper, Users } from 'lucide-react';
import Link from 'next/link';

const navItems = [
  { icon: Home, label: 'Trang chủ', href: '/' },
  { icon: Package, label: 'Sản phẩm', href: '/products' },
  { icon: Wrench, label: 'Công trình', href: '/projects' },
  { icon: Newspaper, label: 'Tin tức', href: '/news' },
  { icon: Users, label: 'Tuyển dụng', href: '/careers' },
];

const MainNav = () => {
  return (
    <nav className="bg-[#e4c590] h-[100px] flex items-center justify-between px-8">
      {/* Logo */}
      <div className="text-[100px] font-bold text-white">
        llp
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex items-center space-x-8">
        {navItems.map((item) => (
          <li key={item.label}>
            <Link href={item.href} className="flex items-center gap-2 text-white hover:text-gray-800 transition-colors">
              <item.icon size={20} />
              <span className="font-medium text-[#454545B2]">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MainNav;