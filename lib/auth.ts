import { PrismaAdapter } from "@auth/prisma-adapter";
import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";

import { isDatabaseConfigured, prisma } from "@/lib/prisma";

const authSecret =
  process.env.NEXTAUTH_SECRET ??
  process.env.AUTH_SECRET ??
  (process.env.NODE_ENV === "production" ? undefined : "dev-only-auth-secret");

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...(prisma ? { adapter: PrismaAdapter(prisma) } : {}),
  session: {
    strategy: "jwt"
  },
  secret: authSecret,
  trustHost: true,
  pages: {
    signIn: "/uz/login"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        (token as typeof token & { role?: Role; phone?: string }).role = user.role;
        (token as typeof token & { role?: Role; phone?: string }).phone = user.phone;
      }
      return token;
    },
    async session({ session, token }) {
      const authToken = token as typeof token & { role?: Role; phone?: string };

      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = authToken.role ?? Role.BUYER;
        session.user.phone = authToken.phone ?? "";
      }
      return session;
    }
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!email || !password) {
          return null;
        }

        if (!isDatabaseConfigured || !prisma) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email }
        });

        if (!user || user.isBlocked) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone
        };
      }
    })
  ]
});

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: Role;
      phone: string;
    };
  }

  interface User {
    role: Role;
    phone: string;
  }
}
