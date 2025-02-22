import type { FullProductType } from "@/schemas/product.schema";

export const getProductsByCategory = (
  products: FullProductType[]
): { [key: string]: FullProductType[] } => {
  return products.reduce((acc, product) => {
    const categoryName = product.category?.name || "Sem categoria";

    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(product);

    return acc;
  }, {} as { [key: string]: FullProductType[] });
};