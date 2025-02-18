import  z  from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Digite o nome da categoria."),
})

export const fullCategorySchema = categorySchema.extend({id: z.string(), createdAt: z.date(), updatedAt: z.date()})

export type CategoryType = z.infer<typeof categorySchema>;
export type FullCategoryType = z.infer<typeof fullCategorySchema>;