import { Button } from "./ui/button";
interface ButtonNavigationProps {
  
  onNavigation: () => void
  text?: string
  icon?: React.ReactNode
  variant?: "default" | "destructive" | "ghost"
}
export function ButtonNavigation({onNavigation, text, icon, variant}: ButtonNavigationProps) {
  return(
    <Button onClick={onNavigation} variant={variant}>
      <div className="h-4 w-4">{icon}</div>
      {text}
    </Button>
  )
}