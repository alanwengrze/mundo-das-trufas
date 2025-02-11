import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

// Adiciona um item ao carrinho do usuário
export async function POST(request: Request) {
  const session = await auth();

  // Verifica se o usuário está autenticado
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Usuário não autenticado." },
      { status: 401 }
    );
  }

  try {
    const { productId, quantity } = await request.json();

    // Verifica se o produto existe
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Produto não encontrado." },
        { status: 404 }
      );
    }

    // Verifica se o carrinho do usuário existe
    const cart = await prisma.cart.findUnique({
      where: {
        userId: session?.user.id,
      },
    });

    if (!cart) {
      return NextResponse.json(
        { error: "Carrinho não encontrado." },
        { status: 404 }
      );
    }

    // Verifica se o item já existe no carrinho
    const existingItem = await prisma.itemCart.findFirst({
      where: {
        cartId: cart.id,
        productId: productId,
      },
    });

    if (existingItem) {
      // Se o item já existe, atualiza a quantidade
      await prisma.itemCart.update({
        where: {
          id: existingItem.id,
        },
        data: {
          quantity: existingItem.quantity + quantity,
        },
      });
    } else {
      // Se o item não existe, cria um novo item no carrinho
      await prisma.itemCart.create({
        data: {
          quantity: quantity,
          productId: productId,
          cartId: cart.id,
        },
      });
    }

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
