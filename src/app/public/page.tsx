"use client"

import { ProductList } from "@/components/product-list"
import { useProduct } from "@/contexts/product-context"

export default function Home() {
  const {products } = useProduct()
  return (
    <div className="flex flex-col gap-4">
     <h1 className="text-2xl font-bold">Produtos</h1>
     <ProductList products={products}/>
    </div>
  )
}

