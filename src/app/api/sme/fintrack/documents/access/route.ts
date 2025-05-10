// app/api/fintrack/documents/access/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { id, access, accessType } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Document ID is required" },
        { status: 400 }
      );
    }

    // If access is granted, we need an accessType
    if (access === true && !accessType) {
      return NextResponse.json(
        { error: "Access type is required when granting access" },
        { status: 400 }
      );
    }

    // Update the document with the new access settings
    const updatedDocument = await prisma.businessDocument.update({
      where: { id },
      data: {
        verificationStatus: access ? "APPROVED" : "REJECTED",
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedDocument);
  } catch (error: any) {
    console.error("Error updating document access:", error);

    return NextResponse.json(
      { error: "Failed to update document access" },
      { status: 500 }
    );
  }
}
