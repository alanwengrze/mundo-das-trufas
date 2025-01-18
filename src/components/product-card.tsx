import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
interface ProductCardProps {
  name: string
  description: string
  price: number
  imageUrl?: string
}

export const ProductCard = ({name, description, price, imageUrl}: ProductCardProps) => {
  return (
    <Card className="flex gap-3 items-center justify-center">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardDescription>{price}</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={imageUrl} alt={name} />
      </CardContent>
    </Card>
  )
}