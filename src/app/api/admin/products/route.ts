import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/schemas/product.schema";
export async function POST(req: NextRequest) {
  //criar produtos
  try {
    
    //pegar os dados do body
    const body = await req.json();

    //validar os dados (adiciona a tipagem de productSchema ao body)
    const validatedData = productSchema.parse(body);

    const product = await prisma.product.create({
      data: validatedData
    });
    return NextResponse.json(product, { status: 201 });
    
  } catch (error) {
    return new NextResponse("Erro ao criar produto no servidor", { status: 500 });
  }
}