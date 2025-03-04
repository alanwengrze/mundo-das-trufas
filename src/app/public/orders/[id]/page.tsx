"use client"

import { clsx } from "clsx"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"

import { useParams} from "next/navigation";
import useSWR from "swr";
import type { FullOrderType } from "@/schemas/order.schema";
import { api } from "@/lib/axios";
import {  priceFormatter } from "@/utils/dateFormatter"
import { Loader } from "@/components/loader"
import { OrderInfo } from "./order-info"

export default function OrderDetails(){
  const params = useParams();
  const id = params.id
  
  console.log("id da order", id)
  const { data: order, error, isLoading } = useSWR<FullOrderType>(
    id ? `/order/${id}` : null, 
    async (url: string) => {
      const response = await api.get(url);
      return response.data;
    });

  if (error) return <p>Erro ao carregar o pedido.</p>;
  if(isLoading) return <Loader />
  if(!order) return <p>Esse pedido não existe.</p>;

  return(
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Pedido: {order.id}</h1>
        <Badge 
          className={clsx(
            "text-sm",
            order.status === "PENDING" && "bg-orange-200 text-orange-600 border-orange-600",
            order.status === "COMPLETED" && "bg-green-200 text-green-600 border-green-600",
            order.status === "CANCELED" && "bg-red-200 text-red-600 border-red-600",
          )}
          >{order.status === 'COMPLETED' ? 'Finalizado' : order.status === 'CANCELED' ? 'Cancelado' : 'Pendente'}</Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <OrderInfo
          paymentType={order.payment?.type}
          createdAt={order.createdAt}
        />

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
                <TableHead className="w-[80px]">Imagem</TableHead>
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
    </div>
  )
}