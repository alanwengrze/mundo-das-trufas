import { NextResponse } from "next/server";
import { CartService } from "@/services/cart.service";
//cria um carrinho para o usuário
export async function POST() {
  const cartService = new CartService();

  const cart = await cartService.create();

  return NextResponse.json(cart, { status: 201 });
}
