import { prisma } from "@/lib/prisma";
import { OrderEnumType } from "@/schemas/order-enum.schema";
export class OrdersRepository {
  async findById(id: string) {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        itemsOrder: {
          include: {
            product: {include: {category: true}}
          }
        },
        user: true,
        address: true,
        payment: true
      }
    });
    return order
  }

  async findAllCustomer(userId: string){ 
    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: {orderDate: "desc"}
    });
    return orders
  }
  async findAllAdmin(){
    const orders = await prisma.order.findMany({
      orderBy: {orderDate: "desc"}
    });
    return orders
  }

  async update(id: string, status: OrderEnumType) {
    const order = await prisma.order.update({
      where: { id },
      data: { status }
    });

    return order
  }
}