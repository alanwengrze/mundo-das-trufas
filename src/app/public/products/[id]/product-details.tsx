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
export function ProductDetails() {

  const { id } = useParams();
  
  const { data: product } = useSWR<FullProductType>(`/products/${id}`, 
    async (url: string) => {
      const response = await api.get(url);
      return response.data;
    }
  );

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-6 md:py-12 max-w-6xl">
      <Card>
        <CardContent className="p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-2 lg:gap-12">
            <div className="relative aspect-square">
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
              <Button size="lg" className="w-full md:w-auto">
                Comprar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

