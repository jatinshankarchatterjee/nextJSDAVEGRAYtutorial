import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest } from "next/server";

export default withAuth(
  async function middleware(req: NextRequest) {
    return withAuth(req);
  },
  { redirect: "/dashboard" }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - images (image files)
     * - favicon.ico (favicon file)
     * - robots.txt (robots file)
     * - login
     */
    "/((?!api|_next/static|_next/image|images|favicon.ico|robots.txt|login).*)",
  ],
};
