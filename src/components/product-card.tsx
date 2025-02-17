"use client"

import Image from "next/image"
import { CartProduct } from "./cart-product"
import { Card, CardContent,  CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Buy } from "./buy"
import { useState } from "react"
import { FullProductType } from "@/schemas/product.schema"
import { useSession } from "next-auth/react"
import { useCart } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"
interface ProductCardProps {
  product: FullProductType
}

export const ProductCard = ({product}: ProductCardProps) => {
  const { status } = useSession();
  const {addToCart} = useCart()
  const [quantity, setQuantity] = useState(1);
  const { push } = useRouter();

  function handleAddToCart() {
    addToCart(product.id, quantity);
    setQuantity(1);
  }

  function handleIncrement() {
    setQuantity((prevQuantity) => prevQuantity + 1);
  }

  function handleDecrement() {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  }
  return (
    <Card className="min-h-[500px] p-4 card-border flex flex-col justify-between mt-20">
      <Image
        src={product.imageUrl || "/placeholder.svg?height=200&width=200"}
        alt={product.name}
        width={200}
        height={200}
        loading="eager"
        className="mx-auto object-cover h-40 w-40 -mt-20 rounded-full"
      />
      <CardHeader>
        <CardTitle className="w-min m-auto px-4 text-lg uppercase text-rose-400 bg-rose-200 border border-rose-400 font-semibold text-center rounded-md">
          {product.category}
          {
            product.quantityInStock <= 0 && <span className="text-rose-500 ml-2 font-thin">Indisponível</span>
          }
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        <h1 className="text-2xl capitalize">{product.name}</h1>
        <span className="mt-2 text-sm text-muted-foreground font-medium capitalize">{product.description}</span>
      </CardContent>
      <CardFooter className="flex justify-between items-center gap-3">
        <p className="text-xl text-muted-foreground font-semibold"><span className="text-sm mr-1 font-thin">R$</span>{product.price}</p>
        <div className="flex items-center gap-3">
          <Buy 
            quantity={quantity}
            onMinus={handleDecrement}
            onPlus={handleIncrement}
          />{
            status === "authenticated" ? <CartProduct addToCart={handleAddToCart}/> : <CartProduct addToCart={() => push("/public/auth")}/>
          }
        </div>
      </CardFooter>
    </Card>
  )
}