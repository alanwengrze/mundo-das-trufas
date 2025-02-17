import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from "./auth"

export async function middleware(request: NextRequest) {
  const session = await auth();

  if(request.nextUrl.pathname.startsWith("/public/orders")){
    if(!session){
      return NextResponse.redirect(new URL("/public/auth", request.url));
    }
    return NextResponse.next();
  }

  // Rota de login
  if (request.nextUrl.pathname.startsWith("/public/auth")) {
    if (session) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

 // Rota de admin
 if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/public/auth", request.url)); // Redireciona não-admins para login
    }
    return NextResponse.next();
  }

  // Rotas publicas
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin/:path*", "/public/:path*"],
}