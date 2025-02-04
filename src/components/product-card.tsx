import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"

import { Buy } from "./buy"
import { Cart } from "./cart"
interface ProductCardProps {
  name: string
  description: string
  category: string
  price: number
  imageUrl?: string
}

export const ProductCard = ({name, description, category, price, imageUrl}: ProductCardProps) => {
  return (
    <Card className="max-w-xs min-h-full card-border flex flex-col justify-between mt-8">
      <div className="-mt-7">
        <Image
          src={imageUrl || "/placeholder.svg?height=200&width=200"}
          alt={name}
          width={200}
          height={200}
          className=" rounded-t-lg mx-auto"
        />
      </div>
      <CardHeader className="w-full">
        <CardTitle className="w-min m-auto px-4 text-lg uppercase text-primary bg-primary/20 font-semibold text-center rounded-full">
          {category}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        <h1 className="text-2xl text-muted-foreground capitalize">{name}</h1>
        <p className="mt-2 text-sm font-medium capitalize">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center gap-3">
        <p className="text-xl text-muted-foreground font-semibold"><span className="text-lg mr-1">R$</span>{price}</p>
        <Buy />
        <Cart />
      </CardFooter>
    </Card>
  )
}