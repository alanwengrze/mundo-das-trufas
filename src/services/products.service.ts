import { ProductsRepository } from "@/repositories/products.repository";
import { ProductType } from "@/schemas/product.schema";
export class ProductsService {
  private productsRepository: ProductsRepository
  constructor(productsRepository?: ProductsRepository) {
    this.productsRepository = productsRepository || new ProductsRepository();
  }

  async create(data: ProductType) {
    return this.productsRepository.create(data);
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