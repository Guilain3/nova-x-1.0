-- CreateEnum
CREATE TYPE "AccessStatus" AS ENUM ('GRANTED', 'DENIED');

-- CreateEnum
CREATE TYPE "AccessGrantedTo" AS ENUM ('INVESTORS', 'NOVA');

-- AlterTable
ALTER TABLE "FinancialDocument" ADD COLUMN     "accessGrantedTo" "AccessGrantedTo",
ADD COLUMN     "accessStatus" "AccessStatus",
ADD COLUMN     "accessUpdatedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "FinancialDocument_accessStatus_idx" ON "FinancialDocument"("accessStatus");
