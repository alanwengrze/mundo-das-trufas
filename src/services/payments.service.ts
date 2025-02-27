import { PaymentsRepository } from "@/repositories/payments.repository";

import { PaymentEnumType } from "@/schemas/payment-enum.schema";

export class PaymentsService {
  private paymentsRepository = new PaymentsRepository()
  constructor(paymentsRepository?: PaymentsRepository) { 
    this.paymentsRepository = paymentsRepository || new PaymentsRepository();
  }

  async update(orderId: string, status: PaymentEnumType) {
    console.log("Status payment", status);

    const paymentUpdated = await this.paymentsRepository.update(orderId, status);

    return paymentUpdated
  }
}