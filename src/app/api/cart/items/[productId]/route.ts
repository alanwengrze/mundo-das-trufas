import { NextResponse } from "next/server";
import { ItemsCartService } from "@/services/itemsCart.service";
import { handleError } from "@/middlewares/error-handler";
import { AppError } from "@/errors/app-error";
// Remover item do carrinho
export async function DELETE( req: Request, {params}: {params: Promise<{productId: string}>}) {
  console.log(req)
  const productId = (await params).productId;
  const itemsCartService = new ItemsCartService();

  try {

    if(!productId) throw new AppError("Produto não encontrado.");

    await itemsCartService.remove(productId);

    return NextResponse.json({ message: "Item do carrinho removido com sucesso." }, { status: 200 });
  }catch (error) {
    return handleError(error);
  }
}
export async function PATCH(req: Request, {params}: {params: Promise<{productId: string}>}) {
  const productId = (await params).productId;
  const { quantity } = await req.json();
  const itemsCartService = new ItemsCartService();

  try {

    if(!productId) throw new AppError("productId ausente");

    await itemsCartService.update(productId, quantity);

    return NextResponse.json({ message: "Item do carrinho atualizado com sucesso." }, { status: 200 });

  }catch (error) {
    return handleError(error);
  }
}