import { ThemeToggle } from "./theme-toggle"
import { SignOut } from "./sign-out"
import { SignIn } from "./sign-in"
import { Cart } from "./cart"
import { auth } from "@/auth"
import Image from "next/image"

export const Header = async () => {
  const session = await auth()
  return (
    <div className="sticky w-full h-20 flex items-center justify-between border-b px-6">
      <Image 
        src="/macaron.png"
        alt="macaron"
        width={50}
        height={50}
        className="absolute top-0 left-0"
      />
      <div className="flex items-center gap-4">
        <Cart />
        {
          session?.user ? (
            <div className="flex items-center gap-4">
              <SignOut />
            </div>
          ) : (
            <SignIn />
          )
        }
      </div>
      <ThemeToggle />
    </div>
  )
}