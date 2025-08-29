import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedPaths = ['/admin', '/user'];

function isProtectedPath(pathname: string) {
  return protectedPaths.some((basePath) => pathname.startsWith(basePath));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/api') ||
    pathname === '/' ||
    pathname.startsWith('/auth')
  ) {
    return NextResponse.next();
  }

  // Protect /admin and /user routes
  if (isProtectedPath(pathname)) {
    const token =
      request.cookies.get('next-auth.session-token')?.value ||
      request.cookies.get('__Secure-next-auth.session-token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/user/:path*'],
};