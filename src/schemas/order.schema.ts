import { z } from "zod";
import { itemOrderSchema } from "./itemOrder.schema";

export const orderSchema = z.object({
  userId: z.string(),
  status: z.enum(["pending", "completed", "canceled"]),
  amount: z.number().min(0),
  items: z.array(itemOrderSchema),
  orderDate: z.date(),
});

export type OrderType = z.infer<typeof orderSchema>;