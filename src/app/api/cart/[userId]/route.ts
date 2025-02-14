import { NextRequest, NextResponse } from "next/server";
import { CartService } from "@/services/cart-service";
//cria um carrinho para o usuário
export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const userId = url.pathname.split("/").pop();
  const cartService = new CartService();

  const cart = await cartService.create();

  return NextResponse.json(cart, { status: 201 });
}