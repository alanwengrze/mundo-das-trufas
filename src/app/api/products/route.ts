import { NextResponse, NextRequest } from "next/server";
import { ProductsService } from "@/services/products-service";
import { handleError } from "@/middlewares/error-handler";

export async function POST(req: NextRequest) {

  try {
    //pegar os dados do body
    const body = await req.json();

    //service
    const productService = new ProductsService();
    const product = await productService.create(body);
    return NextResponse.json(product, { status: 201 });
    
  } catch (error) {
    return handleError(error);
  }
}

export async function GET() {
  const productService = new ProductsService();
  try {
    const products = await productService.findAll();

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
  
}