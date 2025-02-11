"use client"

import { useSession } from "next-auth/react"
import { ProductCard } from "@/components/product-card"
import Image from "next/image"
import { useCart } from "@/contexts/cart-context"
import { useProduct } from "@/contexts/product-context"
export function Home() {
  const {addToCart} = useCart()
  const { products, error } = useProduct()
  const { data: session, status } = useSession()
  if(status === "unauthenticated") return null

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
            product={product}
          />
        ))
      }
    </div>
  )
}

