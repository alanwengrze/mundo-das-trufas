"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { productSchema, ProductType } from "@/schemas/product.schema"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { api } from "@/lib/axios"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import axios from "axios"
import Image from "next/image"
import useSWR, { mutate } from "swr"
import type { FullCategoryType } from "@/schemas/category.schema"
import { ImageIcon } from "lucide-react"
import { Icons } from "@/components/icons"
import { Spinner } from "@/components/spinner"
import { useParams } from "next/navigation"
import { Loader } from "@/components/loader"
type FormValues = Omit<ProductType, "category">
export function EditProductForm() {
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  
  //buscar as categorias
  const { data: categories} = useSWR<[FullCategoryType]>(
    "/categories",
    async (url: string) => {
      const response = await api.get(url);
      return response.data;
    }
  );

  const { data: product, isLoading } = useSWR<ProductType>(
    `/products/${id}`,
    async (url: string) => {
      const response = await api.get(url);
      return response.data;
    }
  );
  
  const form = useForm<FormValues>({
    resolver: zodResolver(productSchema.omit({ category: true })),
    defaultValues: product ??{
      name: "",
      description: "",
      price: 0,
      imageUrl: "",
      quantityInStock: 0,
      categoryId: "",
    }
  })

  const handleUploadImage = async (file: File, onChange: (url: string) => void) => {
    const formData = new FormData()

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
    
    formData.append("file", file); // Arquivo a ser enviado
    formData.append("upload_preset", "product_images");
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, 
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
      console.error(error);
      toast.error("Falha ao enviar a imagem!", {
        description: "Ocorreu um erro ao enviar a imagem, por favor, tente novamente.",
      })
    }
   
  }
  
  async function onSubmit(data: FormValues) {
    console.log("Data:", data);
    try {
      await api.put(`/products/${id}`, {
        ...data,
        imageUrl: imageUrl
      })
      mutate("/products")
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        quantityInStock: product.quantityInStock,
        categoryId: product.categoryId
      })

      if (product.imageUrl) {
        setImageUrl(product.imageUrl);
        setPreview(product.imageUrl);
      }
    }
  }, [product, form]);
  if(isLoading) return <Loader />
  if(!product) return
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do produto</FormLabel>
                <FormControl >
                  <Input placeholder="Ex: Trufa de chocolate" {...field} />
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
                <FormLabel>Descrição</FormLabel>
                <FormControl >
                  <Textarea placeholder="Ex: Deliciosa trufa de chocolate" className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField 
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categorias</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <Button type="button">Criar uma nova categoria</Button> */}
          <div className="grid gap-8 md:grid-cols-2">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="R$ 0.01"
                      placeholder="R$ 0.00"
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
                  <FormLabel>Quantidade em estoque</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} onChange={(e) => field.onChange(Number.parseInt(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Selecione uma imagem</FormLabel>
                <FormControl>
                  <Input 
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleUploadImage(file, field.onChange);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {preview ? (
              <div className="relative aspect-square w-80 overflow-hidden rounded-lg border">
                <Image src={preview} alt="Pré-visualização da imagem" fill className="object-cover" />
              </div>
            ) : (
              <div className="flex aspect-square w-80 items-center justify-center rounded-lg border bg-muted">
                <ImageIcon className="h-10 w-10 text-muted-foreground" />
              </div>
            )}
          <Button 
            type="submit" 
            className="flex items-center gap-2"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <> 
                <Spinner/>
                <span>Editando produto</span>
              </>
              
            ):
              (
                <> 
                  <Icons.edit/>
                  <span>Editar produto</span>
                </>
              )
            }
            
          </Button>
        </form>
      </Form>
    </div>
  )
}

