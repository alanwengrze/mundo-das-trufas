import { NextResponse } from "next/server";
import { CartService } from "@/services/cart.service";

import { handleError } from "@/middlewares/error-handler";
//cria um carrinho para o usuário
export async function POST() {
  const cartService = new CartService();

  const cart = await cartService.create();

  return NextResponse.json(cart, { status: 201 });
}

export async function PUT(){
  const cartService = new CartService();
  try {
    await cartService.update();

    return NextResponse.json({ message: "Carrinho atualizado com sucesso." }, { status: 200 });
  } catch (error) {
    return handleError(error);
  }

}