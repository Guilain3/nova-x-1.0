import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-config";
import { prisma } from "@/lib/prisma";
import { unlink } from "fs/promises";
import path from "path";
import fs from "fs";

export async function DELETE(req: NextRequest) {
  try {
    // Parse request body to get document ID
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Missing document ID" },
        { status: 400 }
      );
    }

    console.log("Deleting document with ID:", id);

    // Check authentication - wrap in try/catch to handle auth errors gracefully
    let session;
    try {
      session = await getServerSession(authOptions);
    } catch (authError) {
      console.error("Authentication error:", authError);
      return NextResponse.json(
        { error: "Authentication failed" },
        { status: 401 }
      );
    }

    // Ensure user is authenticated
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user's SME profile
    let user;
    try {
      user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: { smeProfile: true },
      });
    } catch (dbError) {
      console.error("Error finding user:", dbError);
      return NextResponse.json(
        { error: "Database error when finding user" },
        { status: 500 }
      );
    }

    if (!user?.smeProfile) {
      return NextResponse.json(
        { error: "SME profile not found" },
        { status: 404 }
      );
    }

    // Find the document to be deleted
    let document;
    try {
      document = await prisma.businessDocument.findUnique({
        where: { id },
      });
    } catch (dbError) {
      console.error("Error finding document:", dbError);
      return NextResponse.json(
        { error: "Database error when finding document" },
        { status: 500 }
      );
    }

    if (!document) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }

    // Ensure user owns this document
    if (document.smeId !== user.smeProfile.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // Delete the physical file if it exists
    if (document.url) {
      try {
        const filePath = path.join(process.cwd(), "public", document.url);

        if (fs.existsSync(filePath)) {
          await unlink(filePath);
          console.log("Physical file deleted:", filePath);
        } else {
          console.log("Physical file not found:", filePath);
        }
      } catch (fileError) {
        // Just log file deletion errors - continue with database deletion
        console.error("Error deleting file:", fileError);
      }
    }

    // Delete related records (if any) first (due to foreign key relationships)
    try {
      await prisma.businessDocument.deleteMany({
        where: { smeId: id },
      });
      console.log("Associated metrics deleted");
    } catch (dbError) {
      console.error("Error deleting metrics:", dbError);
      return NextResponse.json(
        { error: "Database error when deleting metrics" },
        { status: 500 }
      );
    }

    // Finally delete the document record
    try {
      await prisma.businessDocument.delete({
        where: { id },
      });
      console.log("Document record deleted from database");
    } catch (dbError) {
      console.error("Error deleting document record:", dbError);
      return NextResponse.json(
        { error: "Database error when deleting document" },
        { status: 500 }
      );
    }

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: "Document deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    // Catch-all error handler
    console.error("Unhandled error in document deletion:", error);
    return NextResponse.json(
      {
        error: "Failed to delete document",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
