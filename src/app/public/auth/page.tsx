"use client"

import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"

export default function AuthPage() {

  const { handleSubmit, formState } = useForm()
  const { isSubmitting } = formState

  async function onSubmit() {
    try {
      await signIn('google')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-[600px] px-4 md:px-6">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Entrar</CardTitle>
          <CardDescription>
            Fazer login com Google
          </CardDescription>
        </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <CardFooter>
              <Button 
                className="w-full bg-red-400" 
                disabled={isSubmitting}
              >
                { isSubmitting && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Entrar com Google
              </Button>
            </CardFooter>
          </form>
      </Card>
    </div>
  )
}