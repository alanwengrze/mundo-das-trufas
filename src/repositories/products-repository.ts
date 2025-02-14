import { prisma } from "@/lib/prisma";
import { ProductType } from "@/schemas/product.schema";
export class ProductRepository {
  async create(data: ProductType) {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        imageUrl: data.imageUrl,
        quantityInStock: data.quantityInStock,
        category: data.category
      },
    });
  
    return product
  }

  async findAll() {
    const products = await prisma.product.findMany();
    return products
  }

  async findById(id: string) {
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });
    return product
  }

  async decrementStock(productId: string, quantity: number) {
    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        quantityInStock: {
          decrement: quantity,
        },
      },
    });
  }

}
