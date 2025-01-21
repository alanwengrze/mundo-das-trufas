import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
interface ProductCardProps {
  name: string
  description: string
  category: string
  price: number
  imageUrl?: string
}

export const ProductCard = ({name, description, category, price, imageUrl}: ProductCardProps) => {
  return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="flex flex-col">
            <div className="relative aspect-square">
              <Image
                src={imageUrl || "/placeholder.svg?height=200&width=200"}
                alt={name}
                width={400}
                height={400}
                className="object-cover rounded-t-lg"
              />
            </div>
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span className="text-lg font-semibold">{name}</span>
                <span className="text-lg font-bold">${price.toFixed(2)}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{description}</p>
              <p className="mt-2 text-sm font-medium capitalize">{category}</p>
            </CardContent>
            <CardFooter className="mt-auto">
              <Button className="w-full">Add to Cart</Button>
            </CardFooter>
          </Card>
      </div>
  )
}