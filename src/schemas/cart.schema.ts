import {z} from "zod";
import {itemCartSchema} from "./itemCart.schema";

export const cartSchema = z.object({
  userId: z.string(),
  itemsCart: z.array(itemCartSchema),
})

export type CartType = z.infer<typeof cartSchema>