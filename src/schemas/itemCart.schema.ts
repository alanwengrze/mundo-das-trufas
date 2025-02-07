import {z} from "zod";
import { fullProductSchema } from "./product.schema";

export const itemCartSchema = z.object({
  quantity: z.number().min(1),
  productId: z.string(),
  cartId: z.string(),
  product: fullProductSchema
})

export type ItemCartType = z.infer<typeof itemCartSchema>