import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { ProductsService } from "@/services/products-service";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Usuário não autenticado." }, { status: 401 });
  }

  try {

    const productsService = new ProductsService();

    const { sessionId } = await request.json();

    if (!sessionId) return NextResponse.json({ error: "sessionId ausente" }, { status: 400 });

    const sessionStripe = await stripe.checkout.sessions.retrieve(sessionId);

    if (!sessionStripe) return NextResponse.json({ error: "Sessão não encontrada" }, { status: 404 });
  
    const paymentStatus = sessionStripe.payment_status;
    const userId = sessionStripe.metadata?.userId;
  
    if (!userId) return NextResponse.json({ error: "Usuário não encontrado" }, { status: 400 });

    // Busca o carrinho do usuário
    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: {
        itemsCart: {
          include: {
            product: true
          }
        }
      }, // Inclui os itens do carrinho
    });

    if (!cart || cart.itemsCart.length === 0) {
      return NextResponse.json({ error: "Carrinho vazio." }, { status: 400 });
    }

    // Cria a ordem com os dados do carrinho
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        status: paymentStatus === "paid" ? "COMPLETED" : "PENDING",
        amount: cart.itemsCart.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
        items: {
          create: cart.itemsCart.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity
          }))
        }
      },
      include: {
        items: true
      }
    });
    
    if(order.status === "COMPLETED"){
      order.items.map(async (item) => {
        await productsService.decrementStock(item.productId, item.quantity);
      })
      console.log("Produtos atualizados:", order.items)
    }

    console.log("Ordem criada:", order);
    // Limpa o carrinho do usuário
    await prisma.cart.update({
      where: { id: cart.id },
      data: { itemsCart: { deleteMany: {} } },
    });

    return NextResponse.json({ message: "Pedido criado com sucesso!", order }, { status: 201 });
  } catch (error) {
    console.error("Erro ao finalizar pedido:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
}

export async function GET(request: Request) {

  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Usuário não autenticado." }, { status: 401 });
  }

  try {
    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            Product: true
          }
        }
      }
    });

    return NextResponse.json(orders, { status: 200 });
  }catch (error) {
    console.error("Erro ao buscar pedidos:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Erro ao buscar pedidos." }, { status: 500 });
  }
}