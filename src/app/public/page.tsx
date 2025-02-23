"use client"

import { ProductList } from "@/components/product-list"
import { useProduct } from "@/contexts/product-context"

export default function Home() {
  const {products } = useProduct()
  return (
    <div className="container mt-20 mx-auto overflow-x-hidden ">
     <ProductList products={products}/>
    </div>
  )
}

