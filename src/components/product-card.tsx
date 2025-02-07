import Image from "next/image"
import { CartProduct } from "./cart-product"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Buy } from "./buy"
import { Button } from "./ui/button"
interface ProductCardProps {
  name: string
  description: string
  category: string
  price: number
  imageUrl?: string

  onAddToCart: () => void
}

export const ProductCard = ({name, description, category, price, imageUrl, onAddToCart}: ProductCardProps) => {

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
        <h1 className="text-2xl capitalize">{name}</h1>
        <span className="mt-2 text-sm text-muted-foreground font-medium capitalize">{description}</span>
      </CardContent>
      <CardFooter className="flex justify-between items-center gap-3">
        <p className="text-xl text-muted-foreground font-semibold"><span className="text-sm mr-1 font-thin">R$</span>{price}</p>
        <div className="flex items-center gap-3">
          <Buy />
          <CartProduct addToCart={onAddToCart}/>
        </div>
      </CardFooter>
    </Card>
  )
}