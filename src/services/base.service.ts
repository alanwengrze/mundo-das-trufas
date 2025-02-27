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
    this.categoriesRepository = new CategoriesRepository();
  }
  
  protected async getUserId(): Promise<string> {
    const session = await auth();
    if (!session?.user.id) {
      throw new AppError("Usuário não autenticado.", 401);
    }
    return session.user.id
  }

  protected async getRole(): Promise<string> {
    const session = await auth();
    if (!session?.user.role) {
      throw new AppError("Usuário nao autenticado.");
    }
    return session.user.role
  }

  protected async getProduct(productId: string) {
    const product = await this.productRepository.findById(productId);
    if (!product) throw new AppError("Produto não encontrado");
    return product;
  }

  protected async getCart(userId: string) {
    const cart = await this.cartRepository.getCart(userId);

    if (!cart) throw new AppError("Carrinho nao encontrado");
    return cart;
  }

  protected async getCategory(categoryId: string){
    const category = await this.categoriesRepository.findById(categoryId)

    if(!category) throw new AppError("Categoria não encontrada", 404)

    return category
  }
}