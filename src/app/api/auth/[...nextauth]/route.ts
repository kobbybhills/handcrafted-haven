import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "../../../../lib/mongodb";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";

// We export authOptions separately so other API routes (like products) can use it
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@haven.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Ensure database connection is active
        await connectDB();

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter an email and password");
        }

        // 1. Find user in the database
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("No user found with this email");
        }

        // 2. Compare the plain-text password with the hashed password in DB
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Invalid password");
        }

        // 3. Success: Return user data for the session
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role, // "seller" or "customer"
        };
      },
    }),
  ],
  callbacks: {
    // Persist the user role into the JWT token
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as unknown as { role: string }).role;
        token.id = user.id;
      }
      return token;
    },
    // Make the role accessible in the frontend session
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role: string; id: string }).role = token.role as string;
        (session.user as { role: string; id: string }).id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };