-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "authorizationUrl" TEXT,
ADD COLUMN     "status" "PaymentStatus";
