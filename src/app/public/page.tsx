"use client"

import { AnimateTransactionWrapper } from "@/components/animate-transaction-wrapper"
import { Loader } from "@/components/loader"
import { ProductList } from "@/components/product-list"
import { useProduct } from "@/contexts/product-context"
export default function Home() {
  const {products, loading } = useProduct()
  if(loading) return <Loader />
  return (
    <AnimateTransactionWrapper 
      className="mt-10 mx-auto"
    >
     <ProductList products={products}/>
    </AnimateTransactionWrapper>
  )
}

