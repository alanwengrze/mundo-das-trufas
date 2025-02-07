import  z  from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(0, "Price must be a positive number"),
  description: z.string(),
  imageUrl: z.string().url().default("/placeholder.svg?height=200&width=200"),
  quantityInStock: z.number().int().min(0),
  category: z.string().min(1, "Category is required"),
});

export const fullProductSchema = productSchema.extend({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ProductType = z.infer<typeof productSchema>;
export type FullProductType = z.infer<typeof fullProductSchema>;