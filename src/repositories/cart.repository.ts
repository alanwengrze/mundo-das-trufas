import { prisma } from "@/lib/prisma";

export class CartRepository {
  async create(userId: string) {
    const cart = await prisma.cart.create({
      data: {
        userId,
        amount: 0,
      },
    });

    return cart;
  }

  async getCart(userId: string) {
    const cart = await prisma.cart.findUnique({ 
      where: { userId},
      include: {
        itemsCart: {
          include: {
            product: {include: { category: true }},    
          },
        },
      },

    }); 
    return cart;
  }

  async updateCart() {
    const cart = await prisma.itemCart.deleteMany({
      where: {
        product: {
          active: false
        }
      }
    });
    return cart;
  }

  async getCartId( userId: string) {
    const cart = await prisma.cart.findUnique({ 
      where: { userId },
    });
    return cart?.id;
  }

  async clearCart(userId: string) {
    const cart = await prisma.cart.deleteMany({ where: { userId } });
    return cart;
  }
}