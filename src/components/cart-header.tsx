"use client";

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
import { ButtonCheckout } from "./button-checkout";
import {Spinner} from "./spinner";

interface CartHeaderProps {
  text?: string
  icon?: React.ReactNode
  variant?: "default" | "ghost"
}
export const CartHeader = ({ text, icon, variant}: CartHeaderProps) => {
  const { itemsCart, error, removeFromCart, changeQuantity, loading} = useCart();
  const { status } = useSession();

  function handleRemoveItem(productId: string) {
    removeFromCart(productId);
  }

  function handleChangeQuantity(productId: string, quantity: number) {
    changeQuantity(productId, quantity);
  }

  if (status === "loading") return <p>Carregando...</p>;
  if (status === "unauthenticated") return <p>Por favor, faça login para ver seu carrinho.</p>;
  if (error) return <p>Erro: {error}</p>;

  const totalItemsPrice = itemsCart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="relative gap-0" variant={variant}>
          <div className="absolute z-10 -top-2 -right-2 rounded-full bg-primary text-white w-5 h-5">{itemsCart.length}</div>
          {
            loading ? <Spinner /> : <>{icon}</>
          }
          <p>{text}</p>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="z-50 h-full w-full flex flex-col justify-between custom-bg ">
        <div className="flex flex-col gap-4">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-white">Meu carrinho</SheetTitle>
        </SheetHeader>
        <div className="h-[calc(100vh-200px)] flex flex-col gap-4 overflow-y-auto scrollbar">
         {
          itemsCart.map((item) => (
            <ItemCart 
              key={item.product.id} 
              itemCart={item}
              disabled={loading}
              onRemoveItem={() => handleRemoveItem(item.productId)}
              onIncrementQuantity={() => handleChangeQuantity(item.productId, item.quantity + 1)}
              onDecrementQuantity={() => handleChangeQuantity(item.productId, item.quantity - 1)}
            />
          ))
         }
         </div>
        </div>
          <div className="flex justify-between text-primary mb-6">
            <span className="text-xl font-semibold">Total:</span>
            <SheetDescription className="text-xl font-semibold"><span className="text-sm mr-1 font-thin">R$</span>{totalItemsPrice.toFixed(2)}</SheetDescription>
          </div>
          <ButtonCheckout />
      </SheetContent>
      
    </Sheet>
  );
};