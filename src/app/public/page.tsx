"use client"

import { ProductCard } from "@/components/product-card"
import { useProduct } from "@/contexts/product-context"
export default function Home() {
  const { products } = useProduct()
  // const bolos = products.filter((product) => product.category === "bolos")

  return (
    <div className=" grid grid-flow-dense gap-4 grid-cols-1 sm:grid-cols-3 ">

      {
        products.map((product) => (
          <ProductCard 
            key={product.id}
            product={product}
          />
        ))
      }
    </div>
  )
}

