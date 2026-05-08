import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
  const isInternalApi = nextUrl.pathname.startsWith("/api/internal");
  const isPublicRoute = ["/login", "/verify", "/error", "/intake", "/auth"].some((p) =>
    nextUrl.pathname.startsWith(p)
  );

  if (isApiAuthRoute) return NextResponse.next();
  if (isInternalApi) return NextResponse.next();
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/webhooks).*)"],
};
