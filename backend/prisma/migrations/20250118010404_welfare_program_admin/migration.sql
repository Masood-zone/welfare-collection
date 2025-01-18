/*
  Warnings:

  - You are about to drop the `WelfareForm` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `welfareProgramId` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `welfareProgramId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `welfareProgramId` to the `PaymentTracker` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EnrollmentStatus" AS ENUM ('PENDING', 'APPROVED');

-- DropForeignKey
ALTER TABLE "WelfareForm" DROP CONSTRAINT "WelfareForm_userId_fkey";

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "welfareProgramId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "welfareProgramId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PaymentTracker" ADD COLUMN     "welfareProgramId" TEXT NOT NULL;

-- DropTable
DROP TABLE "WelfareForm";

-- CreateTable
CREATE TABLE "WelfareProgram" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "paymentCycle" "PaymentCycle" NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WelfareProgram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enrollment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "welfareProgramId" TEXT NOT NULL,
    "status" "EnrollmentStatus" NOT NULL DEFAULT 'PENDING',
    "enrolledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WelfareProgram_name_key" ON "WelfareProgram"("name");

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_welfareProgramId_fkey" FOREIGN KEY ("welfareProgramId") REFERENCES "WelfareProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_welfareProgramId_fkey" FOREIGN KEY ("welfareProgramId") REFERENCES "WelfareProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentTracker" ADD CONSTRAINT "PaymentTracker_welfareProgramId_fkey" FOREIGN KEY ("welfareProgramId") REFERENCES "WelfareProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_welfareProgramId_fkey" FOREIGN KEY ("welfareProgramId") REFERENCES "WelfareProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
