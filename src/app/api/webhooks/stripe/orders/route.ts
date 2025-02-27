import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
// import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { CartService } from "@/services/cart.service";
import { OrdersService } from "@/services/orders.service";
import { PaymentsService } from "@/services/payments.service";
import { handleError } from "@/middlewares/error-handler";
export async function POST(req: NextRequest) {
  const cartService = new CartService();
  const ordersService = new OrdersService();
  const paymentsService = new PaymentsService();
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature");
  const endpointSecret = process.env.STRIPE_ORDERS_WEBHOOK_SECRET!;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-12-18.acacia",
  });

  if (!endpointSecret) {
    return NextResponse.json({ error: "Endpoint Secret ausente" }, { status: 400 });
  }

  if (!payload) {
    return NextResponse.json({ error: "Payload ausente" }, { status: 400 });
  }

  
  if (!sig) {
    return NextResponse.json({ error: "Assinatura ausente" }, { status: 400 });
  }

  let event = null;
  
  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  
  } catch (error) {
    return handleError(error);
  }

  switch (event['type']) {
    case "checkout.session.completed":

      const session = event.data.object;
      const orderId = session?.metadata?.orderId;
      
      await ordersService.findById(orderId as string);

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

      const paymentIntent = event.data.object;
      const paymentIntentOrderId = paymentIntent?.metadata?.orderId;
      const userId = paymentIntent?.metadata?.userId;
      
      await ordersService.findById(paymentIntentOrderId);

      await ordersService.update(paymentIntentOrderId, "COMPLETED");

      await paymentsService.update(paymentIntentOrderId, "COMPLETED");


      await cartService.resetCart(userId);
      break;

    case 'payment_intent.payment_failed':

      const paymentIntentFailed = event.data.object;
      const paymentIntentFailedOrderId = paymentIntentFailed?.metadata?.orderId;

      const message = paymentIntentFailed.last_payment_error && paymentIntentFailed.last_payment_error.message;
      console.log('Failed:', paymentIntentFailed.id, message);

      await ordersService.findById(paymentIntentFailedOrderId);

      await ordersService.update(paymentIntentFailedOrderId, "CANCELED");

      await paymentsService.update(paymentIntentFailedOrderId, "CANCELED");

      break;
      

    default:
  }

  return NextResponse.json({ received: true });
}
