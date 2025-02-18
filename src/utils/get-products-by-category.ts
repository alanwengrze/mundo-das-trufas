import type { FullProductType } from "@/schemas/product.schema";

export const getProductsByCategory = (products: FullProductType[]) => {
    return products
      .map((product) => ({ category: product.category.name, product }))
      .reduce((acc, { category, product }) => {
        if (!acc[category]) {
          acc[category] = [];
        }
        return {
          ...acc,
          [category]: [...acc[category], product],
        };
      }, {} as { [key: string]: FullProductType[] });
  };