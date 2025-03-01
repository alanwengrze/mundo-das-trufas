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
import { motion } from "motion/react"
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
    <motion.div 
      whileHover={{ scale: 1.05 }}
    >
      <Card className="relative w-full min-h-52 px-2 flex flex-col items-center justify-around mt-20 border-primary border bg-primary/10 text-card-foreground shadow rounded-md dark:bg-primary/5 dark:border-rose-300/30"
       
      >
        <div className="flex flex-col items-center gap-4 ">
          <Image
            src={product.imageUrl || "/placeholder.svg?height=200&width=200"}
            alt={product.name}
            width={200}
            height={200}
            loading="eager"
            className="z-10 relative mx-auto object-cover h-20 w-20 -mt-10 rounded-full"
          />
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-4 border-rose-400 bg-primary"></div>
          <CardHeader>
            <CardTitle className="mx-auto px-4 text-sm uppercase text-primary border border-primary font-semibold text-center rounded-md dark:bg-primary/30 dark:border-primary/5">
              {product.category.name}
            </CardTitle>
            <CardDescription className="text-md capitalize text-center">{product.name}</CardDescription>
          </CardHeader>
        </div>
        <CardContent className="flex flex-col items-center gap-4">
        
            { 
              product.quantityInStock <= 0 || !isCustomer && status === "authenticated" ? (
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
    </motion.div>
  )
}