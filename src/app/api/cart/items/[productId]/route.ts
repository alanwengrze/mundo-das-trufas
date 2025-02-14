import { auth } from "@/auth";
import { NextResponse, NextRequest } from "next/server";
import { ItemsCartService } from "@/services/itemsCart-service";
// Remover item do carrinho
export async function DELETE(request: Request ) {

  try {
    const itemsCartService = new ItemsCartService();
    // buscar pela url
    const url = new URL(request.url);
    // cart/items/{productId}
    const productId = url.pathname.split("/").pop();
 

    const items = await itemsCartService.remove(productId!);


    return NextResponse.json({ message: "Item do carrinho removido com sucesso." }, { status: 200 });
  } catch (error) {
    console.error("Erro ao remover item do carrinho:", error);
    return NextResponse.json({ error: "Erro ao remover item do carrinho." }, { status: 500 });
      }
  }
export async function PATCH(request: Request) {
  const session = await auth();
  // Verifica se o usuário está autenticado
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Usuário não autenticado." },
      { status: 401 }
    );
  }

  try {
    const itemsCartService = new ItemsCartService();
    // buscar pela url
    const url = new URL(request.url);
    // cart/items/{productId}
    const productId = url.pathname.split("/").pop();
    const { quantity } = await request.json();

    // Atualiza a quantidade do item do carrinho
    await itemsCartService.update(productId!, quantity);

    return NextResponse.json({ message: "Item do carrinho atualizado com sucesso." }, { status: 200 });

  }catch (error) {
    console.error("Erro ao atualizar item do carrinho:", error);
    return NextResponse.json({ error: "Erro ao atualizar item do carrinho." }, { status: 500 });
  }
}