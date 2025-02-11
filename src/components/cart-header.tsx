"use client";

import { Icons } from "./icons";
import { ItemCart } from "./item-cart";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

import { useSession } from "next-auth/react";
import { useCart } from "@/contexts/cart-context";
import { useState } from "react";
import { ButtonCheckout } from "./button-checkout";

export const CartHeader = () => {
  const {itemsCart, error, removeFromCart, changeQuantity} = useCart();
  const { data: session, status } = useSession();
  const [quantity, setQuantity] = useState(1);

  function handleRemoveItem(productId: string) {
    removeFromCart(productId);
  }

  function handleChangeQuantity(productId: string, quantity: number) {
    console.log("quantity", quantity);
    setQuantity(quantity + 1);
    changeQuantity(productId, quantity);
  }


  if (status === "loading") return <p>Carregando...</p>;
  if (status === "unauthenticated") return <p>Por favor, faça login para ver seu carrinho.</p>;
  if (error) return <p>Erro: {error}</p>;
  if (itemsCart.length === 0) return <p>Seu carrinho está vazio.</p>;

  const totalItemsPrice = itemsCart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild> 
        <Button className="">
          <Icons.cart className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="h-full flex flex-col justify-between custom-bg">
        <div className="flex flex-col gap-4">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-white">Meu carrinho</SheetTitle>
        </SheetHeader>
         {
          itemsCart.map((item) => (
            <ItemCart 
              key={item.product.id} 
              itemCart={item}
              onRemoveItem={() => handleRemoveItem(item.productId)}
              onIncrementQuantity={() => handleChangeQuantity(item.productId, item.quantity + 1)}
              onDecrementQuantity={() => handleChangeQuantity(item.productId, item.quantity - 1)}
            />
          ))
         }
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between text-primary">
            <span className="text-xl font-semibold">Total:</span>
            <span className="text-xl font-semibold"><span className="text-sm mr-1 font-thin">R$</span>{totalItemsPrice.toFixed(2)}</span>
          </div>
          <ButtonCheckout />
        </div>
      </SheetContent>
      
    </Sheet>
  );
};