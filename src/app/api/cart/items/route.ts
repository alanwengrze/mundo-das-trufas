import { NextResponse } from "next/server";
import { ItemsCartService } from "@/services/itemsCart-service";
import { handleError } from "@/middlewares/error-handler";

// Adiciona um item ao carrinho do usuário
export async function POST(request: Request) {

  try {
    const itemsCartService = new ItemsCartService();
    const { productId, quantity } = await request.json();

    await itemsCartService.create(productId, quantity);

    return NextResponse.json(
      { message: "Item adicionado ao carrinho com sucesso." },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
}
