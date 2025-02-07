"use client"

import { useSession } from "next-auth/react"
import { ProductCard } from "@/components/product-card"
import Image from "next/image"
import { useEffect, useState } from "react"
import { api } from "@/lib/axios"
import { useCart } from "@/contexts/cart-context"
export function Home() {
  const {addToCart} = useCart()
  const { data: session, status } = useSession()
  if(status === "unauthenticated") return null
  const [products, setProducts] = useState([] as any)
  async function getProducts() {
    const response = await api.get("/products");
    const products = response.data
    setProducts(products)
  }

  useEffect(() => {
    
    getProducts()
  }, [])
  
  function handleAddToCart(id: string, quantity: number) {
    addToCart(id, quantity)
  }

  return (
    <div className="relative grid grid-flow-dense gap-4 grid-cols-1 sm:grid-cols-3 ">
      <Image 
        src="/radial-ellipse.png"
        alt="macaron"
        width={200}
        height={200}
        className="-z-30 absolute top-0 -left-10 overflow-hidden object-cover"
      />
        <Image 
        src="/radial-ellipse-pink.svg"
        alt="macaron"
        width={200}
        height={200}
        className="-z-30 absolute -bottom-28 right-0 overflow-hidden object-cover"
      />
      {
        products.map((product) => (
          <ProductCard 
            key={product.id}
            category={product.category}
            description={product.description}
            imageUrl={product.imageUrl!}
            name={product.name}
            price={product.price}
            onAddToCart={() => handleAddToCart(product.id, 1)}
          />
        ))
      }
    </div>
  )
}

