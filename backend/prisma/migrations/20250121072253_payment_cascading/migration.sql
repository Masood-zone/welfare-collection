-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_userId_fkey";

-- DropForeignKey
ALTER TABLE "PaymentTracker" DROP CONSTRAINT "PaymentTracker_paymentId_fkey";

-- DropForeignKey
ALTER TABLE "WelfareProgram" DROP CONSTRAINT "WelfareProgram_createdBy_fkey";

-- AddForeignKey
ALTER TABLE "WelfareProgram" ADD CONSTRAINT "WelfareProgram_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentTracker" ADD CONSTRAINT "PaymentTracker_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
