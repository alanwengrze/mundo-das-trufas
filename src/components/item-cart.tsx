import { Buy } from "./buy";
import { Card, CardHeader, CardContent, CardDescription, CardFooter, CardTitle } from "./ui/card";
import Image from "next/image";
export const ItemCart = () => {

  return(
    <Card className="h-fit pt-4 rounded-md sm:flex items-center">
      <CardHeader>
        <Image
            src="/macaron.png"
            alt="macaron"
            width={100}
            height={100}
          />
      </CardHeader>
      <CardContent className="flex flex-col gap-2 items-center">
        <CardTitle className="text-primary">Macaron</CardTitle>
        <CardDescription>Delicioso macaron</CardDescription>
        <CardFooter className="flex justify-between items-center gap-3">
          <div className="flex items-center text-muted-foreground">
            <p className="text-sm mr-1 font-thin">R$</p>
            <span className="text-xl font-semibold">
              7
            </span>
          </div>
          
          <Buy />
        </CardFooter>
      </CardContent>
    </Card>
  )
};