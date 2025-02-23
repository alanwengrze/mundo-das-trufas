import { Button } from "./ui/button";
import {AlertDialog, AlertDialogCancel, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger, AlertDialogFooter, AlertDialogHeader } from "./ui/alert-dialog";

interface ButtonDestructiveProps {
  textTrigger: string
  textAction: string
  textCancel: string
  title?: string
  description: string
  onAction: () => void
}

export function ButtonDestructive({
  textTrigger,
  textAction,
  textCancel,
  title,
  description,
  onAction
}: ButtonDestructiveProps) {
  return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button 
            size="sm"
            variant="ghost"
          >
            {textTrigger}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>
              {description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{textCancel}</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button 
                className="border-none bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={onAction}
              >
                {textAction}
              </Button>
          </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
  )
}