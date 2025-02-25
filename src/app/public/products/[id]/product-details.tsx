"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useParams }  from "next/navigation"
import useSWR from "swr"
import type { FullProductType } from "@/schemas/product.schema"
import { api } from "@/lib/axios"
import { priceFormatter } from "@/utils/dateFormatter"
import { Loader } from "@/components/loader"
import { useCart } from "@/contexts/cart-context"
import { Spinner } from "@/components/spinner"
export function ProductDetails() {
  const { addToCart, loading } = useCart()
  const { id } = useParams();
  
  const { data: product, isLoading } = useSWR<FullProductType>(`/products/${id}`, 
    async (url: string) => {
      const response = await api.get(url);
      return response.data;
    }
  );

  async function handleAddToCart() {
    try {
      addToCart(id as string, 1);
    } catch (error) {
      console.error(error);
    }
  }

  if(isLoading) return <Loader />
  if(!product) return <div>Produto não encontrado</div>

  return (
    <div className="container mx-auto px-4 py-6 md:py-12 max-w-6xl lg:flex justify-center items-center">
      <Card className="">
        <CardContent className="p-6 md:p-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:gap-12">
            <div className="relative aspect-square max-h-60">
              <Image src={product.imageUrl || "/placeholder.svg?height=96&width=96"} alt={product.name} fill className="object-cover rounded-lg" priority />
            </div>
            <div className="grid gap-4 md:gap-8">
              <div className="grid gap-2">
                <Badge className="w-fit" variant="secondary">
                  {product.category?.name}
                </Badge>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{product.name}</h1>
              </div>
              <div className="text-3xl font-bold">{priceFormatter.format(product.price)}</div>
              <Separator />
              <div className="grid gap-4 text-muted-foreground">
                <p>
                  {product.description}
                </p>
              </div>
              <Separator />
              <Button 
                onClick={handleAddToCart} 
                size="lg" 
                className="w-full md:w-auto"
                disabled={loading}
              >
                {loading && <Spinner />}
                Adicionar ao carrinho
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

