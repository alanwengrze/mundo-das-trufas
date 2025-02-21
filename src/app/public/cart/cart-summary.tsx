"use client";

import { ItemCart } from "./item-cart";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { useSession } from "next-auth/react";
import { useCart } from "@/contexts/cart-context";
import { ButtonCheckout } from "./button-checkout";
// import {Spinner} from "@/components/spinner";
import { Separator } from "@radix-ui/react-separator";
import { priceFormatter } from "@/utils/dateFormatter";
import { VoidCart } from "./void-cart";
export const CartSummary = () => {
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
  if (itemsCart.length === 0) return <VoidCart />;
  const totalItemsPrice = itemsCart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const priceWithDelivery = totalItemsPrice + 7.5;

  return (
  <div className="lg:col-span-2 space-y-4">
    <h1 className="text-3xl font-bold mb-8">Meu carrinho</h1>
    {
      itemsCart.map((item) => (
      <div key={item.product.id} className="w-fit grid gap-8 lg:grid-cols-2">
        <div className="lg:col-span-2 space-y-4">
        <ItemCart 
          itemCart={item}
          onRemoveItem={() => handleRemoveItem(item.productId)}
          onIncrementQuantity={() => handleChangeQuantity(item.productId, item.quantity + 1)}
          onDecrementQuantity={() => handleChangeQuantity(item.productId, item.quantity - 1)}
        />
        </div> 
      </div>
      ))
    }
     <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Detalhes do pedido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{priceFormatter.format(totalItemsPrice) }</span>
            </div>
            <div className="flex justify-between">
              <span>Taxa de entrega</span>
              <span>R$ 7.50</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>{priceFormatter.format(priceWithDelivery) }</span>
            </div>
          </CardContent>
          <CardFooter>
            <ButtonCheckout />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};