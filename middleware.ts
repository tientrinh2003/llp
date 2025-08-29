import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = [
  "/", "/sign-in", "/sign-up", "/products", "/news", "/promotions"
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    PUBLIC_PATHS.some(
      (path) =>
        pathname === path ||
        pathname.startsWith(path + "/") ||
        pathname.startsWith(path + "?")
    )
  ) {
    return NextResponse.next();
  }

  const sessionToken =
    request.cookies.get("next-auth.session-token") ||
    request.cookies.get("__Secure-next-auth.session-token");

  if (!sessionToken) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

// Không dùng capturing group, chỉ dùng pattern đơn giản
export const config = {
  matcher: [
    "/((?!_next|static|api|favicon.ico|products|news|promotions|sign-in|sign-up|.*\\.(png|jpg|jpeg|svg|css|js|json)).*)",
  ],
};