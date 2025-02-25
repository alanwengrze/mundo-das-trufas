import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";


export async function POST() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Usuário não autenticado." },
      { status: 401 }
    );
  }

  try {
    // Buscar os itens do carrinho do usuário
    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: { itemsCart: { include: { product: true } } },
    });

    if (!cart || cart.itemsCart.length === 0) {
      return NextResponse.json(
        { error: "Carrinho vazio." },
        { status: 400 }
      );
    }

    const address = await prisma.address.findFirst({
      where: { userId: cart.userId || session.user.id },
    });

    
    if (!address) {
      return NextResponse.json(
        { error: "Endereço nao encontrado." },
        { status: 400 }
      );
    }

    const amountPrice = cart.itemsCart.reduce((total, item) => total + item.quantity * item.product.price, 0);


    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        cartId: cart.id,
        addressId: address.id,
        status: "PENDING",
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

    console.log("Detalhes da ordem criada: ", order)

    // Criar os itens da sessão do Stripe
    const lineItems = cart.itemsCart.map((item) => ({
      price_data: {
        currency: "brl",
        product_data: {
          name: item.product.name,
          images: item.product.imageUrl ? [item.product.imageUrl] : [],
          
        },
        unit_amount: Math.round(item.product.price * 100), 
      },
      quantity: item.quantity,
    }));

    console.log("Itens da sessão do Stripe: ", lineItems)

    // Criar a sessão de checkout no Stripe
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL}/public/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/`,
      metadata: { 
        userId: session.user.id,
        orderId: order.id
      },
    });

    console.log("Sessão de checkout criada: ", stripeSession)

    return NextResponse.json({ url: stripeSession.url }, { status: 200 });
  } catch (error) {

    return NextResponse.json(
      { error: "Erro ao processar pagamento." },
      { status: 500 }
    );
  }
}
