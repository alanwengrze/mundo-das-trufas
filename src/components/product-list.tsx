"use client"

import { ProductCard } from "@/components/product-card"
import { useProduct } from "@/contexts/product-context"
import { getProductsByCategory } from "@/utils/get-products-by-category"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
export function ProductList() {
  const { products, loading } = useProduct()

  const productsByCategory = getProductsByCategory(products);
  if(loading) return <p>Carregando...</p>
  return (
    <>
      {
        Object.keys(productsByCategory).map((category) => (
          <Carousel
            key={category}
            className="w-full"
          >
            <h2 className="text-2xl capitalize font-bold mt-12">{category}</h2>
            <CarouselContent
              className="my-4"
            >
              {
                productsByCategory[category].map((product) => (
                  <CarouselItem 
                    key={product.id}
                    className="pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <ProductCard
                      product={product}
                    />
                  </CarouselItem>
                ))
              }
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ))
      }
    </>
  )
}

