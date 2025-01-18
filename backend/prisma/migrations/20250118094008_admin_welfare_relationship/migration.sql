-- CreateTable
CREATE TABLE "_UserToWelfareProgram" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserToWelfareProgram_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserToWelfareProgram_B_index" ON "_UserToWelfareProgram"("B");

-- AddForeignKey
ALTER TABLE "_UserToWelfareProgram" ADD CONSTRAINT "_UserToWelfareProgram_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToWelfareProgram" ADD CONSTRAINT "_UserToWelfareProgram_B_fkey" FOREIGN KEY ("B") REFERENCES "WelfareProgram"("id") ON DELETE CASCADE ON UPDATE CASCADE;
