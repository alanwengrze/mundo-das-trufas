import { NextResponse, NextRequest } from "next/server";
import { ProductsService } from "@/services/products.service";
import { handleError } from "@/middlewares/error-handler";
export async function POST(req: NextRequest) {
  try {
    console.log("🟡 Recebendo requisição no backend...");

    const body = await req.json();
    console.log("🟢 Dados recebidos no backend:", body);

    const productService = new ProductsService();
    const product = await productService.create(body);

    return NextResponse.json(product, { status: 201 });
    
  } catch (error) {
    console.error("🔴 Erro ao criar produto:", error);
    return handleError(error);
  }
}

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams.get("query") || "";
  const productService = new ProductsService();
  try {
    const products = await productService.findAll(params);

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
  
}