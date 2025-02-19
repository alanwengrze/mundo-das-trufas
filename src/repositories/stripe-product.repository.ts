import { stripe } from "@/lib/stripe";
import { ProductType } from "@/schemas/product.schema";

export class StripeProductsRepository {
  async createStripeProduct(product: ProductType){
    const stripeProduct = await stripe.products.create({
      name: product.name,
      default_price_data: {
        currency: "brl",
        unit_amount: Math.round(product.price * 100),
      },
      description: product.description,
      images: [product.imageUrl],
      metadata: {
        categoryId: product.categoryId,
        category: product.category?.name || null,
        quantity: product.quantityInStock.toString(),
      }
    })
    return stripeProduct
  }

  async updateStripeProduct(product: Partial<ProductType>){
    const stripeProductUpdated = await stripe.products.update(product.stripeId!, {
      name: product.name,
      description: product.description,
      images: product.imageUrl ? [product.imageUrl] : [],
      metadata: {
        categoryId: product?.categoryId || null,
        category: product.category?.name || null,
        quantity: product.quantityInStock?.toString() || null,
      },
    })
    return stripeProductUpdated
  }
  async deleteProduct(stripeId: string) {
    return stripe.products.update(stripeId, { active: false });
  }
}