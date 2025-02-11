import { Buy } from "./buy";
import { Button } from "./ui/button";
import { Card, CardHeader, CardContent, CardDescription, CardFooter, CardTitle } from "./ui/card";
import Image from "next/image";
import { ItemCartType } from "@/schemas/itemCart.schema";

interface ItemCartProps {
  itemCart: ItemCartType;
  onRemoveItem: () => void
  onDecrementQuantity: () => void
  onIncrementQuantity: () => void
}
export const ItemCart = ({itemCart, onRemoveItem, onDecrementQuantity, onIncrementQuantity}: ItemCartProps) => {

  return(
    <Card className="pt-4 rounded-md text-white">
      <CardContent className="flex flex-col gap-2 items-center">
        <div className="flex items-center">
          <Image
            src={itemCart.product.imageUrl}
            alt={itemCart.product.name}
            width={100}
            height={100}
          />
          <CardHeader>
            <CardTitle className="text-primary">{itemCart.product.name}</CardTitle>
            <CardDescription>{itemCart.product.description}</CardDescription>
          </CardHeader>
        </div>
        <CardFooter className="flex justify-between items-center gap-3">
          <div className="flex items-center text-muted-foreground">
            <p className="text-sm mr-1 font-thin">R$</p>
            <span className="text-xl font-semibold">
              {itemCart.product.price.toFixed(2)}
            </span>
          </div>
          <Buy 
            quantity={itemCart.quantity}
            onMinus={onDecrementQuantity}
            onPlus={onIncrementQuantity}
          />
          <Button onClick={onRemoveItem}>Remover</Button>
        </CardFooter>
      </CardContent>
    </Card>
  )
};