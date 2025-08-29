import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";

export const authOptions : NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const user = await db.user.findUnique({
          where: { username: String(credentials.username) },
        });

        if (!user) return null;

        const isValid = await bcrypt.compare(
          String(credentials.password),
          String(user.password)
        );
        if (!isValid) return null;

        return {
          id: String(user.id),
          name: String(user.name ?? ""),
          email: String(user.email),
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in", // Đúng đường dẫn bạn muốn
  },
};

export default authOptions;