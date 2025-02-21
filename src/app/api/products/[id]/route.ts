import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ProductsService } from "@/services/products.service";
import { handleError } from "@/middlewares/error-handler";

export async function GET( { params }: { params: { id: string } }) {

  const {id} = await params;

  const productService = new ProductsService();
  try {

    const product = await productService.findById(id);
    
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

export async function DELETE( { params }: { params: { id: string } }) {

  const {id} = await params;

  const productService = new ProductsService();
  try {
    productService.delete(id);

    return NextResponse.json({ message: "Produto removido com sucesso." }, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}

// //att estoque
// export async function PATCH(req: NextRequest){

// }