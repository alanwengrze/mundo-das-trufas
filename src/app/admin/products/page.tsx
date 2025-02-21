"use client"

import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useProduct } from "@/contexts/product-context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
export default function ProductsPage() {
  const {push} = useRouter();
  const {products} = useProduct();
  return(
     <div className="container mx-auto py-10">
      <section className="flex items-center justify-between">
      <h2 className="text-2xl font-bold mb-8">Produtos</h2>
      <Button variant="outline" onClick={() => push("/admin/new-product")}> <Icons.plus /> Novo produto</Button>
      </section>
      <DataTable 
        columns={columns} 
        data={products || []}
      />
    </div>
  )
}