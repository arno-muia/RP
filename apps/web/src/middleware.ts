import { auth } from "@/lib/auth-edge";
import { NextResponse } from "next/server";
import {
  canAccessOpsRoute,
  getDefaultRedirectForRole,
  isOpsPath,
  isPublicPath,
} from "@/lib/rbac";

export default auth((req) => {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role;
  const mustChangePassword = req.auth?.user?.mustChangePassword;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  if (!isLoggedIn) {
    const loginUrl = new URL("/login", nextUrl);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (mustChangePassword && pathname !== "/change-password") {
    const changeUrl = new URL("/change-password", nextUrl);
    changeUrl.searchParams.set(
      "callbackUrl",
      nextUrl.searchParams.get("callbackUrl") ||
        getDefaultRedirectForRole(userRole),
    );
    return NextResponse.redirect(changeUrl);
  }

  if (isOpsPath(pathname) && !canAccessOpsRoute(pathname, userRole)) {
    if (userRole === "MEMBER") {
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
    return NextResponse.redirect(
      new URL("/login?error=InsufficientPermissions", nextUrl),
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico|manifest.json|robots.txt|sitemap.xml).*)"],
};
