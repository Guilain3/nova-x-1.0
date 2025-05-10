// app/api/fintrack/financial-health/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-config";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the current user's SME profile
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email as string },
      include: { smeProfile: true },
    });

    if (!user?.smeProfile) {
      return NextResponse.json(
        { error: "SME profile not found" },
        { status: 404 }
      );
    }

    // Get or create financial health dashboard for this SME
    let healthDashboard = await prisma.businessDocument.findUnique({
      where: { id: user.smeProfile.id },
    });

    // If no dashboard exists yet, create a default one with sample data
    // if (!healthDashboard) {
    //   // In a real app, these values would be calculated from financial documents
    //   healthDashboard = await prisma.businessDocument.create({
    //     data: {
    //       smeId: user.smeProfile.id,
    //       overallHealth: 86, // The 86% shown in your UI
    //       revenueGrowth: 20,
    //       profitMargin: 25,
    //       operatingProfit: 5000000,
    //       netProfitMargin: 12,
    //       ebitda: 8000000,
    //       currentRatio: 1.8,
    //       debtToEquityRatio: 0.4,
    //       workingCapital: 2000000,
    //     },
    //   });
    // }

    return NextResponse.json(healthDashboard);
  } catch (error) {
    console.error("Error fetching financial health dashboard:", error);
    return NextResponse.json(
      { error: "Failed to fetch financial health dashboard" },
      { status: 500 }
    );
  }
}
