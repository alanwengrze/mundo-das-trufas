import {z} from "zod";

export const itemCartSchema = z.object({
  quantity: z.number().min(1),
  productId: z.string(),
  cartId: z.string(),
})

export type ItemCartType = z.infer<typeof itemCartSchema>