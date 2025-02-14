import { NextResponse } from "next/server";
import { ItemsCartService } from "@/services/itemsCart-service";

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
    console.error("Erro ao adicionar item ao carrinho:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
