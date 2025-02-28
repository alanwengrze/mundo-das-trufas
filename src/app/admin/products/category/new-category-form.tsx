"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { CategoryType } from "@/schemas/category.schema"
import { api } from "@/lib/axios"

export function NewCategoryForm() {
  const {register, handleSubmit} = useForm<CategoryType>()

  async function onSubmit(data: CategoryType) {
    try {
      await api.post("/categories", data)
    }catch (error) {
      console.error(error)
    }
  }

  return(
    <form onSubmit={handleSubmit(onSubmit)}>
      <Label>Cadastrar categoria</Label>
      <Input 
        type="text" 
        placeholder="Digite o nome da categoria"
        {...register("name")}
      />
      <Button type="submit">Cadastrar</Button>
    </form>
  )
}