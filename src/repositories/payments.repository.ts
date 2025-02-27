import { prisma } from "@/lib/prisma";
import { PaymentEnumType } from "@/schemas/payment-enum.schema";

export class PaymentsRepository {

  async update(orderId: string, status:PaymentEnumType ) {

    const paymentUpdated = await prisma.payment.updateMany({
      where: { orderId: orderId },
      data: { status }
    });

    return paymentUpdated
  }
}