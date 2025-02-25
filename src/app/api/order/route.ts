import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { ProductsService } from "@/services/products.service";

import { handleError } from "@/middlewares/error-handler";
import { AppError } from "@/errors/app-error";
import { CartService } from "@/services/cart.service";

export async function POST(request: Request) {
  
  const session = await auth();
  const cartService = new CartService();

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

    const customerAddress = sessionStripe.metadata?.addressId;
    if(!customerAddress) throw new AppError("Endereço de entrega não encontrado.");
    // Cria a ordem com os dados do carrinho
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        addressId: customerAddress,
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
      for (const item of order.itemsOrder) {
        await productsService.decrementStock(item.productId, item.quantity);
      }
      console.log("Produtos atualizados:", order.itemsOrder);
    }

    console.log("Ordem criada:", order);
    // Limpa o carrinho do usuário
    await cartService.resetCart();

    return NextResponse.json(order, { status: 201 });
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
    if(session.user.role === "ADMIN"){
      const orders = await prisma.order.findMany({
        orderBy: { orderDate: "desc" },
        include: {
          itemsOrder: {
            include: {
              product: {include: {category: true}}
            }
          }
        }
      });
      return NextResponse.json(orders, { status: 200 });
    }

    const orders = await prisma.order.findMany({
      where: { 
        userId: session.user.id,
      },
      orderBy: { orderDate: "desc" },
      include: {
        itemsOrder: {
          include: {
            product: {include: {category: true}}
          }
        }
      }
    });

    return NextResponse.json(orders, { status: 200 });
  }catch (error) {
    return handleError(error);
  }
}