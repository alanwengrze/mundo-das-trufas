import { AppError } from "@/errors/app-error";
import { prisma } from "@/lib/prisma";
import { handleError } from "@/middlewares/error-handler";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  console.log(req);
  try {
    const id = (await params).id;
    if(!id) throw new AppError("O pedido não foi encontrado.");
  
    const order = await prisma.order.findUnique({ 
      where: { id: id },
      include: {
        itemsOrder: {
          include: {
            product: {include: {category: true}}
          }
        },
        user: true,
        address: true,
        payment: true
      },
    });

  return NextResponse.json(order, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  // console.log(req);
  try {
    const id = (await params).id;

    if (!id) {
      return NextResponse.json({ error: "O ID do pedido não foi fornecido." }, { status: 400 });
    }

    const orderExists = await prisma.order.findUnique({ where: { id } });

    if (!orderExists) {
      return NextResponse.json({ error: "Pedido não encontrado." }, { status: 404 });
    }

    await prisma.order.delete({ 
      where: { id: id },
      include: {
        itemsOrder: {
          include: {
            product: {include: {category: true}}
          }
        },
        user: true,
        address: true,
        payment: true
      },
     });

    return NextResponse.json( { message: "Pedido removido com sucesso." }, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}