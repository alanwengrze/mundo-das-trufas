"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { api } from "@/lib/axios"
import { toast } from "sonner"
import { useState } from "react"
import axios from "axios"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(200, "Description must be less than 200 characters"),
  price: z.number().min(0.01, "Price must be greater than 0").max(10000, "Price must be less than 10,000"),
  imageUrl: z.string().url("Please enter a valid image URL").optional().default("/placeholder.svg?height=200&width=200"),
  category: z.string().min(2, "Category must be at least 2 characters").max(50, "Category must be less than 50 characters"),
  quantityInStock: z.number().min(0, "Quantity in stock must be at least 0"),
})

type FormData = z.infer<typeof formSchema>

export function ProductForm() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      imageUrl: "/placeholder.svg?height=200&width=200",
      category: "",
      quantityInStock: 0,
    },
  })

  const handleUploadImage = async (file: File, onChange: (url: string) => void) => {
    const formData = new FormData()
    console.log(process.env.CLOUDINARY_NAME);
    
    formData.append("file", file); // Arquivo a ser enviado
    formData.append("upload_preset", "product_images");
    try {

      const response = await axios.post(`https://api.cloudinary.com/v1_1/dgcjyc8an/image/upload`, 
        formData,
      );
  
      const data = await response.data;

      if (data.secure_url) {
        onChange(data.secure_url); // Define a URL gerada no campo imageUrl
      }

      setImageUrl(data.secure_url);

      toast.success("Imagem enviada com sucesso!", {
        description: "A imagem foi enviada com sucesso.",
      })
      
    } catch (error) {
      toast.error("Falha ao enviar a imagem!", {
        description: "Ocorreu um erro ao enviar a imagem, por favor, tente novamente.",
      })
    }
   
  
}

  async function onSubmit(data: FormData) {
    try {

      await api.post("/products", {
        ...data,
        imageUrl: imageUrl
      })
      toast.success("O produto foi criado com sucesso!", {
        description: `Um novo produto foi cadastrado na categoria ${data.category}.`,
      })
    } catch (error) {
      toast.error("Falha ao criar o produto!", {
        description: "Ocorreu um erro ao criar o produto, por favor, tente novamente.",
      })
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter product description" className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField 
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Enter category" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...field}
                    onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField 
            control={form.control}
            name="quantityInStock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity in Stock</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} onChange={(e) => field.onChange(Number.parseInt(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input 
                    // placeholder="https://example.com/image.jpg"
                    // {...field} 
                    // value={field.value || ""}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleUploadImage(file, field.onChange); // Faz o upload e atualiza o valor do campo
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Create Product
          </Button>
        </form>
      </Form>
    </div>
  )
}

