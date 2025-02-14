import { ProductRepository } from "@/repositories/products-repository";
import { ProductType } from "@/schemas/product.schema";
export class ProductsService {
  private productRepository: ProductRepository
  constructor(productRepository?: ProductRepository) {
    this.productRepository = productRepository || new ProductRepository();
  }

  async create(data: ProductType) {
    return this.productRepository.create(data);
  }

  async findAll() {
    return this.productRepository.findAll();
  }

  async findById(id: string) {
    return this.productRepository.findById(id);
  }

  async decrementStock(productId: string, quantity: number) {

    return this.productRepository.decrementStock(productId, quantity);
  }

}