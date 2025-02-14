import { auth } from "@/auth";
import { CartRepository } from "@/repositories/cart-repository";
import { ProductRepository } from "@/repositories/products-repository";
export class BaseService {
  protected cartRepository: CartRepository;
  protected productRepository: ProductRepository;
  constructor() {
    this.cartRepository = new CartRepository();
    this.productRepository = new ProductRepository();
  }
  
  protected async getUserId(): Promise<string> {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("Usuário não autenticado.");
    }
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
}