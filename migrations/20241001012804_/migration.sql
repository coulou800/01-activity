/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `Trainees` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uid` to the `Trainees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trainees" ADD COLUMN     "uid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Trainees_uid_key" ON "Trainees"("uid");
