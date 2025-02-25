import { ItemsCartRepository } from "@/repositories/itemsCart.repository";

import { BaseService } from "./base.service";
import { AppError } from "@/errors/app-error";

export class ItemsCartService extends BaseService {
  private itemsCartRepository = new ItemsCartRepository();
  constructor(itemsCartRepository?: ItemsCartRepository) {
    super();
    this.itemsCartRepository = itemsCartRepository || new ItemsCartRepository();
  }

  async create(productId: string, quantity: number) {
    const userId = await this.getUserId();
    const cart = await this.getCart(userId);
    const cartId = cart.id;
    const product = await this.getProduct(productId);

    if(quantity > product.quantityInStock) throw new AppError("Quantidade indisponível no estoque.");

    const itemExists = await this.itemsCartRepository.verifyIfItemExists(productId, cartId);

    if(itemExists){
      const attQuantity = itemExists.quantity + quantity;
      if(attQuantity > product.quantityInStock) throw new AppError("Quantidade indisponível no estoque.");
      return this.itemsCartRepository.updateQuantity(itemExists.id, attQuantity);
    }

    return this.itemsCartRepository.create(cartId, productId, quantity);
  }

  async remove(productId: string) {
    const userId = await this.getUserId();
    const cart = await this.getCart(userId);
    const cartId = cart.id;

    return this.itemsCartRepository.remove(productId, cartId);
  }

  async removeAll(cartId: string){
    return this.itemsCartRepository.removeAll(cartId)
  }

  async update(productId: string, quantity: number) {
    const userId = await this.getUserId();
    const cart = await this.getCart(userId);
    const cartId = cart.id;
    const product = await this.getProduct(productId);

    if(quantity === 0) return this.remove(productId);
    if(quantity < 0) throw new AppError("Quantidade inválida.");
    if(quantity > product.quantityInStock) throw new AppError("Quantidade indisponível no estoque.");
    

    return this.itemsCartRepository.update(productId, quantity, cartId);
  }
 
}