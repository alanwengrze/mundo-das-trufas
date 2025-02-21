"use client"

import { ColumnDef } from "@tanstack/react-table"
import { priceFormatter } from "@/utils/dateFormatter"
import clsx from "clsx"
import { api } from "@/lib/axios"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import type { ProductType } from "@/schemas/product.schema"
import Link from "next/link"

import { 
  DropdownMenuItem,
 } from "@/components/ui/dropdown-menu"
 import { MoreAction } from "@/components/more-action"
export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "imageUrl",
    header: () => <div className="text-left">Imagem</div>,
    cell: ({getValue}) => {
      const value = getValue()
      const imageUrl = value as string
      return (
        <div>
          <Image 
            src={imageUrl}
            alt="Product image"
            width={50}
            height={50}
            className="rounded-md object-cover"
          />
        </div>
      )
    }
  },
  {
    accessorKey: "name",
    header: () => <div className="text-left">Produto</div>,
    cell: ({getValue})=> {
      const value = getValue()
      const name = value as string
      return (
        <div>{name}</div>
      )
    } 
  },
  {
    accessorKey: "quantityInStock",
    header: () => <div className="text-left">Status</div>,
    cell: ({getValue}) => {
      const value = getValue()
      const status = value as number
      return (
        <div 
          className={clsx(
            `font-bold rounded-md border px-1 w-fit`,
            {
              'text-green-600 bg-green-200 border-green-600': status >= 10,
              'text-orange-600 bg-orange-200 border-orange-600': status < 10,
              'text-red-600 bg-red-200 border-red-600': status === 0   
            }
          )}>
          {
            status >= 10 ? "Em estoque" : status === 0 ? "Sem estoque" : "Pouco estoque"
          }
        </div>
      )
    }
  },
  {
    accessorKey: "price",
    header: () => <div className="text-left">Preço</div>,
    cell: ({getValue}) => {
      const value = getValue();
      const price = value as number;
      return <div>{priceFormatter.format(price)}</div>
    }
  },
  {
    accessorKey: "category.name",
    header: "Categoria",
    cell: ({getValue})=> {
      const value = getValue()
      const category = value as string
      return (
        <div>{category}</div>
      )
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
         await api.delete(`/products/${id}`);
         
       } catch (error) {
         console.error(error);
       }
     }

      return (
        <MoreAction> 
          <DropdownMenuItem asChild>
            <Link href={`/admin/products/${id}`}>
              <Button variant="ghost" size="sm">
                Visualizar
              </Button>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete}>
            <Button variant="destructive" size="sm">
              Excluir
            </Button>
          </DropdownMenuItem>
        </MoreAction>
      )
    }
  },
]
