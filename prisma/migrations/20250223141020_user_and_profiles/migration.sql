-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SME', 'INVESTOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "FundingRequestStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('REGISTRATION_CERTIFICATE', 'TAX_CLEARANCE', 'KEY_PERSON_ID', 'PRACTICE_LICENSE', 'BUSINESS_PLAN', 'FINANCIAL_STATEMENT', 'OTHER');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "resetToken" TEXT,
    "resetTokenExpiry" TIMESTAMP(3),
    "verificationToken" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SMEProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "businessEmail" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "industryId" TEXT NOT NULL,
    "commencementDate" TIMESTAMP(3) NOT NULL,
    "representativeName" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "representativeEmail" TEXT,
    "representativePhone" TEXT,
    "description" TEXT,
    "employeeCount" INTEGER,
    "annualRevenue" DOUBLE PRECISION,
    "website" TEXT,
    "documentVerificationStatus" "VerificationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SMEProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestorProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyName" TEXT,
    "investorType" TEXT NOT NULL,
    "investmentRange" JSONB,
    "totalInvestments" INTEGER NOT NULL DEFAULT 0,
    "portfolioSize" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvestorProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Industry" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Industry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IndustryPreference" (
    "id" TEXT NOT NULL,
    "investorId" TEXT NOT NULL,
    "industryId" TEXT NOT NULL,

    CONSTRAINT "IndustryPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FundingRequest" (
    "id" TEXT NOT NULL,
    "smeId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "purpose" TEXT NOT NULL,
    "timeline" TEXT NOT NULL,
    "status" "FundingRequestStatus" NOT NULL DEFAULT 'DRAFT',
    "equityOffered" DOUBLE PRECISION,
    "minimumInvestment" DOUBLE PRECISION,
    "maximumInvestment" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FundingRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessDocument" (
    "id" TEXT NOT NULL,
    "smeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" "DocumentType" NOT NULL,
    "verificationStatus" "VerificationStatus" NOT NULL DEFAULT 'PENDING',
    "verifiedAt" TIMESTAMP(3),
    "verifiedBy" TEXT,
    "rejectionReason" TEXT,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "fundingRequestId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FundingRequestToInvestorProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FundingRequestToInvestorProfile_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_resetToken_key" ON "User"("resetToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_verificationToken_key" ON "User"("verificationToken");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SMEProfile_userId_key" ON "SMEProfile"("userId");

-- CreateIndex
CREATE INDEX "SMEProfile_industryId_idx" ON "SMEProfile"("industryId");

-- CreateIndex
CREATE UNIQUE INDEX "InvestorProfile_userId_key" ON "InvestorProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Industry_name_key" ON "Industry"("name");

-- CreateIndex
CREATE INDEX "IndustryPreference_investorId_idx" ON "IndustryPreference"("investorId");

-- CreateIndex
CREATE INDEX "IndustryPreference_industryId_idx" ON "IndustryPreference"("industryId");

-- CreateIndex
CREATE UNIQUE INDEX "IndustryPreference_investorId_industryId_key" ON "IndustryPreference"("investorId", "industryId");

-- CreateIndex
CREATE INDEX "FundingRequest_smeId_idx" ON "FundingRequest"("smeId");

-- CreateIndex
CREATE INDEX "FundingRequest_status_idx" ON "FundingRequest"("status");

-- CreateIndex
CREATE INDEX "BusinessDocument_smeId_idx" ON "BusinessDocument"("smeId");

-- CreateIndex
CREATE INDEX "BusinessDocument_type_idx" ON "BusinessDocument"("type");

-- CreateIndex
CREATE INDEX "BusinessDocument_verificationStatus_idx" ON "BusinessDocument"("verificationStatus");

-- CreateIndex
CREATE INDEX "Document_fundingRequestId_idx" ON "Document"("fundingRequestId");

-- CreateIndex
CREATE INDEX "_FundingRequestToInvestorProfile_B_index" ON "_FundingRequestToInvestorProfile"("B");

-- AddForeignKey
ALTER TABLE "SMEProfile" ADD CONSTRAINT "SMEProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SMEProfile" ADD CONSTRAINT "SMEProfile_industryId_fkey" FOREIGN KEY ("industryId") REFERENCES "Industry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestorProfile" ADD CONSTRAINT "InvestorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndustryPreference" ADD CONSTRAINT "IndustryPreference_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "InvestorProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndustryPreference" ADD CONSTRAINT "IndustryPreference_industryId_fkey" FOREIGN KEY ("industryId") REFERENCES "Industry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FundingRequest" ADD CONSTRAINT "FundingRequest_smeId_fkey" FOREIGN KEY ("smeId") REFERENCES "SMEProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessDocument" ADD CONSTRAINT "BusinessDocument_smeId_fkey" FOREIGN KEY ("smeId") REFERENCES "SMEProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_fundingRequestId_fkey" FOREIGN KEY ("fundingRequestId") REFERENCES "FundingRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FundingRequestToInvestorProfile" ADD CONSTRAINT "_FundingRequestToInvestorProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "FundingRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FundingRequestToInvestorProfile" ADD CONSTRAINT "_FundingRequestToInvestorProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "InvestorProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
