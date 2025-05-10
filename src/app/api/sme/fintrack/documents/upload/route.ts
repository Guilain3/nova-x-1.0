// app/api/businessDocument/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { writeFile } from "fs/promises";
import path from "path";
import { mkdirSync, existsSync } from "fs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const smeId = formData.get("smeId") as string;
    const name = formData.get("name") as string;
    const type = formData.get("type") as string; // must match your enum in Prisma

    if (!file || !smeId || !name || !type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadsDir = path.join(process.cwd(), "public/uploads");
    if (!existsSync(uploadsDir)) mkdirSync(uploadsDir, { recursive: true });

    const fileExt = path.extname(file.name);
    const fileName = `${uuidv4()}${fileExt}`;
    const filePath = path.join(uploadsDir, fileName);
    const fileUrl = `/uploads/${fileName}`;

    await writeFile(filePath, buffer);

    const document = await prisma.businessDocument.create({
      data: {
        smeId,
        name,
        type: type as any, // cast to DocumentType enum
        url: fileUrl,
        verificationStatus: "PENDING",
      },
    });

    return NextResponse.json({ success: true, document }, { status: 201 });
  } catch (error) {
    console.error("[UPLOAD_DOCUMENT_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
