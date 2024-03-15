import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { db } from "./lib/db";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        return true;
      } else {
        const existingUser = await db.user.findFirst({
          where: {
            email: user.email,
          },
        });

        if (!existingUser?.emailVerified === null) return false;
      }
      return true;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session !== null && token.sub) {
        const user = await db.user.findUnique({
          where: {
            id: token.sub,
          },
        });
        session.user.emailVerified = user?.emailVerified || null;
        session.user.id = token.sub;
      }

      return session;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
