"use client"

import { useContext, createContext, useState } from "react";
import { FullProductType } from "@/schemas/product.schema";
import { api } from "@/lib/axios";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
interface ProductContextType {
  products: FullProductType[];
  error: string | null;
}

export const ProductContext = createContext({} as ProductContextType);
interface ProductProviderProps {
  children: React.ReactNode
}
export function ProductProvider({ children }: ProductProviderProps) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  // Busca os itens do carrinho
  const { data: products, error, mutate } = useSWR<FullProductType[]>(
    status === "authenticated" ? "/products" : null,
    async (url: string) => {
      const response = await api.get(url);
      return response.data;
    }
  );

  async function removeFromCart(productId: string) {
    try {
      await api.delete(`/cart/items/${productId}`);
      toast.success("Produto removido do carrinho");
      mutate();
    }catch (err) {
      toast.error("Erro ao remover produto do carrinho");
    }
  }

  async function incrementQuantity(productId: string, quantity: number) {
    try {
      await api.put(`/cart/items/${productId}`, {
        quantity
      });
      toast.success("Quantidade atualizada com sucesso");
      mutate();
    }catch (err) {
      toast.error("Erro ao atualizar quantidade");
    }
  }

  return(
    <ProductContext.Provider 
      value={{
        products: products || [],
        error: error?.message || null
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export function useProduct() {
  const context = useContext(ProductContext);
  return context
}