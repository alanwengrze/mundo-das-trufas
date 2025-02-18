import { prisma } from "@/lib/prisma";
import type { ProductType } from "@/schemas/product.schema";

export class ProductsRepository {
  async findAll() {
    const products = await prisma.product.findMany({
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

  async create(product: ProductType) {
    const newProduct = await prisma.product.create({ data: product });
    return newProduct;
  }

  async decrementStock(productId: string, quantity: number) {
    const product = await prisma.product.update({
      where: { id: productId },
      data: { quantityInStock: { decrement: quantity } },
    })
    return product
  }
}