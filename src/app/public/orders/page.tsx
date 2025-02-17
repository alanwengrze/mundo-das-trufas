"use client"

import useSWR from "swr";
import { OrderType } from "@/schemas/order.schema";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function Orders() {
  const { status } = useSession();
  const { data: orders } = useSWR<OrderType[]>(
   status === "authenticated" ? "/order" : null, 
    async (url: string) => {
          const response = await api.get(url);
          return response.data;
        }
  );

  return (
    <div className="container mx-auto py-10">
      <div></div>  
      <DataTable 
        columns={columns} 
        data={orders || []} 
      />
    </div>
  );
}