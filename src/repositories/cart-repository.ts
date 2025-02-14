import { prisma } from "@/lib/prisma";

export class CartRepository {
  async create(userId: string) {
    const cart = await prisma.cart.create({
      data: {
        userId,
      },
    });

    return cart;
  }

  async getCart(userId: string) {
    const cart = await prisma.cart.findUnique({ 
      where: { userId },
      include: {
        itemsCart: {
          include: {
            product: true, // Inclui os detalhes do produto associado a cada item do carrinho
          },
        },
      },

    }); 
    return cart;
  }

  async getCartId( userId: string) {
    const cart = await prisma.cart.findUnique({ 
      where: { userId },
    });
    return cart?.id;
  }
}