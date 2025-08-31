import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect "/" về "/home"
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // Cho phép truy cập API và auth
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/auth')
  ) {
    return NextResponse.next();
  }

  // Bảo vệ /admin: chỉ cho ADMIN
  if (pathname.startsWith('/admin')) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (!token || token.role !== "ADMIN") {
      return NextResponse.redirect(new URL('/home', request.url));
    }
  }

  // Bảo vệ /user: chỉ cho user đã đăng nhập
  if (pathname.startsWith('/user')) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.redirect(new URL('/auth/sign-in', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/admin/:path*', '/user/:path*'],
};