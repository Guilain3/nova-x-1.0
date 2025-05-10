import { type NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/lib/auth";
import type { UserRole } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: {
            smeProfile: true,
          },
        });

        console.log("User found:", user);

        if (!user || user.role !== 'SME') {
          throw new Error("Invalid credentials");
        }

        const isValid = await verifyPassword(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        if (!user.emailVerified) {
          throw new Error("Please verify your email before logging in");
        }

        if (user.status !== 'ACTIVE') {
          throw new Error("Account is not active");
        }

        return {
          id: user.id,
          email: user.email,
          role: user.role,
          businessName: user.smeProfile?.businessName,
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.businessName = user.businessName;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.role = token.role as UserRole;
        session.user.businessName = token.businessName as string | undefined;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/sme/login',
    error: '/auth/sme/login',
  },
};
