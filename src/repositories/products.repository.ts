import { prisma } from "@/lib/prisma";
import type { ProductType } from "@/schemas/product.schema";
import { stripe } from "@/lib/stripe";

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

    const category = await prisma.category.findUnique({
      where: { id: product.categoryId },
    });

    if (!category) {
      throw new Error("Categoria não encontrada.");
    }

    const stripeProduct = await stripe.products.create({
      name: product.name,
      default_price_data: {
        currency: "brl",
        unit_amount: Math.round(product.price * 100),
      },
      description: product.description,
      images: [product.imageUrl],
      metadata: {
        category: category.name,
        quantity: product.quantityInStock.toString(),
      },
    })


    const newProduct = await prisma.product.create({ 
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        categoryId: product.categoryId,
        quantityInStock: product.quantityInStock,
        stripeId: stripeProduct.id,
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
}