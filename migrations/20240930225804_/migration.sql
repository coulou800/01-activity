/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Trainees` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Trainees` table. All the data in the column will be lost.
  - Added the required column `full_name` to the `Trainees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trainees" DROP COLUMN "createdAt",
DROP COLUMN "image",
ADD COLUMN     "avatar_url" TEXT,
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "full_name" TEXT NOT NULL;
