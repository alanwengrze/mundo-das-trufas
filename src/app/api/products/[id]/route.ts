import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ProductsService } from "@/services/products.service";
import { handleError } from "@/middlewares/error-handler";
import { AppError } from "@/errors/app-error";
export async function GET(req: NextRequest) {

  const productService = new ProductsService();
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if(!id) throw new AppError("id ausente");

    const product = await productService.findById(id!);
    return NextResponse.json(product, {status: 200});
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(req: NextRequest){
  const body = await req.json();

  const product = await prisma.product.update({
    where: {
      id: body.id,
    },
    data: {
      name: body.name,
      description: body.description,
      price: body.price,
    },
  });
  return NextResponse.json(product, {status: 200});
}

export async function DELETE(req: NextRequest){

}

//att estoque
export async function PATCH(req: NextRequest){

}