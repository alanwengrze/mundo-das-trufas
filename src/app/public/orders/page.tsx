"use client"
import useSWR from "swr";
import { OrderType } from "@/schemas/order.schema";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Order } from "@/components/order";
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
    <div>
      <h1>Orders</h1>
      {orders?.map((order) => (
        <Order key={order.orderDate.toString()} order={order} />
      ))}
    </div>
  );
}