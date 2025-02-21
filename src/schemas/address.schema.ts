import z from "zod";

export const addressSchema = z.object({
  neighborhood: z.string().min(1, "Digite o bairro."),
  city: z.string().min(1, "Digite a cidade."),
  state: z.string().min(1, "Digite o estado."),
  street: z.string().min(1, "Digite o nome da rua."),
  number: z.string().min(1, "Digite o número."),
  zipCode: z.string().min(1, "Digite o CEP."),
})

export const fullAddressSchema = addressSchema.extend({id: z.string(), createdAt: z.date(), updatedAt: z.date()})

export type AddressType = z.infer<typeof addressSchema>;
export type FullAddressType = z.infer<typeof fullAddressSchema>;