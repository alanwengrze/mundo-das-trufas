import { useState } from "react";
import { Buy } from "./buy";
import { Button } from "./ui/button";
import { Card, CardHeader, CardContent, CardDescription, CardFooter, CardTitle } from "./ui/card";
import Image from "next/image";

interface ItemCartProps {
  // quantity: number
  name: string
  description: string
  category: string
  price: number
  imageUrl: string
  onRemoveItem: () => void
}
export const ItemCart = ({name, description, category, price, imageUrl, onRemoveItem}: ItemCartProps) => {

  const [quantity, setQuantity] = useState(1);

  function handleIncrement() {
    setQuantity((prevQuantity) => prevQuantity + 1);
  }

  function handleDecrement() {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  }

  return(
    <Card className="h-fit pt-4 rounded-md sm:flex items-center">
      <CardHeader>
        <Image
            src={imageUrl}
            alt={name}
            width={100}
            height={100}
          />
      </CardHeader>
      <CardContent className="flex flex-col gap-2 items-center">
        <CardTitle className="text-primary">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardFooter className="flex justify-between items-center gap-3">
          <div className="flex items-center text-muted-foreground">
            <p className="text-sm mr-1 font-thin">R$</p>
            <span className="text-xl font-semibold">
              {price}
            </span>
          </div>
          <Buy 
            quantity={quantity}
            onMinus={handleIncrement}
            onPlus={handleDecrement}
          />
          <Button onClick={onRemoveItem}>Remover</Button>
        </CardFooter>
      </CardContent>
    </Card>
  )
};