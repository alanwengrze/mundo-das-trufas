import {z} from "zod";
import { fullProductSchema } from "./product.schema";

export const itemOrderSchema = z.object({
  quantity: z.number().min(1),
  productId: z.string(),
  orderId: z.string(),
  product: fullProductSchema
})

export type ItemOrderType = z.infer<typeof itemOrderSchema>