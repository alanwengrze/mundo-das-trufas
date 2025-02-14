import { ThemeToggle } from "./theme-toggle"
import { SignOut } from "./sign-out"
import { SignIn } from "./sign-in"
import { CartHeader } from "./cart-header"
import { auth } from "@/auth"

export const Header = async () => {
  const session = await auth()
  return (
    <div className="glass z-50 sticky top-0 w-full h-20 flex items-center justify-between border-b px-6">
      <div className="flex items-center gap-4">
        <CartHeader />
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