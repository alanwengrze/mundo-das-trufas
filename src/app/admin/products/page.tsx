"use client"

import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useProduct } from "@/contexts/product-context";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import  Link  from "next/link";
export default function ProductsPage() {
  const {products} = useProduct();
  return(
     <div className="container mx-auto py-10">
      <section className="flex items-center justify-between">
      <h2 className="text-2xl font-bold mb-8">Produtos</h2>
      <Link href="/admin/new-product"> <Button variant="default"> <Icons.plus /> Novo produto</Button></Link>
      </section>
      <DataTable 
        columns={columns} 
        data={products || []}
      />
    </div>
  )
}