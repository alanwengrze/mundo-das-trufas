import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { NextResponse, NextRequest } from "next/server";

export async function DELETE(request: Request ) {
  const session = await auth();
  // Verifica se o usuário está autenticado
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Usuário não autenticado." },
      { status: 401 }
    );
  }

  try {

    // buscar pela url
    const url = new URL(request.url);
    // cart/items/{productId}
    const productId = url.pathname.split("/").pop();
 
    if (!productId) {
      return NextResponse.json(
        { error: "Produto não encontrado." },
        { status: 404 }
      );
    }

    const cart = await prisma.cart.findUnique({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
      }
    });

    if(!cart) {
      return NextResponse.json(
        { error: "Carrinho nao encontrado." },
        { status: 404 }
      );
    }

    // Remove o item do carrinho
    await prisma.itemCart.deleteMany({
      where: {
        cartId: cart.id,
        productId: productId
      },
    });

    return NextResponse.json({ message: "Item do carrinho removido com sucesso." }, { status: 200 });
  } catch (error) {
    console.error("Erro ao remover item do carrinho:", error);
    return NextResponse.json({ error: "Erro ao remover item do carrinho." }, { status: 500 });
      }
  }