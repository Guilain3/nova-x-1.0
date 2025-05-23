import { UserRole } from "@prisma/client";
import "next-auth";

declare module "next-auth" {
    interface User {
        id: string;
        role: UserRole;
        businessName?: string;
    }

    interface Session {
        user: {
            id: string;
            email: string;
            role: UserRole;
            businessName?: string;
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role: UserRole;
        businessName?: string;
    }
}
