import { prisma } from "@/lib/prisma";
import { productSchema } from "@/schemas/product.schema";
import { NextResponse, NextRequest } from "next/server";


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

export async function GET() {
  
  //listar produtos
  const products = await prisma.product.findMany();
  return NextResponse.json(products, { status: 200 });
}