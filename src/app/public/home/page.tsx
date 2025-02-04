import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { ProductCard } from "@/components/product-card"

export async function Home() {
  const session = await auth()
  if(!session){
    return null
  }
  const products = await prisma.product.findMany()

  return (
    <div className="grid grid-cols-3 gap-4">
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

