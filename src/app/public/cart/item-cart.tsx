import { Buy } from "@/components/buy";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { ItemCartType } from "@/schemas/itemCart.schema";
import { Icons } from "@/components/icons";
import { priceFormatter } from "@/utils/dateFormatter";

interface ItemCartProps {
  itemCart: ItemCartType;
  onRemoveItem: (productId: string) => void
  onDecrementQuantity: () => void
  onIncrementQuantity: () => void
}
export const ItemCart = ({itemCart: {product, quantity, productId}, onRemoveItem, onDecrementQuantity, onIncrementQuantity}: ItemCartProps) => {
  const amountByProduct = product.price * quantity
  return(
    <Card className="w-full mx-auto space-y-4  md:w-full lg:col-span-1 flex place-items-start">
      <CardContent className="p-6">
          <div className="flex flex-col gap-4 items-center mb-6 md:flex-row">
            <div className="relative w-24 h-24 rounded-lg overflow-hidden">
              <Image
                src={product.imageUrl || "/placeholder.svg?height=96&width=96"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader className="flex flex-col space-y-1 md:items-start">
              <CardTitle className="semibold">{product.name}</CardTitle>
              <CardTitle className="text-sm text-muted-foreground">{product.category?.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription> 
              <span>{priceFormatter.format(product.price)}</span>
              <span className="text-left text-sm text-muted-foreground">
                {quantity}x{product.price} = {priceFormatter.format(amountByProduct)}
              </span>
            </CardHeader>
          </div>
          <CardFooter className="flex-1 flex items-center justify-center gap-4 md:justify-normal">
            <Buy 
              quantity={quantity}
              onMinus={onDecrementQuantity}
              onPlus={onIncrementQuantity}
            />
            <Button 
              onClick={() => onRemoveItem(productId)}
            >
              <Icons.trash className="h-4 w-4" />
            </Button>
          </CardFooter>
      </CardContent>
    </Card>
  )
};