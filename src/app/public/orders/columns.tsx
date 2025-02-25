"use client"

import { ColumnDef } from "@tanstack/react-table"
import { OrderType } from "@/schemas/order.schema"
import { priceFormatter, dateFormatter } from "@/utils/dateFormatter"
import clsx from "clsx"

import { api } from "@/lib/axios"
import { MoreAction } from "@/components/more-action"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { DataTableColumnHeader } from "@/components/data-table-column-header"
import Link from "next/link"
import { mutate } from "swr"
import { ButtonDestructive } from "@/components/button-destructive"
import { DataTableFilterByIndex } from "@/components/data-table-filter-by-index"

const filterStatus = ['COMPLETED', 'CANCELED', 'PENDING', 'SUCCESS']
const translateStatus:Record<string, string> = {
  COMPLETED: 'Finalizado',
  CANCELED: 'Cancelado',
  PENDING: 'Pendente',
  SUCCESS: 'Entregue',
}
export const columns: ColumnDef<OrderType>[] = [
  {
    accessorKey: "status",
    header: ({column}) => {
      return (
        <DataTableFilterByIndex 
          column={column} 
          title="Status" 
          filterOptions={[
            {label: 'Todos', value: ''},
            ...filterStatus.map(status => ({
              label: translateStatus[status],
              value: status
            }))
          ]}
        />
      )
    },
    cell: ({getValue}) => {
      const value = getValue()
      const status = value as string
      return (
        <div 
          className={clsx(
            `font-bold rounded-md border px-1 w-fit capitalize`,
            {
              'text-green-600 bg-green-200 border-green-600': status === 'COMPLETED',
              'text-red-600 bg-red-200 border-red-600': status === 'CANCELED',
              'text-orange-600 bg-orange-200 border-orange-600': status === 'PENDING'
            }
          )}>
          {status === 'COMPLETED' ? 'Finalizado' : status === 'CANCELED' ? 'Cancelado' : 'Pendente'}
        </div>
      )
    }
  },
  {
    accessorKey: "orderDate",
    header: ({column}) => {
      return (
        <DataTableColumnHeader column={column} title="Data da compra"/>
      )
    },
    cell: ({getValue}) => {
      const value = getValue();
      const date = new Date(value as string);
      return <div>{dateFormatter.format(date)}</div>
    }
  },
  {
    accessorKey: "amount",
    header: ({column}) => {
      return (
        <DataTableColumnHeader column={column} title="Total"/>
      )
    },
    cell: ({getValue})=> {
      const value = getValue()
      const amount = value as number
      return priceFormatter.format(amount)
    } 
  },
  {
    accessorKey: "id",
    header: () => <div>Ações</div>,
    cell: ({getValue})=> {
      const value = getValue()
      const id = value as string

     const handleDelete = async () => {
       try {
         await api.delete(`/order/${id}`);
         mutate(`/order`);
         
       } catch (error) {
         console.error(error);
       }
     }

      return (
        <MoreAction>
           <DropdownMenuItem
            asChild
          >
            <Link href={`/public/orders/${id}`}>Visualizar</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <ButtonDestructive
              textTrigger="Excluir"
              title="Tem certeza que deseja excluir?"
              description="Ao excluir, você perderá todos os dados relacionados a essa compra."
              textAction="Excluir"
              textCancel="Cancelar"
              onAction={handleDelete}
            />
          </DropdownMenuItem>
        </MoreAction>
      )
    }
  },
]
