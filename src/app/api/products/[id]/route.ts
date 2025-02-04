import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });
  return NextResponse.json(product, {status: 200});
}
