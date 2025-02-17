"use client"

import { useContext, createContext, useState } from "react";
import { FullProductType } from "@/schemas/product.schema";
import { api } from "@/lib/axios";
import useSWR from "swr";
// import { useSession } from "next-auth/react";
interface ProductContextType {
  products: FullProductType[];
  error: string | null;
  loading: boolean
}

export const ProductContext = createContext({} as ProductContextType);
interface ProductProviderProps {
  children: React.ReactNode
}
export function ProductProvider({ children }: ProductProviderProps) {
  // const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  // Busca os itens do carrinho
  const { data: products, error, isLoading} = useSWR<FullProductType[]>(
    "/products",
    async (url: string) => {
      isLoading && setLoading(false);
      const response = await api.get(url);
      return response.data;
    }
  );

  return(
    <ProductContext.Provider 
      value={{
        products: products || [],
        error: error?.message || null,
        loading
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