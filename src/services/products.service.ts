import { ProductsRepository } from "@/repositories/products.repository";
import { StripeProductsService } from "./stripe-product.service";
import { ProductType } from "@/schemas/product.schema";
export class ProductsService {
  private productsRepository: ProductsRepository
  private stripeProductsService: StripeProductsService
  constructor(productsRepository?: ProductsRepository) {
    this.productsRepository = productsRepository || new ProductsRepository();
    this.stripeProductsService = new StripeProductsService();
  }

  async create(product: ProductType) {

    if(!product.stripeId){
      const productWithStripeId = await this.stripeProductsService.createStripeProduct(product);

      const stripeId = productWithStripeId.id

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

    return this.productsRepository.create({ 
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      quantityInStock: product.quantityInStock,
      category: product.category,
      categoryId: product.categoryId,
      stripeId: product.stripeId,
    });
  }

  async findAll() {
    return this.productsRepository.findAll();
  }

  async findById(id: string) {
    return this.productsRepository.findById(id);
  }

  async decrementStock(productId: string, quantity: number) {

    return this.productsRepository.decrementStock(productId, quantity);
  }

}