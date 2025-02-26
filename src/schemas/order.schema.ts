import { z } from "zod";
import { itemOrderSchema } from "./itemOrder.schema";
import { userSchema } from "./user.schema";
import { addressSchema } from "./address.schema";
import { paymentSchema } from "./payment.schema";

export const orderSchema = z.object({
  userId: z.string(),
  addressId: z.string(),
  status: z.enum(["PENDING", "SUCCESS", "COMPLETED", "CANCELED"]),
  amount: z.number().min(0),
  itemsOrder: z.array(itemOrderSchema),
  orderDate: z.date(),
});

export const fullOrderSchema = orderSchema.extend({
  id: z.string(), 
  createdAt: z.date(), 
  updatedAt: z.date(),
  user: userSchema.optional(),
  address: addressSchema.optional(),
  payment: paymentSchema.optional()
})

export type OrderType = z.infer<typeof orderSchema>;
export type FullOrderType = z.infer<typeof fullOrderSchema>;