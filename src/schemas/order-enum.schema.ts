import { z } from "zod";

export const orderEnumSchema = z.enum(["PENDING", "COMPLETED", "CANCELED"])

export type OrderEnumType = z.infer<typeof orderEnumSchema>