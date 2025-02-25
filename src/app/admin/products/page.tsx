"use client"

import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { useProduct } from "@/contexts/product-context";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import  Link  from "next/link";
import { Title } from "@/components/title";
import { Loader } from "@/components/loader";
export default function ProductsPage() {
  const {products, loading} = useProduct();
  if(loading) return <Loader />
  return(
     <div className="container mx-auto py-10">
      <section className="flex items-center justify-between">
      <Title title="Produtos" />
      <Link href="/admin/new-product"> <Button variant="default"> <Icons.plus /> Novo produto</Button></Link>
      </section>
      <DataTable 
        columns={columns} 
        data={products || []}
        inputFilter
      />
    </div>
  )
}