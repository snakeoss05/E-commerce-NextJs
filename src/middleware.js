import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const adminRoutes = ["/dashboard/addproduct"];
  const currentPath = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;
  if (adminRoutes.includes(currentPath)) {
    // Check if the user is an admin

    if (!isAdmin && !token) {
      // Redirect to login page if not an admin
      return NextResponse.redirect(
        new URL("/client/pages/signin", request.url)
      );
    }
  } else {
    // Check if the user is authenticated for other protected routes
    if (!token) {
      // Redirect to login page if not authenticated
      return NextResponse.redirect(
        new URL("/client/pages/signin", request.url)
      );
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/client/pages/myaccount/myorder",
    "/client/pages/myaccount/myaddress",
    "/client/pages/myaccount/myprofile",
    "/client/pages/myaccount",
    "/client/pages/wishlist",
  ],
};
