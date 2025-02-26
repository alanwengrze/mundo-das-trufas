
import { z } from "zod";
import { orderSchema } from "./order.schema";

export const paymentSchema = z.object({
  amount: z.number(),
  status: z.enum(["PENDING", "REFUNDED", "COMPLETED", "CANCELED"]),
  orderId: z.string(),
  type: z.string(),
  order: orderSchema.optional()
})

export const fullPaymentSchema = paymentSchema.extend({id: z.string(), paymentDate: z.date(), metadata: z.object({}).optional()})

export type PaymentType = z.infer<typeof paymentSchema>
export type FullPaymentType = z.infer<typeof fullPaymentSchema>