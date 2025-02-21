"use client"

import { ColumnDef } from "@tanstack/react-table"
import { OrderType } from "@/schemas/order.schema"
import { priceFormatter, dateFormatter } from "@/utils/dateFormatter"
import clsx from "clsx"

import { useRouter } from "next/navigation"
import { api } from "@/lib/axios"
import { MoreAction } from "@/components/more-action"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
export const columns: ColumnDef<OrderType>[] = [
  {
    accessorKey: "status",
    header: () => <div className="text-left">Status</div>,
    cell: ({getValue}) => {
      const value = getValue()
      const status = value as string
      return (
        <div 
          className={clsx(
            `font-bold rounded-md border px-1 w-fit`,
            {
              'text-green-600 bg-green-200 border-green-600': status === 'COMPLETED',
              'text-red-600 bg-red-200 border-red-600': status === 'CANCELED',
              'text-orange-600 bg-orange-200 border-orange-600': status === 'PENDING'   
            }
          )}>
          {status}
        </div>
      )
    }
  },
  {
    accessorKey: "orderDate",
    header: () => <div className="text-left">Data da compra</div>,
    cell: ({getValue}) => {
      const value = getValue();
      const date = new Date(value as string);
      return <div>{dateFormatter.format(date)}</div>
    }
  },
  {
    accessorKey: "amount",
    header: "Total",
    cell: ({getValue})=> {
      const value = getValue()
      const amount = value as number
      return priceFormatter.format(amount)
    } 
  },
  {
    accessorKey: "id",
    header: () => <div >Ações</div>,
    cell: ({getValue})=> {
      const value = getValue()
      const id = value as string

      const {push} = useRouter()

      const handleView = () => push(`/public/orders/${id}`)
     const handleDelete = async () => {
       try {
         await api.delete(`/order/${id}`);
         
       } catch (error) {
         console.error(error);
       }
     }

      return (
        <MoreAction>
           <DropdownMenuItem
            onClick={handleView}
          >
            Visualizar
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
          >
           <Button variant="destructive" onClick={handleDelete}>Excluir</Button>
          </DropdownMenuItem>
        </MoreAction>
      )
    }
  },
]
