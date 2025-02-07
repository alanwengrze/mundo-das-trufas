import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await auth();
  console.log(session?.user.id)
  // Verifica se o usuário está autenticado
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Usuário não autenticado." },
      { status: 401 }
    );
  }

  try {
    // Busca o carrinho do usuário pelo userId
    const cart = await prisma.cart.findUnique({
      where: {
        userId: session.user.id,
      },
      include: {
        itemsCart: {
          include: {
            product: true, // Inclui os detalhes do produto associado a cada item do carrinho
          },
        },
      },
    });

    // Se o carrinho não for encontrado, retorna um erro 404
    if (!cart) {
      return NextResponse.json(
        { error: "Carrinho não encontrado." },
        { status: 404 }
      );
    }

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