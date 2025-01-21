
import { prisma } from "@/lib/prisma"
import { ProductCard } from "@/components/product-card"

export async function Home() {
  const products = await prisma.product.findMany()

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {
        products.map((product) => (
          <ProductCard 
            key={product.id}
            category={product.category}
            description={product.description}
            imageUrl={product.imageUrl!}
            name={product.name}
            price={product.price}
          />
        ))
      }
    </div>
  )
}

