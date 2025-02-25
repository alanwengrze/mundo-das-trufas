"use client"

import Image from "next/image"
import { CartProduct } from "./cart-product"
import { Card, CardContent,  CardDescription,  CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Buy } from "./buy"
import { useState } from "react"
import { FullProductType } from "@/schemas/product.schema"
import { useSession } from "next-auth/react"
import { useCart } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"
import { priceFormatter } from "@/utils/dateFormatter"
import Link from "next/link"
import { Icons } from "./icons"
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
    <Card className="max-w-80 px-2 rounded-sm flex flex-col items-center mt-20 md:mt-0">
      <div className="flex items-center gap-4">
        <Image
          src={product.imageUrl || "/placeholder.svg?height=200&width=200"}
          alt={product.name}
          width={200}
          height={200}
          loading="eager"
          className="mx-auto object-cover h-20 w-20 -mt-10 rounded-full md:mt-0"
        />
        <CardHeader>
          <CardTitle className="mx-auto px-4 text-sm uppercase text-rose-600 bg-rose-200 border border-rose-600 font-semibold text-center rounded-md">
            {product.category.name}
          </CardTitle>
          <CardDescription className="text-md capitalize text-center">{product.name}</CardDescription>
        </CardHeader>
      </div>
      <CardContent className="flex flex-col items-center gap-4">
      
          { 
            product.quantityInStock <= 0 || !isCustomer ? (
              <span className="text-primary ml-2 font-thin">Indisponível</span>
            ) : (
              <CardFooter className="flex justify-between items-center gap-3">
              <p className="text-md text-muted-foreground font-semibold">{priceFormatter.format(product.price)}</p>
              <div className="flex items-center gap-3">
                <Buy 
                  quantity={quantity}
                  onMinus={handleDecrement}
                  onPlus={handleIncrement}
                />{
                  status === "authenticated" ? <CartProduct addToCart={handleAddToCart}/> : <CartProduct addToCart={() => push("/public/auth")}/>
                }
              </div>
              <Link 
                href={`/public/products/${product.id}`}
                className="absolute bottom-2 right-2 flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
              >
                Ver detalhes 
                <Icons.chevronRight className="h-4 w-4"/>
              </Link>
            </CardFooter>
            )
          }
      </CardContent>
    </Card>
  )
}