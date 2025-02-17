"use client";

import { Icons } from "./icons";
import { Button } from "./ui/button";
import { useCart } from "@/contexts/cart-context";
interface CartProductProps {
  addToCart: () => void
}
export const CartProduct = ({addToCart}:CartProductProps) => {
  const { loading } = useCart();
  return(
    <Button 
      onClick={addToCart}
      disabled={loading}
    >
      <Icons.cart className="h-4 w-4"/>
    </Button>
  )
}