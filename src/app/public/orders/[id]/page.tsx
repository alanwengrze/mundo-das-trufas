"use client"

import { clsx } from "clsx"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Package } from "lucide-react"
import Image from "next/image"

import { useEffect } from "react";

import { useParams} from "next/navigation";
import useSWR from "swr";
import type { FullOrderType } from "@/schemas/order.schema";
import { api } from "@/lib/axios";
import { dateFormatter, priceFormatter } from "@/utils/dateFormatter"

export default function OrderDetails(){
  const params = useParams();
  const id = params.id
  
  console.log("id da order", id)
  const { data: order, error } = useSWR<FullOrderType>(
    id ? `/order/${id}` : null, 
    async (url: string) => {
      const response = await api.get(url);
      return response.data;
    });

  useEffect(() => {
    console.log(id)
  }, [id])
  if (error) return <p>Erro ao carregar o pedido.</p>;
  if (!order) return <p>Carregando...</p>;

  return(
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Pedido: {order.id}</h1>
        <Badge 
          className={clsx(
            "text-sm",
            order.status === "PENDING" && "bg-yellow-200 text-yellow-600 border-yellow-600",
            order.status === "COMPLETED" && "bg-green-200 text-green-600 border-green-600",
            order.status === "CANCELED" && "bg-red-200 text-red-600 border-red-600",
          )}
          >{order.status}</Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informações do pedido</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Data do pedido</span>
              <span>{dateFormatter.format(order.createdAt)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Método de pagamento</span>
              <span>Credit Card</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Endereço de entrega</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="font-medium">{order.user?.name}</p>
              <p className="text-muted-foreground">
                {order.address?.street},
                <br />
                {order.address?.number}
                <br />
                {order.address?.city},
                <br />
                {order.address?.state}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Itens do pedido</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                order.itemsOrder.map(item => (
                  <TableRow key={item.productId}>
                    <TableCell>
                      <div className="w-[64px] h-[64px] relative">
                        <Image src={item.product.imageUrl} alt={item.product.name} fill className="object-cover rounded-md" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-muted-foreground">{item.product.category?.name}</p>
                      </div>
                    </TableCell>
                    <TableCell>{priceFormatter.format(item.product.price)}</TableCell>
                    <TableCell>{item.quantity}</TableCell>

                    <TableCell className="text-right">{priceFormatter.format(item.product.price * item.quantity)}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resumo do pedido</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{priceFormatter.format(order.amount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Frete</span>
              <span>{priceFormatter.format(0)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>{priceFormatter.format(order.amount)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-lg border bg-card text-card-foreground p-6">
        <div className="flex items-center gap-4">
          <Package className="h-6 w-6 text-muted-foreground" />
          <div className="flex-1">
            <p className="text-sm font-medium">Delivery Status</p>
            <p className="text-sm text-muted-foreground">
              Your order has been delivered on February 19, 2024 at 2:30 PM
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}