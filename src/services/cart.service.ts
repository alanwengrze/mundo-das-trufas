
import { BaseService } from "./base.service";
export class CartService extends BaseService {
  constructor() {
    super();
  }

  async get() {
    await this.update();
    const userId = await this.getUserId();
    const cart = await this.getCart(userId);
    return cart;
  }


  async create() {
    const userId = await this.getUserId();
    return this.cartRepository.create(userId);
  }

  async update() {
    return this.cartRepository.updateCart();
  }

}