import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { ProductCard } from "@/components/product-card"
import Image from "next/image"
export async function Home() {
  const session = await auth()
  if(!session){
    return null
  }
  const products = await prisma.product.findMany()

  return (
    <div className="relative grid grid-flow-dense gap-4 grid-cols-1 sm:grid-cols-3 ">
      <Image 
        src="/radial-ellipse.png"
        alt="macaron"
        width={200}
        height={200}
        className="absolute top-0 -left-10"
      />
        <Image 
        src="/radial-ellipse-pink.svg"
        alt="macaron"
        width={200}
        height={200}
        className="absolute -bottom-28 right-0"
      />
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

