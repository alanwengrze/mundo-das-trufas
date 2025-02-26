import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { CartService } from "@/services/cart.service";
export async function POST(req: NextRequest) {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature");
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  console.log('chave secret', process.env.STRIPE_WEBHOOK_SECRET)
  console.log('payload', payload)
  const cartService = new CartService();

  if (!sig) {
    return NextResponse.json({ error: "Assinatura ausente" }, { status: 400 });
  }

  let event = null;
  
  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    console.log('Webhook verificado com sucesso!');
  
  } catch (err) {
    console.error("⚠️ Erro na verificação do webhook:", err);
    return NextResponse.json({ error: "Falha na verificação do webhook" }, { status: 400 });
  }

  switch (event['type']) {
    case "checkout.session.completed":
      console.log("✅ Checkout concluído:", event.data.object);

      const session = event.data.object;
      const orderId = session?.metadata?.orderId;

      console.log("Order ID extraído da session:", orderId);
      if (!orderId) {
        return NextResponse.json({ error: "Ordem não encontrada" }, { status: 400 });
      }

      await prisma.payment.create({
        data: {
          orderId: orderId as string,
          stripeId: session.payment_intent as string,
          status: "PENDING",
          amount: session.amount_total as number,
          paymentDate: new Date(),
          type: session.payment_method_types[0]
        },
      })
      break;

    case 'payment_intent.succeeded':
      console.log("✅ Pagamento com cartão aprovado:", event.data.object);

      const paymentIntent = event.data.object;
      const paymentIntentOrderId = paymentIntent?.metadata?.orderId;
      const userId = paymentIntent?.metadata?.userId;

      console.log("✅ Order ID extraído no payment intent:", paymentIntentOrderId);

      if (!paymentIntentOrderId) {
        return NextResponse.json({ error: "Ordem não encontrada" }, { status: 400 });
      }

      await prisma.payment.updateMany({
        where: {
          orderId: paymentIntentOrderId
        },
        data: {
          status: "COMPLETED",
        },
      })

      await prisma.order.update({
        where: {
          id: paymentIntentOrderId,
        },
        data: {
          status: "COMPLETED",
        },
      })

      await cartService.resetCart(userId);
      break;

    case 'payment_intent.payment_failed':
      console.log("❌ Falha no pagamento:", event.data.object);

      const paymentIntentFailed = event.data.object;
      const paymentIntentFailedOrderId = paymentIntentFailed?.metadata?.orderId;

      const message = paymentIntentFailed.last_payment_error && paymentIntentFailed.last_payment_error.message;
      console.log('Failed:', paymentIntentFailed.id, message);

      if (!paymentIntentFailedOrderId) {
        return NextResponse.json({ error: "Ordem nao encontrada" }, { status: 400 });        
      }

      await prisma.payment.updateMany({
        where: {
          orderId: paymentIntentFailedOrderId
        },
        data: {
          status: "CANCELED",
        }
      })

      await prisma.order.update({
        where: {
          id: paymentIntentFailedOrderId
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
