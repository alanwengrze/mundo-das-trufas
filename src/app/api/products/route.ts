import { NextResponse, NextRequest } from "next/server";
import { ProductsService } from "@/services/products-service";

export async function POST(req: NextRequest) {

  try {
    //pegar os dados do body
    const body = await req.json();

    //service
    const productService = new ProductsService();
    const product = await productService.create(body);
    return NextResponse.json(product, { status: 201 });
    
  } catch (error) {
    return new NextResponse("Erro ao criar produto no servidor", { status: 500 });
  }
}

export async function GET() {
  const productService = new ProductsService();
  const products = await productService.findAll();

  return NextResponse.json(products, { status: 200 });
}