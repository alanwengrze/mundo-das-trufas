import Image from "next/image"
import { CartProduct } from "./cart-product"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Buy } from "./buy"
import { useState } from "react"
import { FullProductType } from "@/schemas/product.schema"

import { useCart } from "@/contexts/cart-context"
interface ProductCardProps {
  product: FullProductType
}

export const ProductCard = ({product}: ProductCardProps) => {
  const {addToCart} = useCart()
  const [quantity, setQuantity] = useState(1);

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
    <Card className="max-w-xs min-h-full card-border flex flex-col justify-between mt-8">
      <div className="-mt-7">
        <Image
          src={product.imageUrl || "/placeholder.svg?height=200&width=200"}
          alt={product.name}
          width={200}
          height={200}
          className=" rounded-t-lg mx-auto"
        />
      </div>
      <CardHeader className="w-full">
        <CardTitle className="w-min m-auto px-4 text-lg uppercase text-primary bg-primary/20 font-semibold text-center rounded-full">
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
          />
          <CartProduct addToCart={handleAddToCart}/>
        </div>
      </CardFooter>
    </Card>
  )
}