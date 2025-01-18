import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  //criar produtos
  try {
    const body = await req.json();
    const product = await prisma.product.create({
      data: body
    });
    return NextResponse.json(product, { status: 201 });
    
  } catch (error) {
    return new NextResponse("Erro ao criar produto", { status: 500 });
  }
}

export async function GET() {
  
  //listar produtos
  const products = await prisma.product.findMany();
  return NextResponse.json(products, { status: 200 });
}