"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { LayoutDashboard, Newspaper, Package, Percent, Users, LogOut, LogIn, User } from "lucide-react";

const adminLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard size={24} /> },
  { href: "/admin/news", label: "News", icon: <Newspaper size={24} /> },
  { href: "/admin/products", label: "Products", icon: <Package size={24} /> },
  { href: "/admin/promotions", label: "Promotions", icon: <Percent size={24} /> },
  { href: "/admin/users", label: "Users", icon: <Users size={24} /> },
];

const AdminSidebar = () => {
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/sign-in" });
  };

  return (
    <aside className="w-56 bg-secondary h-screen flex flex-col items-center py-8 space-y-4 sticky top-0 shadow-md">
      {/* User Info */}
      <div className="mb-6 flex flex-col items-center gap-2">
        {status === "loading" ? (
          <span className="text-primary-foreground">...</span>
        ) : session?.user ? (
          <>
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || "User"}
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <User size={32} className="text-primary-foreground" />
            )}
            <span className="text-primary-foreground font-medium text-center max-w-[120px] truncate">
              {session.user.name || session.user.username || session.user.email}
            </span>
            <button
              className="flex items-center gap-2 text-primary-foreground hover:underline text-sm"
              onClick={handleSignOut}
            >
              <LogOut size={18} />
              Đăng xuất
            </button>
          </>
        ) : (
          <Link href="/sign-in">
            <button className="flex items-center gap-2 text-primary-foreground hover:underline text-sm">
              <LogIn size={18} />
              Đăng nhập
            </button>
          </Link>
        )}
      </div>
      {/* Admin Links */}
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
};

export default AdminSidebar;