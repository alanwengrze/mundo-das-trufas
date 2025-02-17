import { Buy } from "./buy";
import { Button } from "./ui/button";
import { Card, CardHeader, CardContent, CardDescription, CardFooter, CardTitle } from "./ui/card";
import Image from "next/image";
import { ItemCartType } from "@/schemas/itemCart.schema";
import { Icons } from "./icons";

interface ItemCartProps {
  itemCart: ItemCartType;
  onRemoveItem: () => void
  onDecrementQuantity: () => void
  onIncrementQuantity: () => void
}
export const ItemCart = ({itemCart, onRemoveItem, onDecrementQuantity, onIncrementQuantity}: ItemCartProps) => {

  return(
    <Card className="pt-4 rounded-md text-white">
      <CardContent className="flex flex-col gap-2 ">
        <div className="flex flex-col items-center mx-auto w-full xs:flex-row">
          <Image
            src={itemCart.product.imageUrl}
            alt={itemCart.product.name}
            width={100}
            height={100}
            className="mx-auto object-cover h-20 w-20"
          />
          <CardHeader>
            <CardTitle className="text-primary">{itemCart.product.name}</CardTitle>
            <CardDescription>{itemCart.product.description}</CardDescription>
          </CardHeader>
        </div>
        <CardFooter className="p-0 flex justify-between items-center gap-3">
          <div className="flex items-center text-muted-foreground">
            <p className="text-sm mr-1 font-thin">R$</p>
            <span className="text-xl font-semibold">
              {itemCart.product.price.toFixed(2)}
            </span>
          </div>
          <div className="flex gap-2">
            <Buy 
              quantity={itemCart.quantity}
              onMinus={onDecrementQuantity}
              onPlus={onIncrementQuantity}
            />
            <Button onClick={onRemoveItem}><Icons.trash className="h-4 w-4" /></Button>
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  )
};