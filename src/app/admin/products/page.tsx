"use client"

import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { useProduct } from "@/contexts/product-context";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import  Link  from "next/link";
import { Title } from "@/components/title";
export default function ProductsPage() {
  const {products} = useProduct();
  return(
     <div className="container mx-auto py-10">
      <section className="flex items-center justify-between">
      <Title title="Produtos" />
      <Link href="/admin/new-product"> <Button variant="default"> <Icons.plus /> Novo produto</Button></Link>
      </section>
      <DataTable 
        columns={columns} 
        data={products || []}
      />
    </div>
  )
}