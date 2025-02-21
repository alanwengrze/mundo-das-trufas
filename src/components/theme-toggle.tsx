"use client"

import * as React from "react"
import { Moon, Sun, } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  function handleThemeChange() {
    setTheme(theme === "dark" ? "light" : "dark")
  }
  return (
    <Button
      className="h-7 w-7"
      variant="outline"
      onClick={handleThemeChange}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
      <span className="sr-only">Toggle theme</span>
    </Button>
    
  )
}
