// app/api/fintrack/credit-score/route.ts
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

    // Get or create credit score for this SME
    let creditScore = await prisma.businessDocument.findUnique({
      where: { id: user.smeProfile.id },
    });

    // If no credit score exists yet, create a default one
    // if (!creditScore) {

    //   // use a default score for now instead of financial data
    //   creditScore = await prisma.businessDocument.create({
    //     data: {
    //       smeId: user.smeProfile.id,
    //       previousScore: 994, // 6 points lower than current
    //       scoreDifference: 6,
    //       scoreCategory: "Excellent",
    //       reportUrl: "/reports/credit-report.pdf", // Placeholder URL
    //     }
    //   });
    // }

    return NextResponse.json(creditScore);
  } catch (error) {
    console.error("Error fetching credit score:", error);
    return NextResponse.json(
      { error: "Failed to fetch credit score" },
      { status: 500 }
    );
  }
}
