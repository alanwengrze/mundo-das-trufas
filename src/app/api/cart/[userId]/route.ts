import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

//cria um carrinho para o usuário
export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const userId = url.pathname.split("/").pop();
  const cart = await prisma.cart.create({
    data: {
      userId: userId,
    }
  })

  return NextResponse.json(cart, { status: 201 });
}

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");

    // Busca o carrinho do usuário pelo userId
    const cart = await prisma.cart.findUnique({
      where: {
        userId: userId || "",
      },
      include: {
        itemsCart: {
          include: {
            product: true, // Inclui os detalhes do produto associado a cada item do carrinho
          },
        },
      },
    });

    // Verifica se o carrinho foi encontrado
    if (!cart) {
      return NextResponse.json(
        { error: "Carrinho não encontrado para o usuário especificado." },
        { status: 404 }
      );
    }

    // Retorna o carrinho com os itens
    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar carrinho:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}