import { StripeProductsRepository } from "@/repositories/stripe-product.repository";
import type { ProductType } from "@/schemas/product.schema";

export class StripeProductsService {
  private stripeProductRepository = new StripeProductsRepository()
  constructor(stripeProductRepository?: StripeProductsRepository) {
    this.stripeProductRepository = stripeProductRepository || new StripeProductsRepository();
  }

  async createStripeProduct(product: ProductType) {
    return this.stripeProductRepository.createStripeProduct(product);
  }
}