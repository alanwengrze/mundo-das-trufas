import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature")!;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;
  
  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    console.error("⚠️ Erro na verificação do webhook:", err);
    return NextResponse.json({ error: "Falha na verificação do webhook" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      console.log("✅ Pagamento confirmado via checkout:", event.data.object);
      await prisma.order.update({
        where: {
          id: event?.data?.object?.metadata?.orderId,
        },
        data: {
          status: "COMPLETED",
        },
      })
      break;

    case "payment_intent.succeeded":
      console.log("✅ Pagamento com cartão aprovado:", event.data.object);
      await prisma.order.update({
        where: {
          id: event?.data?.object?.metadata?.orderId,
        },
        data: {
          status: "COMPLETED",
        },
      })
      break;

    case "payment_intent.payment_failed":
      console.log("❌ Falha no pagamento:", event.data.object);
      await prisma.order.update({
        where: {
          id: event?.data?.object?.metadata?.orderId,
        },
        data: {
          status: "CANCELED",
        },
      })
      break;

    case "payment_intent.requires_action":
      console.log("⚠️ Ação necessária para autenticação:", event.data.object);
      await prisma.order.update({
        where: {
          id: event?.data?.object?.metadata?.orderId,
        },
        data: {
          status: "PENDING",
        },
      })
      break;

    case "charge.refunded":
      console.log("🔄 Pagamento reembolsado:", event.data.object);
      // Atualizar o status do reembolso no banco de dados.
      break;

    default:
      console.log(`🔍 Evento não tratado: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
