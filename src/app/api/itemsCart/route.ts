import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const itemCart = await prisma.itemCart.create({
      data: body,
    });
    return NextResponse.json(itemCart, { status: 201 });
  } catch (error) {
    return new NextResponse("Erro ao criar produto", { status: 500 });
  }
}