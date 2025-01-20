import { ProductCard } from "@/components/product-card"
import { prisma } from "@/lib/prisma"
export async function Home() {
  const products = await prisma.product.findMany();
  return (
    <div className="grid grid-cols-3 gap-3">
      {
        products.map((product) => (
          <ProductCard key={product.id} name={product.name} description={product.description} price={product.price} />
        ))
      }
    </div>
  )
}
