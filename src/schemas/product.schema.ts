import  z  from "zod";
import { categorySchema } from "./category.schema";

export const productSchema = z.object({
  name: z.string().min(1, "O nome do produto precisa ser preenchido."),
  price: z.number().min(0, "O preço do produto precisa ser preenchido."),
  description: z.string().min(1, "A descrição do produto precisa ser preenchida."),
  category: categorySchema,
  imageUrl: z.string().url().default("/placeholder.svg?height=200&width=200"),
  quantityInStock: z.number().int().min(1, "A quantidade em estoque precisa ser preenchida."),
  active: z.boolean().default(true).optional(),
  categoryId: z.string().min(1, "A categoria precisa ser preenchida."),
  stripeId: z.string().optional(),
});

export const fullProductSchema = productSchema.extend({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ProductType = z.infer<typeof productSchema>;
export type FullProductType = z.infer<typeof fullProductSchema>;