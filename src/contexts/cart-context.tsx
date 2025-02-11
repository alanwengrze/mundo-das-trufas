"use client"

import { useContext, createContext, useState } from "react";
import { ItemCartType } from "@/schemas/itemCart.schema";
import { api } from "@/lib/axios";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
interface CartContextType {
  itemsCart: ItemCartType[];
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  changeQuantity: (productId: string, quantity: number) => void;
  error: string | null;
}

export const CartContext = createContext({} as CartContextType);
interface CartProviderProps {
  children: React.ReactNode
}
export function CartProvider({ children }: CartProviderProps) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  // Busca os itens do carrinho
  const { data: itemsCart, error, mutate } = useSWR<ItemCartType[]>(
    status === "authenticated" ? "/cart" : null,
    async (url: string) => {
      const response = await api.get(url);
      return response.data;
    }
  );

  // Adiciona um produto ao carrinho
  async function addToCart(productId: string, quantity: number) {
    try {
        await api.post(`/cart/items`, {
          productId,
          quantity
      });
      toast.success("Produto adicionado ao carrinho");
      mutate();
      
    }catch (err) {
      toast.error("Erro ao adicionar produto ao carrinho");
    }
  }

  async function removeFromCart(productId: string) {
    try {
      await api.delete(`/cart/items/${productId}`);
      toast.success("Produto removido do carrinho");
      mutate();
    }catch (err) {
      toast.error("Erro ao remover produto do carrinho");
    }
  }

  async function changeQuantity(productId: string, quantity: number) {
    try {
      console.log("quantity", quantity);
      await api.patch(`/cart/items/${productId}`, {
        quantity
      });
      toast.success("Quantidade atualizada com sucesso");
      mutate();
    }catch (err) {
      toast.error("Erro ao atualizar quantidade");
    }
  }

  return(
    <CartContext.Provider 
      value={{
        itemsCart: itemsCart || [],
        addToCart,
        changeQuantity,
        removeFromCart,
        error: error?.message || null
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