import { ItemsCartRepository } from "@/repositories/itemsCart-repository";

import { BaseService } from "./base-service";
import { CartType } from "@/schemas/cart.schema";

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

    const itemExists = await this.itemsCartRepository.verifyIfItemExists(productId, cartId);

    if(itemExists){
      return this.itemsCartRepository.updateQuantity(itemExists.id, itemExists.quantity + quantity);
    }

    return this.itemsCartRepository.create(cartId, productId, quantity);
  }

  async remove(productId: string) {
    const userId = await this.getUserId();
    const cart = await this.getCart(userId);
    const cartId = cart.id;

    return this.itemsCartRepository.remove(productId, cartId);
  }

  async update(productId: string, quantity: number) {
    const userId = await this.getUserId();
    const cart = await this.getCart(userId);
    const cartId = cart.id;

    return this.itemsCartRepository.update(productId, quantity, cartId);
  }
 
}