import { NextResponse } from "next/server";
import { ItemsCartService } from "@/services/itemsCart-service";
import { handleError } from "@/middlewares/error-handler";
import { AppError } from "@/errors/app-error";
// Remover item do carrinho
export async function DELETE(request: Request ) {

  try {
    const itemsCartService = new ItemsCartService();
    // buscar pela url
    const url = new URL(request.url);
    // cart/items/{productId}
    const productId = url.pathname.split("/").pop();

    if(!productId) return NextResponse.json({ error: "productId ausente" }, { status: 400 });

    await itemsCartService.remove(productId);


    return NextResponse.json({ message: "Item do carrinho removido com sucesso." }, { status: 200 });
  } catch (error) {
    console.error("Erro ao remover item do carrinho:", error);
    return NextResponse.json({ error: "Erro ao remover item do carrinho." }, { status: 500 });
      }
  }
export async function PATCH(request: Request) {
  try {
    const itemsCartService = new ItemsCartService();
    // buscar pela url
    const url = new URL(request.url);
    // cart/items/{productId}
    const productId = url.pathname.split("/").pop();
    const { quantity } = await request.json();

    if(!productId) throw new AppError("productId ausente");

    await itemsCartService.update(productId, quantity);

    return NextResponse.json({ message: "Item do carrinho atualizado com sucesso." }, { status: 200 });

  }catch (error) {
    return handleError(error);
  }
}