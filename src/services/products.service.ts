import { ProductsRepository } from "@/repositories/products.repository";
import { StripeProductsService } from "./stripe-product.service";
import { ProductType } from "@/schemas/product.schema";
import { AppError } from "@/errors/app-error";
export class ProductsService {
  private productsRepository: ProductsRepository
  private stripeProductsService: StripeProductsService
  constructor(productsRepository?: ProductsRepository) {
    this.productsRepository = productsRepository || new ProductsRepository();
    this.stripeProductsService = new StripeProductsService();
  }

  async findAll() {
    return this.productsRepository.findAll();
  }

  async findById(id: string) {
    return this.productsRepository.findById(id);
  }


  async findByName(name: string) {
    return this.productsRepository.findByName(name);
  }

  async create(product: ProductType) {

    const existingProduct = await this.productsRepository.findByName(product.name);

    if (existingProduct) {
      throw new AppError("Esse produto já existe.");
    }

    console.log("🟡 Criando produto no Stripe...");
    const productWithStripeId = await this.stripeProductsService.createStripeProduct(product);
    console.log("🟢 Produto criado no Stripe:", productWithStripeId);
  
    const stripeId = productWithStripeId.id;

    return this.productsRepository.create({ 
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      quantityInStock: product.quantityInStock,
      category: product.category,
      categoryId: product.categoryId,
      stripeId: stripeId,
    });
  }

  async delete(id: string) {
    return this.productsRepository.delete(id);
  }


  async decrementStock(productId: string, quantity: number) {

    return this.productsRepository.decrementStock(productId, quantity);
  }

}