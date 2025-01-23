/*
  Warnings:

  - You are about to drop the column `authorizationUrl` on the `Payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "authorizationUrl",
ADD COLUMN     "access_code" TEXT;
