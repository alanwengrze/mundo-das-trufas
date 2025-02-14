import { auth } from "@/auth"
import { NextResponse, type NextRequest } from "next/server"
 
export async function middleware(req: NextRequest){
  const session = await auth()
  console.log("Middleware - Sessão do usuário:", session)

  if (!session?.user?.id) {
    return NextResponse.redirect(new URL("/public/auth", req.url)) // Redireciona para login
  }

  return NextResponse.next() 
};
 
// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}