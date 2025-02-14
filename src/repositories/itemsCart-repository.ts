import { prisma } from "@/lib/prisma";

export class ItemsCartRepository {

  async verifyIfItemExists(productId: string, cartId: string) {
    const item = await prisma.itemCart.findFirst({
      where: {
        productId,
        cartId
      }
    })
    return item
  }

  async updateQuantity(id: string, quantity: number) {
    const item = await prisma.itemCart.update({
      where: {
        id
      },
      data: {
        quantity
      }
    })
    return item
  }

  async create(cartId: string, productId: string, quantity: number) {
    const item = await prisma.itemCart.create({
      data: {
        cartId,
        productId,
        quantity
      }
    })
    return item
  }

  async remove(productId: string, cartId: string) {
    const item = await prisma.itemCart.deleteMany({
      where: {
        productId,
        cartId
      }
    })
    return item
  }

  async update(productId: string, quantity: number, cartId: string) {
    const item = await prisma.itemCart.updateMany({
      where: {
        productId,
        cartId
      },
      data: {
        quantity
      }
    })
    return item
  }

}