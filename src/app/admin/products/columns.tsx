"use client"

import { ColumnDef } from "@tanstack/react-table"
import { priceFormatter } from "@/utils/dateFormatter"
import clsx from "clsx"
import { Button } from "@/components/ui/button"
import { DataTableColumnHeader } from "@/components/data-table-column-header"
import Image from "next/image"
import type { ProductType } from "@/schemas/product.schema"
import { FullCategoryType } from "@/schemas/category.schema"
import Link from "next/link"
import { 
  DropdownMenuItem,
 } from "@/components/ui/dropdown-menu"
 import { MoreAction } from "@/components/more-action"
import { ButtonDestructive } from "@/components/button-destructive"
import { DataTableFilterByIndex } from "@/components/data-table-filter-by-index"
import swr, { mutate } from "swr"
import { api } from "@/lib/axios"


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
    header:({column}) => {
      const status = ['Em estoque', 'Sem estoque', 'Pouco estoque']
      const filterOptions = status.map((status)=> {
        return {
          label: status,
          value: status
        }
      })
      return (
        <DataTableFilterByIndex filterOptions={filterOptions} column={column} title="Estoque"/>
      )
    },
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
    header:({column}) => {
      return (
        <DataTableColumnHeader  column={column} title="Preço"/>
      )
    },
    cell: ({getValue}) => {
      const value = getValue();
      const price = value as number;
      return <div>{priceFormatter.format(price)}</div>
    }
  },
  {
    accessorKey: "category.name",
    header:({column}) => {
      const {data: categories} = swr<FullCategoryType[]>("/categories", 
        async (url: string) => {
          const response = await api.get(url);
          return response.data;
        }
      )

      if(!categories) return <div>Carregando...</div>
      
      return (
        <DataTableFilterByIndex 
          filterOptions={[
            { label: "Todos", value: "" },
            ...categories.map((category) => ({
              label: category.name,
              value: category.name,
            })),
          ]} 
          column={column} 
          title="Categoria" 
        />
      )
    },
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
        mutate(`/products`);
       } catch (error) {
         console.error(error);
       }
     }

      return (
        <MoreAction> 
          <DropdownMenuItem asChild>
            <Link href={`/public/products/${id}`}>
              <Button variant="ghost" size="sm">
                Visualizar
              </Button>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/admin/products/${id}`}>
              <Button variant="ghost" size="sm">
                Editar
              </Button>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
           <ButtonDestructive
              textTrigger="Excluir"
              title="Tem certeza que deseja excluir?"
              description="Ao excluir o produto, ele sera removido do seu catálogo e apenas poderá ser recuperado por meio do banco de dados."
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
