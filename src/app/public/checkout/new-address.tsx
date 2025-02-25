"use client"

import { Button } from "@/components/ui/button"
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { api } from "@/lib/axios"
import { addressSchema, type AddressType } from "@/schemas/address.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export function NewAddress() {
  const form = useForm<AddressType>({
    resolver: zodResolver(addressSchema)
  })

  async function onSubmit(data: AddressType) {
    console.log("data", data)
    try {
      const response = await api.post("/address", data)
      if (response.status === 201) {
        try {
          const res = await api.post("/payment");
          if (res.status !== 200) throw new Error("Erro ao iniciar checkout");
    
          const { url } = await res.data;
          window.location.href = url; // Redireciona para o Stripe
        } catch (error) {
          console.error("Erro ao finalizar compra:", error);
        }
      }
    }catch (error) {
      console.error(error)
    }
  }

  return(
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <FormField name="neighborhood" control={form.control} render={({field}) => (
            <FormItem>
              <FormLabel>Bairro</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} 
          />

          <FormField name="city" control={form.control} render={({field}) => (
            <FormItem>
              <FormLabel>Cidade</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} 
          />

          <FormField name="state" control={form.control} render={({field}) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} 
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField name="street" control={form.control} render={({field}) => (
            <FormItem>
              <FormLabel>Rua</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} 
          />

          <FormField name="number" control={form.control} render={({field}) => (
            <FormItem>
              <FormLabel>Numero</FormLabel>
              <FormControl>
                <Input {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} 
          />

          <FormField name="zipCode" control={form.control} render={({field}) => (
            <FormItem>
              <FormLabel>CEP</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} 
          />
        </div>
        <Button 
        type="submit"
        disabled={form.formState.isSubmitting}
        className="w-full mt-4"
        >
          Finalizar compra
        </Button>
      </form>
    </Form>
  )
}
