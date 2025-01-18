/*
  Warnings:

  - You are about to drop the `_UserToWelfareProgram` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserToWelfareProgram" DROP CONSTRAINT "_UserToWelfareProgram_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserToWelfareProgram" DROP CONSTRAINT "_UserToWelfareProgram_B_fkey";

-- DropTable
DROP TABLE "_UserToWelfareProgram";

-- AddForeignKey
ALTER TABLE "WelfareProgram" ADD CONSTRAINT "WelfareProgram_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
