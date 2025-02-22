"use client"

import { useContext, createContext, useState } from "react";
import { ItemCartType } from "@/schemas/itemCart.schema";
import { api } from "@/lib/axios";
import useSWR from "swr";
import { useSession } from "next-auth/react";

interface CartContextType {
  itemsCart: ItemCartType[];
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  changeQuantity: (productId: string, quantity: number) => void;
  error: string | null;
  loading: boolean
}

export const CartContext = createContext({} as CartContextType);
interface CartProviderProps {
  children: React.ReactNode
}
export function CartProvider({ children }: CartProviderProps) {
  const { status } = useSession();
  const [loading, setLoading] = useState(true);

  // Busca os itens do carrinho
  const { data: itemsCart, error, mutate } = useSWR<ItemCartType[]>(
    status === "authenticated" ? "/cart" : null,
    async (url: string) => {
      const response = await api.get(url);
      setLoading(false);
      return response.data;
    }
  );

  // Adiciona um produto ao carrinho
  async function addToCart(productId: string, quantity: number) {
   try {
    setLoading(true);
    await api.post(`/cart/items`, {
      productId,
      quantity
    });
    mutate();
   } catch (error) {
     console.error(error);
     setLoading(false);
   }
  }

  async function removeFromCart(productId: string) {
    try {
      setLoading(true);
      await api.delete(`/cart/items/${productId}`);
      mutate();
    }catch (err) {
      console.error(err);
    }
  }

  async function changeQuantity(productId: string, quantity: number) {
    setLoading(true);
    try {
      await api.patch(`/cart/items/${productId}`, {
        quantity
      });
      
      mutate();
    }catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  return(
    <CartContext.Provider 
      value={{
        itemsCart: itemsCart || [],
        addToCart,
        changeQuantity,
        removeFromCart,
        error: error?.message || null,
        loading
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext);
  return context
}