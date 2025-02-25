"use client"

import useSWR from "swr";
import { OrderType } from "@/schemas/order.schema";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { Title } from "@/components/title";
import { Loader } from "@/components/loader";
import { AnimateTransactionWrapper } from "@/components/animate-transaction-wrapper";

export default function Orders() {
  const {data: session, status } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";
  const { data: orders, isLoading } = useSWR<OrderType[]>(
   status === "authenticated" ? "/order" : null, 
    async (url: string) => {
      const response = await api.get(url);
      return response.data;
    }
  );
  if(isLoading) return <Loader />
  return (
    <AnimateTransactionWrapper className="container mx-auto">
      <Title title={ isAdmin ? "Pedidos" : "Meus pedidos"} />
      <DataTable 
        columns={columns} 
        data={orders || []}
      />
    </AnimateTransactionWrapper>
  );
}