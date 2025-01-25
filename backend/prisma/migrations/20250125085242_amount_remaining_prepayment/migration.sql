-- AlterTable
ALTER TABLE "PaymentTracker" ADD COLUMN     "prepaidAmount" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "remainingAmount" DECIMAL(65,30) NOT NULL DEFAULT 0;
