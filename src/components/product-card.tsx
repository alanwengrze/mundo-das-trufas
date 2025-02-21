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
import { priceFormatter } from "@/utils/dateFormatter"

interface ProductCardProps {
  product: FullProductType
}

export const ProductCard = ({product}: ProductCardProps) => {
  const { status, data: session } = useSession();
  const {addToCart} = useCart()
  const [quantity, setQuantity] = useState(1);
  const { push } = useRouter();
  const isCustomer = session?.user.role === "CUSTOMER";

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
    <Card className="min-h-[250px] max-w-72 px-4 card-border flex flex-col items-center mt-20">
      <Image
        src={product.imageUrl || "/placeholder.svg?height=200&width=200"}
        alt={product.name}
        width={200}
        height={200}
        loading="eager"
        className="mx-auto object-cover h-40 w-40 -mt-20 rounded-full"
      />
      
      <CardContent className="flex flex-col items-center gap-4">
      <CardHeader>
        <CardTitle className="m-auto px-4 text-lg uppercase text-rose-400 bg-rose-200 border border-rose-400 font-semibold text-center rounded-md">
          {product.category?.name}
        </CardTitle>
      </CardHeader>
        <h1 className="text-xl capitalize text-center">{product.name}</h1>
          { 
            product.quantityInStock <= 0 || !isCustomer ? (
              <span className="text-rose-500 ml-2 font-thin">Indisponível</span>
            ) : (
              <CardFooter className="flex justify-between items-center gap-3">
              <p className="text-xl text-muted-foreground font-semibold">{priceFormatter.format(product.price)}</p>
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
            )
          }
          
      </CardContent>
     
    </Card>
  )
}