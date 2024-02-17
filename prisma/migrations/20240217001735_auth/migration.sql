/*
  Warnings:

  - You are about to drop the column `userUuid` on the `Url` table. All the data in the column will be lost.
  - Added the required column `AuthorId` to the `Url` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Url" DROP CONSTRAINT "Url_userUuid_fkey";

-- AlterTable
ALTER TABLE "Url" DROP COLUMN "userUuid",
ADD COLUMN     "AuthorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Url" ADD CONSTRAINT "Url_AuthorId_fkey" FOREIGN KEY ("AuthorId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
