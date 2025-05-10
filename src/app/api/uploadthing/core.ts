import { authOptions } from "@/lib/auth-config";
import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { prisma } from "@/lib/prisma"; // Add this import for database access

const f = createUploadthing();

export const ourFileRouter = {
  // Update to handle document uploads with specific document types
  kycDocumentUploader: f({
    image: { maxFileSize: "2MB", maxFileCount: 4 },
    pdf: { maxFileSize: "2MB", maxFileCount: 4 },
  })
    .middleware(async ({ req }) => {
      const session = await getServerSession(authOptions);
      if (!session) throw new UploadThingError("Unauthorized");
      
      // Get the user profile based on role
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: { smeProfile: true }
      });
      
      if (!user || !user.smeProfile) {
        throw new UploadThingError("SME profile not found");
      }
      
      return { 
        userId: session.user.id,
        smeProfileId: user.smeProfile.id 
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for smeProfileId:", metadata.smeProfileId);
      console.log("file url", file.url);
      
      // Return the file URL and metadata for client-side handling
      return { 
        fileUrl: file.url,
        fileName: file.name,
        smeProfileId: metadata.smeProfileId,
        key: file.key
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
