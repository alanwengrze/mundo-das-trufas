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

export function ProductList({products}:{products: FullProductType[]}) {
  const productsByCategory = getProductsByCategory(products);
  return (
    <>
      {
        Object.keys(productsByCategory).map((category) => (
          <Carousel
            key={category}
            className=""
          >
            <h2 className="text-2xl capitalize font-bold">{category}</h2>
            <CarouselContent
              className="my-4"
            >
              {
                productsByCategory[category].map((product) => (
                  <CarouselItem 
                    key={product.id}
                    className="pl-4 sm:basis-1/2 lg:basis-1/3"
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

