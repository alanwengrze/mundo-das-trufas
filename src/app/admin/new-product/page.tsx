import { auth } from "@/auth"
import { ProductForm } from "@/components/new-product-form"
import { redirect } from "next/navigation"
export default async function NewProduct() {
  const session = await auth()
  console.log(session?.user.role)
  if(session?.user.role !== "ADMIN") return redirect("/")
  return (
    <div>
      <ProductForm />
    </div>
  )
}