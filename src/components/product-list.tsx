"use client"
import { ProductCard } from "@/components/product-card"
import { FullProductType } from "@/schemas/product.schema"
import { getProductsByCategory } from "@/utils/get-products-by-category"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Title } from "./title"

import { AnimateBouncingBlob } from "./animate-bouncing-blob"

export function ProductList({products}:{products: FullProductType[]}) {
  const productsByCategory = getProductsByCategory(products);
  return (
    <>
      {
        Object.keys(productsByCategory)
        .sort((a, b) => a.localeCompare(b))
        .map((category) => (
          <div key={category} className=" overflow-hidden relative rounded-sm">
            <AnimateBouncingBlob />
          <Carousel
            // key={category}
            className="glass px-2"
            opts={{
              align: "center",
            }}
          >
            <Title title={category} />
            <CarouselContent
              className="my-4"
            >
              {
                productsByCategory[category].map((product) => (
                <CarouselItem 
                  key={product.id}
                  className=" pl-4 sm:basis-1/2 lg:basis-1/4"
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
          </div>
        ))
      }
    </>
  )
}

