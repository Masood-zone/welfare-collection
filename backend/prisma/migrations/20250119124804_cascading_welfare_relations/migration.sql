-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_welfareProgramId_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_welfareProgramId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_welfareProgramId_fkey";

-- DropForeignKey
ALTER TABLE "PaymentTracker" DROP CONSTRAINT "PaymentTracker_welfareProgramId_fkey";

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_welfareProgramId_fkey" FOREIGN KEY ("welfareProgramId") REFERENCES "WelfareProgram"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_welfareProgramId_fkey" FOREIGN KEY ("welfareProgramId") REFERENCES "WelfareProgram"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentTracker" ADD CONSTRAINT "PaymentTracker_welfareProgramId_fkey" FOREIGN KEY ("welfareProgramId") REFERENCES "WelfareProgram"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_welfareProgramId_fkey" FOREIGN KEY ("welfareProgramId") REFERENCES "WelfareProgram"("id") ON DELETE CASCADE ON UPDATE CASCADE;
