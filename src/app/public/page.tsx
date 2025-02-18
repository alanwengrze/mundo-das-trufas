"use client"

import { ProductList } from "@/components/product-list"
import { useProduct } from "@/contexts/product-context"

export default function Home() {
  const {products } = useProduct()
  return (
    <div>
     <ProductList products={products}/>
    </div>
  )
}

