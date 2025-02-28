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
import { cn } from "@/lib/utils"
import { useSidebar } from "./ui/sidebar"
export function ProductList({products}:{products: FullProductType[]}) {
  const productsByCategory = getProductsByCategory(products);
  const { open } = useSidebar();
  return (
    <>
      {
        Object.keys(productsByCategory)
        .sort((a, b) => a.localeCompare(b))
        .map((category) => (
          <div key={category} className=" relative rounded-sm">
            <AnimateBouncingBlob />
          <Carousel
            className="glass px-2"
          >
            <Title title={category} />
            <CarouselContent
              className="my-4"
            >
              {
                productsByCategory[category].map((product) => (
                <CarouselItem 
                  key={product.id}
                  className={cn(
                    "pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4",
                    open && "md:basis-full lg:basis-1/2 "
                  )}
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

