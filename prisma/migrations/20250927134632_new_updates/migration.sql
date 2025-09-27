/*
  Warnings:

  - You are about to drop the column `applyAt` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerify` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Application" DROP COLUMN "applyAt",
ADD COLUMN     "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "emailVerify",
ADD COLUMN     "emailVerified" TIMESTAMP(3);
