import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { ProductsService } from "@/services/products.service";
export async function POST(req: Request) {
  const productsService = new ProductsService();
  const body = await req.text();
  const requestHeaders = await headers();
  const stripeSignature = requestHeaders.get("stripe-signature");
  const endpointSecret = process.env.STRIPE_PRODUCTS_WEBHOOK_SECRET!;

  if(!stripeSignature){
    console.error("Assinatura ausente");
  };

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, stripeSignature!, endpointSecret);
  } catch (err) {
    console.error("❌ Erro ao validar webhook:", err);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  switch (event.type) {
    case "product.created": {
      const stripeProduct = event.data.object;
      console.log("🛒 Produto recebido:", stripeProduct);
      let priceInCents = 0;
  
      if (typeof stripeProduct.default_price === "string") {
        const priceDetails = await stripe.prices.retrieve(stripeProduct.default_price);
        priceInCents = priceDetails.unit_amount ?? 0;
      } else {
        priceInCents = stripeProduct.default_price?.unit_amount ?? 0;
      }

      if (!stripeProduct.id || !stripeProduct.name) {
        console.error("❌ Dados inválidos do produto");
        return new NextResponse("Dados inválidos", { status: 400 });
      }

      const newProduct = await productsService.create({
        name: stripeProduct.name,
        price: priceInCents / 100,
        description: stripeProduct.description || "",
        imageUrl: stripeProduct.images?.[0],
        stripeId: stripeProduct.id,
        categoryId: stripeProduct.metadata.categoryId,
        quantityInStock: parseInt(stripeProduct.metadata.quantity || "0"),
      });
      console.log("✅ Produto salvo no banco:", newProduct);

      break;
    }
    // case "product.updated": {
    //   const stripeProduct = event.data.object;

    //   let priceInCents = 0;
  
    //   if (typeof stripeProduct.default_price === "string") {
    //     const priceDetails = await stripe.prices.retrieve(stripeProduct.default_price);
    //     priceInCents = priceDetails.unit_amount ?? 0;
    //   } else {
    //     priceInCents = stripeProduct.default_price?.unit_amount ?? 0;
    //   }
      

    //   await productsService.update({
    //     where: { stripeId: stripeProduct.id },
    //     data: {
    //       name: stripeProduct.name,
    //       price: priceInCents / 100,
    //       description: stripeProduct.description || "",
    //       imageUrl: stripeProduct.images?.[0] || null,
    //       categoryId: stripeProduct.metadata.category,
    //       quantityInStock: parseInt(stripeProduct.metadata.quantity || "0"),
    //     },
    //   });

    //   break;
    // }
    // case "product.deleted": {
    //   const stripeProduct = event.data.object;

    //   await prisma.product.delete({
    //     where: { stripeId: stripeProduct.id },
    //   });

    //   break;
    // }
    default:
      console.log(`Evento não tratado: ${event.type}`);
  }
  

  return NextResponse.json({ received: true }, { status: 200 });
}
