import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const userId = url.pathname.split("/").pop();
  const cart = await prisma.cart.create({
    data: {
      userId: userId,
    }
  })

  return NextResponse.json(cart, { status: 201 });
}