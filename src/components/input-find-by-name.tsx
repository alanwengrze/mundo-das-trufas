"use client"

import { Input } from "./ui/input"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "./ui/button"
import { mutate } from "swr"
import { api } from "@/lib/axios"

const searchSchema = z.object({query: z.string()})
type SearchType = z.infer<typeof searchSchema>
export function InputFindByName() {
  const {register, handleSubmit} = useForm<SearchType>({resolver: zodResolver(searchSchema)})


  async function onSubmit(data: SearchType) {
    try {
      await api.get(`/products?query=${data.query}`)
      mutate(`/products?query=${data.query}`)
    } catch (error) {
      console.error(error)
    }
  }

  return(
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input 
        className=" lg:w-1/2 my-4" 
        placeholder="Busque por um produto"
        {...register("query")} 
      />
      <Button type="submit">Buscar</Button>
    </form>
  )
}