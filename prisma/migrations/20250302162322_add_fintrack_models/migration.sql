-- CreateEnum
CREATE TYPE "FinancialDocumentType" AS ENUM ('INCOME_STATEMENT', 'BALANCE_SHEET', 'CASH_FLOW_STATEMENT', 'TAX_RETURN', 'ACCOUNTS_RECEIVABLE', 'ACCOUNTS_PAYABLE', 'OTHER');

-- CreateTable
CREATE TABLE "FinancialDocument" (
    "id" TEXT NOT NULL,
    "smeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileSize" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "documentType" "FinancialDocumentType" NOT NULL,
    "uploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FinancialDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinancialMetric" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "metricName" TEXT NOT NULL,
    "metricValue" DOUBLE PRECISION NOT NULL,
    "metricUnit" TEXT,
    "metricCategory" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FinancialMetric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditScore" (
    "id" TEXT NOT NULL,
    "smeId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "previousScore" INTEGER,
    "scoreDifference" INTEGER,
    "scoreCategory" TEXT NOT NULL,
    "reportUrl" TEXT,
    "scoringFactors" JSONB,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CreditScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinancialHealthDashboard" (
    "id" TEXT NOT NULL,
    "smeId" TEXT NOT NULL,
    "overallHealth" DOUBLE PRECISION NOT NULL,
    "revenueGrowth" DOUBLE PRECISION,
    "profitMargin" DOUBLE PRECISION,
    "operatingProfit" DOUBLE PRECISION,
    "netProfitMargin" DOUBLE PRECISION,
    "ebitda" DOUBLE PRECISION,
    "currentRatio" DOUBLE PRECISION,
    "debtToEquityRatio" DOUBLE PRECISION,
    "workingCapital" DOUBLE PRECISION,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FinancialHealthDashboard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FinancialDocument_smeId_idx" ON "FinancialDocument"("smeId");

-- CreateIndex
CREATE INDEX "FinancialDocument_documentType_idx" ON "FinancialDocument"("documentType");

-- CreateIndex
CREATE INDEX "FinancialMetric_documentId_idx" ON "FinancialMetric"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "CreditScore_smeId_key" ON "CreditScore"("smeId");

-- CreateIndex
CREATE UNIQUE INDEX "FinancialHealthDashboard_smeId_key" ON "FinancialHealthDashboard"("smeId");

-- AddForeignKey
ALTER TABLE "FinancialDocument" ADD CONSTRAINT "FinancialDocument_smeId_fkey" FOREIGN KEY ("smeId") REFERENCES "SMEProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialMetric" ADD CONSTRAINT "FinancialMetric_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "FinancialDocument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditScore" ADD CONSTRAINT "CreditScore_smeId_fkey" FOREIGN KEY ("smeId") REFERENCES "SMEProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialHealthDashboard" ADD CONSTRAINT "FinancialHealthDashboard_smeId_fkey" FOREIGN KEY ("smeId") REFERENCES "SMEProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
