-- CreateTable
CREATE TABLE "EducationalResource" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "author" TEXT,
    "category" TEXT NOT NULL,
    "thumbnail" TEXT,
    "videoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EducationalResource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EducationCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EducationCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinancingOption" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "period" TEXT,
    "amount" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "iconText" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FinancingOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImprovementStep" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "iconText" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "ctaText" TEXT,
    "ctaLink" TEXT,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ImprovementStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupportOption" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "iconType" TEXT NOT NULL,
    "link" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SupportOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IneligibilityReason" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "canUpload" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IneligibilityReason_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedbackSubmission" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeedbackSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EducationCategory_name_key" ON "EducationCategory"("name");
