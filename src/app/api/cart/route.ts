import { NextResponse } from "next/server";
import { CartService } from "@/services/cart-service";
//Retorna o carrinho do usuário autenticado
export async function GET(request: Request) {

  try {
    const cartService = new CartService();
    // Busca o carrinho do usuário pelo userId
    const cart = await cartService.get();

    // Retorna os itens do carrinho
    return NextResponse.json(cart.itemsCart, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar itens do carrinho:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}