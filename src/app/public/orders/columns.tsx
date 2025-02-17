"use client"

import { ColumnDef } from "@tanstack/react-table"
import { OrderType } from "@/schemas/order.schema"
import { priceFormatter, dateFormatter } from "@/utils/dateFormatter"
import clsx from "clsx"

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
              'text-green-500 bg-green-200 border-green-500': status === 'COMPLETED',
              'text-red-300 bg-red-200 border-red-500': status === 'CANCELED',
              'text-orange-300 bg-orange-200 border-orange-500': status === 'PENDING'   
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
]
