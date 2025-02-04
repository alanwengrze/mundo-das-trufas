import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { productSchema } from "@/schemas/product.schema";

export async function PUT(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();
    const body = await req.json();
    const validatedData = productSchema.parse(body);
    const product = await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        ...validatedData,
        updatedAt: new Date(),
      },
    });
    return NextResponse.json(product, { status: 200 });
  }catch (error) {
    return new NextResponse("Erro ao atualizar produto", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    const product = await prisma.product.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(product, { status: 200 });
  }catch (error) {
    return new NextResponse("Erro ao deletar produto", { status: 500 });
  }
}