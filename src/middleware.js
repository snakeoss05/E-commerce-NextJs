import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request) {
  const adminRoutes = ["/dashboard/addproduct", "/dashboard/orders"];
  const currentPath = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;

  if (!token) {
    // If the token is not present, redirect to login
    return NextResponse.redirect(new URL("/client/pages/signin", request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const isAdmin = payload.isAdmin;

    if (adminRoutes.includes(currentPath)) {
      // Check if the user is an admin
      if (!isAdmin) {
        // Redirect to login page if not an admin
        return NextResponse.redirect(
          new URL("/client/pages/signin", request.url)
        );
      }
    }
  } catch (error) {
    console.error("JWT verification failed:", error);
    // If verification fails, redirect to login
    return NextResponse.redirect(new URL("/client/pages/signin", request.url));
  }

  // Proceed to the next middleware or the requested resource
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/client/pages/myaccount/myorder",
    "/client/pages/myaccount/myaddress",
    "/client/pages/myaccount/myprofile",
    "/client/pages/myaccount",
    "/client/pages/wishlist",
    "/dashboard/orders",
    "/dashboard/addproduct", // Adding admin route to matcher
  ],
};
