/*
  Warnings:

  - You are about to alter the column `totalRevenue` on the `Analytics` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - The `recentPayments` column on the `Analytics` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `monthlyPayments` column on the `Analytics` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `weeklyPayments` column on the `Analytics` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `dailyPayments` column on the `Analytics` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `amount` on the `Expense` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `amount` on the `Payment` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `remainingAmount` on the `PaymentTracker` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `prepaidAmount` on the `PaymentTracker` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `WelfareProgram` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `expectedAmount` on the `WelfareProgram` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - Added the required column `fullname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Analytics" ALTER COLUMN "totalRevenue" SET DATA TYPE DOUBLE PRECISION,
DROP COLUMN "recentPayments",
ADD COLUMN     "recentPayments" TEXT[],
DROP COLUMN "monthlyPayments",
ADD COLUMN     "monthlyPayments" TEXT[],
DROP COLUMN "weeklyPayments",
ADD COLUMN     "weeklyPayments" TEXT[],
DROP COLUMN "dailyPayments",
ADD COLUMN     "dailyPayments" TEXT[];

-- AlterTable
ALTER TABLE "Expense" ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "PaymentTracker" ALTER COLUMN "remainingAmount" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "prepaidAmount" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "fullname" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WelfareProgram" ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "expectedAmount" SET DATA TYPE DOUBLE PRECISION;
