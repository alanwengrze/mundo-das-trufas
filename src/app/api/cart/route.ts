import { NextResponse } from "next/server";
import { CartService } from "@/services/cart.service";
import { handleError } from "@/middlewares/error-handler";
//Retorna o carrinho do usuário autenticado
export async function GET() {
  try {
    const cartService = new CartService();
    const cart = await cartService.get();
    return NextResponse.json(cart.itemsCart, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}