import { prisma } from "@/lib/prisma";
import { handleError } from "@/middlewares/error-handler";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { AppError } from "@/errors/app-error";
export async function POST(req: Request) {
  try {
    const session = await auth();
    const data = await req.json();
    
    if (!session?.user?.id) {
      throw new AppError("Usuário não autenticado.");
    }
    const addressExists = await prisma.address.findFirst({
      where: {
        userId: session.user.id,
        zipCode: data.zipCode,
        number: data.number
      },
    })

    if (addressExists) {
      throw new AppError("Esse endereço já está na sua lista de endereços!");
    }
    
    const address = await prisma.address.create({
      data: {
        ...data,
        userId: session.user.id,
      },
    });

    return NextResponse.json(address, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new AppError("Usuário não autenticado.");
    }
    const address = await prisma.address.findMany({
      where: {
        userId: session.user.id,
      },
    });
    
    return NextResponse.json(address, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}