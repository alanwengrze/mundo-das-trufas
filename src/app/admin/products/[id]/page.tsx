import { Title } from "@/components/title"
import { EditProductForm } from "./edit-product-form"
export default function EditProductPage() {
  return (
    <div className="flex flex-col gap-4">
      <Title title="Editar produto" />
      <EditProductForm />
    </div>
  )
}