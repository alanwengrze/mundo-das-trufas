import { prisma } from "@/lib/prisma";
import { handleError } from "@/middlewares/error-handler";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if(!body.name || !body.email) {
      return new NextResponse("Missing fields", { status: 400 });
    }
    const user = await prisma.user.create({
      data: body,
    });
    return NextResponse.json(user, { status: 201 });
    
  } catch (error) {
    return handleError(error);
  }
 
}

// export async function GET() {
//   const users = await prisma.user.findMany();
//   return NextResponse.json(users, { status: 200 });
// }