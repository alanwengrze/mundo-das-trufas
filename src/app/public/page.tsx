"use client"

import { AnimateTransactionWrapper } from "@/components/animate-transaction-wrapper"
import { Loader } from "@/components/loader"
import { ProductList } from "@/components/product-list"
import { useProduct } from "@/contexts/product-context"
import { InputFindByName } from "@/components/input-find-by-name"
export default function Home() {
  const {products, loading } = useProduct()
  if(loading) return <Loader />
  return (
    <AnimateTransactionWrapper 
      className=""
    >
     <InputFindByName />
     <ProductList products={products}/>
    </AnimateTransactionWrapper>
  )
}

