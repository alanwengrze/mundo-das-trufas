import { prisma } from "@/lib/prisma";
import type { ProductType } from "@/schemas/product.schema";

export class ProductsRepository {
  async findAll() {
    const products = await prisma.product.findMany({
      where: { active: true },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });
    return products;
  }

  async findById(id: string) {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });
    return product;
  }

  async findByStripeId(stripeId: string) {
    const product = await prisma.product.findFirst({
      where: { stripeId },
    });
    return product;
  }
  async findByName(name: string) {
    const product = await prisma.product.findFirst({
      where: { name },
    });
    return product;
  }

  async create(product: ProductType) {

    const newProduct = await prisma.product.create({ 
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        categoryId: product.categoryId,
        quantityInStock: product.quantityInStock,
        stripeId: product.stripeId,
      },
    });
    return newProduct;
  }

  async decrementStock(productId: string, quantity: number) {
    const product = await prisma.product.update({
      where: { id: productId },
      data: { quantityInStock: { decrement: quantity } },
    })
    return product
  }
  async delete(id: string) {
    const product = await prisma.product.update({
      where: { id },
      data: { active: false },
    });
    return product;
  }
}