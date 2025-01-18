import { prisma } from "@/lib/prisma";
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
    return new NextResponse("Erro ao criar usuário", { status: 500 });
  }
 
}

export async function GET(req: NextRequest) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users, { status: 200 });
}