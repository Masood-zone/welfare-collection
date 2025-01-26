/*
  Warnings:

  - You are about to alter the column `totalRevenue` on the `Analytics` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `amount` on the `Expense` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `amount` on the `Payment` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `prepaidAmount` on the `PaymentTracker` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `remainingAmount` on the `PaymentTracker` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `amount` on the `WelfareProgram` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `expectedAmount` on the `WelfareProgram` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Analytics" ALTER COLUMN "totalRevenue" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Expense" ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "PaymentTracker" ALTER COLUMN "prepaidAmount" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "remainingAmount" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "WelfareProgram" ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "expectedAmount" SET DATA TYPE DOUBLE PRECISION;
