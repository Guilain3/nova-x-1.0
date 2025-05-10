import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-config";
import { prisma } from "@/lib/prisma";
import { DocumentType } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get request body
    const body = await req.json();
    const { documentType, fileUrl, fileName } = body;

    if (!documentType || !fileUrl || !fileName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get the SME profile for the current user
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { smeProfile: true },
    });

    if (!user?.smeProfile) {
      return NextResponse.json(
        { error: "SME profile not found" },
        { status: 404 }
      );
    }

    // Create business document record
    const document = await prisma.businessDocument.create({
      data: {
        name: fileName,
        url: fileUrl,
        type: documentType as DocumentType,
        smeId: user.smeProfile.id,
        verificationStatus: "PENDING",
      },
    });

    return NextResponse.json(document);
  } catch (error) {
    console.error("Error saving document:", error);
    return NextResponse.json(
      { error: "Failed to save document" },
      { status: 500 }
    );
  }
}
