// app/api/fintrack/documents/route.ts
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

    // Get documents for this SME
    const documents = await prisma.businessDocument.findMany({
      where: { smeId: user.smeProfile.id },
      // orderBy: { uploadDate: "desc" },
      // include: { metrics: true }, // Include related metrics
    });

    return NextResponse.json(documents);
  } catch (error) {
    console.error("Error fetching documents:", error);
    return NextResponse.json(
      { error: "Failed to fetch documents" },
      { status: 500 }
    );
  }
}
