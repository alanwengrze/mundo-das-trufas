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
    <Card className="w-full mx-auto space-y-4 lg:col-span-1">
      <CardContent className="p-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 items-stretch">
            <div className="relative w-auto   aspect-square rounded-lg overflow-hidden sm:max-w-64">
              <Image
                src={product.imageUrl || "/placeholder.svg?height=96&width=96"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="semibold">{product.name}</CardTitle>
                <CardTitle className="text-sm text-muted-foreground">{product.category?.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription> 
                <span>{priceFormatter.format(product.price)}</span>
                <span className="text-left text-sm text-muted-foreground">
                  {quantity}x{product.price} = {priceFormatter.format(amountByProduct)}
                </span>
              </CardHeader>
              <CardFooter className="flex items-center justify-center gap-4 md:justify-normal">
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
            </div>
          </div>
          
      </CardContent>
    </Card>
  )
};