/*
  Warnings:

  - Added the required column `paymentId` to the `PaymentTracker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PaymentTracker" ADD COLUMN     "paymentId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "PaymentTracker" ADD CONSTRAINT "PaymentTracker_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
