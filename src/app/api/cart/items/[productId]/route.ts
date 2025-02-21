import { NextResponse } from "next/server";
import { ItemsCartService } from "@/services/itemsCart.service";
import { handleError } from "@/middlewares/error-handler";
import { AppError } from "@/errors/app-error";
// Remover item do carrinho
export async function DELETE( { params }: { params: { productId: string } }) {

  const { productId } = await params;
  const itemsCartService = new ItemsCartService();

  try {

    if(!productId) throw new AppError("Produto não encontrado.");

    await itemsCartService.remove(productId);

    return NextResponse.json({ message: "Item do carrinho removido com sucesso." }, { status: 200 });
  }catch (error) {
    return handleError(error);
  }
}
export async function PATCH(request: Request, { params }: { params: { productId: string } }) {
  const { productId } = await params;
  const { quantity } = await request.json();
  const itemsCartService = new ItemsCartService();

  try {

    if(!productId) throw new AppError("productId ausente");

    await itemsCartService.update(productId, quantity);

    return NextResponse.json({ message: "Item do carrinho atualizado com sucesso." }, { status: 200 });

  }catch (error) {
    return handleError(error);
  }
}