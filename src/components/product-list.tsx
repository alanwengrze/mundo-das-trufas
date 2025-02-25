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
import { Separator } from "./ui/separator"

export function ProductList({products}:{products: FullProductType[]}) {
  const productsByCategory = getProductsByCategory(products);
  return (
    <>
      {
        Object.keys(productsByCategory)
        .sort((a, b) => a.localeCompare(b))
        .map((category) => (
          <Carousel
            key={category}
            className="mb-8"
          >
            <div>
              <Separator className="my-4"/>
              <Title title={category} />
            </div>
            <CarouselContent
              className="my-4"
            >
              {
                productsByCategory[category].map((product) => (
                <CarouselItem 
                  key={product.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/4"
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

