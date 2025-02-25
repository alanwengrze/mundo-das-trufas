"use client"

import { Loader } from "@/components/loader"
import { ProductList } from "@/components/product-list"
import { useProduct } from "@/contexts/product-context"

export default function Home() {
  const {products, loading } = useProduct()
  if(loading) return <Loader />
  return (
    <div className="max-w-7xl mt-10 mx-auto overflow-x-hidden ">
     <ProductList products={products}/>
    </div>
  )
}

