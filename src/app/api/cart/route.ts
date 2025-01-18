import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cart = await prisma.cart.findMany({
    select: {
      id: true,
      userId: true,
      itemsCart: true
    }
  });
  return NextResponse.json(cart, { status: 200 });
}