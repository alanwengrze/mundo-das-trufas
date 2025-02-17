import { Button } from "./ui/button";

interface ButtonNavigationProps {
  
  onNavigation: () => void
  text?: string
  icon?: React.ReactNode
}
export function ButtonNavigation({onNavigation, text, icon}: ButtonNavigationProps) {
  return(
    <Button onClick={onNavigation}>
      <div className="mr-2 h-4 w-4">{icon}</div>
      {text}
    </Button>
  )
}