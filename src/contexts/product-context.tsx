"use client"

import { useContext, createContext, useState } from "react";
import { FullProductType } from "@/schemas/product.schema";
import { api } from "@/lib/axios";
import useSWR from "swr";
// import { useSession } from "next-auth/react";
interface ProductContextType {
  products: FullProductType[];
  getProductById: (id: string) => Promise<FullProductType | null>;
  deleteProduct: (id: string) => Promise<void>;
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
  const { data: products, error, mutate } = useSWR<FullProductType[]>(
    "/products",
    async (url: string) => {
      setLoading(false);
      const response = await api.get(url);
      return response.data;
    }
  );

  async function getProductById(id: string) {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteProduct(id: string) {
    try {
      await api.delete(`/products/${id}`);
      mutate();
    } catch (error) {
      console.error(error);
    }
  }

  return(
    <ProductContext.Provider 
      value={{
        products: products || [],
        getProductById,
        deleteProduct,
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