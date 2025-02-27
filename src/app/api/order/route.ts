
import { NextResponse } from "next/server";

import { handleError } from "@/middlewares/error-handler";
import { OrdersService } from "@/services/orders.service";
export async function GET() {
  const ordersService = new OrdersService();
  try{
    const orders = await ordersService.findAll();

    return NextResponse.json(orders, { status: 200 });
  }catch (error) {
    return handleError(error);
  }
}