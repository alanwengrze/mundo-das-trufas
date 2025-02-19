import { auth } from "@/auth";
import { AppError } from "@/errors/app-error";
import { CartRepository } from "@/repositories/cart.repository";
import { CategoriesRepository } from "@/repositories/categories.repository";
import { ProductsRepository } from "@/repositories/products.repository";
export class BaseService {
  protected cartRepository: CartRepository;
  protected productRepository: ProductsRepository;
  protected categoriesRepository: CategoriesRepository
  constructor() {
    this.cartRepository = new CartRepository();
    this.productRepository = new ProductsRepository();
    this.categoriesRepository = new CategoriesRepository
  }
  
  protected async getUserId(): Promise<string> {
    const session = await auth();
    if (!session?.user.id) {
      throw new Error("Usuário não autenticado.");
    }
    console.log("Usuario autenticado", session.user.id)
    return session.user.id
  }

  protected async getRole(): Promise<string> {
    const session = await auth();
    if (session?.user.role !== "ADMIN") {
      throw new Error("Usuário nao autorizado");
    }
    return session.user.role
  }

  protected async getProduct(productId: string) {
    const product = await this.productRepository.findById(productId);
    if (!product) throw new Error("Produto não encontrado");
    return product;
  }

  protected async getCart(userId: string) {
    const cart = await this.cartRepository.getCart(userId);

    if (!cart) throw new Error("Carrinho nao encontrado");
    return cart;
  }

  protected async getCategory(categoryId: string){
    const category = await this.categoriesRepository.findById(categoryId)

    if(!category) throw new AppError("Categoria não encontrada", 404)

    return category
  }
}