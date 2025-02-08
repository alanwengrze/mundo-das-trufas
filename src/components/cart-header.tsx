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

export const CartHeader = () => {
  const {itemsCart, error, removeFromCart} = useCart();
  const { data: session, status } = useSession();

  function handleRemoveItem(productId: string) {
    removeFromCart(productId);
  }


  if (status === "loading") return <p>Carregando...</p>;
  if (status === "unauthenticated") return <p>Por favor, faça login para ver seu carrinho.</p>;
  if (error) return <p>Erro: {error}</p>;
  if (itemsCart.length === 0) return <p>Seu carrinho está vazio.</p>;

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
          <SheetTitle>Meu carrinho</SheetTitle>
        </SheetHeader>
         {
          itemsCart.map((item) => (
            <ItemCart 
              key={item.product.id} 
              name={item.product.name} 
              description={item.product.description} 
              category={item.product.category} 
              price={item.product.price} 
              imageUrl={item.product.imageUrl} 
              // quantity={item.quantity}
              onRemoveItem={() => handleRemoveItem(item.productId)}
            />
          ))
         }
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between text-primary">
            <span className="text-xl font-semibold">Total:</span>
            <span className="text-xl font-semibold"><span className="text-sm mr-1 font-thin">R$</span>14</span>
          </div>
          <Button className="w-full">Finalizar compra</Button>
        </div>
      </SheetContent>
      
    </Sheet>
  );
};