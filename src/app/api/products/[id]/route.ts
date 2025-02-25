import { NextRequest, NextResponse } from "next/server";
import { ProductsService } from "@/services/products.service";
import { handleError } from "@/middlewares/error-handler";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  console.log(req);
  const id = (await params).id;

  const productService = new ProductsService();
  try {

    const product = await productService.findById(id);
    
    return NextResponse.json(product, {status: 200});
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const data = await req.json();
  const productService = new ProductsService();
  try {
    await productService.update(id, data);
    return NextResponse.json({message: "Produto atualizado com sucesso."}, {status: 200});
  } catch (error) {
    return handleError(error);
  }
  
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  console.log(req);
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