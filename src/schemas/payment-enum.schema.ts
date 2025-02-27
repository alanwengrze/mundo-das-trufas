import { z } from "zod";

export const paymentEnumSchema = z.enum(["PENDING", "COMPLETED", "CANCELED"])

export type PaymentEnumType = z.infer<typeof paymentEnumSchema>