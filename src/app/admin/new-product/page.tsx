"use client"

import { ProductForm } from "./new-product-form"

export default function NewProduct() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Novo produto</h1>
      <ProductForm />
    </div>
  )
}
