/*
  Warnings:

  - The values [SUCCESS] on the enum `OrderStatusEnum` will be removed. If these variants are still used in the database, this will fail.
  - The `status` column on the `payments` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PaymentStatusEnum" AS ENUM ('PENDING', 'COMPLETED', 'CANCELED', 'REFUNDED');

-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatusEnum_new" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'CANCELED');
ALTER TABLE "orders" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "orders" ALTER COLUMN "status" TYPE "OrderStatusEnum_new" USING ("status"::text::"OrderStatusEnum_new");
ALTER TYPE "OrderStatusEnum" RENAME TO "OrderStatusEnum_old";
ALTER TYPE "OrderStatusEnum_new" RENAME TO "OrderStatusEnum";
DROP TYPE "OrderStatusEnum_old";
ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_orderId_fkey";

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "status",
ADD COLUMN     "status" "PaymentStatusEnum" NOT NULL DEFAULT 'PENDING';

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
