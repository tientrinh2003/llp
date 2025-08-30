import Link from "next/link";
import { LayoutDashboard, Newspaper, Package, Percent, Users } from "lucide-react";

const adminLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard size={24} /> },
  { href: "/admin/news", label: "News", icon: <Newspaper size={24} /> },
  { href: "/admin/products", label: "Products", icon: <Package size={24} /> },
  { href: "/admin/promotions", label: "Promotions", icon: <Percent size={24} /> },
  { href: "/admin/users", label: "Users", icon: <Users size={24} /> },
];

const AdminSidebar = () => (
  <aside className="w-56 bg-secondary h-screen flex flex-col items-center py-8 space-y-4 sticky top-0 shadow-md">
    {adminLinks.map(link => (
      <Link
        key={link.href}
        href={link.href}
        className="flex items-center gap-3 w-44 px-4 py-2 rounded-lg hover:bg-white/30 text-primary-foreground transition"
      >
        {link.icon}
        <span className="font-medium">{link.label}</span>
      </Link>
    ))}
  </aside>
);

export default AdminSidebar;