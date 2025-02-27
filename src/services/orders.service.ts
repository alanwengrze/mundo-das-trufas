import { OrdersRepository } from "@/repositories/orders.repository";
import { AppError } from "@/errors/app-error";
import type { OrderEnumType } from "@/schemas/order-enum.schema";
import { ProductsService } from "./products.service";
import { BaseService } from "./base.service";
export class OrdersService extends BaseService {
  private ordersRepository = new OrdersRepository()
  private productsService = new ProductsService();
  constructor(ordersRepository?: OrdersRepository, productsService?: ProductsService) {
    super();
    this.ordersRepository = ordersRepository || new OrdersRepository();
    this.productsService = productsService || new ProductsService();
  }

  async findAll() {
    const userId = await this.getUserId();
    const userRole = await this.getRole();
    
    if(userRole === "ADMIN") {
      return this.ordersRepository.findAllAdmin();
    }
    return this.ordersRepository.findAllCustomer(userId);
  }

  async findById(id: string) {

    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new AppError("Pedido não encontrado.");  
    }

    return order
  }

  async update(id: string, status: OrderEnumType) {

    console.log("Status", status);
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new AppError("Pedido não encontrado.");  
    }

    if (status === "COMPLETED") {
      const decrementStockPromises = order.itemsOrder.map(item =>
        this.productsService.decrementStock(item.productId, item.quantity)
      );
      await Promise.all(decrementStockPromises);
    }

    return this.ordersRepository.update(id, status);
  }
}