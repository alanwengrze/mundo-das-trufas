import { z } from "zod";
import { cartSchema } from "./cart.schema";

export const orderSchema = z.object({
  cart: cartSchema,
  userId: z.string(),
  status: z.enum(["pending", "completed", "canceled"]),
  amount: z.number().min(0),
  orderDate: z.date(),
});

export type OrderType = z.infer<typeof orderSchema>;