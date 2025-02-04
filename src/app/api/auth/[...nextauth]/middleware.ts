import { auth } from "@/auth";

export default auth((req) => {
  if (req.auth?.user.role !== "ADMIN") {
    const newUrl = new URL("/public/auth", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})

export const config = {
  matcher: [
    "/api/admin/:path*",
    "/private/:path*",
  ], 
};