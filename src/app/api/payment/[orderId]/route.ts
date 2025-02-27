import { prisma } from "@/lib/prisma";
import { handleError } from "@/middlewares/error-handler";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ orderId: string }> }) {
  const orderId = (await params).orderId;
  try {
    const order = await prisma.payment.findUnique({
      where: { orderId: orderId },
    })
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ orderId: string }> }) {
  const orderId = (await params).orderId;
  const {status} = await req.json();
  try {
    const payment = await prisma.payment.updateMany({
      where: { orderId: orderId },
      data: { status },
    })
    return NextResponse.json(payment, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}