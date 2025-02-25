import { NextResponse } from "next/server";
import { ItemsCartService } from "@/services/itemsCart.service";
import { handleError } from "@/middlewares/error-handler";

export async function POST(request: Request) {
  try {
    const { productId, quantity } = await request.json();
    const itemsCartService = new ItemsCartService();

    await itemsCartService.create(productId, quantity);
    
    return NextResponse.json(
      { message: "Item adicionado ao carrinho com sucesso." },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
}

