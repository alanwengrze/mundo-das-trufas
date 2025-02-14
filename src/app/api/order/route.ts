import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { ProductsService } from "@/services/products-service";
import { handleError } from "@/middlewares/error-handler";
import { AppError } from "@/errors/app-error";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  
  const session = await auth();

  if (!session?.user?.id) {
    throw new AppError("Usuário nao autenticado.");
  }

  try {

    const productsService = new ProductsService();

    const { sessionId } = await request.json();

    if (!sessionId) throw new AppError("Sessão nao encontrada.");

    const sessionStripe = await stripe.checkout.sessions.retrieve(sessionId);

    if (!sessionStripe) throw new AppError("Sessão nao encontrada.");
  
    const paymentStatus = sessionStripe.payment_status;
    const userId = sessionStripe.metadata?.userId;
  
    if (!userId) throw new AppError("Usuário nao encontrado.");

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
      throw new AppError("Carrinho vazio.");
    }

    const amountPrice = cart.itemsCart.reduce((total, item) => total + item.quantity * item.product.price, 0);

    // Cria a ordem com os dados do carrinho
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        status: paymentStatus === "paid" ? "COMPLETED" : "PENDING",
        amount: amountPrice,
        itemsOrder: {
          create: cart.itemsCart.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity
          }))
        }
      },
      include: {
        itemsOrder: true
      }
    });
    
    if(order.status === "COMPLETED"){
      order.itemsOrder.map(async (item) => {
        await productsService.decrementStock(item.productId, item.quantity);
      })
      console.log("Produtos atualizados:", order.itemsOrder);
    }

    console.log("Ordem criada:", order);
    // Limpa o carrinho do usuário
    await prisma.cart.update({
      where: { id: cart.id },
      data: { itemsCart: { deleteMany: {} } },
    });

    return NextResponse.json({ message: "Pedido criado com sucesso!", order }, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}

export async function GET() {

  const session = await auth();

  if (!session?.user?.id) {
    throw new AppError("Usuário nao autenticado.");
  }

  try {
    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      include: {
        itemsOrder: {
          include: {
            product: true
          }
        }
      }
    });

    return NextResponse.json(orders, { status: 200 });
  }catch (error) {
    return handleError(error);
  }
}