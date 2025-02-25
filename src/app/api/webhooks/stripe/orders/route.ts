import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import type Stripe from "stripe";
import { CartService } from "@/services/cart.service";
export async function POST(req: NextRequest) {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature")!;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  console.log(endpointSecret)
  const cartService = new CartService();
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    console.error("⚠️ Erro na verificação do webhook:", err);
    return NextResponse.json({ error: "Falha na verificação do webhook" }, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session | Stripe.PaymentIntent;

  const orderId = session?.metadata?.orderId
  if(!orderId){
    return NextResponse.json({ error: "Ordem nao encontrada" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      console.log("✅ Checkout concluído:", event.data.object);
      await prisma.payment.create({
        data: {
          orderId: orderId as string,
          stripeId: event?.data?.object?.payment_intent as string,
          status: "PENDING",
          amount: event?.data?.object?.amount_total as number,
          paymentDate: new Date(),
          type: event?.data?.object?.payment_method_types[0]
        },
      })
      break;

    case "payment_intent.succeeded":
      console.log("✅ Pagamento com cartão aprovado:", event.data.object);

      await prisma.payment.update({
        where: {
         orderId
        },
        data: {
          status: "COMPLETED",
        },
      })

      await prisma.order.update({
        where: {
          id: event?.data?.object?.metadata?.orderId,
        },
        data: {
          status: "COMPLETED",
        },
      })

      cartService.resetCart();
      break;

    case "payment_intent.payment_failed":
      console.log("❌ Falha no pagamento:", event.data.object);

      await prisma.payment.update({
        where: {
          orderId
        },
        data: {
          status: "CANCELED",
        }
      })

      await prisma.order.update({
        where: {
          id: orderId
        },
        data: {
          status: "CANCELED",
        },
      })
      break;

    case "charge.refunded":
      console.log("🔄 Pagamento reembolsado:", event.data.object);
      await prisma.payment.update({
        where: {
          orderId
        },
        data: {
          status: "REFUNDED",
        }
      })

      await prisma.order.update({
        where: {
          id: orderId
        },
        data: {
          status: "CANCELED",
        },
      })
      break;

    default:
      console.log(`🔍 Evento não tratado: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
