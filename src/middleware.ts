import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Protect SME routes
    if (path.startsWith("/sme") && token?.role !== "SME") {
      return NextResponse.redirect(new URL("/auth/sme/login", req.url));
    }

    // Protect investor routes
    if (path.startsWith("/investor") && token?.role !== "INVESTOR") {
      return NextResponse.redirect(new URL("/auth/investor/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
);

export const config = {
  matcher: [
    // "/sme/:path*",
    // "/investor/:path*",
    "/sme/dashboard/:path*",
    "/api/protected/:path*",
    "/fintrack/:path*",
    "/api/fintrack/:path*",  
    "/kyc"
  ]
};
