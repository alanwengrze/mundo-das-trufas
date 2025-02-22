"use client";

import { ItemCart } from "./item-cart";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { useCart } from "@/contexts/cart-context";

// import {Spinner} from "@/components/spinner";
import { Separator } from "@radix-ui/react-separator";
import { priceFormatter } from "@/utils/dateFormatter";
import { VoidCart } from "./void-cart";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import { useReward } from 'react-rewards';
import { redirect } from "next/navigation";

export const CartSummary = () => {
  const { itemsCart, error, removeFromCart, changeQuantity, loading} = useCart();
  const { reward, isAnimating } = useReward('rewardId', 'confetti');
  function handleRemoveItem(productId: string) {
    removeFromCart(productId);
  }

  function handleChangeQuantity(productId: string, quantity: number) {
    changeQuantity(productId, quantity);
  }

  async function handleCheckout() {
    reward();
    redirect("/public/checkout");
  }

  if (error) return <p>Erro: {error}</p>;
  if ( itemsCart.length === 0) return <VoidCart />;
  const totalItemsPrice = itemsCart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const priceWithDelivery = totalItemsPrice + 7.5;

  return (
  <div className="space-y-4">
    <h1 className="text-3xl font-bold mb-8">Meu carrinho</h1>
    <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 ">
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
            <Button
              disabled={ loading || isAnimating}
              onClick={handleCheckout}
            >
              {
                loading ? (
                  <div id="rewardId" className="flex items-center gap-2">
                    <span>Processando...</span>
                    <Spinner />
                  </div>
                ) : (
                  <span id="rewardId">Finalizar pedido</span>
                )
              }
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};