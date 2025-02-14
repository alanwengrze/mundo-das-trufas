import { z } from "zod";
import { itemOrderSchema } from "./itemOrder.schema";

export const orderSchema = z.object({
  userId: z.string(),
  status: z.enum(["PENDING", "SUCCESS", "COMPLETED", "CANCELED"]),
  amount: z.number().min(0),
  itemsOrder: z.array(itemOrderSchema),
  orderDate: z.date(),
});

export type OrderType = z.infer<typeof orderSchema>;